"use client";

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useMotionFrame } from "@/lib/usePrefersReducedMotion";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTheme } from "@/components/ThemeProvider";
import { materialParams, wireframeParams, solidOpacity, bloomAccent, voidInk } from "@/lib/inversion-palette";
import type { EnneagramArchetype } from "@/types/enneagram";

type Slug = EnneagramArchetype["slug"];

interface TotemProps {
  color: string;
  intensity: number;
  light: boolean;
}

/* ─── 1 REFORMER - plumb line + level ring ──────────── */
function ReformerTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const bob = useRef<THREE.Mesh>(null);
  const level = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (bob.current) bob.current.position.y = -0.5 + Math.sin(t * 1.3) * 0.015;
    if (level.current) level.current.rotation.z = Math.sin(t * 0.6) * 0.04;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.3) * 0.12;
  });
  return (
    <group ref={group}>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 1.2, 6]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.8 * intensity} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <coneGeometry args={[0.07, 0.1, 4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.8 * intensity} {...mp} />
      </mesh>
      <mesh ref={bob}>
        <octahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.3 * intensity} {...mp} />
      </mesh>
      <group ref={level}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.75, 0.012, 8, 48]} />
          <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.55 * intensity} />
        </mesh>
        <mesh position={[0.75, 0, 0]}>
          <sphereGeometry args={[0.04, 10, 10]} />
          <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 1.5 * intensity} {...mp} />
        </mesh>
        <mesh position={[-0.75, 0, 0]}>
          <sphereGeometry args={[0.04, 10, 10]} />
          <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 1.5 * intensity} {...mp} />
        </mesh>
      </group>
      {!light && <pointLight color={color} intensity={1.2 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── 2 HELPER - offered heart in cupped hands ──────── */
function HelperTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const heart = useRef<THREE.Mesh>(null);
  const petals = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  const leftCup = useMemo(
    () => new THREE.SphereGeometry(0.5, 20, 14, 0, Math.PI, 0, Math.PI / 2),
    []
  );
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (heart.current) {
      const k = 0.2 + Math.sin(t * 1.8) * 0.03;
      heart.current.scale.setScalar(k);
      heart.current.position.y = 0.05 + Math.sin(t * 1.1) * 0.04;
    }
    if (petals.current) petals.current.rotation.y = t * 0.3;
    if (group.current) group.current.rotation.z = Math.sin(t * 0.4) * 0.06;
  });
  return (
    <group ref={group}>
      <group position={[-0.18, -0.25, 0]} rotation={[Math.PI, -0.3, -0.15]}>
        <mesh geometry={leftCup}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.35 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.3, light)} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={leftCup}>
          <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.55 * intensity} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group position={[0.18, -0.25, 0]} rotation={[Math.PI, Math.PI + 0.3, 0.15]}>
        <mesh geometry={leftCup}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.35 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.3, light)} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={leftCup}>
          <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.55 * intensity} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <mesh ref={heart}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 2.0 * intensity} {...mp} />
      </mesh>
      <group ref={petals}>
        {Array.from({ length: 5 }).map((_, i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.5, 0.05, Math.sin(a) * 0.5]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.4 * intensity} {...mp} />
            </mesh>
          );
        })}
      </group>
      {!light && <pointLight color={color} intensity={1.3 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── 3 ACHIEVER - trophy prism + spotlight ─────────── */
function AchieverTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const prism = useRef<THREE.Mesh>(null);
  const spotlight = useRef<THREE.Mesh>(null);
  const star = useRef<THREE.Mesh>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (prism.current) {
      prism.current.rotation.y = t * 0.5;
      prism.current.rotation.x = 0.2 + Math.sin(t * 0.6) * 0.05;
    }
    if (spotlight.current) spotlight.current.rotation.z = -t * 0.3;
    if (star.current) {
      const k = 0.1 + Math.sin(t * 2) * 0.02;
      star.current.scale.setScalar(k);
    }
    if (group.current) group.current.position.y = Math.sin(t * 0.5) * 0.03;
  });
  return (
    <group ref={group}>
      <mesh ref={spotlight} position={[0, 0.55, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.45, 0.52, 40]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.55 * intensity} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={prism}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.9 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.35, light)} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.85 * intensity} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.32, 0.4, 0.15, 20]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.4 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.45, light)} />
      </mesh>
      <mesh ref={star} position={[0, 0.55, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={bloomAccent(color, light)} emissiveIntensity={light ? 0 : 2.5} {...mp} />
      </mesh>
      {!light && <pointLight color={color} intensity={1.3 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── 4 INDIVIDUALIST - cracked gem ─────────────────── */
function IndividualistTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const gem = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Mesh>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  const halfGeo = useMemo(() => new THREE.IcosahedronGeometry(0.5, 0), []);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (gem.current) {
      gem.current.rotation.y = t * 0.2;
      gem.current.rotation.z = Math.sin(t * 0.4) * 0.1;
      const gap = 0.06 + (Math.sin(t * 0.8) + 1) * 0.04;
      const [a, b] = gem.current.children as unknown as THREE.Mesh[];
      if (a && b) {
        a.position.x = -gap;
        b.position.x = gap;
      }
    }
    if (glow.current) {
      const k = 0.18 + Math.sin(t * 1.5) * 0.03;
      glow.current.scale.setScalar(k);
    }
    if (group.current) group.current.position.y = Math.sin(t * 0.35) * 0.04;
  });
  return (
    <group ref={group}>
      <group ref={gem}>
        <mesh geometry={halfGeo}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.6 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.4, light)} />
        </mesh>
        <mesh geometry={halfGeo}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.6 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.4, light)} />
        </mesh>
      </group>
      <mesh geometry={halfGeo}>
        <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.55 * intensity} />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 2.2} {...mp} />
      </mesh>
      <mesh position={[0.18, -0.15, 0.35]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 1.8 * intensity} {...mp} />
      </mesh>
      {!light && <pointLight color={color} intensity={1.3 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── 5 INVESTIGATOR - orbiting knowledge rings ─────── */
function InvestigatorTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (r1.current) r1.current.rotation.y = t * 0.3;
    if (r2.current) {
      r2.current.rotation.x = t * 0.22;
      r2.current.rotation.z = t * 0.08;
    }
    if (r3.current) r3.current.rotation.z = -t * 0.18;
    if (core.current) {
      const k = 0.12 + Math.sin(t * 0.7) * 0.02;
      core.current.scale.setScalar(k);
    }
    if (group.current) group.current.rotation.y = Math.sin(t * 0.15) * 0.1;
  });
  return (
    <group ref={group}>
      <mesh ref={r1}>
        <torusGeometry args={[0.85, 0.008, 6, 64]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.55 * intensity} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[0.65, 0.008, 6, 56]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.45 * intensity} />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[0.45, 0.008, 6, 48]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.35 * intensity} />
      </mesh>
      {/* recessed eye core */}
      <mesh>
        <sphereGeometry args={[0.2, 20, 20]} />
        <meshStandardMaterial color={voidInk(light)} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      <mesh ref={core}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 2.4} {...mp} />
      </mesh>
      {!light && <pointLight color={color} intensity={1.1 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── 6 LOYALIST - shield lattice + sentinels ───────── */
function LoyalistTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const lattice = useRef<THREE.Group>(null);
  const sentinels = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (lattice.current) lattice.current.rotation.z = Math.sin(t * 0.5) * 0.05;
    if (sentinels.current) {
      sentinels.current.rotation.y = t * 0.4;
      sentinels.current.children.forEach((c, i) => {
        c.position.y = Math.sin(t * 1.3 + i * Math.PI) * 0.04;
      });
    }
    if (group.current) group.current.rotation.y = Math.sin(t * 0.25) * 0.12;
  });
  return (
    <group ref={group}>
      <group ref={lattice}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.95, 0.95]} />
          <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.6 * intensity} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[1.1, 0.02, 0.02]} />
          <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.55 * intensity} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.02, 1.1, 0.02]} />
          <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.55 * intensity} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 1.8} {...mp} />
        </mesh>
      </group>
      <group ref={sentinels}>
        <mesh position={[0.7, 0, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.3 * intensity} {...mp} />
        </mesh>
        <mesh position={[-0.7, 0, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.3 * intensity} {...mp} />
        </mesh>
      </group>
      {!light && <pointLight color={color} intensity={1.2 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── 7 ENTHUSIAST - scattering polyhedra ───────────── */
function EnthusiastTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const scatter = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const mp = materialParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (scatter.current) {
      scatter.current.children.forEach((c, i) => {
        const phase = t * 0.8 + i * 0.7;
        const radius = 0.3 + (Math.sin(phase) * 0.5 + 0.5) * 0.6;
        const a = (i / 8) * Math.PI * 2 + t * 0.25;
        const h = Math.sin(phase * 0.6 + i) * 0.35;
        c.position.set(Math.cos(a) * radius, h, Math.sin(a) * radius);
        c.rotation.x = t * (1 + i * 0.1);
        c.rotation.y = t * (0.7 + i * 0.08);
      });
    }
    if (core.current) {
      const k = 0.16 + Math.sin(t * 2.4) * 0.03;
      core.current.scale.setScalar(k);
    }
    if (group.current) group.current.rotation.y = t * 0.15;
  });
  const accents = ["#F0C14B", "#E88A40", "#FFD97F", "#D85C8F", "#68A9D8"];
  return (
    <group ref={group}>
      <mesh ref={core}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 2.4} {...mp} />
      </mesh>
      <group ref={scatter}>
        {Array.from({ length: 8 }).map((_, i) => {
          const c = light ? color : accents[i % accents.length];
          const shape = i % 3;
          return (
            <mesh key={i}>
              {shape === 0 ? (
                <tetrahedronGeometry args={[0.1, 0]} />
              ) : shape === 1 ? (
                <octahedronGeometry args={[0.09, 0]} />
              ) : (
                <boxGeometry args={[0.12, 0.12, 0.12]} />
              )}
              <meshStandardMaterial color={c} emissive={c} emissiveIntensity={light ? 0 : 1.3 * intensity} {...mp} />
            </mesh>
          );
        })}
      </group>
      {!light && <pointLight color={color} intensity={1.4 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── 8 CHALLENGER - armored monolith + wedge ──────── */
function ChallengerTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const wedge = useRef<THREE.Mesh>(null);
  const shoulders = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (wedge.current) {
      wedge.current.rotation.x = 0.15 + Math.sin(t * 1.8) * 0.03;
      wedge.current.position.z = 0.45 + Math.sin(t * 1.8) * 0.03;
    }
    if (shoulders.current) shoulders.current.rotation.y = Math.sin(t * 0.5) * 0.08;
    if (group.current) group.current.rotation.y = t * 0.15;
  });
  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[0.75, 0.95, 0.5]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.55 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.35, light)} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.75, 0.95, 0.5]} />
        <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.7 * intensity} />
      </mesh>
      <mesh ref={wedge} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.32, 0.55, 4]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 1.5 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      <group ref={shoulders}>
        <mesh position={[0.42, 0.35, 0]}>
          <octahedronGeometry args={[0.09, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.2 * intensity} {...mp} />
        </mesh>
        <mesh position={[-0.42, 0.35, 0]}>
          <octahedronGeometry args={[0.09, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.2 * intensity} {...mp} />
        </mesh>
      </group>
      {!light && <pointLight color={color} intensity={1.4 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── 9 PEACEMAKER - concentric calm rings ──────────── */
function PeacemakerTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const still = useRef<THREE.Mesh>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (rings.current) {
      rings.current.children.forEach((c, i) => {
        const mesh = c as THREE.Mesh;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        const phase = t * 0.5 + i * 0.9;
        mat.opacity = (0.35 + (Math.sin(phase) + 1) * 0.2) * intensity;
        const baseScale = 1 + i * 0.18;
        mesh.scale.setScalar(baseScale + Math.sin(phase) * 0.03);
      });
    }
    if (still.current) {
      const k = 0.14 + Math.sin(t * 0.8) * 0.01;
      still.current.scale.setScalar(k);
    }
    if (group.current) group.current.rotation.z = Math.sin(t * 0.2) * 0.04;
  });
  return (
    <group ref={group} rotation={[Math.PI / 2, 0, 0]}>
      <group ref={rings}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i}>
            <torusGeometry args={[0.35, 0.01, 6, 64]} />
            <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.5} />
          </mesh>
        ))}
      </group>
      <mesh ref={still}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 2.0} {...mp} />
      </mesh>
      {!light && <pointLight color={color} intensity={1.1 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── Canvas wrapper ─────────────────────────────────── */
const TOTEMS: Record<Slug, React.ComponentType<TotemProps>> = {
  reformer: ReformerTotem,
  helper: HelperTotem,
  achiever: AchieverTotem,
  individualist: IndividualistTotem,
  investigator: InvestigatorTotem,
  loyalist: LoyalistTotem,
  enthusiast: EnthusiastTotem,
  challenger: ChallengerTotem,
  peacemaker: PeacemakerTotem,
};

export default function EnneagramTotemCanvas({
  slug,
  color,
  isHovered,
}: {
  slug: Slug;
  color: string;
  isHovered: boolean;
}) {
  const { theme } = useTheme();
  const light = theme === "light";
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
        {light ? (
          <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 3, 2]} intensity={0.4} color="#FFFFFF" />
          </>
        ) : (
          <>
            <ambientLight intensity={0.05} />
            <directionalLight position={[2, 3, 2]} intensity={0.2} color="#F0D060" />
            <directionalLight position={[-1, -2, 1]} intensity={0.08} color="#4488AA" />
          </>
        )}
        {Totem && <Totem color={color} intensity={intensity} light={light} />}
        {!light && (
          <EffectComposer>
            <Bloom
              intensity={isHovered ? 0.85 : 0.55}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
