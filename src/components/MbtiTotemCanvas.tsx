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

function geometryForProcess(process: "N" | "S" | "T" | "F"): THREE.BufferGeometry {
  switch (process) {
    case "N":
      return new THREE.TorusKnotGeometry(0.28, 0.08, 64, 12, 2, 3);
    case "S":
      return new THREE.BoxGeometry(0.44, 0.44, 0.44);
    case "T":
      return new THREE.OctahedronGeometry(0.32);
    case "F":
      return new THREE.IcosahedronGeometry(0.3);
  }
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

  const geo = useMemo(() => geometryForProcess(entry.code[0] as "N" | "S" | "T" | "F"), [entry.code]);

  const direction = entry.code[1] === "i" ? -1 : 1;
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

  return (
    <group ref={groupRef} position={[0, TIER_Z[tier], 0]} scale={[s, s, s]}>
      <mesh geometry={geo}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={light ? 0 : emissiveI}
          metalness={mp.metalness}
          roughness={mp.roughness}
          transparent
          opacity={solidOpacity(alpha * 0.3, light)}
        />
      </mesh>
      <mesh geometry={geo}>
        <meshBasicMaterial
          color={wp?.color ?? color}
          wireframe
          transparent
          opacity={wp?.opacity ?? alpha * 0.7 * intensity}
        />
      </mesh>
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
