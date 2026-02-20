import SEO from "@/components/seo";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About - Sean Austin"
        description="Learn about Sean Austin, international reggae artist blending Jamaican roots with modern global sound."
      />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              About Sean Austin
            </h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Sean Austin is an international reggae artist who blends traditional Jamaican roots
                with modern global sounds, creating music that moves both spirit and body.
              </p>
              <p>
                With a unique fusion of authentic reggae tradition and contemporary influences,
                Sean Austin delivers music that bridges cultures and generations, connecting
                listeners across the world through the universal language of rhythm and soul.
              </p>
              <p>
                From intimate venues to international stages, Sean Austin's live performances
                bring the energy and spirit of reggae to audiences everywhere, creating
                unforgettable experiences that resonate long after the last note fades.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display text-4xl font-bold text-primary">1M+</div>
              <div className="text-muted-foreground">Streams</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Live Shows</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Followers</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
