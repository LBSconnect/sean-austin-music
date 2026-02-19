import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function BookingCTA() {
  return (
    <section className="py-20 px-6 bg-primary text-center" data-testid="section-booking-cta">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-primary-foreground" data-testid="text-booking-title">
          Bring International Reggae Energy To Your Stage
        </h2>
        <Link href="/contact">
          <Button
            size="lg"
            variant="outline"
            className="mt-6 bg-background text-foreground border-background"
            data-testid="button-book-now"
          >
            Book Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
