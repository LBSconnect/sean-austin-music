import { useState } from "react";
import { Play } from "lucide-react";

interface LazyYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
  "data-testid"?: string;
}

export default function LazyYouTube({ videoId, title, className = "", "data-testid": testId }: LazyYouTubeProps) {
  const [loaded, setLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (loaded) {
    return (
      <iframe
        className={className}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        data-testid={testId}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className={`relative cursor-pointer group ${className}`}
      aria-label={`Play ${title}`}
      data-testid={testId}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
          <Play className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground ml-1" />
        </div>
      </div>
    </button>
  );
}
