import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

// YouTube Channel
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/channel/UCqJBSSoAOwwQP0Hk1B06KRg";

export default function VideosPage() {
  return (
    <>
      <SEO
        title="Videos - Sean Austin"
        description="Watch Sean Austin's music videos and live performances."
      />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Videos
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Watch music videos and live performances.
            </p>
          </div>

          {/* YouTube Channel Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/50 hover:bg-card/70 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-6">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">
                  Sean Austin on YouTube
                </h2>
                <p className="text-muted-foreground mb-6">
                  Watch all my music videos, live performances, behind-the-scenes content, and more on my official YouTube channel.
                </p>
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch on YouTube
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Subscribe CTA */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Subscribe to stay updated with new releases and exclusive content.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
