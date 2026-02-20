import SEO from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

// Hardcoded tour dates - all sold out
const tourDates = [
  {
    id: "1",
    date: "Mar 15, 2026",
    venue: "The O2 Academy Brixton",
    city: "London",
    country: "United Kingdom",
  },
  {
    id: "2",
    date: "Apr 5, 2026",
    venue: "Brooklyn Steel",
    city: "New York",
    country: "United States",
  },
  {
    id: "3",
    date: "Apr 18, 2026",
    venue: "Afro Nation Festival",
    city: "Accra",
    country: "Ghana",
  },
  {
    id: "4",
    date: "May 2, 2026",
    venue: "Rototom Sunsplash",
    city: "Benicassim",
    country: "Spain",
  },
  {
    id: "5",
    date: "May 20, 2026",
    venue: "The Shrine Auditorium",
    city: "Lagos",
    country: "Nigeria",
  },
];

export default function TourPage() {
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
                  <Button variant="outline" disabled className="opacity-60">
                    Sold Out
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              More dates coming soon! Sign up for the newsletter to be the first to know.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
