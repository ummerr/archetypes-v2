"use client";

import dynamic from "next/dynamic";
import type { BlobConfig } from "@/components/BlobScene";
import CanvasSkeleton from "@/components/shared/CanvasSkeleton";

const BlobScene = dynamic(() => import("@/components/BlobScene"), {
  ssr: false,
  loading: () => <CanvasSkeleton />,
});

// Quiet outer man blob
const manBlob: BlobConfig = {
  color: "#C6A355",
  color2: "#A3333D",
  radius: 1.8,
  noiseFreq: 0.7,
  noiseAmp: 0.12,
  noiseSpeed: 0.12,
  noiseFreq2: 1.8,
  noiseAmp2: 0.04,
  detail: 48,
  fresnelPower: 3.5,
  fresnelStrength: 0.35,
  baseAlpha: 0.02,
  rotSpeed: [0.01, 0.015, 0.0],
};

// Gentle inner boy blob
const boyBlob: BlobConfig = {
  color: "#E8D48B",
  color2: "#C97B84",
  radius: 0.85,
  noiseFreq: 1.0,
  noiseAmp: 0.08,
  noiseSpeed: 0.18,
  noiseFreq2: 2.2,
  noiseAmp2: 0.03,
  detail: 32,
  fresnelPower: 2.5,
  fresnelStrength: 0.4,
  baseAlpha: 0.06,
  rotSpeed: [-0.02, 0.03, 0.01],
};

export default function BlobHero() {
  return (
    <div className="absolute inset-0">
      <BlobScene configs={[manBlob, boyBlob]} cameraZ={5} />
    </div>
  );
}
