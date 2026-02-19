import { useState, useEffect, useRef } from "react";
import { Music, Users, Mic2 } from "lucide-react";

interface StatItem {
  icon: typeof Music;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: Music, value: 5, suffix: "M+", label: "Streams" },
  { icon: Users, value: 250, suffix: "K+", label: "Followers" },
  { icon: Mic2, value: 300, suffix: "+", label: "Shows Performed" },
];

function useCountUp(target: number, duration: number, shouldStart: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    let frame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, shouldStart]);

  return count;
}

function StatCard({ stat, shouldAnimate }: { stat: StatItem; shouldAnimate: boolean }) {
  const count = useCountUp(stat.value, 2000, shouldAnimate);
  const Icon = stat.icon;

  return (
    <div className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <p className="font-display text-3xl sm:text-4xl font-bold text-foreground tabular-nums">
        {count}
        <span className="text-primary">{stat.suffix}</span>
      </p>
      <p className="text-sm text-muted-foreground mt-1 uppercase tracking-wider font-medium">
        {stat.label}
      </p>
    </div>
  );
}

export default function SocialProofCounter() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30"
      data-testid="section-social-proof"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-6 sm:gap-12">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} shouldAnimate={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
