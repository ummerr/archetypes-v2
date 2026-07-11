"use client";

/**
 * Astrology totem — the 3D constellation, rendered as a small living star-chart.
 * Each sign's asterism (`src/lib/zodiac-asterisms.ts`) is drawn as emissive
 * star-points connected by faint lines and parallaxed into z by each star's
 * `depth` — the literal z-extrusion of the 2D `AstrologyConstellation`, one
 * vocabulary in two dimensionalities (DESIGN.md §9b).
 *
 * Grounded in the tradition: a tilted ecliptic ring encircles the figure, the
 * sign's ruling body orbits it, and the stars twinkle. The element tunes the
 * motion — fire flickers, water undulates, air drifts, earth holds steady —
 * all through `useMotionFrame`, so reduced-motion stills it entirely.
 */

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useMotionFrame } from "@/lib/usePrefersReducedMotion";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTheme } from "@/components/ThemeProvider";
import { materialParams, bloomAccent } from "@/lib/inversion-palette";
import { asterismFor } from "@/lib/zodiac-asterisms";
import { getAstrologyBySlug } from "@/data/astrology/archetypes";
import type { ZodiacElement } from "@/types/astrology";

const SCALE = 1.7;
const ZSPREAD = 0.55;

// Element tunes the motion. twinkle = star flicker speed; bob = vertical
// undulation; ring = ecliptic spin; orbit = ruling-body orbital speed.
const ELEMENT_MOTION: Record<ZodiacElement, { twinkle: number; twAmp: number; bob: number; bobAmp: number; ring: number; orbit: number }> = {
  fire:  { twinkle: 4.2, twAmp: 0.28, bob: 0.0,  bobAmp: 0.02, ring: 0.22, orbit: 0.55 },
  air:   { twinkle: 2.8, twAmp: 0.20, bob: 0.9,  bobAmp: 0.05, ring: 0.16, orbit: 0.42 },
  water: { twinkle: 1.4, twAmp: 0.16, bob: 0.7,  bobAmp: 0.07, ring: 0.10, orbit: 0.30 },
  earth: { twinkle: 1.1, twAmp: 0.10, bob: 0.35, bobAmp: 0.02, ring: 0.08, orbit: 0.24 },
};

interface TotemProps {
  slug: string;
  color: string;
  intensity: number;
  light: boolean;
}

function ConstellationTotem({ slug, color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const starRefs = useRef<(THREE.Mesh | null)[]>([]);
  const mp = materialParams(light);
  const asterism = asterismFor(slug);
  const element = getAstrologyBySlug(slug)?.element ?? "fire";
  const motion = ELEMENT_MOTION[element];
  const accent = bloomAccent(color, light);

  const stars = useMemo(() => {
    if (!asterism) return [] as { pos: [number, number, number]; r: number; m: number }[];
    return asterism.points.map((s) => ({
      pos: [
        (s.x - 0.5) * SCALE,
        -(s.y - 0.5) * SCALE,
        ((s.depth ?? 0.5) - 0.5) * ZSPREAD,
      ] as [number, number, number],
      r: 0.03 + s.m * 0.05,
      m: s.m,
    }));
  }, [asterism]);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    if (!asterism) return g;
    const verts: number[] = [];
    for (const [a, b] of asterism.edges) {
      verts.push(...stars[a].pos, ...stars[b].pos);
    }
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, [asterism, stars]);

  const brightest = useMemo(
    () => stars.reduce((mi, s, i, arr) => (s.m > arr[mi].m ? i : mi), 0),
    [stars],
  );

  const ringRadius = 1.18;

  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.3) * 0.35;
      group.current.rotation.x = Math.sin(t * 0.22) * 0.12;
      group.current.position.y = Math.sin(t * motion.bob) * motion.bobAmp;
    }
    if (ring.current) ring.current.rotation.z = t * motion.ring;
    if (orbit.current) orbit.current.rotation.y = t * motion.orbit;
    // twinkle: stagger each star by its index so the field shimmers
    for (let i = 0; i < starRefs.current.length; i++) {
      const mesh = starRefs.current[i];
      if (!mesh) continue;
      const k = 1 + Math.sin(t * motion.twinkle + i * 1.7) * motion.twAmp;
      mesh.scale.setScalar(k);
    }
  });

  if (!asterism) return null;

  return (
    <group ref={group}>
      {/* Ecliptic ring — the band the sign sits on, tilted like the real ecliptic */}
      <group ref={ring} rotation={[1.15, 0, 0]}>
        <mesh>
          <torusGeometry args={[ringRadius, 0.006, 8, 96]} />
          <meshBasicMaterial color={accent} transparent opacity={(light ? 0.28 : 0.32) * intensity} />
        </mesh>
        {/* Ruling body orbiting the ecliptic */}
        <group ref={orbit}>
          <mesh position={[ringRadius, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color={accent}
              emissive={color}
              emissiveIntensity={light ? 0 : 2.2 * intensity}
              {...mp}
            />
          </mesh>
        </group>
      </group>

      {/* Constellation lines */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={accent} transparent opacity={(light ? 0.5 : 0.45) * intensity} />
      </lineSegments>

      {/* Stars */}
      {stars.map((s, i) => (
        <mesh key={i} position={s.pos} ref={(el) => { starRefs.current[i] = el; }}>
          <sphereGeometry args={[s.r, 14, 14]} />
          <meshStandardMaterial
            color={i === brightest ? accent : color}
            emissive={color}
            emissiveIntensity={light ? 0 : (1.1 + s.m) * intensity}
            {...mp}
          />
        </mesh>
      ))}

      {!light && (
        <pointLight color={color} position={stars[brightest]?.pos} intensity={1.2 * intensity} distance={4} decay={2} />
      )}
    </group>
  );
}

export default function AstrologyTotemCanvas({
  slug,
  color,
  isHovered,
}: {
  slug: string;
  color: string;
  isHovered: boolean;
}) {
  const { theme } = useTheme();
  const light = theme === "light";
  const intensity = isHovered ? 1.4 : 1.0;
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
            <directionalLight position={[2, 3, 2]} intensity={0.2} color="#B8C4E0" />
            <directionalLight position={[-1, -2, 1]} intensity={0.08} color="#7C8CB0" />
          </>
        )}
        <ConstellationTotem slug={slug} color={color} intensity={intensity} light={light} />
        {!light && (
          <EffectComposer>
            <Bloom
              intensity={isHovered ? 0.9 : 0.6}
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
