import { Button } from "@/components/ui/button";
import { Music, ShoppingBag } from "lucide-react";
import { SiApplemusic } from "react-icons/si";

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

        {/* Apple Music Album Link with Cover Art */}
        <div className="mt-8">
          <a
            href="https://music.apple.com/us/album/after-midnight-feat-friends-ep/1876787290"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group"
          >
            <div className="relative mx-auto w-64 h-64 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
              <img
                src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/67/3c/e5/673ce540-b3a4-331f-7b7b-0e3beb5f88a0/artwork.jpg/600x600bb.jpg"
                alt="After Midnight EP Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <SiApplemusic className="w-12 h-12 text-white" />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground flex items-center justify-center gap-2 group-hover:text-primary transition-colors">
              <SiApplemusic className="w-4 h-4" />
              Listen on Apple Music
            </p>
          </a>
        </div>

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
