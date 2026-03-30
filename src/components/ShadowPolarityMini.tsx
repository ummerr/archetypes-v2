"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

/* ─── Vertex positions (compact triangle) ── */
const APEX: [number, number, number] = [0, 0.75, 0];
const LEFT: [number, number, number] = [-0.85, -0.5, 0];
const RIGHT: [number, number, number] = [0.85, -0.5, 0];

/* ─── Slowly rotating group that holds the whole triangle ── */
function RotatingTriangle({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      // Gentle slow rotation in Y + slight tilt oscillation
      ref.current.rotation.y = Math.sin(t * 0.15) * 0.25;
      ref.current.rotation.x = Math.sin(t * 0.1) * 0.06;
      ref.current.rotation.z = Math.sin(t * 0.08) * 0.03;
    }
  });

  return <group ref={ref}>{children}</group>;
}

/* ─── Fullness apex — glowing octahedron with orbiting ring ── */
function ApexNode({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.8;
      ref.current.rotation.x = t * 0.5;
      // Gentle breathing scale
      const s = 1 + Math.sin(t * 2) * 0.1;
      ref.current.scale.setScalar(s);
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.4;
      wireRef.current.rotation.z = t * 0.3;
    }
    if (glowRef.current) {
      const s = 0.16 + Math.sin(t * 1.5) * 0.04;
      glowRef.current.scale.setScalar(s);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.6;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.3;
    }
  });

  return (
    <group position={APEX}>
      {/* Pulsing glow sphere */}
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
      {/* Solid octahedron */}
      <mesh ref={ref}>
        <octahedronGeometry args={[0.075, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.0}
          metalness={0.7}
          roughness={0.15}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Counter-rotating wireframe shell */}
      <mesh ref={wireRef}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>
      {/* Orbiting sovereignty ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.14, 0.005, 6, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      <pointLight color={color} intensity={1.2} distance={3} decay={2} />
    </group>
  );
}

/* ─── Active shadow — hot, spiky, jittery tetrahedron with sparks ── */
function ActiveNode() {
  const ref = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const sparksRef = useRef<THREE.Points>(null);
  const sparkCount = 6;

  const sparkPositions = useMemo(
    () => new Float32Array(sparkCount * 3),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 3;
      ref.current.rotation.x = t * 2.2;
      ref.current.rotation.z = t * 1.5;
      ref.current.position.x = LEFT[0] + Math.sin(t * 2.5) * 0.04;
      ref.current.position.y = LEFT[1] + Math.cos(t * 3.0) * 0.035;
      // Aggressive scale pulsing
      const s = 1 + Math.sin(t * 4) * 0.15;
      ref.current.scale.setScalar(s);
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 2;
      wireRef.current.rotation.x = -t * 1.5;
      wireRef.current.position.x = LEFT[0] + Math.sin(t * 2.5) * 0.04;
      wireRef.current.position.y = LEFT[1] + Math.cos(t * 3.0) * 0.035;
    }
    // Sparking particles orbiting the active node
    if (sparksRef.current) {
      const pos = sparksRef.current.geometry.attributes.position;
      for (let i = 0; i < sparkCount; i++) {
        const angle = t * 3 + (i / sparkCount) * Math.PI * 2;
        const r = 0.12 + Math.sin(t * 5 + i) * 0.04;
        pos.setXYZ(
          i,
          LEFT[0] + Math.cos(angle) * r + Math.sin(t * 2.5) * 0.04,
          LEFT[1] + Math.sin(angle) * r + Math.cos(t * 3.0) * 0.035,
          Math.sin(angle * 2 + t) * 0.04
        );
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={ref} position={LEFT}>
        <tetrahedronGeometry args={[0.075, 0]} />
        <meshStandardMaterial
          color="#C0392B"
          emissive="#E74C3C"
          emissiveIntensity={1.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={wireRef} position={LEFT}>
        <tetrahedronGeometry args={[0.11, 0]} />
        <meshBasicMaterial
          color="#E74C3C"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
      {/* Orbiting sparks */}
      <points ref={sparksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparkPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#E74C3C"
          size={0.018}
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <pointLight
        position={LEFT}
        color="#E74C3C"
        intensity={0.6}
        distance={2}
        decay={2}
      />
    </group>
  );
}

/* ─── Passive shadow — cold, collapsed, slow box that shrinks ── */
function PassiveNode() {
  const ref = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.3;
      ref.current.rotation.x = t * 0.15;
      ref.current.position.x = RIGHT[0] + Math.sin(t * 0.4) * 0.02;
      ref.current.position.y = RIGHT[1] + Math.sin(t * 0.3) * 0.02;
      // Collapsing breathing — shrinks and expands slowly
      const sy = 0.4 + Math.sin(t * 0.8) * 0.08;
      ref.current.scale.set(1, sy, 1);
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.2;
      wireRef.current.position.x = RIGHT[0] + Math.sin(t * 0.4) * 0.02;
      wireRef.current.position.y = RIGHT[1] + Math.sin(t * 0.3) * 0.02;
      const sy = 0.4 + Math.sin(t * 0.8) * 0.08;
      wireRef.current.scale.set(1.1, sy * 1.1, 1.1);
    }
  });

  return (
    <group>
      <mesh ref={ref} position={RIGHT} scale={[1, 0.4, 1]}>
        <boxGeometry args={[0.09, 0.09, 0.09]} />
        <meshStandardMaterial
          color="#5C5A52"
          emissive="#5C5A52"
          emissiveIntensity={0.6}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={wireRef} position={RIGHT} scale={[1.1, 0.44, 1.1]}>
        <boxGeometry args={[0.11, 0.11, 0.11]} />
        <meshBasicMaterial
          color="#8A8780"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      <pointLight
        position={RIGHT}
        color="#5C5A52"
        intensity={0.25}
        distance={1.5}
        decay={2}
      />
    </group>
  );
}

/* ─── Dashed triangle wireframe ── */
function TriangleFrame({ color }: { color: string }) {
  const obj = useMemo(() => {
    const vertices: number[] = [];
    const subdivide = (
      a: [number, number, number],
      b: [number, number, number],
      n: number
    ) => {
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

    subdivide(APEX, LEFT, 20);
    subdivide(APEX, RIGHT, 20);
    subdivide(LEFT, RIGHT, 20);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    const mat = new THREE.LineDashedMaterial({
      color,
      dashSize: 0.04,
      gapSize: 0.03,
      transparent: true,
      opacity: 0.22,
    });
    const seg = new THREE.LineSegments(geo, mat);
    seg.computeLineDistances();
    return seg;
  }, [color]);

  return <primitive object={obj} />;
}

/* ─── Outer echo triangle — slow counter-rotate ── */
function TriangleEcho({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null);

  const obj = useMemo(() => {
    const s = 1.18;
    const apex: [number, number, number] = [APEX[0] * s, APEX[1] * s, 0];
    const left: [number, number, number] = [LEFT[0] * s, LEFT[1] * s, 0];
    const right: [number, number, number] = [RIGHT[0] * s, RIGHT[1] * s, 0];

    const vertices = [...apex, ...left, ...left, ...right, ...right, ...apex];

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    const mat = new THREE.LineDashedMaterial({
      color,
      dashSize: 0.02,
      gapSize: 0.06,
      transparent: true,
      opacity: 0.08,
    });
    const seg = new THREE.LineSegments(geo, mat);
    seg.computeLineDistances();
    return seg;
  }, [color]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.04;
    }
  });

  return (
    <group ref={ref}>
      <primitive object={obj} />
    </group>
  );
}

/* ─── Energy pulse ring — expands outward from center periodically ── */
function EnergyPulse({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Pulse every ~3 seconds
    const phase = (t * 0.35) % 1;
    const scale = 0.1 + phase * 1.4;
    const opacity = (1 - phase) * 0.12;
    ref.current.scale.set(scale, scale, 1);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
  });

  return (
    <mesh ref={ref} position={[0, 0.08, -0.05]}>
      <ringGeometry args={[0.9, 0.92, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Particles flowing along triangle edges ── */
function EdgeParticles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const count = 24;

  const { positions, speeds, edges } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const edges = new Uint8Array(count);
    for (let i = 0; i < count; i++) {
      speeds[i] = 0.1 + Math.random() * 0.3;
      edges[i] = Math.floor(Math.random() * 3);
    }
    return { positions, speeds, edges };
  }, []);

  const edgePts: [number, number, number][][] = [
    [APEX, LEFT],
    [APEX, RIGHT],
    [LEFT, RIGHT],
  ];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const edge = edgePts[edges[i]];
      const progress = (t * speeds[i] + i * 0.25) % 1;
      pos.setXYZ(
        i,
        edge[0][0] + (edge[1][0] - edge[0][0]) * progress,
        edge[0][1] + (edge[1][1] - edge[0][1]) * progress,
        Math.sin(t * 1.5 + i * 0.7) * 0.02
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
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Ambient drift particles ── */
function AmbientParticles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const count = 16;

  const initPositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 2.2;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 1.8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i);
      pos.setY(i, y + Math.sin(t * 0.3 + i * 0.5) * 0.001);
      const x = pos.getX(i);
      pos.setX(i, x + Math.cos(t * 0.2 + i * 0.7) * 0.0005);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[initPositions, 3]}
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

/* ─── Connecting energy beams between poles (solid fading lines) ── */
function EnergyBeams({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.children.forEach((child, i) => {
      const line = child as THREE.Line;
      if (line.material) {
        (line.material as THREE.LineBasicMaterial).opacity =
          0.06 + Math.sin(t * 1.2 + i * 1.5) * 0.04;
      }
    });
  });

  const group = useMemo(() => {
    const g = new THREE.Group();
    const pairs: [number, number, number][][] = [
      [APEX, LEFT],
      [APEX, RIGHT],
      [LEFT, RIGHT],
    ];
    const colors = ["#C0392B", "#5C5A52", color];
    pairs.forEach((pair, i) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute([...pair[0], ...pair[1]], 3)
      );
      const mat = new THREE.LineBasicMaterial({
        color: colors[i],
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
      });
      g.add(new THREE.Line(geo, mat));
    });
    return g;
  }, [color]);

  return (
    <group ref={ref}>
      <primitive object={group} />
    </group>
  );
}

/* ─── HTML labels for the three poles ── */
function PolarityLabels({
  color,
  fullnessName,
  activeShadowName,
  passiveShadowName,
}: {
  color: string;
  fullnessName: string;
  activeShadowName: string;
  passiveShadowName: string;
}) {
  return (
    <>
      {/* Apex — Fullness */}
      <Html position={[0, 1.12, 0]} center>
        <div className="pointer-events-none select-none text-center whitespace-nowrap">
          <p
            className="font-mono text-[6px] tracking-[0.1em] uppercase"
            style={{ color: `${color}70` }}
          >
            Fullness
          </p>
          <p
            className="font-serif text-[10px] font-medium mt-px"
            style={{ color, textShadow: `0 0 10px ${color}60` }}
          >
            {fullnessName}
          </p>
        </div>
      </Html>

      {/* Left — Active Shadow */}
      <Html position={[-0.85, -0.86, 0]} center>
        <div className="pointer-events-none select-none text-center whitespace-nowrap">
          <p
            className="font-serif text-[9px] font-medium"
            style={{
              color: "#E74C3C",
              textShadow: "0 0 10px rgba(231,76,60,0.4)",
            }}
          >
            {activeShadowName}
          </p>
          <p
            className="font-mono text-[5px] tracking-[0.1em] uppercase mt-px"
            style={{ color: "#C0392B", opacity: 0.5 }}
          >
            Active Shadow
          </p>
        </div>
      </Html>

      {/* Right — Passive Shadow */}
      <Html position={[0.85, -0.86, 0]} center>
        <div className="pointer-events-none select-none text-center whitespace-nowrap">
          <p
            className="font-serif text-[9px] font-medium"
            style={{
              color: "#B8B5AD",
              opacity: 0.6,
              textShadow: "0 0 10px rgba(92,90,82,0.3)",
            }}
          >
            {passiveShadowName}
          </p>
          <p
            className="font-mono text-[5px] tracking-[0.1em] uppercase mt-px"
            style={{ color: "#5C5A52", opacity: 0.4 }}
          >
            Passive Shadow
          </p>
        </div>
      </Html>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   ShadowPolarityMini — Compact canvas for home cards
   ═══════════════════════════════════════════════════════ */

export default function ShadowPolarityMini({
  color,
  fullnessName,
  activeShadowName,
  passiveShadowName,
}: {
  color: string;
  fullnessName: string;
  activeShadowName: string;
  passiveShadowName: string;
}) {
  return (
    <div className="relative w-full h-[150px]">
      <Canvas
        camera={{ position: [0, 0.05, 2.6], fov: 34 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.04} />
        <directionalLight
          position={[2, 3, 2]}
          intensity={0.12}
          color="#F0D060"
        />
        <directionalLight
          position={[-1, -2, 1]}
          intensity={0.05}
          color="#4488AA"
        />

        <RotatingTriangle>
          <TriangleFrame color={color} />
          <TriangleEcho color={color} />
          <EnergyBeams color={color} />
          <ApexNode color={color} />
          <ActiveNode />
          <PassiveNode />
          <EdgeParticles color={color} />
          <EnergyPulse color={color} />
        </RotatingTriangle>

        <AmbientParticles color={color} />

        <PolarityLabels
          color={color}
          fullnessName={fullnessName}
          activeShadowName={activeShadowName}
          passiveShadowName={passiveShadowName}
        />

        <EffectComposer>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.12}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
