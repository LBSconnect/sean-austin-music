import SEO from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, ExternalLink } from "lucide-react";

// DistroKid Hyperfollow links - these auto-update with streaming links
const releases = [
  {
    id: "after-midnight",
    title: "After Midnight",
    url: "https://distrokid.com/hyperfollow/seanaustin1/after-midnight",
  },
  {
    id: "afronomixx",
    title: "Afronomixx",
    url: "https://distrokid.com/hyperfollow/seanaustin1/afronomixx",
  },
  {
    id: "purple-hearts-2",
    title: "Purple Hearts 2",
    url: "https://distrokid.com/hyperfollow/seanaustin1/purple-hearts-2",
  },
  {
    id: "2020-pt-2-reloaded",
    title: "2020 Pt. 2 Reloaded",
    url: "https://distrokid.com/hyperfollow/seanaustin1/2020-pt-2-reloaded",
  },
  {
    id: "2020-pt-1",
    title: "2020 Pt. 1",
    url: "https://distrokid.com/hyperfollow/seanaustin1/sean-austin-2020-pt-1",
  },
];

export default function MusicPage() {
  return (
    <>
      <SEO
        title="Music - Sean Austin"
        description="Listen to Sean Austin's music catalog. Stream albums, singles, and EPs on all platforms."
      />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Music
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Stream my latest releases on your favorite platform.
            </p>
          </div>

          {/* Releases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {releases.map((release) => (
              <a
                key={release.id}
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="bg-card/50 hover:bg-card/70 transition-all hover:scale-105 h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                      <Music className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-primary text-center">
                      {release.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      Stream Now
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* Spotify Artist Embed */}
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-primary mb-6">
              Full Discography on Spotify
            </h2>
            <div className="max-w-md mx-auto">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/artist/0ZTUFRHKN1R7Se9eq5QTAT?utm_source=generator&theme=0"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Artist Profile"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
