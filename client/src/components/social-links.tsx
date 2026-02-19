import { FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaXTwitter } from "react-icons/fa6";

const links = [
  { href: "https://instagram.com/iamseanaustin", icon: FaInstagram, label: "Instagram" },
  { href: "https://x.com/iamseanaustin", icon: FaXTwitter, label: "X" },
  { href: "https://youtube.com/@SeanAustinMusic", icon: FaYoutube, label: "YouTube" },
  { href: "https://facebook.com/iamseanaustin", icon: FaFacebook, label: "Facebook" },
  { href: "https://tiktok.com/@iamseanaustin", icon: FaTiktok, label: "TikTok" },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-6 justify-center text-2xl text-foreground" data-testid="social-links">
      {links.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          data-testid={`link-social-${social.label.toLowerCase()}`}
          className="hover:text-primary transition-colors"
        >
          <social.icon />
        </a>
      ))}
    </div>
  );
}
