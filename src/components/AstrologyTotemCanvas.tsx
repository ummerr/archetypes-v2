"use client";

/**
 * Astrology totem — the 3D constellation. Each sign's asterism
 * (`src/lib/zodiac-asterisms.ts`) rendered as emissive star-points connected
 * by faint lines, parallaxed into z by each star's `depth`. This is the literal
 * z-extrusion of the 2D `AstrologyConstellation` — same points, same edges,
 * one vocabulary in two dimensionalities (DESIGN.md §9b).
 *
 * The dialect is celestial: no platonic solid, no organic form, no instrument —
 * the sign is a figure read off the night sky. Breath per DESIGN.md §2.
 */

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useMotionFrame } from "@/lib/usePrefersReducedMotion";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTheme } from "@/components/ThemeProvider";
import { materialParams, bloomAccent } from "@/lib/inversion-palette";
import { asterismFor } from "@/lib/zodiac-asterisms";

const SCALE = 1.7;
const ZSPREAD = 0.55;

interface TotemProps {
  slug: string;
  color: string;
  intensity: number;
  light: boolean;
}

function ConstellationTotem({ slug, color, intensity, light }: TotemProps) {
  const group = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const asterism = asterismFor(slug);

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

  useMotionFrame((s) => {
    const t = s.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.3) * 0.35;
      group.current.rotation.x = Math.sin(t * 0.22) * 0.12;
    }
  });

  if (!asterism) return null;

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color={light ? color : bloomAccent(color, light)}
          transparent
          opacity={(light ? 0.5 : 0.45) * intensity}
        />
      </lineSegments>
      {stars.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[s.r, 14, 14]} />
          <meshStandardMaterial
            color={i === brightest ? bloomAccent(color, light) : color}
            emissive={color}
            emissiveIntensity={light ? 0 : (1.1 + s.m) * intensity}
            {...mp}
          />
        </mesh>
      ))}
      {!light && (
        <pointLight
          color={color}
          position={stars[brightest]?.pos}
          intensity={1.2 * intensity}
          distance={4}
          decay={2}
        />
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
            <directionalLight position={[2, 3, 2]} intensity={0.2} color="#B8C4E0" />
            <directionalLight position={[-1, -2, 1]} intensity={0.08} color="#7C8CB0" />
          </>
        )}
        <ConstellationTotem slug={slug} color={color} intensity={intensity} light={light} />
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
