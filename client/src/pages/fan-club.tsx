import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import SEO from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Check, Star, Crown, Heart } from "lucide-react";

interface FanClubProduct {
  product_id: string;
  product_name: string;
  product_description: string;
  price_id: string;
  unit_amount: number;
  currency: string;
  recurring: { interval: string; interval_count: number };
}

export default function FanClubPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const { data: products, isLoading } = useQuery<FanClubProduct[]>({
    queryKey: ["/api/fan-club/products"],
  });

  const checkoutMutation = useMutation({
    mutationFn: async ({ priceId, email }: { priceId: string; email: string }) => {
      const res = await apiRequest("POST", "/api/fan-club/checkout", { priceId, email });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleJoin = (priceId: string) => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Email Required",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    checkoutMutation.mutate({ priceId, email });
  };

  return (
    <>
      <SEO
        title="Fan Club - Sean Austin"
        description="Join Sean Austin's Fan Club for exclusive content, early access, and more."
      />
      <div className="min-h-screen py-20 px-6 relative">
        {/* Background Rasta Logo with 25% opacity */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0.25 }}
        >
          <img
            src="/attached_assets/logo_white_bg_1771277560431.png"
            alt=""
            className="w-full max-w-2xl h-auto"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-background/70" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Fan Club
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Join the inner circle for exclusive content and experiences.
            </p>
          </div>

          {/* Email Input */}
          <div className="max-w-md mx-auto mb-12">
            <Label htmlFor="email" className="sr-only">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email to join"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <Card className="bg-card/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Free</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold text-primary">$0</span>
                  <span className="text-muted-foreground">/forever</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {["Email updates", "Public content access", "Community access"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-6" disabled>
                  Current Plan
                </Button>
              </CardContent>
            </Card>

            {/* Premium Tier */}
            <Card className="bg-card/50 border-primary">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  Premium
                  <Star className="w-4 h-4 text-yellow-500" />
                </CardTitle>
                <CardDescription>
                  {isLoading ? (
                    <span className="text-muted-foreground">Loading...</span>
                  ) : products && products.length > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-primary">
                        ${(products[0].unit_amount / 100).toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">
                        /{products[0].recurring.interval}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-primary">$9.99/mo</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Exclusive unreleased tracks",
                    "Private livestreams",
                    "Early ticket access",
                    "Behind-the-scenes content",
                    "Direct messages",
                    "Member-only merch drops",
                    "Free DJ dubplates and drops",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-6"
                  onClick={() => products && products[0] && handleJoin(products[0].price_id)}
                  disabled={isLoading || !products || products.length === 0 || checkoutMutation.isPending}
                >
                  {checkoutMutation.isPending ? "Loading..." : "Join Premium"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
