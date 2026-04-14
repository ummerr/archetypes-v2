"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import type { ArchetypeFamily } from "@/types/archetype";

/* ═══════════════════════════════════════════════════════
   KING - Crown: flat-top cylinder base with 5 peaked
   spires + orbiting sovereignty ring
   ═══════════════════════════════════════════════════════ */

function KingTotem({ color, intensity }: { color: string; intensity: number }) {
  const group = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const crownGeo = useMemo(() => {
    const shape = new THREE.Shape();
    // Crown profile: flat base with 5 peaks
    const peaks = 5;
    const baseR = 0.6;
    const peakR = 0.95;
    const baseH = 0.3;
    const peakH = 0.8;

    const points: THREE.Vector2[] = [];
    // Bottom edge
    points.push(new THREE.Vector2(baseR, -baseH));
    points.push(new THREE.Vector2(baseR, 0));

    // Peaks
    for (let i = 0; i < peaks; i++) {
      const t = i / peaks;
      const tNext = (i + 0.5) / peaks;
      points.push(new THREE.Vector2(baseR * 0.85, baseH * t * 2));
      points.push(new THREE.Vector2(peakR * 0.7, peakH));
      points.push(new THREE.Vector2(baseR * 0.75, baseH * tNext * 2));
    }

    // Use lathe geometry for a cylindrical crown
    return new THREE.LatheGeometry(
      [
        new THREE.Vector2(0.0, -0.35),
        new THREE.Vector2(0.55, -0.35),
        new THREE.Vector2(0.6, -0.3),
        new THREE.Vector2(0.6, 0.0),
        new THREE.Vector2(0.55, 0.05),
        new THREE.Vector2(0.5, 0.15),
        new THREE.Vector2(0.65, 0.45),
        new THREE.Vector2(0.45, 0.25),
        new THREE.Vector2(0.6, 0.5),
        new THREE.Vector2(0.4, 0.3),
        new THREE.Vector2(0.55, 0.55),
        new THREE.Vector2(0.35, 0.35),
        new THREE.Vector2(0.0, 0.35),
      ],
      5
    );
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.2;
      group.current.position.y = Math.sin(t * 0.6) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.4) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Crown body - solid */}
      <mesh geometry={crownGeo}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4 * intensity}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.25}
        />
      </mesh>
      {/* Crown body - wireframe */}
      <mesh geometry={crownGeo}>
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.7 * intensity}
        />
      </mesh>
      {/* Sovereignty ring */}
      <mesh ref={ringRef} position={[0, 0.05, 0]}>
        <torusGeometry args={[0.85, 0.02, 8, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5 * intensity}
        />
      </mesh>
      {/* Crown jewel - top */}
      <mesh position={[0, 0.55, 0]}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshStandardMaterial
          color="#F0D060"
          emissive="#F0D060"
          emissiveIntensity={1.5}
        />
      </mesh>
      <pointLight color={color} intensity={1.5 * intensity} distance={4} decay={2} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   WARRIOR - Blade: two intersecting elongated pyramids
   forming a double-edged weapon shape
   ═══════════════════════════════════════════════════════ */

function WarriorTotem({ color, intensity }: { color: string; intensity: number }) {
  const group = useRef<THREE.Group>(null);
  const orbiterRef = useRef<THREE.Group>(null);

  // Main blade - elongated octahedron (stretched on Y)
  const bladeGeo = useMemo(() => {
    const geo = new THREE.OctahedronGeometry(1, 0);
    // Stretch vertically to make it blade-like
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      pos.setY(i, y * 1.8);
      // Sharpen the horizontal edges
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setX(i, x * 0.35);
      pos.setZ(i, z * 0.35);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Cross-guard
  const guardGeo = useMemo(() => {
    const geo = new THREE.OctahedronGeometry(1, 0);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      pos.setX(i, x * 2.0);
      pos.setY(i, pos.getY(i) * 0.15);
      pos.setZ(i, pos.getZ(i) * 0.2);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.3;
      group.current.rotation.z = Math.sin(t * 0.5) * 0.05;
      group.current.position.y = Math.sin(t * 0.8) * 0.04;
    }
    if (orbiterRef.current) {
      orbiterRef.current.rotation.y = -t * 0.8;
    }
  });

  return (
    <group ref={group}>
      {/* Main blade */}
      <mesh geometry={bladeGeo}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5 * intensity}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.2}
        />
      </mesh>
      <mesh geometry={bladeGeo}>
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.8 * intensity}
        />
      </mesh>
      {/* Cross-guard */}
      <mesh geometry={guardGeo} position={[0, -0.3, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4 * intensity}
          metalness={0.9}
          roughness={0.15}
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh geometry={guardGeo} position={[0, -0.3, 0]}>
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.5 * intensity}
        />
      </mesh>
      {/* Orbiting shield fragments */}
      <group ref={orbiterRef}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 3) * Math.PI * 2) * 0.9,
              -0.2,
              Math.sin((i / 3) * Math.PI * 2) * 0.9,
            ]}
          >
            <tetrahedronGeometry args={[0.06, 0]} />
            <meshBasicMaterial color={color} transparent opacity={0.6 * intensity} />
          </mesh>
        ))}
      </group>
      <pointLight color={color} intensity={1.2 * intensity} distance={4} decay={2} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   MAGICIAN - Eye of Knowledge: nested platonic solids
   (icosahedron inside dodecahedron) with rotating
   inner eye
   ═══════════════════════════════════════════════════════ */

function MagicianTotem({ color, intensity }: { color: string; intensity: number }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.15;
      outerRef.current.rotation.x = t * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.25;
      innerRef.current.rotation.z = t * 0.2;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
      // Pulse
      const s = 0.12 + Math.sin(t * 2) * 0.03;
      coreRef.current.scale.setScalar(s);
    }
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.5) * 0.06;
    }
  });

  return (
    <group ref={group}>
      {/* Outer dodecahedron - wireframe shell */}
      <mesh ref={outerRef}>
        <dodecahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.4 * intensity}
        />
      </mesh>
      {/* Inner icosahedron - counter-rotating */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.52, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5 * intensity}
          metalness={0.6}
          roughness={0.3}
          transparent
          opacity={0.2}
        />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.52, 0]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.6 * intensity}
        />
      </mesh>
      {/* Core eye - bright pulsing sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive={color}
          emissiveIntensity={2.0}
        />
      </mesh>
      <pointLight color={color} intensity={1.5 * intensity} distance={4} decay={2} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   LOVER - Torus Knot: intertwined flowing form
   representing connection, with orbiting petals
   ═══════════════════════════════════════════════════════ */

function LoverTotem({ color, intensity }: { color: string; intensity: number }) {
  const group = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const petalsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.4) * 0.06;
    }
    if (knotRef.current) {
      knotRef.current.rotation.y = t * 0.2;
      knotRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (petalsRef.current) {
      petalsRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={group}>
      {/* Torus knot - solid */}
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[0.5, 0.12, 64, 8, 2, 3]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4 * intensity}
          metalness={0.5}
          roughness={0.4}
          transparent
          opacity={0.25}
        />
      </mesh>
      {/* Torus knot - wireframe */}
      <mesh>
        <torusKnotGeometry args={[0.5, 0.12, 64, 8, 2, 3]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.55 * intensity}
        />
      </mesh>
      {/* Orbiting petal spheres */}
      <group ref={petalsRef}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const r = 0.8;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * r, Math.sin(angle * 2) * 0.15, Math.sin(angle) * r]}
            >
              <sphereGeometry args={[0.035, 6, 6]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.5}
              />
            </mesh>
          );
        })}
      </group>
      <pointLight color={color} intensity={1.2 * intensity} distance={4} decay={2} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   Shadow pole orbiters - two small shapes representing
   active (hot, inflated) and passive (cold, deflated)
   ═══════════════════════════════════════════════════════ */

function ShadowOrbiters({
  activeColor,
  passiveColor,
  intensity,
}: {
  activeColor: string;
  passiveColor: string;
  intensity: number;
}) {
  const activeRef = useRef<THREE.Mesh>(null);
  const passiveRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Active shadow - jittery, aggressive orbit
    if (activeRef.current) {
      activeRef.current.position.x = -0.75 + Math.sin(t * 1.5) * 0.08;
      activeRef.current.position.y = -0.55 + Math.cos(t * 2.0) * 0.06;
      activeRef.current.rotation.y = t * 2;
      activeRef.current.rotation.x = t * 1.5;
    }
    // Passive shadow - slow, sinking drift
    if (passiveRef.current) {
      passiveRef.current.position.x = 0.75 + Math.sin(t * 0.5) * 0.04;
      passiveRef.current.position.y = -0.6 + Math.sin(t * 0.3) * 0.03;
      passiveRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <>
      {/* Active shadow - sharp, hot, spiky tetrahedron */}
      <mesh ref={activeRef} position={[-0.75, -0.55, 0]}>
        <tetrahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={0.8 * intensity}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[-0.75, -0.55, 0]}>
        <tetrahedronGeometry args={[0.1, 0]} />
        <meshBasicMaterial
          color={activeColor}
          wireframe
          transparent
          opacity={0.4 * intensity}
        />
      </mesh>

      {/* Passive shadow - collapsed, cold, flat box */}
      <mesh ref={passiveRef} position={[0.75, -0.6, 0]} scale={[1, 0.4, 1]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial
          color={passiveColor}
          emissive={passiveColor}
          emissiveIntensity={0.3 * intensity}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh position={[0.75, -0.6, 0]} scale={[1, 0.4, 1]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshBasicMaterial
          color={passiveColor}
          wireframe
          transparent
          opacity={0.3 * intensity}
        />
      </mesh>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   TotemCanvas - self-contained Canvas for one card
   ═══════════════════════════════════════════════════════ */

export default function TotemCanvas({
  family,
  color,
  isHovered,
}: {
  family: ArchetypeFamily;
  color: string;
  isHovered: boolean;
}) {
  const intensity = isHovered ? 1.4 : 1.0;

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.05} />
        <directionalLight position={[2, 3, 2]} intensity={0.2} color="#F0D060" />
        <directionalLight position={[-1, -2, 1]} intensity={0.08} color="#4488AA" />

        {family === "king" && <KingTotem color={color} intensity={intensity} />}
        {family === "warrior" && <WarriorTotem color={color} intensity={intensity} />}
        {family === "magician" && <MagicianTotem color={color} intensity={intensity} />}
        {family === "lover" && <LoverTotem color={color} intensity={intensity} />}

        <ShadowOrbiters
          activeColor="#C0392B"
          passiveColor="#5C5A52"
          intensity={isHovered ? 1.2 : 0.6}
        />

        <EffectComposer>
          <Bloom
            intensity={isHovered ? 0.8 : 0.5}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
