import { Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLogo from "@assets/IMG_0989_1771277715074.jpg";
import heroBg from "@assets/Sean_Austin_2_1771278867766.jpg";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden"
      style={{ minHeight: "100svh" }}
      data-testid="section-hero"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.5 }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="relative mx-auto mb-6 sm:mb-8 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
          <img
            src={heroLogo}
            alt="Sean Austin"
            className="w-full h-auto"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 70%)",
              maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 70%)"
            }}
            data-testid="img-hero-logo"
          />
        </div>
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
