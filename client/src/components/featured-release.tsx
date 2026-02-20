import { Button } from "@/components/ui/button";
import { Music, ShoppingBag } from "lucide-react";

export default function FeaturedRelease() {
  return (
    <section className="py-20 px-6 text-center" data-testid="section-featured-release">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">New Release</p>
        <h2 className="font-display text-3xl font-bold text-primary" data-testid="text-featured-release-title">
          After Midnight EP
        </h2>
        <p className="mt-4 text-muted-foreground">
          Experience soulful reggae storytelling with a modern edge. Stream now on all platforms.
        </p>

        <div className="mt-8">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/artist/0ZTUFRHKN1R7Se9eq5QTAT?utm_source=generator&theme=0"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Player"
            data-testid="embed-spotify"
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="/music">
            <Button variant="outline" size="lg">
              <Music className="w-4 h-4 mr-2" />
              View All Releases
            </Button>
          </a>
          <a href="/merch">
            <Button variant="outline" size="lg">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop Merch
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
