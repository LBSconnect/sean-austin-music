import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { LogOut, Calendar, Music, Quote, Users, Download } from "lucide-react";
import type { TourDate, MusicRelease, PressQuote, Subscriber } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: authData, isLoading: authLoading } = useQuery({
    queryKey: ["/api/admin/me"],
    retry: false,
  });

  const { data: tourDates } = useQuery<TourDate[]>({
    queryKey: ["/api/tour-dates"],
  });

  const { data: musicReleases } = useQuery<MusicRelease[]>({
    queryKey: ["/api/music-releases"],
  });

  const { data: pressQuotes } = useQuery<PressQuote[]>({
    queryKey: ["/api/press-quotes"],
  });

  const { data: subscribers } = useQuery<Subscriber[]>({
    queryKey: ["/api/admin/subscribers"],
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/admin/logout", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/me"] });
      setLocation("/admin/login");
    },
  });

  useEffect(() => {
    if (!authLoading && !authData) {
      setLocation("/admin/login");
    }
  }, [authLoading, authData, setLocation]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!authData) {
    return null;
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="font-display text-3xl font-bold text-primary">
            Admin Dashboard
          </h1>
          <Button variant="outline" onClick={() => logoutMutation.mutate()}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Tour Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {tourDates?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Music className="w-4 h-4" />
                Music Releases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {musicReleases?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Quote className="w-4 h-4" />
                Press Quotes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {pressQuotes?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {subscribers?.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscribers Section */}
        <Card className="bg-card/50 mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recent Subscribers
            </CardTitle>
            <a href="/api/admin/subscribers/export">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </a>
          </CardHeader>
          <CardContent>
            {subscribers && subscribers.length > 0 ? (
              <div className="space-y-2">
                {subscribers.slice(0, 10).map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{sub.email}</span>
                    <span className="text-xs text-muted-foreground">
                      {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No subscribers yet.</p>
            )}
          </CardContent>
        </Card>

        <p className="text-muted-foreground text-center text-sm">
          Full admin management coming soon. For now, manage content via the API or database.
        </p>
      </div>
    </div>
  );
}
