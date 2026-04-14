import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";
import SectionHeading from "@/components/shared/SectionHeading";
import HermeneuticCaveat from "@/components/shared/HermeneuticCaveat";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Your Profile",
    description:
      "Build a persistent archetypal profile across six systems. Stored in your browser — never sent anywhere.",
    path: "/profile",
  }),
  robots: { index: false, follow: true },
};

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-20">
      <SectionHeading kicker="Profile" as="h1">
        Your Cross-System Profile
      </SectionHeading>
      <HermeneuticCaveat variant="inline" className="mb-8" />
      <ProfileClient />
    </div>
  );
}
