import SEO from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ExternalLink } from "lucide-react";

const STORE_URL = "https://direct.distrokid.com/seanaustin3/";

// Featured merchandise items with actual product images
const featuredItems = [
  {
    id: "tshirt-after-midnight",
    name: "After Midnight T-Shirt",
    price: "$25.00",
    category: "Unisex T-Shirt",
    image: "https://images.zoogletools.com/s:bzglfiles/u/1262585/c1cedf62a19bfa5158d43acb4de6042954fc61f1/original/5fb7801c-e525-4ddc-87b4-a2071f624b11.png",
  },
  {
    id: "tshirt-afronomixx",
    name: "AFRONOMIXX T-Shirt",
    price: "$25.00",
    category: "Unisex T-Shirt",
    image: "https://images.zoogletools.com/s:bzglfiles/u/1262585/e54b1957e19c988fbc3ad4615e8d41a307532e40/original/6291500a-2f26-4f93-8d05-5991a33fd8bd.png",
  },
  {
    id: "tshirt-purple-hearts",
    name: "Purple Hearts T-Shirt",
    price: "$25.00",
    category: "Unisex T-Shirt",
    image: "https://images.zoogletools.com/s:bzglfiles/u/1262585/fdb248ead60e0ac7f343c841d8594f742bb31cbf/original/0f43e36a-afaf-41f6-8afc-8060fb8fe085.png",
  },
  {
    id: "mug-after-midnight",
    name: "After Midnight Mug",
    price: "$13.00",
    category: "Ceramic Mug",
    image: "https://images.zoogletools.com/s:bzglfiles/u/1262585/25a8ca6bc060f4c513e935121899a9d1fb484c68/original/90056f4a-8b0f-4d43-b0e0-742181f55f90.png",
  },
  {
    id: "mug-teddy",
    name: "Teddy 2 The Future Mug",
    price: "$13.00",
    category: "Ceramic Mug",
    image: "https://images.zoogletools.com/s:bzglfiles/u/1262585/aedcc545bebb118c02f0636b107876b796f44907/original/ac776715-ecaf-4116-9574-0bbe552dbcbc.png",
  },
  {
    id: "tote-after-midnight",
    name: "After Midnight Tote Bag",
    price: "$26.00",
    category: "Tote Bag",
    image: "https://images.zoogletools.com/s:bzglfiles/u/1262585/da39cf1ef5e5f0540d8176c971b86271ff49b8d5/original/8803a50d-b911-4d11-92cb-2ddb2fc1d2c9.png",
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
                  <Card className="bg-card/50 hover:bg-card/70 transition-all hover:scale-105 h-full overflow-hidden">
                    <div className="aspect-square overflow-hidden bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          {item.category}
                        </p>
                        <h3 className="font-display text-lg font-semibold text-primary mb-2">
                          {item.name}
                        </h3>
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
