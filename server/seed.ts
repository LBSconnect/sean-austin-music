import { storage } from "./storage";

export async function seedDatabase() {
  const count = await storage.getTourDateCount();
  if (count > 0) return;

  const tourDates = [
    {
      date: "Mar 15, 2026",
      venue: "The O2 Academy Brixton",
      city: "London",
      country: "United Kingdom",
      ticketUrl: "https://ticketmaster.com",
      soldOut: false,
    },
    {
      date: "Mar 22, 2026",
      venue: "Reggae Sumfest Mainstage",
      city: "Montego Bay",
      country: "Jamaica",
      ticketUrl: "https://reggaesumfest.com",
      soldOut: true,
    },
    {
      date: "Apr 5, 2026",
      venue: "Brooklyn Steel",
      city: "New York",
      country: "United States",
      ticketUrl: "https://ticketmaster.com",
      soldOut: false,
    },
    {
      date: "Apr 18, 2026",
      venue: "Afro Nation Festival",
      city: "Accra",
      country: "Ghana",
      ticketUrl: "https://afronation.com",
      soldOut: false,
    },
    {
      date: "May 2, 2026",
      venue: "Rototom Sunsplash",
      city: "Benicassim",
      country: "Spain",
      ticketUrl: null,
      soldOut: false,
    },
    {
      date: "May 20, 2026",
      venue: "The Shrine Auditorium",
      city: "Lagos",
      country: "Nigeria",
      ticketUrl: "https://ticketmaster.com",
      soldOut: false,
    },
  ];

  for (const date of tourDates) {
    await storage.createTourDate(date);
  }

  console.log("Database seeded with tour dates");
}
