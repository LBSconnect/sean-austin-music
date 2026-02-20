import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { FaInstagram, FaXTwitter, FaYoutube, FaFacebook, FaTiktok } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import siteLogo from "@assets/IMG_0989_1771277715074.jpg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/videos", label: "Videos" },
  { href: "/merch", label: "Merch" },
  { href: "/tour", label: "Tour" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/fan-club", label: "Fan Club" },
  { href: "/epk", label: "EPK" },
];

const socialLinks = [
  { href: "https://instagram.com/iamseanaustin", icon: FaInstagram, label: "Instagram" },
  { href: "https://x.com/iamseanaustin", icon: FaXTwitter, label: "X" },
  { href: "https://youtube.com/@SeanAustinMusic", icon: FaYoutube, label: "YouTube" },
  { href: "https://facebook.com/iamseanaustin", icon: FaFacebook, label: "Facebook" },
  { href: "https://tiktok.com/@iamseanaustin", icon: FaTiktok, label: "TikTok" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 flex-wrap">
          <Link href="/" data-testid="link-home-logo">
            <img
              src={siteLogo}
              alt="Sean Austin"
              className="h-20 w-auto"
              style={{
                WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 70%)",
                maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 70%)"
              }}
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                  className={`px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors rounded-md ${
                    location === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                data-testid={`link-social-${social.label.toLowerCase()}`}
                className="text-muted-foreground hover:text-primary transition-colors p-1"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border/50">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  onClick={() => setMobileOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  className={`block px-3 py-3 text-sm font-medium tracking-wide uppercase transition-colors rounded-md ${
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 px-3 border-t border-border/50">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
