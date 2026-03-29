"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Scanline,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

/* ─── Infinite grid floor ───────────────────────────── */

function GridFloor() {
  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#C6A355") },
      },
      vertexShader: /* glsl */ `
        varying vec3 vWorldPos;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec3 vWorldPos;

        float grid(vec2 p, float spacing, float thickness) {
          vec2 g = abs(fract(p / spacing - 0.5) - 0.5) * spacing;
          float line = min(g.x, g.y);
          return 1.0 - smoothstep(0.0, thickness, line);
        }

        void main() {
          float g1 = grid(vWorldPos.xz, 1.0, 0.02);
          float g2 = grid(vWorldPos.xz, 0.25, 0.008);
          float dist = length(vWorldPos.xz);
          float fade = 1.0 - smoothstep(3.0, 14.0, dist);
          float pulse = 0.7 + 0.3 * sin(uTime * 0.5);
          float alpha = (g1 * 0.3 * pulse + g2 * 0.06) * fade;
          float horizonGlow = smoothstep(10.0, 2.0, dist) * 0.04;
          gl_FragColor = vec4(uColor, alpha + horizonGlow);
        }
      `,
    });
  }, []);

  useFrame((_, delta) => {
    mat.uniforms.uTime.value += delta;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} material={mat}>
      <planeGeometry args={[40, 40, 1, 1]} />
    </mesh>
  );
}

/* ─── Floating particles ────────────────────────────── */

function Particles({ count = 80 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 6 - 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#C6A355"
        size={0.015}
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Slow camera drift ─────────────────────────────── */

function CameraDrift() {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.08) * 0.4;
    camera.position.y = 1.8 + Math.sin(t * 0.12) * 0.15;
    camera.position.z = 7;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─── Post-processing pipeline ──────────────────────── */

function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.0006, 0.0006)}
        radialModulation
        modulationOffset={0.3}
      />
      <Scanline
        blendFunction={BlendFunction.OVERLAY}
        density={1.8}
        opacity={0.04}
      />
      <Vignette darkness={0.55} offset={0.3} />
    </EffectComposer>
  );
}

/* ─── Ambient background scene ──────────────────────── */

export default function RetroScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1.8, 7], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.05} />
        <directionalLight position={[3, 5, 2]} intensity={0.15} color="#F0D060" />
        <GridFloor />
        <Particles />
        <CameraDrift />
        <Effects />
      </Canvas>
    </div>
  );
}
