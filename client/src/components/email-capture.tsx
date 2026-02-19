import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { trackEmailSignup } from "@/lib/tracking";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: async (subscriberEmail: string) => {
      await apiRequest("POST", "/api/subscribe", { email: subscriberEmail });
      return subscriberEmail;
    },
    onSuccess: (subscriberEmail: string) => {
      trackEmailSignup(subscriberEmail);
      setMessage("You're now part of the Global Reggae Movement.");
      setEmail("");
    },
    onError: () => {
      setMessage("You're already subscribed!");
    },
  });

  return (
    <section className="py-20 px-6 bg-card/30 text-center" data-testid="section-email-capture">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-primary" data-testid="text-email-capture-title">
          Join The Global Reggae Movement
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) subscribeMutation.mutate(email);
          }}
          className="mt-6 flex flex-col items-center"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-testid="input-newsletter-email"
            className="w-80 max-w-full"
          />
          <Button
            type="submit"
            disabled={subscribeMutation.isPending}
            className="mt-4"
            data-testid="button-newsletter-subscribe"
          >
            Unlock Exclusive Access
          </Button>
        </form>
        {message && (
          <p className="mt-4 text-muted-foreground" data-testid="text-subscribe-message">{message}</p>
        )}
      </div>
    </section>
  );
}
