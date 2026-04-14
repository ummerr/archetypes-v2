"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import type { Archetype } from "@/types/archetype";

/* ─── Apex vertex: fullness - glowing bright node ── */
function ApexNode({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.5;
      ref.current.rotation.x = t * 0.3;
    }
    if (glowRef.current) {
      const s = 0.18 + Math.sin(t * 1.5) * 0.03;
      glowRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={[0, 1.1, 0]}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.06}
        />
      </mesh>
      {/* Octahedron marker */}
      <mesh ref={ref}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.1, 0]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      <pointLight color={color} intensity={1.0} distance={3} decay={2} />
    </group>
  );
}

/* ─── Active shadow vertex: hot, spiky, jittery ── */
function ActiveNode() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 2;
      ref.current.rotation.x = t * 1.5;
      ref.current.position.x = -1.2 + Math.sin(t * 1.8) * 0.04;
      ref.current.position.y = -0.8 + Math.cos(t * 2.2) * 0.03;
    }
  });

  return (
    <group>
      <mesh ref={ref} position={[-1.2, -0.8, 0]}>
        <tetrahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial
          color="#C0392B"
          emissive="#C0392B"
          emissiveIntensity={1.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh position={[-1.2, -0.8, 0]}>
        <tetrahedronGeometry args={[0.13, 0]} />
        <meshBasicMaterial
          color="#C0392B"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <pointLight
        position={[-1.2, -0.8, 0]}
        color="#C0392B"
        intensity={0.5}
        distance={2}
        decay={2}
      />
    </group>
  );
}

/* ─── Passive shadow vertex: cold, collapsed, slow ── */
function PassiveNode() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.3;
      ref.current.position.x = 1.2 + Math.sin(t * 0.4) * 0.02;
      ref.current.position.y = -0.8 + Math.sin(t * 0.3) * 0.02;
    }
  });

  return (
    <group>
      <mesh ref={ref} position={[1.2, -0.8, 0]} scale={[1, 0.5, 1]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial
          color="#5C5A52"
          emissive="#5C5A52"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[1.2, -0.8, 0]} scale={[1, 0.5, 1]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshBasicMaterial
          color="#5C5A52"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      <pointLight
        position={[1.2, -0.8, 0]}
        color="#5C5A52"
        intensity={0.3}
        distance={2}
        decay={2}
      />
    </group>
  );
}

/* ─── Triangle wireframe edges with energy flow ── */
function TriangleFrame({ color }: { color: string }) {
  const obj = useMemo(() => {
    const vertices: number[] = [];
    const apex: [number, number, number] = [0, 1.1, 0];
    const left: [number, number, number] = [-1.2, -0.8, 0];
    const right: [number, number, number] = [1.2, -0.8, 0];

    const subdivide = (a: [number, number, number], b: [number, number, number], n: number) => {
      for (let i = 0; i < n; i++) {
        const t1 = i / n;
        const t2 = (i + 1) / n;
        vertices.push(
          a[0] + (b[0] - a[0]) * t1,
          a[1] + (b[1] - a[1]) * t1,
          a[2] + (b[2] - a[2]) * t1,
          a[0] + (b[0] - a[0]) * t2,
          a[1] + (b[1] - a[1]) * t2,
          a[2] + (b[2] - a[2]) * t2
        );
      }
    };

    subdivide(apex, left, 20);
    subdivide(apex, right, 20);
    subdivide(left, right, 20);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    const mat = new THREE.LineDashedMaterial({
      color,
      dashSize: 0.06,
      gapSize: 0.04,
      transparent: true,
      opacity: 0.2,
    });
    const seg = new THREE.LineSegments(geo, mat);
    seg.computeLineDistances();
    return seg;
  }, [color]);

  return <primitive object={obj} />;
}

/* ─── Outer triangle echo - faint secondary frame ── */
function TriangleEcho({ color }: { color: string }) {
  const obj = useMemo(() => {
    const scale = 1.12;
    const apex: [number, number, number] = [0, 1.1 * scale, 0];
    const left: [number, number, number] = [-1.2 * scale, -0.8 * scale, 0];
    const right: [number, number, number] = [1.2 * scale, -0.8 * scale, 0];

    const vertices = [
      ...apex, ...left,
      ...left, ...right,
      ...right, ...apex,
    ];

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    const mat = new THREE.LineDashedMaterial({
      color,
      dashSize: 0.02,
      gapSize: 0.1,
      transparent: true,
      opacity: 0.08,
    });
    const seg = new THREE.LineSegments(geo, mat);
    seg.computeLineDistances();
    return seg;
  }, [color]);

  return <primitive object={obj} />;
}

/* ─── Particles flowing along triangle edges ── */
function EdgeParticles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const count = 30;

  const { positions, speeds, edges } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const edges = new Uint8Array(count); // 0=apex-left, 1=apex-right, 2=left-right
    for (let i = 0; i < count; i++) {
      speeds[i] = 0.15 + Math.random() * 0.3;
      edges[i] = Math.floor(Math.random() * 3);
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
    }
    return { positions, speeds, edges };
  }, []);

  const apex: [number, number, number] = [0, 1.1, 0];
  const left: [number, number, number] = [-1.2, -0.8, 0];
  const right: [number, number, number] = [1.2, -0.8, 0];
  const edgePts: [number, number, number][][] = [
    [apex, left],
    [apex, right],
    [left, right],
  ];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const edge = edgePts[edges[i]];
      const progress = ((t * speeds[i] + i * 0.3) % 1);
      pos.setXYZ(
        i,
        edge[0][0] + (edge[1][0] - edge[0][0]) * progress,
        edge[0][1] + (edge[1][1] - edge[0][1]) * progress,
        (Math.sin(t + i) * 0.02)
      );
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.015}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Ambient floating particles around the triangle ── */
function AmbientParticles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const count = 20;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 3;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i);
      pos.setY(i, y + Math.sin(t * 0.2 + i) * 0.001);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.01}
        transparent
        opacity={0.15}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── HTML labels ── */
function TriangleLabels({ archetype }: { archetype: Archetype }) {
  const color = archetype.accentColor;

  return (
    <>
      {/* Apex - Fullness */}
      <Html position={[0, 1.55, 0]} center>
        <div className="pointer-events-none select-none text-center whitespace-nowrap">
          <p
            className="font-sans text-[7px] tracking-[0.12em] uppercase"
            style={{ color: `${color}80`, }}
          >
            Fullness
          </p>
          <p
            className="font-serif text-sm font-medium mt-0.5"
            style={{ color, textShadow: `0 0 12px ${color}60` }}
          >
            {archetype.name}
          </p>
        </div>
      </Html>

      {/* Left - Active Shadow */}
      <Html position={[-1.2, -1.15, 0]} center>
        <div className="pointer-events-none select-none text-center whitespace-nowrap">
          <p
            className="font-serif text-xs font-medium"
            style={{ color: "var(--color-crimson-light)", textShadow: "0 0 10px rgba(231,76,60,0.4)" }}
          >
            {archetype.activeShadow.name}
          </p>
          <p
            className="font-sans text-[6px] tracking-[0.12em] uppercase mt-0.5"
            style={{ color: "var(--color-crimson)", opacity: 0.5 }}
          >
            Active Shadow
          </p>
        </div>
      </Html>

      {/* Right - Passive Shadow */}
      <Html position={[1.2, -1.15, 0]} center>
        <div className="pointer-events-none select-none text-center whitespace-nowrap">
          <p
            className="font-serif text-xs font-medium"
            style={{ color: "var(--color-muted)", opacity: 0.8, textShadow: "0 0 10px rgba(92,90,82,0.3)" }}
          >
            {archetype.passiveShadow.name}
          </p>
          <p
            className="font-sans text-[6px] tracking-[0.12em] uppercase mt-0.5"
            style={{ color: "var(--color-muted)", opacity: 0.5 }}
          >
            Passive Shadow
          </p>
        </div>
      </Html>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   ShadowTriangle - Main Canvas
   ═══════════════════════════════════════════════════════ */

export default function ShadowTriangle({
  archetype,
}: {
  archetype: Archetype;
}) {
  const color = archetype.accentColor;

  return (
    <div className="relative w-full max-w-xl mx-auto h-[360px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 0.1, 4.2], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.03} />
        <directionalLight position={[2, 3, 2]} intensity={0.12} color="#F0D060" />
        <directionalLight position={[-1, -2, 1]} intensity={0.05} color="#4488AA" />

        <TriangleFrame color={color} />
        <TriangleEcho color={color} />
        <ApexNode color={color} />
        <ActiveNode />
        <PassiveNode />
        <EdgeParticles color={color} />
        <AmbientParticles color={color} />

        <TriangleLabels archetype={archetype} />

        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
