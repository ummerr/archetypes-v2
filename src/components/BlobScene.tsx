"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Simplex noise (GLSL) ─────────────────────────── */

const noise3D = /* glsl */ `
  vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
  vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
  vec4 permute(vec4 x){return mod289((x*34.+1.)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);
    const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.,i1.z,i2.z,1.))
      +i.y+vec4(0.,i1.y,i2.y,1.))
      +i.x+vec4(0.,i1.x,i2.x,1.));
    float n_=.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1.;
    vec4 s1=floor(b1)*2.+1.;
    vec4 sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
    m=m*m;
    return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;

/* ─── Blob config per archetype ────────────────────── */

export interface BlobConfig {
  color: string;
  color2: string;
  radius: number;
  noiseFreq: number;
  noiseAmp: number;
  noiseSpeed: number;
  noiseFreq2: number;
  noiseAmp2: number;
  detail: number;
  fresnelPower: number;
  fresnelStrength: number;
  baseAlpha: number;
  rotSpeed: [number, number, number];
}

export const BLOB_CONFIGS: Record<string, BlobConfig> = {
  // ── Man archetypes ──────────────────────────────

  "the-king": {
    color: "#C6A355",
    color2: "#E8D48B",
    radius: 1.6,
    noiseFreq: 0.9,
    noiseAmp: 0.2,
    noiseSpeed: 0.15,
    noiseFreq2: 2.0,
    noiseAmp2: 0.06,
    detail: 48,
    fresnelPower: 3.0,
    fresnelStrength: 0.5,
    baseAlpha: 0.05,
    rotSpeed: [0.02, 0.03, 0.0],
  },

  "the-warrior": {
    color: "#A3333D",
    color2: "#D45D5D",
    radius: 1.5,
    noiseFreq: 1.6,
    noiseAmp: 0.28,
    noiseSpeed: 0.3,
    noiseFreq2: 3.5,
    noiseAmp2: 0.1,
    detail: 48,
    fresnelPower: 2.5,
    fresnelStrength: 0.55,
    baseAlpha: 0.04,
    rotSpeed: [0.04, 0.05, 0.01],
  },

  "the-magician": {
    color: "#2D6A4F",
    color2: "#52B788",
    radius: 1.5,
    noiseFreq: 1.3,
    noiseAmp: 0.22,
    noiseSpeed: 0.2,
    noiseFreq2: 3.0,
    noiseAmp2: 0.08,
    detail: 48,
    fresnelPower: 3.5,
    fresnelStrength: 0.6,
    baseAlpha: 0.03,
    rotSpeed: [0.015, 0.025, 0.02],
  },

  "the-lover": {
    color: "#C97B84",
    color2: "#E8A0AB",
    radius: 1.6,
    noiseFreq: 0.8,
    noiseAmp: 0.18,
    noiseSpeed: 0.18,
    noiseFreq2: 1.8,
    noiseAmp2: 0.05,
    detail: 48,
    fresnelPower: 2.8,
    fresnelStrength: 0.5,
    baseAlpha: 0.06,
    rotSpeed: [0.02, 0.02, 0.015],
  },

  // ── Boy archetypes ──────────────────────────────

  "the-divine-child": {
    color: "#E8D48B",
    color2: "#C6A355",
    radius: 1.2,
    noiseFreq: 1.0,
    noiseAmp: 0.12,
    noiseSpeed: 0.22,
    noiseFreq2: 2.2,
    noiseAmp2: 0.04,
    detail: 32,
    fresnelPower: 2.5,
    fresnelStrength: 0.55,
    baseAlpha: 0.08,
    rotSpeed: [0.03, 0.04, 0.01],
  },

  "the-hero": {
    color: "#D45D5D",
    color2: "#A3333D",
    radius: 1.3,
    noiseFreq: 1.8,
    noiseAmp: 0.2,
    noiseSpeed: 0.35,
    noiseFreq2: 4.0,
    noiseAmp2: 0.08,
    detail: 32,
    fresnelPower: 2.2,
    fresnelStrength: 0.5,
    baseAlpha: 0.05,
    rotSpeed: [0.05, 0.06, 0.02],
  },

  "the-precocious-child": {
    color: "#52B788",
    color2: "#2D6A4F",
    radius: 1.2,
    noiseFreq: 1.5,
    noiseAmp: 0.14,
    noiseSpeed: 0.28,
    noiseFreq2: 3.5,
    noiseAmp2: 0.06,
    detail: 32,
    fresnelPower: 3.0,
    fresnelStrength: 0.55,
    baseAlpha: 0.05,
    rotSpeed: [0.025, 0.04, 0.03],
  },

  "the-oedipal-child": {
    color: "#E8A0AB",
    color2: "#C97B84",
    radius: 1.2,
    noiseFreq: 0.9,
    noiseAmp: 0.1,
    noiseSpeed: 0.2,
    noiseFreq2: 2.0,
    noiseAmp2: 0.03,
    detail: 32,
    fresnelPower: 2.5,
    fresnelStrength: 0.5,
    baseAlpha: 0.07,
    rotSpeed: [0.025, 0.03, 0.02],
  },
};

/* ─── Single blob mesh ─────────────────────────────── */

function Blob({ config }: { config: BlobConfig }) {
  const mesh = useRef<THREE.Mesh>(null);

  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(config.color) },
        uColor2: { value: new THREE.Color(config.color2) },
        uNoiseFreq: { value: config.noiseFreq },
        uNoiseAmp: { value: config.noiseAmp },
        uNoiseSpeed: { value: config.noiseSpeed },
        uNoiseFreq2: { value: config.noiseFreq2 },
        uNoiseAmp2: { value: config.noiseAmp2 },
        uFresnelPower: { value: config.fresnelPower },
        uFresnelStrength: { value: config.fresnelStrength },
        uBaseAlpha: { value: config.baseAlpha },
      },
      vertexShader: /* glsl */ `
        ${noise3D}
        uniform float uTime;
        uniform float uNoiseFreq;
        uniform float uNoiseAmp;
        uniform float uNoiseSpeed;
        uniform float uNoiseFreq2;
        uniform float uNoiseAmp2;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;

        void main() {
          float t = uTime;
          float n1 = snoise(position * uNoiseFreq + t * uNoiseSpeed) * uNoiseAmp;
          float n2 = snoise(position * uNoiseFreq2 + t * uNoiseSpeed * 1.5) * uNoiseAmp2;
          float displacement = n1 + n2;

          vec3 newPos = position + normal * displacement;
          vDisplacement = displacement;
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(newPos, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform vec3 uColor2;
        uniform float uFresnelPower;
        uniform float uFresnelStrength;
        uniform float uBaseAlpha;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;

        void main() {
          vec3 viewDir = normalize(-vPosition);
          float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), uFresnelPower);

          float mix_t = smoothstep(-0.15, 0.2, vDisplacement);
          vec3 col = mix(uColor, uColor2, mix_t * 0.4);
          col += fresnel * uColor * 0.4;

          float alpha = uBaseAlpha + fresnel * uFresnelStrength;
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.color, config.color2]);

  useFrame((_, delta) => {
    mat.uniforms.uTime.value += delta;
    if (mesh.current) {
      mesh.current.rotation.x += delta * config.rotSpeed[0];
      mesh.current.rotation.y += delta * config.rotSpeed[1];
      mesh.current.rotation.z += delta * config.rotSpeed[2];
    }
  });

  return (
    <mesh ref={mesh} material={mat}>
      <icosahedronGeometry args={[config.radius, config.detail]} />
    </mesh>
  );
}

/* ─── Canvas wrapper ───────────────────────────────── */

export default function BlobScene({
  configs,
  cameraZ = 4.5,
}: {
  configs: BlobConfig[];
  cameraZ?: number;
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        {configs.map((c, i) => (
          <Blob key={i} config={c} />
        ))}
      </Canvas>
    </div>
  );
}
