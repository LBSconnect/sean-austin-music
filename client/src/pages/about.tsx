import SEO from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { FaInstagram, FaXTwitter, FaYoutube, FaFacebook, FaTiktok, FaSpotify } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";

const socialPlatforms = [
  {
    name: "Instagram",
    handle: "@iamseanaustin",
    url: "https://instagram.com/iamseanaustin",
    icon: FaInstagram,
    color: "hover:text-pink-500",
    description: "Behind the scenes & daily vibes",
  },
  {
    name: "YouTube",
    handle: "@SeanAustinMusic",
    url: "https://youtube.com/@SeanAustinMusic",
    icon: FaYoutube,
    color: "hover:text-red-500",
    description: "Music videos & live performances",
  },
  {
    name: "TikTok",
    handle: "@iamseanaustin",
    url: "https://tiktok.com/@iamseanaustin",
    icon: FaTiktok,
    color: "hover:text-white",
    description: "Short clips & trending sounds",
  },
  {
    name: "Facebook",
    handle: "iamseanaustin",
    url: "https://facebook.com/iamseanaustin",
    icon: FaFacebook,
    color: "hover:text-blue-500",
    description: "Events & community updates",
  },
  {
    name: "X (Twitter)",
    handle: "@iamseanaustin",
    url: "https://x.com/iamseanaustin",
    icon: FaXTwitter,
    color: "hover:text-white",
    description: "Thoughts & announcements",
  },
  {
    name: "Spotify",
    handle: "Sean Austin",
    url: "https://open.spotify.com/artist/0ZTUFRHKN1R7Se9eq5QTAT",
    icon: FaSpotify,
    color: "hover:text-green-500",
    description: "Stream all music",
  },
  {
    name: "Apple Music",
    handle: "Sean Austin",
    url: "https://music.apple.com/us/artist/sean-austin/1462805978",
    icon: SiApplemusic,
    color: "hover:text-pink-400",
    description: "Stream on Apple Music",
  },
];

export default function SocialPage() {
  return (
    <>
      <SEO
        title="Social - Sean Austin"
        description="Connect with Sean Austin on social media. Follow for music updates, behind the scenes content, and more."
      />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Connect With Sean Austin
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Follow along for music updates, behind the scenes content, tour announcements, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="bg-card/50 hover:bg-card/70 transition-all hover:scale-105 h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <platform.icon className={`w-12 h-12 mb-4 text-muted-foreground transition-colors ${platform.color} group-hover:scale-110 transition-transform`} />
                    <h3 className="font-display text-xl font-bold text-primary mb-1">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {platform.handle}
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {platform.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
