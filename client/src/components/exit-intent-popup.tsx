import { useState, useEffect, useCallback } from "react";
import { X, Mail, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { trackEmailSignup } from "@/lib/tracking";

const DISMISSED_KEY = "sa_exit_popup_dismissed";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (subscriberEmail: string) => {
      await apiRequest("POST", "/api/subscribe", { email: subscriberEmail });
      return subscriberEmail;
    },
    onSuccess: (subscriberEmail: string) => {
      trackEmailSignup(subscriberEmail);
      toast({
        title: "Welcome to the movement!",
        description: "You'll be the first to hear new music and tour dates.",
      });
      setEmail("");
      dismiss();
    },
    onError: () => {
      toast({
        title: "Already subscribed!",
        description: "You're already part of the family.",
        variant: "destructive",
      });
      dismiss();
    },
  });

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISSED_KEY)) return;
    } catch {}

    let triggered = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        triggered = true;
        setVisible(true);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      data-testid="popup-exit-intent"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={dismiss}
      />
      <div className="relative w-full max-w-md bg-card border border-border rounded-md p-8 shadow-xl animate-in zoom-in-95 fade-in duration-300">
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3"
          onClick={dismiss}
          data-testid="button-close-popup"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
            <Music className="w-7 h-7 text-primary" />
          </div>
          <h3 className="font-display text-2xl font-bold mb-2" data-testid="text-popup-title">
            Wait — Don't Miss Out
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Get exclusive access to new music, tour announcements, and behind-the-scenes content before anyone else.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) subscribeMutation.mutate(email);
            }}
            className="flex gap-2"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-testid="input-popup-email"
            />
            <Button
              type="submit"
              disabled={subscribeMutation.isPending}
              data-testid="button-popup-subscribe"
            >
              <Mail className="w-4 h-4 mr-2" />
              Join
            </Button>
          </form>

          <button
            onClick={dismiss}
            className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-popup-no-thanks"
          >
            No thanks, I'll pass
          </button>
        </div>
      </div>
    </div>
  );
}
