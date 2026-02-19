import { Music } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { trackStreamClick } from "@/lib/tracking";

export default function StickyMobileFooter() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/95 backdrop-blur-md border-t border-border/50 px-4 py-3 safe-area-bottom"
      data-testid="sticky-mobile-footer"
    >
      <div className="flex items-center gap-3">
        <a
          href="https://open.spotify.com/artist/0ZTUFRHKN1R7Se9eq5QTAT"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
          onClick={() => trackStreamClick("spotify", "sticky_footer")}
        >
          <Button className="w-full" data-testid="button-sticky-stream">
            <Music className="w-4 h-4 mr-2" />
            Stream Now
          </Button>
        </a>
        <a
          href="https://instagram.com/iamseanaustin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="outline" className="w-full" data-testid="button-sticky-instagram">
            <SiInstagram className="w-4 h-4 mr-2" />
            Follow
          </Button>
        </a>
      </div>
    </div>
  );
}
