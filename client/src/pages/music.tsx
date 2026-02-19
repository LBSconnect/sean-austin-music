import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, ExternalLink } from "lucide-react";
import type { MusicRelease } from "@shared/schema";

export default function MusicPage() {
  const { data: releases, isLoading } = useQuery<MusicRelease[]>({
    queryKey: ["/api/music-releases"],
  });

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
              Stream my latest releases and discover my full discography.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-card/50">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-muted animate-pulse rounded-lg mb-4" />
                    <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                    <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : releases && releases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {releases.map((release) => (
                <Card key={release.id} className="bg-card/50 hover:bg-card/70 transition-colors">
                  <CardContent className="p-6">
                    {release.coverUrl && (
                      <img
                        src={release.coverUrl}
                        alt={release.title}
                        className="aspect-square object-cover rounded-lg mb-4"
                        loading="lazy"
                      />
                    )}
                    <h3 className="font-display text-xl font-semibold text-primary">
                      {release.title}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {release.type} {release.releaseDate && `• ${release.releaseDate}`}
                    </p>
                    <div className="mt-4 flex gap-2 flex-wrap">
                      {release.spotifyUrl && (
                        <a href={release.spotifyUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline">
                            <Music className="w-4 h-4 mr-1" />
                            Spotify
                          </Button>
                        </a>
                      )}
                      {release.appleMusicUrl && (
                        <a href={release.appleMusicUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Apple Music
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Music className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No releases available yet.</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <h2 className="font-display text-2xl font-bold text-primary mb-6">
              Stream Now
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
