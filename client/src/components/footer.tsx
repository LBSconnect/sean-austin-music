import { Link } from "wouter";
import { FaInstagram, FaXTwitter, FaYoutube, FaFacebook, FaTiktok } from "react-icons/fa6";
import { SiSpotify, SiApplemusic, SiReverbnation } from "react-icons/si";
import { Mail } from "lucide-react";

const quickLinks = [
  { href: "/music", label: "Music" },
  { href: "/videos", label: "Videos" },
  { href: "/tour", label: "Tour Dates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/merch", label: "Merch" },
  { href: "/epk", label: "Press Kit" },
];

const socialLinks = [
  { href: "https://www.instagram.com/iamseanaustin", icon: FaInstagram, label: "Instagram" },
  { href: "https://www.twitter.com/iamseanaustin", icon: FaXTwitter, label: "Twitter" },
  { href: "https://www.youtube.com/@iamseanaustin", icon: FaYoutube, label: "YouTube" },
  { href: "https://www.facebook.com/pg/IamSeanAustin", icon: FaFacebook, label: "Facebook" },
  { href: "https://tiktok.com/@iamseanaustin", icon: FaTiktok, label: "TikTok" },
  { href: "https://open.spotify.com/artist/0ZTUFRHKN1R7Se9eq5QTAT", icon: SiSpotify, label: "Spotify" },
  { href: "https://itunes.apple.com/us/artist/1496526691", icon: SiApplemusic, label: "Apple Music" },
  { href: "https://www.reverbnation.com/iamseanaustin", icon: SiReverbnation, label: "ReverbNation" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-display text-xl font-bold tracking-wider text-primary uppercase">
              Sean Austin
            </span>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              International reggae artist bringing authentic Caribbean vibes to the global stage.
              Music that moves your soul.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  data-testid={`link-footer-social-${social.label.toLowerCase().replace(/\s/g, '-')}`}
                  className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                Booking & Management
                <a
                  href="mailto:iamseanaustin@icloud.com"
                  data-testid="link-footer-email"
                  className="text-primary hover:text-primary/80 inline-flex items-center"
                  aria-label="Email booking"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-muted-foreground" data-testid="text-copyright">
            &copy; {new Date().getFullYear()} Sean Austin. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            @iamseanaustin
          </p>
        </div>
      </div>
    </footer>
  );
}
