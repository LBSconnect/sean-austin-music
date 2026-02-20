import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import type { TourDate } from "@shared/schema";

export default function TourPreview() {
  const { data: tourDates, isLoading } = useQuery<TourDate[]>({
    queryKey: ["/api/tour-dates"],
  });

  const upcomingDates = tourDates?.slice(0, 3) || [];

  return (
    <section className="py-20 px-6 text-center" data-testid="section-tour-preview">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-primary" data-testid="text-tour-title">
          Live & Direct
        </h2>
        <p className="mt-4 text-muted-foreground">
          Catch the vibes at a show near you
        </p>
        <div className="mt-6 space-y-2">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 w-64 mx-auto rounded bg-muted animate-pulse" />
              ))}
            </div>
          ) : upcomingDates.length > 0 ? (
            upcomingDates.map((show) => (
              <p key={show.id} className="text-muted-foreground" data-testid={`text-tour-date-${show.id}`}>
                {show.city}, {show.country} — {show.date}
              </p>
            ))
          ) : (
            <p className="text-muted-foreground">New dates coming soon!</p>
          )}
        </div>
        <div className="mt-8">
          <a href="/tour">
            <Button variant="outline" size="lg">
              <Calendar className="w-4 h-4 mr-2" />
              View All Dates
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
