import SEO from "@/components/seo";

// YouTube channel: https://www.youtube.com/@iamseanaustin
// To find your channel ID: Go to YouTube Studio > Settings > Channel > Advanced settings
// The uploads playlist ID is your channel ID with "UC" replaced by "UU"
const YOUTUBE_CHANNEL_ID = "UCiamseanaustin"; // Replace with actual channel ID
const UPLOADS_PLAYLIST_ID = YOUTUBE_CHANNEL_ID.replace("UC", "UU");

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
              Watch music videos and live performances. New videos appear automatically.
            </p>
          </div>

          {/* Embedded YouTube Playlist - Auto-updates when new videos are added */}
          <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}`}
              title="Sean Austin Videos"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Link to full YouTube channel */}
          <div className="text-center mt-8">
            <a
              href="https://www.youtube.com/@iamseanaustin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe on YouTube for more videos
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
