import SEO from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ExternalLink, Shirt, Coffee } from "lucide-react";

const STORE_URL = "https://direct.distrokid.com/seanaustin3/";

// Featured merchandise items
const featuredItems = [
  {
    id: "tshirt-after-midnight",
    name: "After Midnight T-Shirt",
    price: "$25.00",
    category: "Unisex T-Shirt",
    description: "Premium cotton tee featuring the After Midnight album art",
    colors: "Black, Navy, White, Grey",
    icon: "shirt",
  },
  {
    id: "tshirt-afronomixx",
    name: "AFRONOMIXX T-Shirt",
    price: "$25.00",
    category: "Unisex T-Shirt",
    description: "Show your love for the AFRONOMIXX album",
    colors: "Black, Navy, White, Grey",
    icon: "shirt",
  },
  {
    id: "tshirt-purple-hearts",
    name: "Purple Hearts T-Shirt",
    price: "$25.00",
    category: "Unisex T-Shirt",
    description: "Rep the Purple Hearts album in style",
    colors: "Black, Navy, White, Grey",
    icon: "shirt",
  },
  {
    id: "mug-after-midnight",
    name: "After Midnight Mug",
    price: "$13.00",
    category: "Ceramic Mug",
    description: "Glossy ceramic mug, microwave & dishwasher safe",
    colors: "Multiple rim colors available",
    icon: "mug",
  },
  {
    id: "mug-teddy",
    name: "Teddy 2 The Future Mug",
    price: "$13.00",
    category: "Ceramic Mug",
    description: "Start your morning with some reggae vibes",
    colors: "Multiple rim colors available",
    icon: "mug",
  },
  {
    id: "tote-after-midnight",
    name: "After Midnight Tote Bag",
    price: "$26.00",
    category: "Tote Bag",
    description: "100% cotton with reinforced handle stitching",
    colors: "Black, Natural",
    icon: "bag",
  },
];

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

          {/* Featured Items Grid */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-primary text-center mb-8">
              Featured Items
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <a
                  key={item.id}
                  href={STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className="bg-card/50 hover:bg-card/70 transition-all hover:scale-105 h-full">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                        {item.icon === "shirt" && <Shirt className="w-8 h-8 text-primary" />}
                        {item.icon === "mug" && <Coffee className="w-8 h-8 text-primary" />}
                        {item.icon === "bag" && <ShoppingBag className="w-8 h-8 text-primary" />}
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          {item.category}
                        </p>
                        <h3 className="font-display text-lg font-semibold text-primary mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {item.colors}
                        </p>
                        <p className="text-xl font-bold text-primary">
                          {item.price}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* Store Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/50 hover:bg-card/70 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-primary mb-4">
                  View Full Collection
                </h2>
                <p className="text-muted-foreground mb-6">
                  Browse the complete store for all merchandise including T-shirts (S-5XL), women's cuts, mugs, tote bags, and more.
                </p>
                <a
                  href={STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Shop All Items
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
