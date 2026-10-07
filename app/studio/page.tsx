import type { Metadata } from "next";
import StudioContent from "@/components/StudioContent";
import StudioMotion from "@/components/StudioMotion";

export const metadata: Metadata = { title: "The studio" };

export default function Studio() {
  return (
    <StudioMotion>
      <StudioContent />
    </StudioMotion>
  );
}
