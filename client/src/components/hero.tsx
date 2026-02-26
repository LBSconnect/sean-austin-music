import { Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@assets/Sean_Austin_new2.jpeg";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-end text-center px-4 sm:px-6 overflow-hidden pb-14 sm:pb-20"
      style={{ minHeight: "100svh" }}
      data-testid="section-hero"
    >
      {/* Base background color */}
      <div className="absolute inset-0 bg-background" />

      {/* Artist photo — object-top keeps face in upper portion, unobstructed */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover object-top"
          style={{ opacity: 0.65 }}
        />
      </div>

      {/* Gradient scrim: transparent at top → dark at bottom so content reads cleanly */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-transparent" style={{ top: "40%" }} />

      {/* Content pinned to bottom — text never overlaps the face */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight" data-testid="text-hero-headline">
          ROOTS. ROCK. REGGAE.
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg max-w-2xl mx-auto text-gray-300 leading-relaxed px-2">
          Sean Austin blends Jamaican roots with modern global sound —
          music that moves your spirit and your body.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a href="https://open.spotify.com/artist/0ZTUFRHKN1R7Se9eq5QTAT" target="_blank" rel="noopener noreferrer">
            <Button size="lg" data-testid="button-stream-now">
              <Music className="w-4 h-4 mr-2" />
              Stream Now
            </Button>
          </a>
          <a href="/videos">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/20 text-white"
              style={{ WebkitBackdropFilter: "blur(4px)", backdropFilter: "blur(4px)" }}
              data-testid="button-watch-video"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Video
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
