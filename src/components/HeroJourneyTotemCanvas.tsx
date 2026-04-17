"use client";

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useMotionFrame } from "@/lib/usePrefersReducedMotion";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTheme } from "@/components/ThemeProvider";
import { materialParams, wireframeParams, solidOpacity, bloomAccent } from "@/lib/inversion-palette";
import type { HeroJourneyArchetype } from "@/types/herosjourney";

type Slug = HeroJourneyArchetype["slug"];

interface TotemProps {
  color: string;
  intensity: number;
  light: boolean;
}

/* ─── HERO - ascending sword, solar halo, laurel crown ─ */
function HeroTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const blade = useRef<THREE.Group>(null);
  const laurel = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  const rays = useRef<THREE.Group>(null);
  const flame = useRef<THREE.Mesh>(null);
  const bladeGeo = useMemo(() => {
    const g = new THREE.OctahedronGeometry(1, 0);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      p.setY(i, p.getY(i) * 2.1);
      p.setX(i, p.getX(i) * 0.16);
      p.setZ(i, p.getZ(i) * 0.05);
    }
    p.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);
  const fullerGeo = useMemo(() => {
    const g = new THREE.OctahedronGeometry(1, 0);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      p.setY(i, p.getY(i) * 2.0);
      p.setX(i, p.getX(i) * 0.06);
      p.setZ(i, p.getZ(i) * 0.08);
    }
    p.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (blade.current) {
      blade.current.rotation.y = t * 0.7;
      blade.current.position.y = 0.1 + Math.sin(t * 1.3) * 0.04;
    }
    if (laurel.current) {
      laurel.current.rotation.y = -t * 0.25;
      laurel.current.children.forEach((c, i) => {
        c.rotation.z = Math.sin(t * 1.4 + i) * 0.08;
      });
    }
    if (halo.current) {
      halo.current.rotation.z = t * 0.2;
      const m = halo.current.material as THREE.MeshBasicMaterial;
      m.opacity = (0.45 + Math.sin(t * 0.9) * 0.1) * intensity;
    }
    if (rays.current) rays.current.rotation.z = -t * 0.15;
    if (flame.current) {
      const k = 0.13 + Math.sin(t * 3.2) * 0.022 + Math.sin(t * 7) * 0.008;
      flame.current.scale.set(k * 0.8, k * 1.3, k * 0.8);
      flame.current.position.y = 1.32 + Math.sin(t * 2.7) * 0.02;
    }
    if (group.current) group.current.rotation.z = Math.sin(t * 0.4) * 0.04;
  });
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  return (
    <group ref={group}>
      {/* solar halo behind blade */}
      <mesh ref={halo}>
        <ringGeometry args={[0.68, 0.82, 64]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.45 * intensity} side={THREE.DoubleSide} />
      </mesh>
      {/* radiating rays */}
      <group ref={rays}>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const r = 1.02;
          return (
            <mesh key={i} position={[Math.cos(a) * r, Math.sin(a) * r, -0.05]} rotation={[0, 0, a - Math.PI / 2]}>
              <coneGeometry args={[0.035, 0.22, 4]} />
              <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.55 * intensity} />
            </mesh>
          );
        })}
      </group>

      {/* crossguard (winged) */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[0.78, 0.06, 0.08]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.1 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      {/* guard tips */}
      <mesh position={[-0.42, -0.38, 0]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.4 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      <mesh position={[0.42, -0.38, 0]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.4 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      {/* grip */}
      <mesh position={[0, -0.58, 0]}>
        <cylinderGeometry args={[0.034, 0.034, 0.26, 8]} />
        <meshStandardMaterial color="#3a2e24" metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      {/* pommel */}
      <mesh position={[0, -0.78, 0]}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.6 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>

      {/* blade stack - core solid + spinning wireframe + fuller */}
      <group ref={blade} position={[0, 0.4, 0]}>
        <mesh geometry={bladeGeo}>
          <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 0.7 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
        </mesh>
        <mesh geometry={bladeGeo}>
          <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.7 * intensity} />
        </mesh>
        <mesh geometry={fullerGeo}>
          <meshBasicMaterial color={bloomAccent(color, light)} transparent opacity={wp?.opacity ?? 0.5 * intensity} />
        </mesh>
      </group>

      {/* flame at tip */}
      <mesh ref={flame}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 2.8 * intensity} {...mp} />
      </mesh>

      {/* laurel crown at base */}
      <group ref={laurel} position={[0, -0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (i / 9) * Math.PI * 2;
          return (
            <group key={i} position={[Math.cos(a) * 0.62, 0, Math.sin(a) * 0.62]} rotation={[0, -a, 0]}>
              <mesh rotation={[0, 0, Math.PI / 6]}>
                <sphereGeometry args={[0.08, 8, 6]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.5 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.8, light)} />
              </mesh>
            </group>
          );
        })}
      </group>
      {!light && <pointLight color={color} intensity={1.8 * intensity} distance={4.5} decay={2} />}
    </group>
  );
}

/* ─── MENTOR - hanging lantern, cage, chain, runes ───── */
function MentorTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const lantern = useRef<THREE.Group>(null);
  const embers = useRef<THREE.Group>(null);
  const runes = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const flame = useRef<THREE.Mesh>(null);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (lantern.current) {
      lantern.current.rotation.z = Math.sin(t * 0.8) * 0.08;
      lantern.current.position.y = -0.02 + Math.sin(t * 0.6) * 0.02;
    }
    if (core.current) {
      const k = 0.2 + Math.sin(t * 1.5) * 0.02;
      core.current.scale.setScalar(k);
    }
    if (flame.current) {
      const k = 0.11 + Math.sin(t * 4) * 0.015 + Math.sin(t * 9) * 0.006;
      flame.current.scale.set(k * 0.7, k * 1.4, k * 0.7);
      flame.current.position.y = Math.sin(t * 3) * 0.005;
    }
    if (embers.current) {
      embers.current.children.forEach((c, i) => {
        const phase = ((t * 0.4 + i * 0.17) % 1.5);
        const a = (i / 8) * Math.PI * 2;
        const r = 0.42 + phase * 0.12;
        c.position.set(Math.cos(a) * r, 0.4 + phase * 0.9, Math.sin(a) * r);
        const mat = (c as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.opacity = Math.max(0, 1 - phase / 1.5) * intensity;
      });
    }
    if (runes.current) {
      runes.current.rotation.y = t * 0.3;
      runes.current.children.forEach((c, i) => {
        c.position.y = Math.sin(t * 0.8 + i * 1.8) * 0.06;
      });
    }
    if (group.current) group.current.rotation.y = Math.sin(t * 0.2) * 0.08;
  });
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  return (
    <group ref={group}>
      {/* hanging chain */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.35, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.4 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.72 - i * 0.1, 0]} rotation={[i % 2 ? 0 : Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.035, 0.008, 6, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.6 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
        </mesh>
      ))}

      <group ref={lantern}>
        {/* pitched roof */}
        <mesh position={[0, 0.45, 0]}>
          <coneGeometry args={[0.38, 0.2, 4]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.6 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.4 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
        </mesh>

        {/* top plate */}
        <mesh position={[0, 0.33, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.018, 6, 24]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.8 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
        </mesh>
        {/* bottom plate */}
        <mesh position={[0, -0.33, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.34, 0.022, 6, 24]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.8 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
        </mesh>
        {/* bottom disc */}
        <mesh position={[0, -0.36, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.32, 24]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.3 * intensity} metalness={mp.metalness} roughness={mp.roughness} side={THREE.DoubleSide} transparent opacity={solidOpacity(0.7, light)} />
        </mesh>

        {/* 4 vertical bars */}
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.32, 0, Math.sin(a) * 0.32]}>
              <cylinderGeometry args={[0.01, 0.01, 0.66, 6]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.5 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
            </mesh>
          );
        })}
        {/* diagonal accents */}
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.3, 0, Math.sin(a) * 0.3]}
              rotation={[0, -a, Math.PI / 4]}
            >
              <boxGeometry args={[0.012, 0.45, 0.012]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.5 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
            </mesh>
          );
        })}

        {/* glowing core */}
        <mesh ref={core}>
          <sphereGeometry args={[1, 14, 14]} />
          <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 2.4 * intensity} transparent opacity={solidOpacity(0.6, light)} {...mp} />
        </mesh>
        {/* pulsing flame */}
        <mesh ref={flame}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 3.2 * intensity} {...mp} />
        </mesh>
      </group>

      {/* orbiting runes */}
      <group ref={runes}>
        {Array.from({ length: 3 }).map((_, i) => {
          const a = (i / 3) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.8, 0, Math.sin(a) * 0.8]} rotation={[0, -a + Math.PI / 2, 0]}>
              <torusGeometry args={[0.06, 0.008, 6, 18]} />
              <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.75 * intensity} />
            </mesh>
          );
        })}
      </group>

      {/* rising embers */}
      <group ref={embers}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.018, 6, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 2.0 * intensity} transparent opacity={1} {...mp} />
          </mesh>
        ))}
      </group>
      {!light && <pointLight color={color} intensity={1.9 * intensity} distance={4.5} decay={2} />}
    </group>
  );
}

/* ─── HERALD - trumpet horn, dawn line, shockwaves ──── */
function HeraldTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const horn = useRef<THREE.Group>(null);
  const shock = useRef<THREE.Mesh>(null);
  const shock2 = useRef<THREE.Mesh>(null);
  const shock3 = useRef<THREE.Mesh>(null);
  const sparks = useRef<THREE.Group>(null);
  const flash = useRef<THREE.Mesh>(null);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (horn.current) {
      horn.current.rotation.z = Math.sin(t * 0.8) * 0.15 - 0.2;
      horn.current.rotation.y = Math.sin(t * 0.5) * 0.2 + 0.4;
    }
    const ring = (mesh: THREE.Mesh | null, offset: number) => {
      if (!mesh) return;
      const k = (((t + offset) * 0.7) % 1.4);
      mesh.scale.setScalar(0.4 + k * 1.1);
      const m = mesh.material as THREE.MeshBasicMaterial;
      m.opacity = Math.max(0, (1 - k / 1.4) * 0.85) * intensity;
    };
    ring(shock.current, 0);
    ring(shock2.current, 0.45);
    ring(shock3.current, 0.9);
    if (sparks.current) {
      sparks.current.children.forEach((c, i) => {
        const phase = ((t * 1.6 + i * 0.25) % 1);
        const a = (i / 10) * Math.PI * 2;
        const r = 0.2 + phase * 0.9;
        c.position.set(Math.cos(a) * r * 1.1, Math.sin(a) * r * 0.3, 0);
        const mat = (c as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = Math.max(0, 1 - phase) * 3 * intensity;
      });
    }
    if (flash.current) {
      const m = flash.current.material as THREE.MeshBasicMaterial;
      m.opacity = (0.6 + Math.sin(t * 8) * 0.3) * intensity;
    }
    if (group.current) group.current.rotation.z = Math.sin(t * 0.3) * 0.06;
  });
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  return (
    <group ref={group}>
      {/* dawn horizon line */}
      <mesh position={[0, -0.4, -0.2]}>
        <planeGeometry args={[1.8, 0.01]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.7 * intensity} />
      </mesh>
      <mesh position={[0, -0.4, -0.2]}>
        <planeGeometry args={[1.4, 0.08]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.25 * intensity} />
      </mesh>

      {/* concentric shockwaves */}
      <mesh ref={shock} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.535, 56]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.7 * intensity} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={shock2} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.535, 56]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.7 * intensity} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={shock3} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.535, 56]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.7 * intensity} side={THREE.DoubleSide} />
      </mesh>

      {/* trumpet horn */}
      <group ref={horn} position={[-0.15, 0.05, 0]}>
        {/* mouthpiece */}
        <mesh position={[-0.38, -0.05, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.8 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
        </mesh>
        {/* tapering tube */}
        <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.06, 0.45, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.75 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
        </mesh>
        {/* flared bell */}
        <mesh position={[0.2, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.22, 0.3, 24, 1, true]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.0 * intensity} metalness={mp.metalness} roughness={mp.roughness} side={THREE.DoubleSide} />
        </mesh>
        {/* bell rim */}
        <mesh position={[0.37, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.22, 0.012, 8, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.5 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
        </mesh>
        {/* banner streak */}
        <mesh position={[-0.25, -0.15, 0]}>
          <planeGeometry args={[0.18, 0.04]} />
          <meshBasicMaterial color={color} transparent opacity={0.7 * intensity} side={THREE.DoubleSide} />
        </mesh>
        {/* flash at bell mouth */}
        <mesh ref={flash} position={[0.38, 0.02, 0]}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshBasicMaterial color="#FFF6D0" transparent opacity={0.6 * intensity} />
        </mesh>
      </group>

      {/* bursting sparks */}
      <group ref={sparks} position={[0.2, 0.05, 0]}>
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.022, 6, 6]} />
            <meshStandardMaterial color="#FFE8B0" emissive={color} emissiveIntensity={2.5 * intensity} />
          </mesh>
        ))}
      </group>

      <pointLight color={color} intensity={1.8 * intensity} distance={4.5} decay={2} />
    </group>
  );
}

/* ─── THRESHOLD GUARDIAN - carved gate, eye, chains ──── */
function GuardianTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const eye = useRef<THREE.Mesh>(null);
  const chainL = useRef<THREE.Group>(null);
  const chainR = useRef<THREE.Group>(null);
  const key = useRef<THREE.Group>(null);
  const runes = useRef<THREE.Group>(null);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (eye.current) {
      const mat = eye.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = (1.8 + Math.sin(t * 1.8) * 0.4) * intensity;
      eye.current.scale.y = 0.4 + (Math.sin(t * 0.9) * 0.5 + 0.5) * 0.6;
    }
    if (chainL.current) {
      chainL.current.children.forEach((c, i) => {
        c.position.y = 0.4 - i * 0.12 + Math.sin(t * 1.6 + i * 0.5) * 0.015;
      });
    }
    if (chainR.current) {
      chainR.current.children.forEach((c, i) => {
        c.position.y = 0.4 - i * 0.12 + Math.sin(t * 1.6 + i * 0.5 + Math.PI) * 0.015;
      });
    }
    if (key.current) {
      key.current.rotation.y = Math.sin(t * 0.7) * 0.9;
      key.current.position.y = -0.25 + Math.sin(t * 1.2) * 0.035;
    }
    if (runes.current) {
      runes.current.children.forEach((c, i) => {
        const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = (0.3 + (Math.sin(t * 1.5 + i * 0.9) * 0.5 + 0.5) * 0.6) * intensity;
      });
    }
    if (group.current) group.current.rotation.y = Math.sin(t * 0.25) * 0.1;
  });
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  const pillar = (x: number, ref?: React.RefObject<THREE.Group | null>) => (
    <group position={[x, 0, 0]}>
      {/* base */}
      <mesh position={[0, -0.58, 0]}>
        <boxGeometry args={[0.2, 0.12, 0.2]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.5 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      {/* shaft */}
      <mesh>
        <boxGeometry args={[0.14, 1.1, 0.14]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.5 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      {/* capital */}
      <mesh position={[0, 0.58, 0]}>
        <boxGeometry args={[0.22, 0.08, 0.22]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.7 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      {/* chain hanging down */}
      <group ref={ref} position={[0, 0, 0.09]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[0, 0.4 - i * 0.12, 0]} rotation={[i % 2 ? Math.PI / 2 : 0, 0, 0]}>
            <torusGeometry args={[0.035, 0.008, 6, 14]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9 * intensity} metalness={0.95} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
  return (
    <group ref={group}>
      {pillar(-0.42, chainL)}
      {pillar(0.42, chainR)}

      {/* arched lintel */}
      <mesh position={[0, 0.68, 0]}>
        <boxGeometry args={[1.1, 0.1, 0.18]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8 * intensity} metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.9, 0.05, 0.15]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9 * intensity} metalness={0.9} roughness={0.15} />
      </mesh>

      {/* all-seeing eye on lintel */}
      <mesh position={[0, 0.68, 0.1]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      <mesh ref={eye} position={[0, 0.68, 0.14]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#FFF0A0" emissive={color} emissiveIntensity={2.0 * intensity} />
      </mesh>

      {/* ground plinth with runes */}
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[1.15, 0.08, 0.3]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35 * intensity} metalness={0.7} roughness={0.4} transparent opacity={0.8} />
      </mesh>
      <group ref={runes} position={[0, -0.66, 0.16]}>
        {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.06, 0.008, 0.006]} />
            <meshBasicMaterial color="#FFE0A0" transparent opacity={0.6 * intensity} />
          </mesh>
        ))}
      </group>

      {/* floating key in doorway */}
      <group ref={key}>
        <mesh>
          <torusGeometry args={[0.14, 0.028, 10, 24]} />
          <meshStandardMaterial color="#F0D060" emissive="#F0D060" emissiveIntensity={1.9 * intensity} metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0.02, 0, 0]}>
          <torusGeometry args={[0.06, 0.018, 8, 16]} />
          <meshStandardMaterial color="#F0D060" emissive="#F0D060" emissiveIntensity={1.6 * intensity} metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0.26, 0, 0]}>
          <boxGeometry args={[0.28, 0.028, 0.028]} />
          <meshStandardMaterial color="#F0D060" emissive="#F0D060" emissiveIntensity={1.6 * intensity} metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0.36, -0.05, 0]}>
          <boxGeometry args={[0.03, 0.1, 0.028]} />
          <meshStandardMaterial color="#F0D060" emissive="#F0D060" emissiveIntensity={1.6 * intensity} metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0.42, -0.03, 0]}>
          <boxGeometry args={[0.03, 0.06, 0.028]} />
          <meshStandardMaterial color="#F0D060" emissive="#F0D060" emissiveIntensity={1.6 * intensity} metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      <pointLight color={color} intensity={1.4 * intensity} distance={4.5} decay={2} />
    </group>
  );
}

/* ─── SHAPESHIFTER - dual masks + central mirror + mist ─ */
function ShapeshifterTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const maskA = useRef<THREE.Group>(null);
  const maskB = useRef<THREE.Group>(null);
  const mirror = useRef<THREE.Mesh>(null);
  const serpent = useRef<THREE.Mesh>(null);
  const mist = useRef<THREE.Group>(null);
  const warmColor = useMemo(
    () => new THREE.Color(color).lerp(new THREE.Color("#E8B041"), 0.7).getStyle(),
    [color]
  );
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (maskA.current) {
      maskA.current.position.x = Math.cos(t * 0.8) * 0.46;
      maskA.current.position.z = Math.sin(t * 0.8) * 0.46;
      maskA.current.position.y = Math.sin(t * 1.2) * 0.08;
      maskA.current.rotation.y = -t * 0.8 - Math.PI / 2;
      maskA.current.rotation.z = Math.sin(t * 0.7) * 0.2;
    }
    if (maskB.current) {
      maskB.current.position.x = Math.cos(t * 0.8 + Math.PI) * 0.46;
      maskB.current.position.z = Math.sin(t * 0.8 + Math.PI) * 0.46;
      maskB.current.position.y = Math.sin(t * 1.2 + Math.PI) * 0.08;
      maskB.current.rotation.y = -t * 0.8 + Math.PI / 2;
      maskB.current.rotation.z = -Math.sin(t * 0.7) * 0.2;
    }
    if (mirror.current) {
      mirror.current.rotation.y = t * 0.5;
      const mat = mirror.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = (0.8 + Math.sin(t * 2.1) * 0.5 + Math.sin(t * 5.3) * 0.3) * intensity;
    }
    if (serpent.current) {
      serpent.current.rotation.z = t * 0.3;
      serpent.current.rotation.x = Math.sin(t * 0.5) * 0.3;
    }
    if (mist.current) {
      mist.current.rotation.y = -t * 0.2;
      mist.current.children.forEach((c, i) => {
        const phase = ((t * 0.5 + i * 0.2) % 1);
        const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, (1 - phase)) * 0.35 * intensity;
      });
    }
    if (group.current) group.current.rotation.x = -0.15 + Math.sin(t * 0.4) * 0.08;
  });
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  const halfMask = useMemo(
    () => new THREE.SphereGeometry(0.3, 20, 14, 0, Math.PI, 0, Math.PI),
    []
  );
  return (
    <group ref={group}>
      {/* serpent ring */}
      <mesh ref={serpent}>
        <torusKnotGeometry args={[0.58, 0.018, 96, 8, 2, 3]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.9 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>

      {/* central mirror (flickering) */}
      <mesh ref={mirror}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 1.2 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      {/* mirror rim */}
      <mesh>
        <torusGeometry args={[0.2, 0.012, 8, 24]} />
        <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.8 * intensity} />
      </mesh>

      {/* mask A - cool face */}
      <group ref={maskA}>
        <mesh geometry={halfMask}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.8 * intensity} metalness={mp.metalness} roughness={mp.roughness} side={THREE.DoubleSide} transparent opacity={solidOpacity(0.72, light)} />
        </mesh>
        <mesh geometry={halfMask}>
          <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.55 * intensity} side={THREE.DoubleSide} />
        </mesh>
        {/* eyes */}
        <mesh position={[-0.1, 0.06, 0.24]}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 2.5} {...mp} />
        </mesh>
        <mesh position={[0.1, 0.06, 0.24]}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 2.5} {...mp} />
        </mesh>
        {/* frown */}
        <mesh position={[0, -0.12, 0.25]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.07, 0.008, 6, 12, Math.PI]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>

      {/* mask B - warm face */}
      <group ref={maskB}>
        <mesh geometry={halfMask}>
          <meshStandardMaterial color={warmColor} emissive={warmColor} emissiveIntensity={light ? 0 : 0.8 * intensity} metalness={mp.metalness} roughness={mp.roughness} side={THREE.DoubleSide} transparent opacity={solidOpacity(0.72, light)} />
        </mesh>
        <mesh geometry={halfMask}>
          <meshBasicMaterial color={wp?.color ?? warmColor} wireframe transparent opacity={wp?.opacity ?? 0.55 * intensity} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-0.1, 0.06, 0.24]}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial color={bloomAccent(warmColor, light)} emissive={warmColor} emissiveIntensity={light ? 0 : 2.5} {...mp} />
        </mesh>
        <mesh position={[0.1, 0.06, 0.24]}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial color={bloomAccent(warmColor, light)} emissive={warmColor} emissiveIntensity={light ? 0 : 2.5} {...mp} />
        </mesh>
        {/* smile */}
        <mesh position={[0, -0.1, 0.25]}>
          <torusGeometry args={[0.07, 0.008, 6, 12, Math.PI]} />
          <meshBasicMaterial color={warmColor} />
        </mesh>
      </group>

      {/* mist particles */}
      <group ref={mist}>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const r = 0.75;
          return (
            <mesh key={i} position={[Math.cos(a) * r, Math.sin(a * 2) * 0.1, Math.sin(a) * r]}>
              <sphereGeometry args={[0.025, 6, 6]} />
              <meshBasicMaterial color={wp?.color ?? color} transparent opacity={wp?.opacity ?? 0.2 * intensity} />
            </mesh>
          );
        })}
      </group>

      {!light && <pointLight color={color} intensity={1.5 * intensity} distance={4.5} decay={2} />}
    </group>
  );
}

/* ─── SHADOW - eclipse, corona flares, inverted crown ── */
function ShadowTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const corona = useRef<THREE.Mesh>(null);
  const flares = useRef<THREE.Group>(null);
  const heart = useRef<THREE.Mesh>(null);
  const crown = useRef<THREE.Group>(null);
  const doppel = useRef<THREE.Group>(null);
  const warmCorona = "#E8A94A";
  const crimson = "#8A1F2E";
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (corona.current) {
      const m = corona.current.material as THREE.MeshBasicMaterial;
      m.opacity = (0.55 + Math.sin(t * 0.6) * 0.15) * intensity;
      corona.current.rotation.z = t * 0.12;
    }
    if (flares.current) {
      flares.current.rotation.z = -t * 0.18;
      flares.current.children.forEach((c, i) => {
        const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0.3, Math.sin(t * 1.3 + i * 0.9) * 0.5 + 0.5) * 0.75 * intensity;
        c.scale.y = 0.8 + Math.sin(t * 1.7 + i * 0.7) * 0.3;
      });
    }
    if (heart.current) {
      const mat = heart.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (0.3 + Math.sin(t * 1.2) * 0.2) * intensity;
      const k = 0.32 + Math.sin(t * 1.2) * 0.03;
      heart.current.scale.setScalar(k);
    }
    if (crown.current) crown.current.rotation.z = t * 0.08;
    if (doppel.current) {
      doppel.current.rotation.y = Math.sin(t * 0.4) * 0.3;
      doppel.current.children.forEach((c, i) => {
        const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = (0.08 + Math.sin(t * 0.8 + i) * 0.04) * intensity;
      });
    }
    if (group.current) group.current.rotation.y = Math.sin(t * 0.25) * 0.1;
  });
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  return (
    <group ref={group}>
      {/* doppelgänger silhouette behind */}
      <group ref={doppel} position={[0, 0, -0.6]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[0, 0, -i * 0.05]} scale={1 + i * 0.04}>
            <circleGeometry args={[0.95, 32]} />
            <meshBasicMaterial color="#0A0A0A" transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* solar corona ring */}
      <mesh ref={corona}>
        <ringGeometry args={[0.62, 0.82, 72]} />
        <meshBasicMaterial color={wp?.color ?? warmCorona} transparent opacity={wp?.opacity ?? 0.55 * intensity} side={THREE.DoubleSide} />
      </mesh>
      {/* rim */}
      <mesh>
        <torusGeometry args={[0.58, 0.014, 10, 72]} />
        <meshBasicMaterial color={wp?.color ?? warmCorona} transparent opacity={wp?.opacity ?? 0.95 * intensity} />
      </mesh>

      {/* corona flares (flickering) */}
      <group ref={flares}>
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          const r = 0.92;
          return (
            <mesh key={i} position={[Math.cos(a) * r, Math.sin(a) * r, 0]} rotation={[0, 0, a - Math.PI / 2]}>
              <coneGeometry args={[0.04, 0.28, 4]} />
              <meshBasicMaterial color={wp?.color ?? warmCorona} transparent opacity={wp?.opacity ?? 0.7 * intensity} />
            </mesh>
          );
        })}
      </group>

      {/* eclipse void */}
      <mesh>
        <sphereGeometry args={[0.56, 32, 32]} />
        <meshStandardMaterial color="#040404" metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>

      {/* crimson heart at center of void */}
      <mesh ref={heart}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshBasicMaterial color={crimson} transparent opacity={0.4 * intensity} />
      </mesh>

      {/* inverted crown - spikes pointing INWARD */}
      <group ref={crown}>
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (i / 9) * Math.PI * 2;
          const r = 0.44;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * r, Math.sin(a) * r, 0]}
              rotation={[0, 0, a + Math.PI / 2]}
            >
              <coneGeometry args={[0.04, 0.18, 4]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.9 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
            </mesh>
          );
        })}
      </group>

      {!light && <pointLight color={warmCorona} intensity={1.3 * intensity} distance={4.5} decay={2} />}
      {!light && <pointLight color={crimson} intensity={0.9 * intensity} distance={3} decay={2} position={[0, 0, 0.3]} />}
    </group>
  );
}

/* ─── TRICKSTER - flipping coin, tumbling masks, marotte ─ */
function TricksterTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const coin = useRef<THREE.Mesh>(null);
  const mask = useRef<THREE.Group>(null);
  const confetti = useRef<THREE.Group>(null);
  const marotte = useRef<THREE.Group>(null);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (coin.current) {
      coin.current.rotation.x = t * 3.5;
      coin.current.rotation.z = Math.sin(t * 1.7) * 0.2;
      coin.current.position.y = Math.abs(Math.sin(t * 1.8)) * 0.3 - 0.1;
    }
    if (mask.current) {
      mask.current.rotation.y = t * 1.4;
      mask.current.position.x = Math.cos(t * 0.9) * 0.5;
      mask.current.position.z = Math.sin(t * 0.9) * 0.5;
    }
    if (confetti.current) {
      confetti.current.children.forEach((c, i) => {
        const phase = ((t * 0.6 + i * 0.11) % 1.2);
        const a = (i / 12) * Math.PI * 2;
        const r = 0.3 + phase * 0.6;
        c.position.set(
          Math.cos(a) * r,
          0.5 - phase * 1.1 + Math.sin(t * 2 + i) * 0.05,
          Math.sin(a) * r
        );
        c.rotation.x = t * 3 + i;
        c.rotation.y = t * 2.5 + i;
        const mat = (c as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.opacity = Math.max(0, 1 - phase / 1.2);
      });
    }
    if (marotte.current) {
      marotte.current.rotation.z = Math.sin(t * 0.7) * 0.3 - 0.2;
      marotte.current.position.x = -0.5 + Math.sin(t * 1.1) * 0.05;
    }
    if (group.current) group.current.rotation.y = Math.sin(t * 0.3) * 0.1;
  });
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  return (
    <group ref={group}>
      {/* marotte (jester stick) leaning at left */}
      <group ref={marotte}>
        <mesh position={[-0.5, -0.3, 0]}>
          <cylinderGeometry args={[0.014, 0.014, 0.8, 8]} />
          <meshStandardMaterial color="#6a4f2e" metalness={mp.metalness} roughness={mp.roughness} />
        </mesh>
        {/* jester head */}
        <mesh position={[-0.5, 0.15, 0]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 0.3 * intensity} {...mp} />
        </mesh>
        {/* 3 bell points */}
        {[-0.12, 0, 0.12].map((dx, i) => (
          <mesh key={i} position={[-0.5 + dx, 0.28 + (i === 1 ? 0.03 : 0), 0]} rotation={[0, 0, dx * 5]}>
            <coneGeometry args={[0.04, 0.14, 4]} />
            <meshStandardMaterial color={i === 1 ? "#E84C3D" : i === 0 ? "#5DADE2" : color} emissive={i === 1 ? "#E84C3D" : i === 0 ? "#5DADE2" : color} emissiveIntensity={light ? 0 : 1.0 * intensity} {...mp} />
          </mesh>
        ))}
        {/* bell at each tip */}
        {[-0.12, 0, 0.12].map((dx, i) => (
          <mesh key={i} position={[-0.5 + dx, 0.38 + (i === 1 ? 0.03 : 0), 0]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshStandardMaterial color="#F0D060" emissive="#F0D060" emissiveIntensity={light ? 0 : 2 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
          </mesh>
        ))}
      </group>

      {/* flipping coin */}
      <mesh ref={coin} position={[0.05, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.035, 32]} />
        <meshStandardMaterial color="#F0D060" emissive={color} emissiveIntensity={light ? 0 : 0.8 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>

      {/* tumbling comedy/tragedy mask */}
      <group ref={mask}>
        <mesh>
          <sphereGeometry args={[0.12, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.1 * intensity} metalness={mp.metalness} roughness={mp.roughness} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-0.04, 0.02, 0.1]}>
          <sphereGeometry args={[0.014, 6, 6]} />
          <meshBasicMaterial color="#111" />
        </mesh>
        <mesh position={[0.04, 0.02, 0.1]}>
          <sphereGeometry args={[0.014, 6, 6]} />
          <meshBasicMaterial color="#111" />
        </mesh>
      </group>

      {/* confetti */}
      <group ref={confetti}>
        {Array.from({ length: 12 }).map((_, i) => {
          const hue = i % 3 === 0 ? color : i % 3 === 1 ? "#5DADE2" : "#E84C3D";
          return (
            <mesh key={i}>
              <boxGeometry args={[0.04, 0.012, 0.04]} />
              <meshStandardMaterial color={hue} emissive={hue} emissiveIntensity={light ? 0 : 1.2 * intensity} transparent opacity={solidOpacity(0.9, light)} {...mp} />
            </mesh>
          );
        })}
      </group>

      {!light && <pointLight color={color} intensity={1.4 * intensity} distance={4.5} decay={2} />}
    </group>
  );
}

/* ─── ALLY - clasped rings, shield, steadfast flame ──── */
function AllyTotem({ color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const shield = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Group>(null);
  const ringB = useRef<THREE.Group>(null);
  const flame = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const banner = useRef<THREE.Mesh>(null);
  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (shield.current) {
      shield.current.rotation.y = Math.sin(t * 0.3) * 0.1;
      const mat = shield.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = (0.3 + Math.sin(t * 0.8) * 0.08) * intensity;
    }
    if (ringA.current) {
      ringA.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      ringA.current.rotation.y = t * 0.3;
    }
    if (ringB.current) {
      ringB.current.rotation.x = -Math.sin(t * 0.5) * 0.1;
      ringB.current.rotation.y = -t * 0.3;
    }
    if (core.current) {
      const k = 0.13 + Math.sin(t * 1.4) * 0.015;
      core.current.scale.setScalar(k);
    }
    if (flame.current) {
      const k = 0.1 + Math.sin(t * 5) * 0.01;
      flame.current.scale.set(k * 0.7, k * 1.3, k * 0.7);
    }
    if (banner.current) {
      banner.current.rotation.z = Math.sin(t * 0.8) * 0.1;
    }
    if (group.current) group.current.rotation.z = Math.sin(t * 0.3) * 0.05;
  });
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  const shieldGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.55);
    shape.bezierCurveTo(0.45, 0.5, 0.48, 0.2, 0.4, -0.1);
    shape.bezierCurveTo(0.3, -0.4, 0.1, -0.55, 0, -0.58);
    shape.bezierCurveTo(-0.1, -0.55, -0.3, -0.4, -0.4, -0.1);
    shape.bezierCurveTo(-0.48, 0.2, -0.45, 0.5, 0, 0.55);
    return new THREE.ShapeGeometry(shape);
  }, []);
  return (
    <group ref={group}>
      {/* shield silhouette behind */}
      <mesh ref={shield} position={[0, 0, -0.35]} geometry={shieldGeo}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.3 * intensity} metalness={mp.metalness} roughness={mp.roughness} transparent opacity={solidOpacity(0.3, light)} side={THREE.DoubleSide} />
      </mesh>
      {/* shield outline */}
      <mesh position={[0, 0, -0.34]} geometry={shieldGeo}>
        <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.55 * intensity} side={THREE.DoubleSide} />
      </mesh>

      {/* interlocked ring A (horizontal) */}
      <group ref={ringA} position={[-0.2, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.36, 0.05, 12, 48]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.85 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.36, 0.05, 12, 48]} />
          <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.35 * intensity} />
        </mesh>
      </group>

      {/* interlocked ring B (vertical) */}
      <group ref={ringB} position={[0.2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.36, 0.05, 12, 48]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.85 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.36, 0.05, 12, 48]} />
          <meshBasicMaterial color={wp?.color ?? color} wireframe transparent opacity={wp?.opacity ?? 0.35 * intensity} />
        </mesh>
      </group>

      {/* central steady flame */}
      <mesh ref={core}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 2.5 * intensity} transparent opacity={solidOpacity(0.75, light)} {...mp} />
      </mesh>
      <mesh ref={flame} position={[0, 0.03, 0]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial color={bloomAccent(color, light)} emissive={color} emissiveIntensity={light ? 0 : 3.4 * intensity} {...mp} />
      </mesh>

      {/* banner across bottom */}
      <mesh ref={banner} position={[0, -0.68, 0]}>
        <planeGeometry args={[0.62, 0.1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 0.7 * intensity} metalness={mp.metalness} roughness={mp.roughness} side={THREE.DoubleSide} />
      </mesh>
      {/* banner pinned points */}
      <mesh position={[-0.31, -0.68, 0]}>
        <sphereGeometry args={[0.024, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.4 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>
      <mesh position={[0.31, -0.68, 0]}>
        <sphereGeometry args={[0.024, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={light ? 0 : 1.4 * intensity} metalness={mp.metalness} roughness={mp.roughness} />
      </mesh>

      {!light && <pointLight color={color} intensity={1.5 * intensity} distance={4.5} decay={2} />}
    </group>
  );
}

const TOTEMS: Record<Slug, React.ComponentType<TotemProps>> = {
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
  const { theme } = useTheme();
  const light = theme === "light";
  const intensity = isHovered ? 1.4 : 1.0;
  const Totem = TOTEMS[slug];
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 2.9], fov: 40 }}
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
            <directionalLight position={[2, 3, 2]} intensity={0.22} color="#F0D060" />
            <directionalLight position={[-1, -2, 1]} intensity={0.08} color="#4488AA" />
          </>
        )}
        {Totem && <Totem color={color} intensity={intensity} light={light} />}
        {!light && (
          <EffectComposer>
            <Bloom
              intensity={isHovered ? 0.95 : 0.6}
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
