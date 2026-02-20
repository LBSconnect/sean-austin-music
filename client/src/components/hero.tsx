import { Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLogo from "@assets/IMG_0989_1771277715074.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="relative mx-auto mb-8 w-[512px] md:w-[640px] lg:w-[768px]">
          <img
            src={heroLogo}
            alt="Sean Austin"
            className="w-full h-auto mix-blend-screen scale-150"
            style={{ clipPath: "inset(15%)" }}
            data-testid="img-hero-logo"
          />
          <div className="absolute inset-0 pointer-events-none scale-150" style={{ clipPath: "inset(15%)" }}>
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
          </div>
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary leading-tight" data-testid="text-hero-headline">
          ROOTS. ROCK. REGGAE.
        </h1>
        <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-300 leading-relaxed">
          Sean Austin blends Jamaican roots with modern global sound —
          music that moves your spirit and your body.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="https://open.spotify.com/artist/0ZTUFRHKN1R7Se9eq5QTAT" target="_blank" rel="noopener noreferrer">
            <Button size="lg" data-testid="button-stream-now">
              <Music className="w-4 h-4 mr-2" />
              Stream Now
            </Button>
          </a>
          <a href="/videos">
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white" data-testid="button-watch-video">
              <Play className="w-4 h-4 mr-2" />
              Watch Video
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
