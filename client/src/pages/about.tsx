import SEO from "@/components/seo";
import { useEffect } from "react";
import { FaInstagram } from "react-icons/fa6";

// Photo gallery images from attached_assets
const photos = [
  { src: "/attached_assets/Sean_Austin_1771278867767.jpg", alt: "Sean Austin" },
  { src: "/attached_assets/Sean_Austin_2_1771278867766.jpg", alt: "Sean Austin performing" },
  { src: "/attached_assets/Sean_Austin_4_1771278867766.jpg", alt: "Sean Austin live" },
  { src: "/attached_assets/sean_austin_5_1771278867767.jpg", alt: "Sean Austin portrait" },
  { src: "/attached_assets/Sean_Austin3_1771278687231.jpg", alt: "Sean Austin on stage" },
  { src: "/attached_assets/IMG_0989_1771277715074.jpg", alt: "Sean Austin promo" },
];

export default function AboutPage() {
  // Load Instagram embed script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <SEO
        title="About - Sean Austin"
        description="Learn about Sean Austin, international reggae artist blending Jamaican roots with modern global sound."
      />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              About Sean Austin
            </h1>
          </div>

          {/* Bio Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Sean Austin is an international reggae artist who blends traditional Jamaican roots
                with modern global sounds, creating music that moves both spirit and body.
              </p>
              <p>
                With a unique fusion of authentic reggae tradition and contemporary influences,
                Sean Austin delivers music that bridges cultures and generations, connecting
                listeners across the world through the universal language of rhythm and soul.
              </p>
              <p>
                From intimate venues to international stages, Sean Austin's live performances
                bring the energy and spirit of reggae to audiences everywhere, creating
                unforgettable experiences that resonate long after the last note fades.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
            <div>
              <div className="font-display text-4xl font-bold text-primary">1M+</div>
              <div className="text-muted-foreground">Streams</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Live Shows</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Followers</div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-primary text-center mb-8">
              Photo Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg bg-card/50"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Instagram Feed */}
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-primary text-center mb-8 flex items-center justify-center gap-3">
              <FaInstagram className="w-7 h-7" />
              Follow on Instagram
            </h2>
            <div className="flex justify-center">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/iamseanaustin/"
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  borderRadius: "3px",
                  boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                  margin: "1px",
                  maxWidth: "540px",
                  minWidth: "326px",
                  padding: 0,
                  width: "calc(100% - 2px)",
                }}
              >
                <a
                  href="https://www.instagram.com/iamseanaustin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 text-center text-primary hover:underline"
                >
                  View @iamseanaustin on Instagram
                </a>
              </blockquote>
            </div>
            <div className="text-center mt-6">
              <a
                href="https://www.instagram.com/iamseanaustin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <FaInstagram className="w-5 h-5" />
                @iamseanaustin
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
