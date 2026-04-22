import type { Metadata } from "next";
import { absoluteUrl, buildPageMetadata } from "@/lib/site";
import QuizTakeClient from "./QuizTakeClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "The Reading — cast",
    description:
      "Fifty questions, four sections, about thirty minutes. Answer the way you would answer a friend.",
    path: "/quiz/take",
    ogImage: absoluteUrl("/api/og/mirror"),
  });
}

export default function QuizTakePage() {
  return <QuizTakeClient />;
}
