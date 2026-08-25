import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaXTwitter, FaYoutube, FaFacebook, FaTiktok, FaSpotify } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import { ArrowUpRight, Radio } from "lucide-react";
import Container from "@/components/container";

const socialPlatforms = [
  {
    name: "Instagram",
    handle: "@iamseanaustin",
    url: "https://instagram.com/iamseanaustin",
    icon: FaInstagram,
    description: "Behind-the-scenes & daily vibes",
    cta: "Follow",
    // Instagram's signature gradient
    gradient: "from-[#feda75] via-[#d62976] to-[#4f5bd5]",
    glow: "hover:shadow-[#d62976]/40",
  },
  {
    name: "YouTube",
    handle: "@SeanAustinReggae",
    url: "https://www.youtube.com/@SeanAustinReggae",
    icon: FaYoutube,
    description: "Music videos & live performances",
    cta: "Subscribe",
    gradient: "from-[#ff4d4d] to-[#8b0000]",
    glow: "hover:shadow-red-600/40",
  },
  {
    name: "TikTok",
    handle: "@iamseanaustin",
    url: "https://tiktok.com/@iamseanaustin",
    icon: FaTiktok,
    description: "Short clips & trending sounds",
    cta: "Follow",
    gradient: "from-[#25f4ee] via-[#111111] to-[#fe2c55]",
    glow: "hover:shadow-[#fe2c55]/40",
  },
  {
    name: "Facebook",
    handle: "iamseanaustin",
    url: "https://facebook.com/iamseanaustin",
    icon: FaFacebook,
    description: "Events & community updates",
    cta: "Follow",
    gradient: "from-[#3b82f6] to-[#1e3a8a]",
    glow: "hover:shadow-blue-500/40",
  },
  {
    name: "X (Twitter)",
    handle: "@iamseanaustin",
    url: "https://x.com/iamseanaustin",
    icon: FaXTwitter,
    description: "Thoughts & announcements",
    cta: "Follow",
    gradient: "from-[#3a3a3a] to-[#0a0a0a]",
    glow: "hover:shadow-white/20",
  },
  {
    name: "Spotify",
    handle: "Sean Austin",
    url: "https://open.spotify.com/artist/0ZTUFRHKN1R7Se9eq5QTAT",
    icon: FaSpotify,
    description: "Stream all music",
    cta: "Follow",
    gradient: "from-[#1ed760] to-[#0a5c28]",
    glow: "hover:shadow-[#1ed760]/40",
  },
  {
    name: "Apple Music",
    handle: "Sean Austin",
    url: "https://music.apple.com/us/artist/sean-austin/1496526691",
    icon: SiApplemusic,
    description: "Stream on Apple Music",
    cta: "Follow",
    gradient: "from-[#fa5f7f] to-[#a1114f]",
    glow: "hover:shadow-[#fa5f7f]/40",
  },
  {
    name: "JAM Audio",
    handle: "Sean Austin",
    url: "https://jamaudio.live/?jam_ref=artist%3Asean-austin#listen",
    icon: Radio,
    description: "24/7 independent artist radio",
    cta: "Listen",
    gradient: "from-amber-400 to-orange-700",
    glow: "hover:shadow-amber-500/40",
  },
];

export default function SocialPage() {
  return (
    <>
      <SEO
        title="About Sean Austin | Houston Top Reggae Artist"
        description="Connect with Sean Austin on social media. Follow for music updates, behind-the-scenes content, and more."
        path="/social"
        noSuffix
      />
      <div className="relative min-h-screen py-20">
        {/* Background photo */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/attached_assets/Sean-Austin-reggae-artist-Houston-16.jpeg"
            alt=""
            className="w-full h-full object-cover object-top lg:object-center"
            style={{ opacity: 0.35 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background/90" />
        </div>

        <Container className="relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Connect With Sean Austin
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Follow along for music updates, behind-the-scenes content, tour announcements, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialPlatforms.map((platform) => (
              <div
                key={platform.name}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${platform.gradient} p-[1px] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${platform.glow} motion-reduce:hover:scale-100 motion-reduce:transition-none`}
                data-testid={`card-social-${platform.name.toLowerCase().replace(/\s|\(|\)/g, "")}`}
              >
                <div className="relative h-full rounded-[11px] bg-background/90 backdrop-blur-sm p-6 flex flex-col items-center text-center overflow-hidden">
                  {/* Ambient brand-color glow behind the icon */}
                  <div
                    className={`absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-br ${platform.gradient} opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40`}
                    aria-hidden="true"
                  />

                  <div
                    className={`relative w-16 h-16 mb-4 rounded-full bg-gradient-to-br ${platform.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <platform.icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>

                  <h3 className="relative font-display text-xl font-bold text-foreground mb-1">
                    {platform.name}
                  </h3>
                  <p className="relative text-sm text-muted-foreground mb-2">
                    {platform.handle}
                  </p>
                  <p className="relative text-xs text-muted-foreground/70 mb-5">
                    {platform.description}
                  </p>

                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-auto w-full"
                    data-testid={`link-social-cta-${platform.name.toLowerCase().replace(/\s|\(|\)/g, "")}`}
                  >
                    <Button
                      className={`w-full gap-1.5 bg-gradient-to-r ${platform.gradient} text-white border-0 hover:opacity-90 hover:text-white transition-opacity font-semibold`}
                    >
                      {platform.cta}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
