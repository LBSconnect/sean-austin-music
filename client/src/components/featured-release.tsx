export default function FeaturedRelease() {
  return (
    <section className="py-20 px-6 text-center" data-testid="section-featured-release">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-primary" data-testid="text-featured-release-title">
          Now Streaming Worldwide
        </h2>
        <p className="mt-4 text-muted-foreground">
          Experience soulful reggae storytelling with a modern edge.
        </p>

        <div className="mt-8">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/album/4uAy6vNkZGeFdxjNy30A5M?utm_source=generator&theme=0"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Player"
            data-testid="embed-spotify"
          />
        </div>
      </div>
    </section>
  );
}
