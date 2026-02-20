import SEO from "@/components/seo";
import LazyYouTube from "@/components/lazy-youtube";

const videos = [
  {
    id: "video1",
    title: "Latest Music Video",
    videoId: "dQw4w9WgXcQ", // Replace with actual video ID
  },
  {
    id: "video2",
    title: "Live Performance",
    videoId: "dQw4w9WgXcQ", // Replace with actual video ID
  },
];

export default function VideosPage() {
  return (
    <>
      <SEO
        title="Videos - Sean Austin"
        description="Watch Sean Austin's music videos and live performances."
      />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Videos
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Watch music videos and live performances.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <LazyYouTube videoId={video.videoId} title={video.title} className="w-full h-full" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
