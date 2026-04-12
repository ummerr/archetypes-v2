"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import type { HeroJourneyArchetype } from "@/types/herosjourney";

type Slug = HeroJourneyArchetype["slug"];

/* ─── HERO — ascending sword through laurel ───────────── */
function HeroTotem({ color, intensity }: { color: string; intensity: number }) {
  const group = useRef<THREE.Group>(null);
  const blade = useRef<THREE.Group>(null);
  const laurel = useRef<THREE.Group>(null);
  const flame = useRef<THREE.Mesh>(null);
  const bladeGeo = useMemo(() => {
    const g = new THREE.OctahedronGeometry(1, 0);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      p.setY(i, p.getY(i) * 1.9);
      p.setX(i, p.getX(i) * 0.18);
      p.setZ(i, p.getZ(i) * 0.18);
    }
    p.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (blade.current) {
      blade.current.rotation.y = t * 0.9;
      blade.current.position.y = 0.05 + Math.sin(t * 1.3) * 0.05;
    }
    if (laurel.current) laurel.current.rotation.z = -t * 0.35;
    if (flame.current) {
      const k = 0.14 + Math.sin(t * 3.1) * 0.02;
      flame.current.scale.setScalar(k);
    }
    if (group.current) group.current.rotation.z = Math.sin(t * 0.4) * 0.05;
  });
  return (
    <group ref={group}>
      {/* crossguard */}
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[0.7, 0.05, 0.05]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.0 * intensity} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* hilt */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.25, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6 * intensity} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.75, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.0 * intensity} metalness={0.9} roughness={0.2} />
      </mesh>
      {/* rising blade */}
      <group ref={blade} position={[0, 0.35, 0]}>
        <mesh geometry={bladeGeo}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4 * intensity} metalness={0.9} roughness={0.1} transparent opacity={0.3} />
        </mesh>
        <mesh geometry={bladeGeo}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.8 * intensity} />
        </mesh>
      </group>
      {/* flame at tip */}
      <mesh ref={flame} position={[0, 1.25, 0]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#FFE0B0" emissive={color} emissiveIntensity={2.4 * intensity} />
      </mesh>
      {/* laurel ring */}
      <group ref={laurel} position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {Array.from({ length: 7 }).map((_, i) => {
          const a = (i / 7) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.65, 0, Math.sin(a) * 0.65]} rotation={[0, -a, Math.PI / 4]}>
              <torusGeometry args={[0.08, 0.012, 6, 12, Math.PI]} />
              <meshBasicMaterial color={color} transparent opacity={0.65 * intensity} />
            </mesh>
          );
        })}
      </group>
      <pointLight color={color} intensity={1.4 * intensity} distance={4} decay={2} />
    </group>
  );
}

/* ─── MENTOR — lantern with floating embers ──────────── */
function MentorTotem({ color, intensity }: { color: string; intensity: number }) {
  const group = useRef<THREE.Group>(null);
  const frame = useRef<THREE.Group>(null);
  const embers = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (frame.current) frame.current.rotation.y = t * 0.18;
    if (core.current) {
      const k = 0.22 + Math.sin(t * 1.5) * 0.025;
      core.current.scale.setScalar(k);
    }
    if (embers.current) {
      embers.current.children.forEach((c, i) => {
        const phase = t * 0.8 + i * 1.3;
        const r = 0.55 + Math.sin(phase) * 0.15;
        const h = 0.3 + ((t * 0.4 + i * 0.5) % 1.4) - 0.7;
        const a = (i / 6) * Math.PI * 2 + t * 0.3;
        c.position.set(Math.cos(a) * r, h, Math.sin(a) * r);
      });
    }
    if (group.current) group.current.position.y = Math.sin(t * 0.5) * 0.04;
  });
  return (
    <group ref={group}>
      {/* lantern cage */}
      <group ref={frame}>
        {/* top ring */}
        <mesh position={[0, 0.38, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.016, 6, 24]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7 * intensity} metalness={0.8} roughness={0.3} />
        </mesh>
        {/* bottom ring */}
        <mesh position={[0, -0.38, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.016, 6, 24]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7 * intensity} metalness={0.8} roughness={0.3} />
        </mesh>
        {/* vertical bars */}
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.33, 0, Math.sin(a) * 0.33]}>
              <cylinderGeometry args={[0.01, 0.01, 0.76, 6]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5 * intensity} metalness={0.9} roughness={0.2} />
            </mesh>
          );
        })}
        {/* hanging chain */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.3, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.7 * intensity} />
        </mesh>
      </group>
      {/* flame core */}
      <mesh ref={core}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial color="#FFF1D0" emissive={color} emissiveIntensity={2.4 * intensity} />
      </mesh>
      {/* rising embers */}
      <group ref={embers}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.022, 6, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8 * intensity} />
          </mesh>
        ))}
      </group>
      <pointLight color={color} intensity={1.6 * intensity} distance={4} decay={2} />
    </group>
  );
}

/* ─── HERALD — comet with expanding shockwave ────────── */
function HeraldTotem({ color, intensity }: { color: string; intensity: number }) {
  const group = useRef<THREE.Group>(null);
  const comet = useRef<THREE.Group>(null);
  const shock = useRef<THREE.Mesh>(null);
  const shock2 = useRef<THREE.Mesh>(null);
  const trail = useRef<THREE.Group>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (comet.current) {
      comet.current.rotation.z = t * 0.8;
    }
    if (shock.current) {
      const k = ((t * 0.8) % 1.2);
      shock.current.scale.setScalar(0.4 + k * 1.0);
      const m = shock.current.material as THREE.MeshBasicMaterial;
      m.opacity = Math.max(0, (1 - k / 1.2) * 0.8) * intensity;
    }
    if (shock2.current) {
      const k = ((t * 0.8 + 0.6) % 1.2);
      shock2.current.scale.setScalar(0.4 + k * 1.0);
      const m = shock2.current.material as THREE.MeshBasicMaterial;
      m.opacity = Math.max(0, (1 - k / 1.2) * 0.8) * intensity;
    }
    if (trail.current) {
      trail.current.children.forEach((c, i) => {
        const mat = (c as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.opacity = Math.max(0, 1 - i / 7) * 0.8 * intensity;
      });
    }
    if (group.current) group.current.rotation.z = Math.sin(t * 0.4) * 0.1;
  });
  return (
    <group ref={group}>
      {/* expanding shockwaves */}
      <mesh ref={shock} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.53, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.6 * intensity} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={shock2} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.53, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.6 * intensity} side={THREE.DoubleSide} />
      </mesh>
      {/* comet body */}
      <group ref={comet}>
        <mesh>
          <sphereGeometry args={[0.16, 14, 14]} />
          <meshStandardMaterial color="#FFF6E0" emissive={color} emissiveIntensity={2.8 * intensity} />
        </mesh>
        {/* tail */}
        <group ref={trail}>
          {Array.from({ length: 7 }).map((_, i) => (
            <mesh key={i} position={[-0.14 - i * 0.08, 0, 0]}>
              <sphereGeometry args={[0.08 - i * 0.008, 8, 8]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5 * intensity} transparent opacity={0.7} />
            </mesh>
          ))}
        </group>
      </group>
      <pointLight color={color} intensity={1.6 * intensity} distance={4} decay={2} />
    </group>
  );
}

/* ─── THRESHOLD GUARDIAN — gate with glyph key ───────── */
function GuardianTotem({ color, intensity }: { color: string; intensity: number }) {
  const group = useRef<THREE.Group>(null);
  const keyG = useRef<THREE.Group>(null);
  const barL = useRef<THREE.Mesh>(null);
  const barR = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (keyG.current) {
      keyG.current.rotation.y = Math.sin(t * 0.6) * 0.5;
      keyG.current.position.y = Math.sin(t * 1.2) * 0.04;
    }
    if (barL.current) {
      const m = barL.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = (0.4 + Math.sin(t * 2) * 0.15) * intensity;
    }
    if (barR.current) {
      const m = barR.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = (0.4 + Math.sin(t * 2 + Math.PI) * 0.15) * intensity;
    }
    if (group.current) group.current.rotation.y = Math.sin(t * 0.3) * 0.12;
  });
  return (
    <group ref={group}>
      {/* left pillar */}
      <mesh ref={barL} position={[-0.4, 0, 0]}>
        <boxGeometry args={[0.12, 1.3, 0.12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5 * intensity} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* right pillar */}
      <mesh ref={barR} position={[0.4, 0, 0]}>
        <boxGeometry args={[0.12, 1.3, 0.12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5 * intensity} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* lintel */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[1.0, 0.1, 0.12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6 * intensity} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* ground step */}
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[1.05, 0.08, 0.18]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4 * intensity} metalness={0.7} roughness={0.3} transparent opacity={0.7} />
      </mesh>
      {/* floating key glyph */}
      <group ref={keyG}>
        <mesh>
          <torusGeometry args={[0.15, 0.028, 8, 24]} />
          <meshStandardMaterial color="#F0D060" emissive="#F0D060" emissiveIntensity={1.8 * intensity} metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.22, 0, 0]}>
          <boxGeometry args={[0.22, 0.035, 0.035]} />
          <meshStandardMaterial color="#F0D060" emissive="#F0D060" emissiveIntensity={1.5 * intensity} metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.32, -0.05, 0]}>
          <boxGeometry args={[0.04, 0.08, 0.035]} />
          <meshStandardMaterial color="#F0D060" emissive="#F0D060" emissiveIntensity={1.5 * intensity} metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
      <pointLight color={color} intensity={1.2 * intensity} distance={4} decay={2} />
    </group>
  );
}

/* ─── SHAPESHIFTER — dual masks orbiting ─────────────── */
function ShapeshifterTotem({ color, intensity }: { color: string; intensity: number }) {
  const group = useRef<THREE.Group>(null);
  const maskA = useRef<THREE.Group>(null);
  const maskB = useRef<THREE.Group>(null);
  const veil = useRef<THREE.Mesh>(null);
  const warmColor = useMemo(
    () => new THREE.Color(color).lerp(new THREE.Color("#E8B041"), 0.6).getStyle(),
    [color]
  );
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (maskA.current) {
      maskA.current.position.x = Math.cos(t * 0.9) * 0.42;
      maskA.current.position.z = Math.sin(t * 0.9) * 0.42;
      maskA.current.rotation.y = -t * 0.9 - Math.PI;
    }
    if (maskB.current) {
      maskB.current.position.x = Math.cos(t * 0.9 + Math.PI) * 0.42;
      maskB.current.position.z = Math.sin(t * 0.9 + Math.PI) * 0.42;
      maskB.current.rotation.y = -t * 0.9;
    }
    if (veil.current) veil.current.rotation.z = t * 0.2;
    if (group.current) group.current.rotation.x = -0.2 + Math.sin(t * 0.4) * 0.08;
  });
  const halfMask = useMemo(() => {
    return new THREE.SphereGeometry(0.28, 20, 14, 0, Math.PI, 0, Math.PI);
  }, []);
  return (
    <group ref={group}>
      {/* veil behind */}
      <mesh ref={veil}>
        <torusGeometry args={[0.55, 0.014, 8, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.4 * intensity} />
      </mesh>
      {/* mask A — cool */}
      <group ref={maskA}>
        <mesh geometry={halfMask}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7 * intensity} metalness={0.5} roughness={0.3} side={THREE.DoubleSide} transparent opacity={0.65} />
        </mesh>
        <mesh geometry={halfMask}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.6 * intensity} side={THREE.DoubleSide} />
        </mesh>
        {/* eye */}
        <mesh position={[-0.08, 0.05, 0.22]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" emissive={color} emissiveIntensity={2.2} />
        </mesh>
      </group>
      {/* mask B — warm */}
      <group ref={maskB}>
        <mesh geometry={halfMask}>
          <meshStandardMaterial color={warmColor} emissive={warmColor} emissiveIntensity={0.7 * intensity} metalness={0.5} roughness={0.3} side={THREE.DoubleSide} transparent opacity={0.65} />
        </mesh>
        <mesh geometry={halfMask}>
          <meshBasicMaterial color={warmColor} wireframe transparent opacity={0.6 * intensity} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-0.08, 0.05, 0.22]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" emissive={warmColor} emissiveIntensity={2.2} />
        </mesh>
      </group>
      <pointLight color={color} intensity={1.3 * intensity} distance={4} decay={2} />
    </group>
  );
}

/* ─── SHADOW — eclipse with crown of darkness ────────── */
function ShadowTotem({ color, intensity }: { color: string; intensity: number }) {
  const group = useRef<THREE.Group>(null);
  const corona = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const shards = useRef<THREE.Group>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (corona.current) {
      const m = corona.current.material as THREE.MeshBasicMaterial;
      m.opacity = (0.55 + Math.sin(t * 0.7) * 0.15) * intensity;
      corona.current.rotation.z = t * 0.15;
    }
    if (core.current) {
      const k = 0.5 + Math.sin(t * 0.6) * 0.02;
      core.current.scale.setScalar(k);
    }
    if (shards.current) {
      shards.current.rotation.z = -t * 0.2;
      shards.current.children.forEach((c, i) => {
        c.position.y = Math.sin(t * 1.4 + i * 0.9) * 0.04;
      });
    }
    if (group.current) group.current.rotation.y = Math.sin(t * 0.3) * 0.1;
  });
  const warmCorona = "#E8A94A";
  return (
    <group ref={group}>
      {/* corona halo */}
      <mesh ref={corona}>
        <ringGeometry args={[0.62, 0.78, 64]} />
        <meshBasicMaterial color={warmCorona} transparent opacity={0.55 * intensity} side={THREE.DoubleSide} />
      </mesh>
      {/* outer rim glow */}
      <mesh>
        <torusGeometry args={[0.58, 0.012, 10, 64]} />
        <meshBasicMaterial color={warmCorona} transparent opacity={0.9 * intensity} />
      </mesh>
      {/* eclipse core */}
      <mesh ref={core}>
        <sphereGeometry args={[1, 28, 28]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.2} roughness={0.9} />
      </mesh>
      {/* crown of shards */}
      <group ref={shards}>
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (i / 9) * Math.PI * 2;
          const r = 0.82;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * r, Math.sin(a) * r, 0]}
              rotation={[0, 0, a - Math.PI / 2]}
            >
              <coneGeometry args={[0.045, 0.22, 4]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8 * intensity} metalness={0.7} roughness={0.3} />
            </mesh>
          );
        })}
      </group>
      <pointLight color={warmCorona} intensity={1.2 * intensity} distance={4} decay={2} />
    </group>
  );
}

/* ─── TRICKSTER — tumbling dice around spinning diamond ─ */
function TricksterTotem({ color, intensity }: { color: string; intensity: number }) {
  const group = useRef<THREE.Group>(null);
  const dice = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (dice.current) {
      dice.current.children.forEach((c, i) => {
        const phase = t * 1.1 + (i / 3) * Math.PI * 2;
        const cos = Math.cos(phase);
        const sin = Math.sin(phase);
        const denom = 1 + sin * sin;
        const x = 0.85 * cos / denom;
        const y = 0.6 * cos * sin / denom;
        c.position.set(x, y, Math.sin(phase * 0.6) * 0.15);
        c.rotation.x = t * (2 + i * 0.3);
        c.rotation.y = t * (1.7 + i * 0.2);
        c.rotation.z = t * (1.2 + i * 0.25);
      });
    }
    if (core.current) {
      core.current.rotation.y = t * 1.3;
      core.current.rotation.x = t * 0.9;
    }
    if (group.current) group.current.rotation.z = Math.sin(t * 0.5) * 0.1;
  });
  return (
    <group ref={group}>
      {/* spinning diamond center */}
      <mesh ref={core}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.1 * intensity} metalness={0.7} roughness={0.25} />
      </mesh>
      {/* tumbling dice */}
      <group ref={dice}>
        <mesh>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.1 * intensity} metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#5DADE2" emissive="#5DADE2" emissiveIntensity={1.0 * intensity} metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#E84C3D" emissive="#E84C3D" emissiveIntensity={1.0 * intensity} metalness={0.4} roughness={0.5} />
        </mesh>
      </group>
      <pointLight color={color} intensity={1.3 * intensity} distance={4} decay={2} />
    </group>
  );
}

/* ─── ALLY — interlocked torii with steady core ──────── */
function AllyTotem({ color, intensity }: { color: string; intensity: number }) {
  const group = useRef<THREE.Group>(null);
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (a.current) {
      a.current.rotation.y = t * 0.35;
      a.current.rotation.z = Math.sin(t * 0.6) * 0.15;
    }
    if (b.current) {
      b.current.rotation.y = -t * 0.35;
      b.current.rotation.z = -Math.sin(t * 0.6) * 0.15;
    }
    if (core.current) {
      const k = 0.14 + Math.sin(t * 1.4) * 0.015;
      core.current.scale.setScalar(k);
    }
    if (group.current) group.current.rotation.x = -0.1 + Math.sin(t * 0.3) * 0.08;
  });
  return (
    <group ref={group}>
      {/* link A */}
      <group ref={a} position={[-0.24, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.38, 0.055, 10, 48]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7 * intensity} metalness={0.7} roughness={0.3} transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.38, 0.055, 10, 48]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.55 * intensity} />
        </mesh>
      </group>
      {/* link B */}
      <group ref={b} position={[0.24, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.38, 0.055, 10, 48]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7 * intensity} metalness={0.7} roughness={0.3} transparent opacity={0.55} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.38, 0.055, 10, 48]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.55 * intensity} />
        </mesh>
      </group>
      {/* core spark */}
      <mesh ref={core}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color="#FFFFFF" emissive={color} emissiveIntensity={2.4} />
      </mesh>
      <pointLight color={color} intensity={1.3 * intensity} distance={4} decay={2} />
    </group>
  );
}

const TOTEMS: Record<Slug, React.ComponentType<{ color: string; intensity: number }>> = {
  hero: HeroTotem,
  mentor: MentorTotem,
  herald: HeraldTotem,
  "threshold-guardian": GuardianTotem,
  shapeshifter: ShapeshifterTotem,
  shadow: ShadowTotem,
  trickster: TricksterTotem,
  ally: AllyTotem,
};

export default function HeroJourneyTotemCanvas({
  slug,
  color,
  isHovered,
}: {
  slug: Slug;
  color: string;
  isHovered: boolean;
}) {
  const intensity = isHovered ? 1.4 : 1.0;
  const Totem = TOTEMS[slug];
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
        {Totem && <Totem color={color} intensity={intensity} />}
        <EffectComposer>
          <Bloom
            intensity={isHovered ? 0.85 : 0.55}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
