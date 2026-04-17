"use client";

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useMotionFrame } from "@/lib/usePrefersReducedMotion";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTheme } from "@/components/ThemeProvider";
import { materialParams, wireframeParams, solidOpacity, bloomAccent } from "@/lib/inversion-palette";
import type { JungianArchetype } from "@/types/jungian";

type Slug = JungianArchetype["slug"];

interface TotemProps {
  color: string;
  intensity: number;
  light: boolean;
}

/* ─── INNOCENT - sprout cradling a seed ──────────────── */
function InnocentTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const leafL = useRef<THREE.Group>(null);
  const leafR = useRef<THREE.Group>(null);
  const seed = useRef<THREE.Mesh>(null);
  const stem = useRef<THREE.Mesh>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  // cotyledon: flattened half-sphere shell
  const leafGeo = useMemo(() => {
    const g = new THREE.SphereGeometry(0.55, 20, 14, 0, Math.PI, 0, Math.PI);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      p.setZ(i, p.getZ(i) * 0.28);
    }
    p.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);
  // slender curved stem
  const stemGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.7, 0),
      new THREE.Vector3(0.04, -0.3, 0.02),
      new THREE.Vector3(-0.02, 0.05, 0),
      new THREE.Vector3(0.01, 0.35, 0),
    ]);
    return new THREE.TubeGeometry(curve, 24, 0.018, 8, false);
  }, []);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    // leaves unfold and re-fold gently, like a waking bud
    const open = 0.65 + Math.sin(t * 0.6) * 0.35; // 0.3..1.0
    if (leafL.current) {
      leafL.current.rotation.y = -Math.PI / 2 - open * 0.55;
      leafL.current.rotation.z = 0.25 + Math.sin(t * 0.8) * 0.04;
    }
    if (leafR.current) {
      leafR.current.rotation.y = Math.PI / 2 + open * 0.55;
      leafR.current.rotation.z = -0.25 - Math.sin(t * 0.8) * 0.04;
    }
    if (seed.current) {
      seed.current.position.y = 0.08 + Math.sin(t * 0.9) * 0.015;
      seed.current.rotation.y = t * 0.25;
    }
    if (stem.current) stem.current.rotation.z = Math.sin(t * 0.4) * 0.05;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.25) * 0.18;
      group.current.position.y = -0.1 + Math.sin(t * 0.35) * 0.02;
    }
  });
  const leafColor = new THREE.Color(color).lerp(new THREE.Color("#F5F1E6"), 0.35).getStyle();
  const seedColor = new THREE.Color(color).lerp(new THREE.Color("#7A5A3A"), 0.45).getStyle();
  return (
    <group ref={group}>
      {/* stem — matte, no emissive */}
      <mesh ref={stem} geometry={stemGeo}>
        <meshStandardMaterial color={seedColor} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      {/* left cotyledon */}
      <group ref={leafL} position={[-0.04, 0.15, 0]}>
        <mesh geometry={leafGeo}>
          <meshStandardMaterial color={leafColor} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.55, light)} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={leafGeo}>
          <meshBasicMaterial color={wp?.color ?? leafColor} wireframe transparent opacity={wp?.opacity ?? 0.45 * intensity} side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* right cotyledon */}
      <group ref={leafR} position={[0.04, 0.15, 0]}>
        <mesh geometry={leafGeo}>
          <meshStandardMaterial color={leafColor} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.55, light)} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={leafGeo}>
          <meshBasicMaterial color={wp?.color ?? leafColor} wireframe transparent opacity={wp?.opacity ?? 0.45 * intensity} side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* seed — matte pearl, no emissive, no halo, no rays */}
      <mesh ref={seed} position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshStandardMaterial color={seedColor} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      {/* quiet fill light so it reads without bloom */}
      {!light && <pointLight color="#FFFFFF" intensity={0.55 * intensity} distance={3} decay={2} position={[0.6, 0.8, 0.8]} />}
    </group>
  );
}

/* ─── EVERYMAN - ring of twelve ──────────────────────── */
function EverymanTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (ring.current) {
      ring.current.rotation.y = t * 0.12;
      ring.current.children.forEach((child, i) => {
        child.position.y = Math.sin(t * 1.2 + i * 0.7) * 0.05;
      });
    }
    if (group.current) group.current.rotation.x = Math.sin(t * 0.3) * 0.08 - 0.15;
  });
  return (
    <group ref={group}>
      {/* grounded disk */}
      <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.75, 48]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.35 * intensity} side={THREE.DoubleSide} />
      </mesh>
      <group ref={ring}>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.65, 0, Math.sin(a) * 0.65]}>
              <sphereGeometry args={[0.075, 10, 10]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.8 * intensity} {...mp} />
            </mesh>
          );
        })}
      </group>
      {!light && <pointLight color={color} intensity={1.1 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── HERO - forward spear + laurel ──────────────────── */
function HeroTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const laurel = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  const spearGeo = useMemo(() => {
    const g = new THREE.OctahedronGeometry(1, 0);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      p.setY(i, p.getY(i) * 2.0);
      p.setX(i, p.getX(i) * 0.22);
      p.setZ(i, p.getZ(i) * 0.22);
    }
    p.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.35;
      group.current.rotation.x = 0.18 + Math.sin(t * 1.5) * 0.04;
    }
    if (laurel.current) laurel.current.rotation.y = -t * 0.6;
  });
  return (
    <group ref={group}>
      <mesh geometry={spearGeo}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.5 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.22, light)} />
      </mesh>
      <mesh geometry={spearGeo}>
        <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.8 * intensity} />
      </mesh>
      <group ref={laurel}>
        {Array.from({ length: 5 }).map((_, i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.75, -0.1, Math.sin(a) * 0.75]} rotation={[Math.PI / 2, 0, a]}>
              <torusGeometry args={[0.08, 0.015, 6, 12, Math.PI]} />
              <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.7 * intensity} />
            </mesh>
          );
        })}
      </group>
      {!light && <pointLight color={color} intensity={1.3 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── CAREGIVER - cupping bowl ───────────────────────── */
function CaregiverTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const heart = useRef<THREE.Mesh>(null);
  const petals = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  const bowlGeo = useMemo(() => new THREE.SphereGeometry(0.7, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), []);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (group.current) group.current.rotation.z = Math.sin(t * 0.5) * 0.08;
    if (heart.current) {
      const k = 0.18 + Math.sin(t * 1.4) * 0.02;
      heart.current.scale.setScalar(k);
      heart.current.position.y = -0.15 + Math.sin(t * 0.9) * 0.03;
    }
    if (petals.current) petals.current.rotation.y = t * 0.25;
  });
  return (
    <group ref={group} rotation={[Math.PI, 0, 0]}>
      <mesh geometry={bowlGeo}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.35 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.28, light)} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={bowlGeo}>
        <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.55 * intensity} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={heart} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 1.5 * intensity} {...mp} />
      </mesh>
      <group ref={petals} rotation={[Math.PI, 0, 0]}>
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.72, 0.02, Math.sin(a) * 0.72]}>
              <sphereGeometry args={[0.028, 6, 6]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.2 * intensity} {...mp} />
            </mesh>
          );
        })}
      </group>
      {!light && <pointLight color={color} intensity={1.2 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── EXPLORER - compass ─────────────────────────────── */
function ExplorerTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const needle = useRef<THREE.Group>(null);
  const waypoints = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (needle.current) needle.current.rotation.y = t * 0.9;
    if (waypoints.current) {
      waypoints.current.children.forEach((c, i) => {
        const phase = t * 0.5 + i * 2.1;
        const r = 0.5 + Math.abs(Math.sin(phase)) * 0.45;
        const a = (i / 3) * Math.PI * 2 + t * 0.1;
        c.position.set(Math.cos(a) * r, Math.sin(phase * 0.8) * 0.1, Math.sin(a) * r);
      });
    }
    if (group.current) group.current.rotation.x = -0.3 + Math.sin(t * 0.3) * 0.05;
  });
  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.015, 8, 64]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.6 * intensity} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.01, 8, 48]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.35 * intensity} />
      </mesh>
      <group ref={needle}>
        <mesh>
          <coneGeometry args={[0.05, 0.75, 4]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.2 * intensity} {...mp} />
        </mesh>
        <mesh rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.04, 0.4, 4]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.5 * intensity} transparent opacity={solidOpacity(0.5, light)} {...mp} />
        </mesh>
      </group>
      <group ref={waypoints}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.4 * intensity} {...mp} />
          </mesh>
        ))}
      </group>
      {!light && <pointLight color={color} intensity={1.1 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── REBEL - fracturing cube ────────────────────────── */
function RebelTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const shards = useRef<THREE.Group>(null);
  const cross = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (shards.current) {
      shards.current.children.forEach((c, i) => {
        const sx = i & 1 ? 1 : -1;
        const sy = i & 2 ? 1 : -1;
        const sz = i & 4 ? 1 : -1;
        const push = 0.5 + Math.sin(t * 1.3 + i) * 0.12;
        c.position.set(
          sx * push + Math.sin(t * 6 + i) * 0.015,
          sy * push + Math.cos(t * 5 + i) * 0.015,
          sz * push + Math.sin(t * 7 + i) * 0.015
        );
        c.rotation.x = t * (0.5 + i * 0.1);
        c.rotation.y = t * (0.4 + i * 0.08);
      });
    }
    if (cross.current) {
      cross.current.rotation.z = t * 0.4;
      cross.current.position.x = Math.sin(t * 8) * 0.01;
    }
    if (group.current) group.current.rotation.y = t * 0.15;
  });
  const shardColor = new THREE.Color(color).lerp(new THREE.Color("#C0392B"), 0.35).getStyle();
  return (
    <group ref={group}>
      <group ref={shards}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i}>
            <tetrahedronGeometry args={[0.16, 0]} />
            <meshStandardMaterial color={shardColor} emissive={shardColor} emissiveIntensity={light ? 0 : 0.7 * intensity} transparent opacity={solidOpacity(0.7, light)} {...mp} />
          </mesh>
        ))}
      </group>
      <group ref={cross}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.4, 0.03, 0.03]} />
          <meshBasicMaterial color={wp?.color ?? "#FF4444"} transparent opacity={wp?.opacity ?? 0.85 * intensity} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[1.4, 0.03, 0.03]} />
          <meshBasicMaterial color={wp?.color ?? "#FF4444"} transparent opacity={wp?.opacity ?? 0.85 * intensity} />
        </mesh>
      </group>
      {!light && <pointLight color="#FF4444" intensity={1.3 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── LOVER (Jungian) - Hopf link ────────────────────── */
function LoverJungianTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);
  const heart = useRef<THREE.Mesh>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (a.current) {
      a.current.rotation.x = Math.PI / 2 + t * 0.4;
      a.current.rotation.y = t * 0.2;
    }
    if (b.current) {
      b.current.rotation.y = -t * 0.35;
      b.current.rotation.z = t * 0.25;
    }
    if (heart.current) {
      const k = 0.12 + Math.sin(t * 2.2) * 0.025;
      heart.current.scale.setScalar(k);
    }
    if (group.current) group.current.rotation.z = Math.sin(t * 0.3) * 0.1;
  });
  const warmColor = new THREE.Color(color).lerp(new THREE.Color("#FFD0C0"), 0.25).getStyle();
  return (
    <group ref={group}>
      <group ref={a} position={[-0.2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.55, 0.08, 10, 48]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.55 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.45, light)} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.55, 0.08, 10, 48]} />
          <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.45 * intensity} />
        </mesh>
      </group>
      <group ref={b} position={[0.2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.55, 0.08, 10, 48]} />
          <meshStandardMaterial color={warmColor} emissive={warmColor} emissiveIntensity={light ? 0 : 0.55 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.45, light)} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.55, 0.08, 10, 48]} />
          <meshBasicMaterial color={wp?.color ?? warmColor} wireframe transparent opacity={wp?.opacity ?? 0.45 * intensity} />
        </mesh>
      </group>
      <mesh ref={heart}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color={bloomAccent(warmColor, light)} emissive={warmColor} emissiveIntensity={light ? 0 : 2.0} {...mp} />
      </mesh>
      {!light && <pointLight color={warmColor} intensity={1.4 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── CREATOR - emerging crystal ─────────────────────── */
function CreatorTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const sparks = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.y = t * 0.18;
      outer.current.rotation.x = t * 0.08;
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.3;
      const mat = inner.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.2 + (Math.sin(t * 0.8) + 1) * 0.2;
    }
    if (sparks.current) {
      sparks.current.children.forEach((c, i) => {
        const mesh = c as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        const phase = t * 1.5 + (i / 20) * Math.PI * 2;
        mat.emissiveIntensity = Math.max(0, Math.sin(phase)) * 3 * intensity;
      });
    }
    if (group.current) group.current.position.y = Math.sin(t * 0.4) * 0.04;
  });
  const dodeGeo = useMemo(() => new THREE.DodecahedronGeometry(0.78, 0), []);
  const vertices = useMemo(() => {
    const pos = dodeGeo.attributes.position;
    const verts: THREE.Vector3[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
      const key = `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`;
      if (!seen.has(key)) {
        seen.add(key);
        verts.push(v);
      }
    }
    return verts;
  }, [dodeGeo]);
  return (
    <group ref={group}>
      <mesh ref={outer} geometry={dodeGeo}>
        <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.55 * intensity} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.8 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.3, light)} />
      </mesh>
      <group ref={sparks}>
        {vertices.map((v, i) => (
          <mesh key={i} position={v}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.5} {...mp} />
          </mesh>
        ))}
      </group>
      {!light && <pointLight color={color} intensity={1.3 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── JESTER - juggling lemniscate ───────────────────── */
function JesterTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const jugglers = useRef<THREE.Group>(null);
  const diamond = useRef<THREE.Mesh>(null);
  const mp = materialParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (jugglers.current) {
      jugglers.current.children.forEach((c, i) => {
        const phase = t * 1.2 + (i / 3) * Math.PI * 2;
        // lemniscate of Bernoulli
        const cos = Math.cos(phase);
        const sin = Math.sin(phase);
        const denom = 1 + sin * sin;
        const x = 0.8 * cos / denom;
        const y = 0.6 * cos * sin / denom;
        c.position.set(x, y, Math.sin(phase * 0.5) * 0.15);
        c.rotation.x = t * 2;
        c.rotation.y = t * 1.5;
      });
    }
    if (diamond.current) {
      diamond.current.rotation.y = t * 0.8;
      diamond.current.rotation.x = t * 0.6;
    }
    if (group.current) group.current.rotation.z = Math.sin(t * 0.4) * 0.1;
  });
  return (
    <group ref={group}>
      <mesh ref={diamond}>
        <octahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.0 * intensity} {...mp} />
      </mesh>
      <group ref={jugglers}>
        <mesh>
          <tetrahedronGeometry args={[0.11, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.2 * intensity} {...mp} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial color="#E84C3D" emissive="#E84C3D" emissiveIntensity={light ? 0 : 1.0 * intensity} {...mp} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#5DADE2" emissive="#5DADE2" emissiveIntensity={light ? 0 : 1.0 * intensity} {...mp} />
        </mesh>
      </group>
      {!light && <pointLight color={color} intensity={1.3 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── SAGE - astrolabe ───────────────────────────────── */
function SageTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const r1 = useRef<THREE.Group>(null);
  const r2 = useRef<THREE.Group>(null);
  const r3 = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (r1.current) r1.current.rotation.y = t * 0.22;
    if (r2.current) r2.current.rotation.x = t * 0.18;
    if (r3.current) r3.current.rotation.z = -t * 0.14;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.2) * 0.1;
  });
  const ringWithTicks = (radius: number, tickCount: number, opacity: number) => (
    <>
      <mesh>
        <torusGeometry args={[radius, 0.008, 8, 64]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? opacity * intensity} />
      </mesh>
      {Array.from({ length: tickCount }).map((_, i) => {
        const a = (i / tickCount) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
            <boxGeometry args={[0.025, 0.025, 0.025]} />
            <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? opacity * intensity} />
          </mesh>
        );
      })}
    </>
  );
  return (
    <group ref={group}>
      <group ref={r1}>{ringWithTicks(0.85, 16, 0.7)}</group>
      <group ref={r2} rotation={[0, 0, Math.PI / 3]}>{ringWithTicks(0.65, 12, 0.55)}</group>
      <group ref={r3} rotation={[Math.PI / 4, 0, 0]}>{ringWithTicks(0.45, 8, 0.45)}</group>
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 2.0} {...mp} />
      </mesh>
      {!light && <pointLight color={color} intensity={1.2 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── MAGICIAN (Jungian) - seed of life ──────────────── */
function MagicianJungianTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const flower = useRef<THREE.Group>(null);
  const filament = useRef<THREE.Mesh>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (flower.current) flower.current.rotation.z = t * 0.08;
    if (filament.current) {
      filament.current.rotation.y = t * 0.5;
      filament.current.rotation.x = Math.sin(t * 0.7) * 0.3;
    }
    if (group.current) {
      group.current.rotation.x = -0.5 + Math.sin(t * 0.3) * 0.12;
      group.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    }
  });
  const r = 0.38;
  return (
    <group ref={group}>
      <group ref={flower}>
        {/* center circle */}
        <mesh>
          <torusGeometry args={[r, 0.012, 8, 48]} />
          <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.7 * intensity} />
        </mesh>
        {/* 6 petals */}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * r, Math.sin(a) * r, 0]}>
              <torusGeometry args={[r, 0.012, 8, 48]} />
              <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.55 * intensity} />
            </mesh>
          );
        })}
      </group>
      {/* vertical filament */}
      <mesh ref={filament}>
        <torusKnotGeometry args={[0.1, 0.015, 48, 6, 1, 3]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 2.2} {...mp} />
      </mesh>
      {!light && <pointLight color={color} intensity={1.4 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── RULER - throne ─────────────────────────────────── */
function RulerTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const jewel = useRef<THREE.Mesh>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (ring.current) ring.current.rotation.y = t * 0.15;
    if (jewel.current) jewel.current.rotation.y = t * 0.4;
    if (group.current) group.current.position.y = Math.sin(t * 0.4) * 0.02;
  });
  return (
    <group ref={group}>
      {/* base column */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 0.25, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.3 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.35, light)} />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 0.25, 24]} />
        <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.5 * intensity} />
      </mesh>
      {/* four cardinal pillars */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.4, 0, Math.sin(a) * 0.4]}>
            <boxGeometry args={[0.08, 0.55, 0.08]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.4 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.5, light)} />
          </mesh>
        );
      })}
      {/* sovereignty ring */}
      <mesh ref={ring} position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.022, 8, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.0 * intensity} {...mp} />
      </mesh>
      {/* apex jewel */}
      <mesh ref={jewel} position={[0, 0.55, 0]}>
        <octahedronGeometry args={[0.09, 0]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={bloomAccent(color, light)} emissiveIntensity={light ? 0 : 1.8} {...mp} />
      </mesh>
      {!light && <pointLight color={color} intensity={1.3 * intensity} distance={4} decay={2} />}
    </group>
  );
}

/* ─── Canvas wrapper ─────────────────────────────────── */
const TOTEMS: Record<Slug, React.ComponentType<TotemProps>> = {
  innocent: InnocentTotem,
  everyman: EverymanTotem,
  hero: HeroTotem,
  caregiver: CaregiverTotem,
  explorer: ExplorerTotem,
  rebel: RebelTotem,
  lover: LoverJungianTotem,
  creator: CreatorTotem,
  jester: JesterTotem,
  sage: SageTotem,
  magician: MagicianJungianTotem,
  ruler: RulerTotem,
};

export default function JungianTotemCanvas({
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
