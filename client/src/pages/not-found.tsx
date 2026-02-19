import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 - Page Not Found - Sean Austin"
        description="The page you're looking for doesn't exist."
      />
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-display text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <a href="/">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </a>
        </Button>
      </div>
    </>
  );
}
