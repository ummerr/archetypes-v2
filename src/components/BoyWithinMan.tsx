"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

interface Props {
  boyName: string;
  manName: string;
  color: string;
  boyShadowActive: string;
  boyShadowPassive: string;
  manShadowActive: string;
  manShadowPassive: string;
  maturity: "boy" | "man";
}

/* ─── Particles drifting between boy core and man ring ── */
function InitiationParticles({ color, count = 40 }: { color: string; count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.4 + Math.random() * 0.8;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
      positions[i * 3 + 2] = Math.sin(angle) * r;
      speeds[i] = 0.2 + Math.random() * 0.4;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, offsets };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const angle = offsets[i] + t * speeds[i];
      // Spiral inward and outward
      const r = 0.35 + Math.sin(t * speeds[i] * 0.5 + offsets[i]) * 0.55 + 0.2;
      pos.setXYZ(
        i,
        Math.cos(angle) * r,
        Math.sin(t * 0.3 + offsets[i]) * 0.15,
        Math.sin(angle) * r
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
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Dashed orbital rings (initiation paths) ── */
function InitiationRings({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  const rings = useMemo(() => [
    { r: 0.55, dash: 0.04, gap: 0.08, opacity: 0.15, rotX: 0.3 },
    { r: 0.7, dash: 0.02, gap: 0.12, opacity: 0.1, rotX: -0.2 },
    { r: 0.85, dash: 0.06, gap: 0.06, opacity: 0.08, rotX: 0.15 },
  ], []);

  return (
    <group ref={group}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[ring.rotX, 0, i * 0.4]}>
          <torusGeometry args={[ring.r, 0.003, 4, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={ring.opacity}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Boy core: glowing inner sphere ── */
function BoyCore({ color, isBoy }: { color: string; isBoy: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = t * 0.2;
    }
    if (glowRef.current) {
      const s = 0.38 + Math.sin(t * 1.5) * 0.04;
      glowRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Inner glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.08}
        />
      </mesh>
      {/* Boy icosahedron - wireframe */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={isBoy ? 0.9 : 0.6}
        />
      </mesh>
      {/* Boy icosahedron - solid */}
      <mesh rotation={[0, 0.3, 0]}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isBoy ? 0.6 : 0.3}
          metalness={0.5}
          roughness={0.3}
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* Bright core point */}
      <mesh>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive={color}
          emissiveIntensity={2.5}
        />
      </mesh>
      <pointLight color={color} intensity={1.5} distance={3} decay={2} />
    </group>
  );
}

/* ─── Man container: outer wireframe sphere ── */
function ManContainer({ color, isMan }: { color: string; isMan: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const echoRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.1;
      outerRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
    }
    if (echoRef.current) {
      echoRef.current.rotation.y = -t * 0.05;
    }
  });

  return (
    <group>
      {/* Main man sphere - wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={isMan ? 0.4 : 0.2}
        />
      </mesh>
      {/* Echo ring */}
      <mesh ref={echoRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.008, 4, 48]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

/* ─── Shadow orbiters for boy/man ── */
function ShadowMarkers({
  manShadowActive,
  manShadowPassive,
}: {
  manShadowActive: string;
  manShadowPassive: string;
}) {
  const activeRef = useRef<THREE.Mesh>(null);
  const passiveRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (activeRef.current) {
      activeRef.current.position.x = -1.35 + Math.sin(t * 1.2) * 0.06;
      activeRef.current.position.y = Math.cos(t * 1.8) * 0.05;
      activeRef.current.rotation.y = t * 2;
      activeRef.current.rotation.x = t * 1.2;
    }
    if (passiveRef.current) {
      passiveRef.current.position.x = 1.35 + Math.sin(t * 0.4) * 0.03;
      passiveRef.current.position.y = Math.sin(t * 0.25) * 0.03;
      passiveRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <>
      {/* Active shadow - spiky tetrahedron */}
      <mesh ref={activeRef} position={[-1.35, 0, 0]}>
        <tetrahedronGeometry args={[0.08, 0]} />
        <meshStandardMaterial
          color="#C0392B"
          emissive="#C0392B"
          emissiveIntensity={1.0}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Passive shadow - flat box */}
      <mesh ref={passiveRef} position={[1.35, 0, 0]} scale={[1, 0.4, 1]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#5C5A52"
          emissive="#5C5A52"
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  );
}

/* ─── HTML labels overlaid on the 3D scene ── */
function Labels({
  boyName,
  manName,
  color,
  manShadowActive,
  manShadowPassive,
  maturity,
}: {
  boyName: string;
  manName: string;
  color: string;
  manShadowActive: string;
  manShadowPassive: string;
  maturity: "boy" | "man";
}) {
  return (
    <>
      {/* Man label - top */}
      <Html position={[0, 1.35, 0]} center>
        <div className="pointer-events-none select-none text-center whitespace-nowrap">
          <p
            className="font-serif text-sm font-medium"
            style={{
              color,
              opacity: maturity === "man" ? 0.9 : 0.5,
              textShadow: `0 0 12px ${color}60`,
            }}
          >
            {manName}
          </p>
          <p
            className="font-sans text-[7px] tracking-[0.2em] uppercase mt-0.5"
            style={{ color, opacity: 0.3 }}
          >
            Man
          </p>
        </div>
      </Html>

      {/* Boy label - center bottom */}
      <Html position={[0, -0.45, 0]} center>
        <div className="pointer-events-none select-none text-center whitespace-nowrap">
          <p
            className="font-serif text-xs font-medium"
            style={{
              color,
              opacity: maturity === "boy" ? 0.9 : 0.65,
              textShadow: `0 0 10px ${color}40`,
            }}
          >
            {boyName}
          </p>
          <p
            className="font-sans text-[6px] tracking-[0.2em] uppercase mt-0.5"
            style={{ color, opacity: 0.25 }}
          >
            Boy
          </p>
        </div>
      </Html>

      {/* Active shadow label */}
      <Html position={[-1.35, -0.25, 0]} center>
        <div className="pointer-events-none select-none text-center whitespace-nowrap">
          <p className="font-sans text-[6px] tracking-[0.15em] uppercase" style={{ color: "var(--color-crimson-light)", opacity: 0.6 }}>
            Active
          </p>
          <p className="font-serif text-[9px]" style={{ color: "var(--color-crimson-light)", opacity: 0.55 }}>
            {manShadowActive}
          </p>
        </div>
      </Html>

      {/* Passive shadow label */}
      <Html position={[1.35, -0.25, 0]} center>
        <div className="pointer-events-none select-none text-center whitespace-nowrap">
          <p className="font-sans text-[6px] tracking-[0.15em] uppercase" style={{ color: "var(--color-muted)", opacity: 0.6 }}>
            Passive
          </p>
          <p className="font-serif text-[9px]" style={{ color: "var(--color-muted)", opacity: 0.55 }}>
            {manShadowPassive}
          </p>
        </div>
      </Html>

      {/* Bottom annotation */}
      <Html position={[0, -1.55, 0]} center>
        <p
          className="pointer-events-none select-none font-sans text-[7px] tracking-[0.25em] uppercase whitespace-nowrap"
          style={{ color, opacity: 0.2 }}
        >
          {maturity === "boy" ? "The seed within the man" : "The boy he carries within"}
        </p>
      </Html>
    </>
  );
}

/* ─── Connecting dashed lines to shadow poles ── */
function ShadowConnectors() {
  const leftLine = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pts = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      pts.push(-1.0 - t * 0.25, Math.sin(t * Math.PI) * 0.02, 0);
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    const mat = new THREE.LineDashedMaterial({
      color: "#C0392B",
      dashSize: 0.03,
      gapSize: 0.05,
      transparent: true,
      opacity: 0.2,
    });
    const line = new THREE.Line(geo, mat);
    line.computeLineDistances();
    return line;
  }, []);

  const rightLine = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pts = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      pts.push(1.0 + t * 0.25, Math.sin(t * Math.PI) * 0.02, 0);
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    const mat = new THREE.LineDashedMaterial({
      color: "#5C5A52",
      dashSize: 0.03,
      gapSize: 0.05,
      transparent: true,
      opacity: 0.15,
    });
    const line = new THREE.Line(geo, mat);
    line.computeLineDistances();
    return line;
  }, []);

  return (
    <>
      <primitive object={leftLine} />
      <primitive object={rightLine} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   BoyWithinMan - Main Canvas
   ═══════════════════════════════════════════════════════ */

export default function BoyWithinMan({
  boyName,
  manName,
  color,
  boyShadowActive,
  boyShadowPassive,
  manShadowActive,
  manShadowPassive,
  maturity,
}: Props) {
  const isBoy = maturity === "boy";

  return (
    <div className="relative w-full h-[340px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 0.2, 3.5], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.03} />
        <directionalLight position={[2, 3, 2]} intensity={0.15} color="#F0D060" />
        <directionalLight position={[-1, -2, 1]} intensity={0.06} color="#4488AA" />

        <ManContainer color={color} isMan={!isBoy} />
        <BoyCore color={color} isBoy={isBoy} />
        <InitiationRings color={color} />
        <InitiationParticles color={color} />
        <ShadowMarkers
          manShadowActive={manShadowActive}
          manShadowPassive={manShadowPassive}
        />
        <ShadowConnectors />

        <Labels
          boyName={boyName}
          manName={manName}
          color={color}
          manShadowActive={manShadowActive}
          manShadowPassive={manShadowPassive}
          maturity={maturity}
        />

        <EffectComposer>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
