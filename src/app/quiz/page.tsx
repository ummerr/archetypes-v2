import type { Metadata } from "next";
import { absoluteUrl, buildPageMetadata } from "@/lib/site";
import QuizLanding from "./QuizLanding";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "The Reading",
    description:
      "About thirty minutes, six traditions, one cross-archetype cast. The depth successor to the Mirror — nothing stored, nothing sent.",
    path: "/quiz",
    ogImage: absoluteUrl("/api/og/mirror"),
  });
}

export default function QuizPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-14 md:py-20">
      <QuizLanding />
    </div>
  );
}
