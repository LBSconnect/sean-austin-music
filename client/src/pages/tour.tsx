import { useQuery } from "@tanstack/react-query";
import SEO from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";
import type { TourDate } from "@shared/schema";

export default function TourPage() {
  const { data: tourDates, isLoading } = useQuery<TourDate[]>({
    queryKey: ["/api/tour-dates"],
  });

  return (
    <>
      <SEO
        title="Tour - Sean Austin"
        description="See Sean Austin live. Check out upcoming tour dates and get tickets."
      />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Tour Dates
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Catch me live at a show near you.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-card/50">
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted animate-pulse rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : tourDates && tourDates.length > 0 ? (
            <div className="space-y-4">
              {tourDates.map((show) => (
                <Card key={show.id} className="bg-card/50 hover:bg-card/70 transition-colors">
                  <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold">{show.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {show.venue} - {show.city}, {show.country}
                        </span>
                      </div>
                    </div>
                    {show.isSoldOut ? (
                      <Button variant="outline" disabled>
                        Sold Out
                      </Button>
                    ) : show.ticketUrl ? (
                      <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer">
                        <Button>
                          <Ticket className="w-4 h-4 mr-2" />
                          Get Tickets
                        </Button>
                      </a>
                    ) : (
                      <Button variant="outline" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No tour dates announced yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
