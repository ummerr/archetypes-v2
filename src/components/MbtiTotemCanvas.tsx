"use client";

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useMotionFrame } from "@/lib/usePrefersReducedMotion";
import { useTheme } from "@/components/ThemeProvider";
import { materialParams, wireframeParams, solidOpacity } from "@/lib/inversion-palette";
import { getFunction } from "@/data/mbti/functions";
import { getTemperament } from "@/data/mbti/archetypes";
import type { MbtiArchetype, CognitiveFunction } from "@/types/mbti";

/**
 * Ceremonial 3D extrusion of the 2D MBTI glyph.
 *
 * Used only at hero scale on the detail page. The 2D `MbtiGlyph`
 * remains the single form at sm/md/lg and on OG cards. The 3D
 * primitives below are the z-extrusion of the 2D primitives in
 * `MbtiGlyph.tsx` — same vocabulary, same dom/aux hierarchy, same
 * breath rhythm.
 */

type Weight = "dom" | "aux";

interface PrimitiveProps {
  fn: CognitiveFunction;
  color: string;
  weight: Weight;
  intensity: number;
  light: boolean;
}

function layerScale(weight: Weight, outward: boolean): number {
  if (weight === "dom") return outward ? 1.0 : 0.64;
  return outward ? 0.9 : 0.52;
}

function layerOpacity(weight: Weight, light: boolean): number {
  if (weight === "dom") return light ? 0.95 : 0.9;
  return light ? 0.5 : 0.42;
}

const SPEED = { dom: 1, aux: 1 / 1.8 } as const;

function Anchor({ color, light }: { color: string; light: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useMotionFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * (Math.PI * 2) / 80;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.95, 0.004, 8, 128]} />
      <meshBasicMaterial color={color} transparent opacity={light ? 0.18 : 0.14} />
    </mesh>
  );
}

function NodeBurst3D({ fn, color, weight, intensity, light }: PrimitiveProps) {
  const group = useRef<THREE.Group>(null);
  const outward = fn.attitude === "e";
  const sc = layerScale(weight, outward);
  const op = layerOpacity(weight, light);
  const mp = materialParams(light);
  const spinDir = outward ? 1 : -1;
  const spinPeriod = (outward ? 28 : 44) / SPEED[weight];
  const pulseDur = 3.2 / SPEED[weight];

  // 6 spike directions: 4 in the xy-plane (matching the 2D hex-ray
  // layout) plus ±z for depth. Reads as the 2D burst with forward/back
  // pylons revealing the third dimension.
  const dirs = useMemo(() => {
    const planar = [0, 1, 2, 3].map((i) => {
      const a = (Math.PI * 2 * i) / 4 + Math.PI / 4;
      return new THREE.Vector3(Math.cos(a), Math.sin(a), 0);
    });
    return [
      ...planar,
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, -1),
    ];
  }, []);

  const coneLen = 0.38 * sc;
  const coneRadius = 0.04 * sc;
  const coreR = (outward ? 0.08 : 0.12) * sc;

  useMotionFrame((s) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    group.current.rotation.y = spinDir * (t / spinPeriod) * Math.PI * 2;
    group.current.rotation.x = Math.sin(t / (spinPeriod * 1.3)) * 0.12;
    const pulse = outward
      ? 0.85 + Math.sin(t / pulseDur * Math.PI * 2) * 0.15
      : 0.95 + Math.sin(t / pulseDur * Math.PI * 2) * 0.08;
    group.current.scale.setScalar(pulse);
  });

  return (
    <group ref={group}>
      {dirs.map((d, i) => {
        // Cone apex points outward along the direction vector.
        const pos = d.clone().multiplyScalar(coneLen * 0.6);
        const q = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          d,
        );
        return (
          <mesh
            key={i}
            position={[pos.x, pos.y, pos.z]}
            quaternion={q}
          >
            <coneGeometry args={[coneRadius, coneLen, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={light ? 0 : 0.55 * intensity}
              metalness={mp.metalness}
              roughness={mp.roughness}
              transparent
              opacity={solidOpacity(op, light)}
            />
          </mesh>
        );
      })}
      <mesh>
        <sphereGeometry args={[coreR, 28, 28]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={light ? 0 : 0.9 * intensity}
          metalness={mp.metalness}
          roughness={mp.roughness}
          transparent
          opacity={solidOpacity(op, light)}
        />
      </mesh>
    </group>
  );
}

function SquareStack3D({ fn, color, weight, intensity, light }: PrimitiveProps) {
  const group = useRef<THREE.Group>(null);
  const outward = fn.attitude === "e";
  const sc = layerScale(weight, outward);
  const op = layerOpacity(weight, light);
  const mp = materialParams(light);
  const wp = wireframeParams(light);
  const breathDur = 5 / SPEED[weight];
  const side = 1.05 * sc;
  const inner = side * 0.55;

  useMotionFrame((s) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    const phase = Math.sin((t / breathDur) * Math.PI * 2);
    const breathScale = outward ? 1 + phase * 0.03 : 1 + phase * -0.04;
    group.current.scale.setScalar(breathScale);
    group.current.rotation.y = (t / 40) * Math.PI * 2;
    group.current.rotation.x = Math.sin(t / 18) * 0.2 + 0.25;
  });

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[side, side, side]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={light ? 0 : 0.35 * intensity}
          metalness={mp.metalness}
          roughness={mp.roughness}
          transparent
          opacity={solidOpacity(op * 0.6, light)}
        />
      </mesh>
      <mesh>
        <boxGeometry args={[side, side, side]} />
        <meshBasicMaterial
          color={wp?.color ?? color}
          wireframe
          transparent
          opacity={wp?.opacity ?? op}
        />
      </mesh>
      {outward ? (
        // Extraverted: two horizontal rib rails extending beyond the cube
        <>
          {[-1, 1].map((dir) => (
            <mesh key={dir} position={[0, dir * side * 0.52, 0]}>
              <boxGeometry args={[side * 1.35, 0.02, 0.02]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={light ? 0 : 0.7 * intensity}
                metalness={mp.metalness}
                roughness={mp.roughness}
                transparent
                opacity={solidOpacity(op, light)}
              />
            </mesh>
          ))}
        </>
      ) : (
        // Introverted: nested rotated inner cube
        <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
          <boxGeometry args={[inner, inner, inner]} />
          <meshBasicMaterial
            color={wp?.color ?? color}
            wireframe
            transparent
            opacity={(wp?.opacity ?? op) * 1.1}
          />
        </mesh>
      )}
    </group>
  );
}

function GridCross3D({ fn, color, weight, intensity, light }: PrimitiveProps) {
  const group = useRef<THREE.Group>(null);
  const outward = fn.attitude === "e";
  const sc = layerScale(weight, outward);
  const op = layerOpacity(weight, light);
  const mp = materialParams(light);
  const lines = outward ? 5 : 3;
  const span = 1.1 * sc;
  const half = span / 2;
  const bar = 0.018 * Math.sqrt(sc);
  const shimmerDur = 3.6 / SPEED[weight];

  const positions = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < lines; i++) {
      const t = i / (lines - 1);
      arr.push(-half + span * t);
    }
    return arr;
  }, [lines, span, half]);

  useMotionFrame((s) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    group.current.rotation.y = (t / (outward ? 30 : 45)) * Math.PI * 2;
    group.current.rotation.x = Math.sin(t / 22) * 0.18 + 0.3;
    // shimmer: sweep opacity of children in waves
    group.current.children.forEach((child, i) => {
      const phase = (t / shimmerDur) * Math.PI * 2 + i * 0.5;
      const o = op * (0.55 + 0.45 * (0.5 + 0.5 * Math.sin(phase)));
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat && "opacity" in mat) mat.opacity = solidOpacity(o, light);
    });
  });

  const material = (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={light ? 0 : 0.6 * intensity}
      metalness={mp.metalness}
      roughness={mp.roughness}
      transparent
      opacity={solidOpacity(op, light)}
    />
  );

  return (
    <group ref={group}>
      {/* bars along x, stacked on y */}
      {positions.map((y, i) => (
        <mesh key={`x${i}`} position={[0, y, 0]}>
          <boxGeometry args={[span, bar, bar]} />
          {material}
        </mesh>
      ))}
      {/* bars along y, stacked on x */}
      {positions.map((x, i) => (
        <mesh key={`y${i}`} position={[x, 0, 0]}>
          <boxGeometry args={[bar, span, bar]} />
          {material}
        </mesh>
      ))}
      {/* single z-axis bar through the center to reveal the third dimension */}
      <mesh>
        <boxGeometry args={[bar, bar, span]} />
        {material}
      </mesh>
    </group>
  );
}

function CircleRings3D({ fn, color, weight, intensity, light }: PrimitiveProps) {
  const group = useRef<THREE.Group>(null);
  const outward = fn.attitude === "e";
  const sc = layerScale(weight, outward);
  const op = layerOpacity(weight, light);
  const mp = materialParams(light);
  const orbitDur = 24 / SPEED[weight];
  const breathDur = 4.5 / SPEED[weight];
  const r = 0.6 * sc;
  const tube = 0.02 * Math.sqrt(sc);

  useMotionFrame((s) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    group.current.rotation.y = (t / orbitDur) * Math.PI * 2;
    group.current.rotation.x = Math.sin(t / (orbitDur * 1.2)) * 0.25;
    const phase = Math.sin((t / breathDur) * Math.PI * 2);
    group.current.scale.setScalar(1 + phase * 0.05);
  });

  const torusMaterial = (opacity: number) => (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={light ? 0 : 0.55 * intensity}
      metalness={mp.metalness}
      roughness={mp.roughness}
      transparent
      opacity={solidOpacity(opacity, light)}
    />
  );

  if (outward) {
    // Three orthogonal orbital tori — interlocking orbs in xy/yz/xz
    return (
      <group ref={group}>
        <mesh>
          <torusGeometry args={[r, tube, 20, 96]} />
          {torusMaterial(op)}
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r * 0.92, tube, 20, 96]} />
          {torusMaterial(op * 0.9)}
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[r * 0.84, tube, 20, 96]} />
          {torusMaterial(op * 0.8)}
        </mesh>
      </group>
    );
  }
  // Introverted: three concentric tori on the same plane
  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[r, tube, 20, 96]} />
        {torusMaterial(op)}
      </mesh>
      <mesh>
        <torusGeometry args={[r * 0.66, tube, 20, 96]} />
        {torusMaterial(op * 0.8)}
      </mesh>
      <mesh>
        <torusGeometry args={[r * 0.33, tube, 20, 96]} />
        {torusMaterial(op * 0.55)}
      </mesh>
    </group>
  );
}

function Primitive(props: PrimitiveProps) {
  switch (props.fn.process) {
    case "N": return <NodeBurst3D {...props} />;
    case "S": return <SquareStack3D {...props} />;
    case "T": return <GridCross3D {...props} />;
    case "F": return <CircleRings3D {...props} />;
  }
}

export default function MbtiTotemCanvas({
  archetype,
  isHovered = false,
}: {
  archetype: MbtiArchetype;
  isHovered?: boolean;
}) {
  const { theme } = useTheme();
  const light = theme === "light";
  const temp = getTemperament(archetype.temperament);
  const primary = light ? temp.secondary : temp.primary;
  const secondary = temp.primary;
  const dom = getFunction(archetype.stack[0].code);
  const aux = getFunction(archetype.stack[1].code);
  const intensity = isHovered ? 1.35 : 1.0;

  return (
    <div className="no-contrast-boost w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        {light ? (
          <>
            <ambientLight intensity={0.65} />
            <directionalLight position={[2, 3, 2]} intensity={0.45} color="#FFFFFF" />
            <directionalLight position={[-2, -1, 1]} intensity={0.2} color="#E8E2D2" />
          </>
        ) : (
          <>
            <ambientLight intensity={0.08} />
            <directionalLight position={[2, 3, 2]} intensity={0.25} color="#F0D060" />
            <directionalLight position={[-1, -2, 1]} intensity={0.1} color="#4488AA" />
            <pointLight color={primary} intensity={0.8 * intensity} distance={4} decay={2} />
          </>
        )}

        <Anchor color={primary} light={light} />

        {/* auxiliary layer sits behind the dominant */}
        <group position={[0, 0, -0.35]}>
          <Primitive fn={aux} color={secondary} weight="aux" intensity={intensity} light={light} />
        </group>
        <Primitive fn={dom} color={primary} weight="dom" intensity={intensity} light={light} />

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
