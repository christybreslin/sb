import type { Metadata } from "next";
import Feed from "@/components/Feed";
import { SHARE } from "@/lib/studio";

const description = "Photography and content from Studio Borne shoots for luxury and lifestyle brands.";

export const metadata: Metadata = {
  title: "The Feed",
  description,
  openGraph: { ...SHARE, title: "The Feed | Studio Borne", description },
};

export default function FeedPage() {
  return (
    /* Clipped, so the longer columns hanging below the frame do not add to the
       length of the page. */
    <main className="feed-page overflow-clip px-(--feed-gap)">
      <h1 className="sr-only">The Feed</h1>
      <Feed />
    </main>
  );
}
