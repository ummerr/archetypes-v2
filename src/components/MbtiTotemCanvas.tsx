"use client";

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMotionFrame } from "@/lib/usePrefersReducedMotion";
import { useTheme } from "@/components/ThemeProvider";
import { materialParams, wireframeParams, solidOpacity } from "@/lib/inversion-palette";
import type { StackEntry } from "@/types/mbti";

interface Props {
  stack: [StackEntry, StackEntry, StackEntry, StackEntry];
  color: string;
  isHovered: boolean;
}

const TIER_Z = [0.0, -0.45, -0.85, -1.2];
const TIER_SCALE = [1.0, 0.78, 0.6, 0.45];
const TIER_EMISSIVE = [0.9, 0.55, 0.3, 0.12];
const TIER_OPACITY = [1.0, 0.78, 0.55, 0.35];
const TIER_SPEED = [1.0, 0.5, 0.25, 0.1];

const BASE_OMEGA = 0.35;

type MatProps = {
  color: string;
  emissive: string;
  emissiveIntensity: number;
  metalness: number;
  roughness: number;
  transparent: true;
  opacity: number;
};

interface PrimitiveProps {
  outward: boolean;
  matProps: MatProps;
  wireColor: string;
  wireOpacity: number;
}

// Each primitive is the 3D expression of the matching 2D MbtiGlyph form,
// so the same type reads as the same entity from index thumb to hero.
//   N (intuition) → NodeBurst   → core sphere + 6 axial spikes
//   S (sensation) → SquareStack → solid cube (+ inner cube when introverted)
//   T (thinking)  → GridCross   → three orthogonal bars
//   F (feeling)   → CircleRings → orthogonal tori (e) / concentric tori (i)

function RadialBurst({ outward, matProps, wireColor, wireOpacity }: PrimitiveProps) {
  const coreR = outward ? 0.08 : 0.16;
  const spikeL = outward ? 0.38 : 0.22;
  const spikeR = outward ? 0.03 : 0.045;
  const offset = coreR + spikeL / 2;

  const coreGeo = useMemo(() => new THREE.SphereGeometry(coreR, 20, 20), [coreR]);
  const spikeGeo = useMemo(
    () => new THREE.ConeGeometry(spikeR, spikeL, 12),
    [spikeR, spikeL],
  );

  const spikes: Array<{
    pos: [number, number, number];
    rot: [number, number, number];
  }> = [
    { pos: [offset, 0, 0], rot: [0, 0, -Math.PI / 2] },
    { pos: [-offset, 0, 0], rot: [0, 0, Math.PI / 2] },
    { pos: [0, offset, 0], rot: [0, 0, 0] },
    { pos: [0, -offset, 0], rot: [Math.PI, 0, 0] },
    { pos: [0, 0, offset], rot: [Math.PI / 2, 0, 0] },
    { pos: [0, 0, -offset], rot: [-Math.PI / 2, 0, 0] },
  ];

  return (
    <>
      <mesh geometry={coreGeo}>
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh geometry={coreGeo}>
        <meshBasicMaterial color={wireColor} wireframe transparent opacity={wireOpacity} />
      </mesh>
      {spikes.map((s, i) => (
        <group key={i} position={s.pos} rotation={s.rot}>
          <mesh geometry={spikeGeo}>
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh geometry={spikeGeo}>
            <meshBasicMaterial
              color={wireColor}
              wireframe
              transparent
              opacity={wireOpacity}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function CubeMass({ outward, matProps, wireColor, wireOpacity }: PrimitiveProps) {
  const size = outward ? 0.48 : 0.4;
  const inner = size * 0.55;
  const boxGeo = useMemo(() => new THREE.BoxGeometry(size, size, size), [size]);
  const innerGeo = useMemo(
    () => new THREE.BoxGeometry(inner, inner, inner),
    [inner],
  );
  const railGeo = useMemo(
    () => new THREE.BoxGeometry(size * 1.55, 0.035, 0.06),
    [size],
  );
  const railY = size / 2 + 0.06;
  return (
    <>
      <mesh geometry={boxGeo}>
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh geometry={boxGeo}>
        <meshBasicMaterial color={wireColor} wireframe transparent opacity={wireOpacity} />
      </mesh>
      {outward ? (
        [railY, -railY].map((y, i) => (
          <group key={i} position={[0, y, 0]}>
            <mesh geometry={railGeo}>
              <meshStandardMaterial {...matProps} />
            </mesh>
            <mesh geometry={railGeo}>
              <meshBasicMaterial
                color={wireColor}
                wireframe
                transparent
                opacity={wireOpacity}
              />
            </mesh>
          </group>
        ))
      ) : (
        <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <mesh geometry={innerGeo}>
            <meshStandardMaterial {...matProps} opacity={matProps.opacity * 0.6} />
          </mesh>
          <mesh geometry={innerGeo}>
            <meshBasicMaterial
              color={wireColor}
              wireframe
              transparent
              opacity={wireOpacity * 0.75}
            />
          </mesh>
        </group>
      )}
    </>
  );
}

function CrossLattice({ outward, matProps, wireColor, wireOpacity }: PrimitiveProps) {
  const length = outward ? 0.62 : 0.42;
  const thickness = outward ? 0.06 : 0.08;
  const geometries = useMemo(
    () => [
      new THREE.BoxGeometry(length, thickness, thickness),
      new THREE.BoxGeometry(thickness, length, thickness),
      new THREE.BoxGeometry(thickness, thickness, length),
    ],
    [length, thickness],
  );
  return (
    <>
      {geometries.map((geo, i) => (
        <group key={i}>
          <mesh geometry={geo}>
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh geometry={geo}>
            <meshBasicMaterial
              color={wireColor}
              wireframe
              transparent
              opacity={wireOpacity}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function ConcentricRings({ outward, matProps, wireColor, wireOpacity }: PrimitiveProps) {
  const tube = 0.028;
  const rings = useMemo<Array<{ r: number; rot: [number, number, number] }>>(
    () => {
      if (outward) {
        const r = 0.26;
        return [
          { r, rot: [0, 0, 0] },
          { r, rot: [Math.PI / 2, 0, 0] },
          { r, rot: [0, Math.PI / 2, 0] },
        ];
      }
      return [
        { r: 0.3, rot: [0, 0, 0] },
        { r: 0.21, rot: [0, 0, 0] },
        { r: 0.12, rot: [0, 0, 0] },
      ];
    },
    [outward],
  );
  const geometries = useMemo(
    () => rings.map((a) => new THREE.TorusGeometry(a.r, tube, 12, 48)),
    [rings],
  );
  return (
    <>
      {rings.map((a, i) => (
        <group key={i} rotation={a.rot}>
          <mesh geometry={geometries[i]}>
            <meshStandardMaterial {...matProps} />
          </mesh>
          <mesh geometry={geometries[i]}>
            <meshBasicMaterial
              color={wireColor}
              wireframe
              transparent
              opacity={wireOpacity}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

interface TierProps {
  entry: StackEntry;
  tier: number;
  color: string;
  intensity: number;
  light: boolean;
}

function CognitiveTier({ entry, tier, color, intensity, light }: TierProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mp = materialParams(light);
  const wp = wireframeParams(light);

  const process = entry.code[0] as "N" | "S" | "T" | "F";
  const outward = entry.code[1] === "e";
  const direction = outward ? 1 : -1;
  const speed = BASE_OMEGA * TIER_SPEED[tier] * direction;

  useMotionFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * speed;
    groupRef.current.position.y = Math.sin(t * 0.5 + tier * 0.8) * 0.02;
  });

  const emissiveI = TIER_EMISSIVE[tier] * intensity;
  const alpha = TIER_OPACITY[tier];
  const s = TIER_SCALE[tier];

  const matProps: MatProps = {
    color,
    emissive: color,
    emissiveIntensity: light ? 0 : emissiveI,
    metalness: mp.metalness,
    roughness: mp.roughness,
    transparent: true,
    opacity: solidOpacity(alpha * 0.3, light),
  };
  const wireColor = wp?.color ?? color;
  const wireOpacity = wp?.opacity ?? alpha * 0.7 * intensity;

  const primitive = (() => {
    const p = { outward, matProps, wireColor, wireOpacity };
    switch (process) {
      case "N":
        return <RadialBurst {...p} />;
      case "S":
        return <CubeMass {...p} />;
      case "T":
        return <CrossLattice {...p} />;
      case "F":
        return <ConcentricRings {...p} />;
    }
  })();

  return (
    <group ref={groupRef} position={[0, TIER_Z[tier], 0]} scale={[s, s, s]}>
      {primitive}
      {!light && (
        <pointLight
          color={color}
          intensity={emissiveI * 0.6}
          distance={2}
          decay={2}
        />
      )}
    </group>
  );
}

export default function MbtiTotemCanvas({ stack, color, isHovered }: Props) {
  const { theme } = useTheme();
  const light = theme === "light";
  const intensity = isHovered ? 1.4 : 1.0;

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, -0.3, 3.0], fov: 38 }}
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

        {stack.map((entry, i) => (
          <CognitiveTier
            key={entry.code}
            entry={entry}
            tier={i}
            color={color}
            intensity={intensity}
            light={light}
          />
        ))}

        {!light && (
          <EffectComposer>
            <Bloom
              intensity={isHovered ? 0.8 : 0.5}
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
