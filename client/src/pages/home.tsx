import Hero from "@/components/hero";
import FeaturedRelease from "@/components/featured-release";
import TourPreview from "@/components/tour-preview";
import Story from "@/components/story";
import { SEO } from "@/components/seo";

export default function Home() {
  return (
    <>
      <SEO
        title="Sean Austin - Official Website"
        description="Official website of reggae artist Sean Austin. Stream music, watch videos, and get tour dates."
      />
      <Hero />
      <FeaturedRelease />
      <TourPreview />
      <Story />
    </>
  );
}
