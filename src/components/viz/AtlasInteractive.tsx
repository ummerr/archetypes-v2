"use client";

import { useState } from "react";
import AtlasLensCanvas, {
  type LensSystemMeta,
  type LensClusterMeta,
  type LensNodeMeta,
} from "./AtlasLensCanvas";
import ClusterGrid from "./ClusterGrid";
import type { ConstellationLayout } from "./ResonanceConstellation";

interface Props {
  layout: ConstellationLayout;
  systems: LensSystemMeta[];
  clusters: LensClusterMeta[];
  nodeMeta: Record<string, LensNodeMeta>;
}

export default function AtlasInteractive(props: Props) {
  const [highlight, setHighlight] = useState<string | null>(null);
  return (
    <div className="space-y-10">
      <AtlasLensCanvas
        {...props}
        highlightClusterId={highlight}
        onHighlightCluster={setHighlight}
      />
      <ClusterGrid onHoverCluster={setHighlight} />
    </div>
  );
}
