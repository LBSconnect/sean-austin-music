import { Button } from "@/components/ui/button";
import { User, Crown } from "lucide-react";

export default function Story() {
  return (
    <section className="py-16 px-6 bg-card/30 text-center" data-testid="section-story">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="/about">
            <Button variant="outline" size="lg">
              <User className="w-4 h-4 mr-2" />
              Learn More
            </Button>
          </a>
          <a href="/fan-club">
            <Button size="lg">
              <Crown className="w-4 h-4 mr-2" />
              Join Fan Club
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
