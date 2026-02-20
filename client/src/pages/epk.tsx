import { useQuery } from "@tanstack/react-query";
import SEO from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Music, Video, Quote, Mail } from "lucide-react";
import type { PressQuote } from "@shared/schema";

export default function EPKPage() {
  const { data: pressQuotes } = useQuery<PressQuote[]>({
    queryKey: ["/api/press-quotes"],
  });

  return (
    <>
      <SEO
        title="Electronic Press Kit - Sean Austin"
        description="Sean Austin's Electronic Press Kit. Bio, press photos, music, videos, and booking information."
      />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Electronic Press Kit
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Everything you need for press coverage and booking inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bio Section */}
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle>Artist Bio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Sean Austin is an international reggae artist who blends traditional Jamaican
                  roots with modern global sounds. With a unique fusion of authentic reggae
                  tradition and contemporary influences, his music bridges cultures and
                  generations, connecting listeners across the world through rhythm and soul.
                </p>
              </CardContent>
            </Card>

            {/* Press Photos */}
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle>Press Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  High-resolution press photos available for download.
                </p>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Press Kit
                </Button>
              </CardContent>
            </Card>

            {/* Music */}
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Featured Music
                </CardTitle>
              </CardHeader>
              <CardContent>
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/artist/0ZTUFRHKN1R7Se9eq5QTAT?utm_source=generator&theme=0"
                  width="100%"
                  height="200"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Player"
                />
              </CardContent>
            </Card>

            {/* Videos */}
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Featured Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Video embed coming soon</p>
                </div>
              </CardContent>
            </Card>

            {/* Press Quotes */}
            {pressQuotes && pressQuotes.length > 0 && (
              <Card className="bg-card/50 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Quote className="w-5 h-5" />
                    Press Quotes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pressQuotes.map((quote) => (
                      <blockquote key={quote.id} className="border-l-2 border-primary pl-4">
                        <p className="text-muted-foreground italic">"{quote.quote}"</p>
                        <cite className="block mt-2 text-sm text-primary not-italic">
                          — {quote.source}
                        </cite>
                      </blockquote>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Booking Contact */}
            <Card className="bg-card/50 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Booking & Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For booking inquiries and press requests, please contact:
                </p>
                <a href="/contact">
                  <Button>
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Us
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
