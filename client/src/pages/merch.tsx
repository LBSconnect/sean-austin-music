import SEO from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ExternalLink } from "lucide-react";

const STORE_URL = "https://direct.distrokid.com/seanaustin3/";

export default function MerchPage() {
  return (
    <>
      <SEO
        title="Merch - Sean Austin"
        description="Official Sean Austin merchandise. Shop music, apparel, and more."
      />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Official Store
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Shop official Sean Austin merchandise and music.
            </p>
          </div>

          {/* Store Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/50 hover:bg-card/70 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">
                  Sean Austin Official Store
                </h2>
                <p className="text-muted-foreground mb-6">
                  Browse the official store for exclusive music releases, merchandise, and more. Support the artist directly.
                </p>
                <a
                  href={STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Shop Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              All purchases support the artist directly. Thank you for your support!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
