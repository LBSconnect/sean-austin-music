import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import SEO from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Check, Star, Crown, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryPhotos = [
  "/attached_assets/Sean_Austin_new1.jpeg",
  "/attached_assets/Sean_Austin_new2.jpeg",
  "/attached_assets/Sean_Austin_new3.jpeg",
  "/attached_assets/Sean_Austin_new6.jpeg",
  "/attached_assets/Sean_Austin_new7.jpeg",
  "/attached_assets/Sean Austin (1).jpeg",
  "/attached_assets/Sean Austin (2).jpeg",
  "/attached_assets/Sean Austin (3).jpeg",
  "/attached_assets/Sean Austin (4).jpeg",
  "/attached_assets/Sean Austin (5).jpeg",
  "/attached_assets/Sean Austin (6).jpeg",
  "/attached_assets/Sean Austin (7).jpeg",
];

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + galleryPhotos.length) % galleryPhotos.length));
  const nextPhoto = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryPhotos.length));

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
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Fan Club
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Join the inner circle for exclusive content and experiences.
            </p>
          </div>

          {/* Photo Gallery */}
          <div className="mb-12">
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {galleryPhotos.map((src, i) => (
                <button
                  key={src}
                  className="block w-full break-inside-avoid overflow-hidden rounded-lg cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={src}
                    alt={`Sean Austin photo ${i + 1}`}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Lightbox */}
          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
              onClick={closeLightbox}
            >
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
                onClick={closeLightbox}
                aria-label="Close"
              >
                <X className="w-7 h-7" />
              </button>
              <button
                className="absolute left-4 text-white/80 hover:text-white p-2"
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                aria-label="Previous"
              >
                <ChevronLeft className="w-9 h-9" />
              </button>
              <img
                src={galleryPhotos[lightboxIndex]}
                alt={`Sean Austin photo ${lightboxIndex + 1}`}
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="absolute right-4 text-white/80 hover:text-white p-2"
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                aria-label="Next"
              >
                <ChevronRight className="w-9 h-9" />
              </button>
              <span className="absolute bottom-4 text-white/50 text-sm">
                {lightboxIndex + 1} / {galleryPhotos.length}
              </span>
            </div>
          )}

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
            <Card
              className="relative overflow-hidden border-0"
              style={{
                backgroundImage: "url('/attached_assets/Sean_Austin_new4.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            >
              <div className="absolute inset-0 bg-black/65" />
              <CardHeader className="relative z-10 text-center">
                <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-white">Free</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold text-primary">$0</span>
                  <span className="text-white/60">/forever</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-3">
                  {["Email updates", "Public content access", "Community access"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-white/75">
                      <Check className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-6 border-white/30 text-white bg-white/10 hover:bg-white/20" disabled>
                  Current Plan
                </Button>
              </CardContent>
            </Card>

            {/* Premium Tier */}
            <Card
              className="relative overflow-hidden border-2 border-primary"
              style={{
                backgroundImage: "url('/attached_assets/Sean_Austin_new5.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            >
              <div className="absolute inset-0 bg-black/65" />
              <CardHeader className="relative z-10 text-center">
                <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-white flex items-center justify-center gap-2">
                  Premium
                  <Star className="w-4 h-4 text-yellow-400" />
                </CardTitle>
                <CardDescription>
                  {isLoading ? (
                    <span className="text-white/60">Loading...</span>
                  ) : products && products.length > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-primary">
                        ${(products[0].unit_amount / 100).toFixed(2)}
                      </span>
                      <span className="text-white/60">
                        /{products[0].recurring.interval}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-primary">$9.99/mo</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
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
                    <li key={feature} className="flex items-center gap-2 text-white/75">
                      <Check className="w-4 h-4 text-green-400" />
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
