import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Sean Austin's music transported me straight to the islands. His live show at Reggae Sumfest was the highlight of my entire year.",
    name: "Marcus J.",
    location: "Brooklyn, NY",
  },
  {
    quote: "I've been following Sean since his first single dropped. Every release just gets better. Real roots reggae with a modern edge.",
    name: "Keisha W.",
    location: "London, UK",
  },
  {
    quote: "Saw him perform in Kingston and the energy was unreal. The crowd was singing every word. This man is the future of reggae.",
    name: "Andre P.",
    location: "Kingston, Jamaica",
  },
  {
    quote: "His music got me through some of the hardest times. 'Rise Up' is more than a song — it's a movement.",
    name: "Sophia R.",
    location: "Toronto, Canada",
  },
  {
    quote: "From Lagos to London, Sean Austin's sound connects cultures. Authentic Caribbean soul that the whole world needs to hear.",
    name: "Tunde A.",
    location: "Lagos, Nigeria",
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 200);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length);
  }, [current, goTo]);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30" data-testid="section-testimonials">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-2">
            The Movement
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">What Fans Are Saying</h2>
        </div>

        <div className="relative">
          <Card className="p-8 sm:p-12 text-center">
            <Quote className="w-8 h-8 text-primary/30 mx-auto mb-6" />
            <div
              className={`transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
            >
              <blockquote
                className="text-lg sm:text-xl leading-relaxed text-foreground mb-6 max-w-2xl mx-auto"
                data-testid="text-testimonial-quote"
              >
                "{t.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-foreground" data-testid="text-testimonial-name">
                  {t.name}
                </p>
                <p className="text-sm text-muted-foreground" data-testid="text-testimonial-location">
                  {t.location}
                </p>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              size="icon"
              variant="ghost"
              onClick={prev}
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  data-testid={`button-testimonial-dot-${i}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={next}
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
