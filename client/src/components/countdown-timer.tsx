import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
  title: string;
  subtitle?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: string): TimeLeft | null {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-card border border-border/50 flex items-center justify-center">
        <span
          className="font-display text-2xl sm:text-3xl font-bold text-primary tabular-nums"
          data-testid={`text-countdown-${label.toLowerCase()}`}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-muted-foreground uppercase tracking-wider mt-2 font-medium">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate, title, subtitle }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeLeft(targetDate);
      setTimeLeft(remaining);
      if (!remaining) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" data-testid="section-countdown">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-2">
          {subtitle || "Coming Soon"}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8" data-testid="text-countdown-title">
          {title}
        </h2>
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          <TimeUnit value={timeLeft.days} label="Days" />
          <span className="text-2xl text-muted-foreground font-bold self-start mt-5">:</span>
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <span className="text-2xl text-muted-foreground font-bold self-start mt-5">:</span>
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <span className="text-2xl text-muted-foreground font-bold self-start mt-5">:</span>
          <TimeUnit value={timeLeft.seconds} label="Sec" />
        </div>
      </div>
    </section>
  );
}
