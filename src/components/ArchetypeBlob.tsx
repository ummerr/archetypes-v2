"use client";

import dynamic from "next/dynamic";
import { BLOB_CONFIGS } from "@/components/BlobScene";

const BlobScene = dynamic(() => import("@/components/BlobScene"), {
  ssr: false,
});

export default function ArchetypeBlob({ slug }: { slug: string }) {
  const config = BLOB_CONFIGS[slug];
  if (!config) return null;

  return (
    <div className="w-full h-full">
      <BlobScene configs={[config]} cameraZ={4} />
    </div>
  );
}
