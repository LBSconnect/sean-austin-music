import { SEO } from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function MerchPage() {
  return (
    <>
      <SEO
        title="Merch - Sean Austin"
        description="Official Sean Austin merchandise. Shop t-shirts, hats, and more."
      />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Merchandise
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Official Sean Austin merchandise coming soon.
            </p>
          </div>

          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h2 className="font-display text-2xl font-bold text-primary mb-4">
              Coming Soon
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              We're working on some fresh merch for you. Sign up to be notified when the store opens.
            </p>
            <Button variant="outline" asChild>
              <a href="/fan-club">Join Fan Club for Early Access</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
