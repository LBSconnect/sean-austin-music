import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import SEO from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Send, Calendar, MapPin, Users } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Booking Inquiry",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted!",
        description: "Thanks for your booking inquiry. Our team will respond within 48 hours.",
      });
      setFormData({ name: "", email: "", subject: "Booking Inquiry", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again or email us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <>
      <SEO
        title="Booking & Contact - Sean Austin"
        description="Book Sean Austin for your event. Submit booking inquiries for concerts, festivals, private events, and corporate shows."
      />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Booking & Contact
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              For booking inquiries, please fill out the form below with as much detail as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card/30 text-center">
              <CardContent className="p-6">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-primary">Events</h3>
                <p className="text-sm text-muted-foreground">Festivals, Concerts, Club Shows</p>
              </CardContent>
            </Card>
            <Card className="bg-card/30 text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-primary">Private Events</h3>
                <p className="text-sm text-muted-foreground">Corporate, Weddings, Private Parties</p>
              </CardContent>
            </Card>
            <Card className="bg-card/30 text-center">
              <CardContent className="p-6">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-primary">Worldwide</h3>
                <p className="text-sm text-muted-foreground">Available for International Bookings</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Booking Request Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Contact Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Inquiry Type</Label>
                  <select
                    id="subject"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="Booking Inquiry">Booking Inquiry</option>
                    <option value="Festival Booking">Festival Booking</option>
                    <option value="Private Event">Private Event</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Press/Media">Press/Media</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Event Details *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Please include:
• Event date and time
• Venue name and location
• Type of event
• Expected attendance
• Budget range (if applicable)
• Any additional requirements"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Booking Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-muted-foreground">
            <p className="text-sm">
              For urgent inquiries, please email directly at{" "}
              <a href="mailto:booking@seanaustinmusic.com" className="text-primary hover:underline">
                booking@seanaustinmusic.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
