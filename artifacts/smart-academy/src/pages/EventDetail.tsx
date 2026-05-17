import { useParams } from "wouter";
import { Calendar, Clock, Users, MapPin, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEvent } from "@workspace/api-client-react";

export default function EventDetail() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id, 10);
  const { data: event, isLoading } = useGetEvent(id, { query: { enabled: !!id } });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 max-w-4xl mx-auto px-4 py-12 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!event) return <div className="pt-24 text-center text-muted-foreground">Event not found.</div>;

  return (
    <div className="min-h-screen">
      <div className="border-b border-border/60 bg-gradient-to-br from-primary/5 to-background pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Badge variant="outline" className="mb-4 capitalize">{event.type}</Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">{event.title}</h1>
          <p className="text-muted-foreground text-lg mb-6">{event.description}</p>
          <div className="flex items-center gap-3">
            <img src={event.hostAvatar || ""} alt={event.hostName} className="w-10 h-10 rounded-full bg-muted" />
            <div>
              <p className="text-xs text-muted-foreground">Hosted by</p>
              <p className="font-semibold text-sm text-foreground">{event.hostName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {event.thumbnail && (
              <div className="rounded-xl overflow-hidden aspect-video bg-muted">
                <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">What you'll learn</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                {["Expert insights and real-world case studies", "Live Q&A with the host", "Downloadable resources and notes", "Networking with fellow participants"].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {event.tags && (
              <div className="flex flex-wrap gap-2">
                {event.tags.split(",").map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag.trim()}</Badge>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-6 sticky top-20 h-fit">
            <div className="space-y-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{new Date(event.scheduledAt).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary" />
                <span>{new Date(event.scheduledAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} • {event.durationMinutes} minutes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-primary" />
                <span>{event.registrationCount.toLocaleString()} registered{event.maxAttendees ? ` / ${event.maxAttendees} max` : ""}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Online — Zoom</span>
              </div>
            </div>
            <div className="mb-4">
              {event.isFree ? (
                <p className="text-2xl font-bold text-emerald-500">Free</p>
              ) : (
                <p className="text-2xl font-bold text-foreground">${event.price}</p>
              )}
            </div>
            <Button className="w-full" size="lg">Register Now</Button>
            <p className="text-xs text-center text-muted-foreground mt-3">You'll receive a confirmation email with the meeting link</p>
          </div>
        </div>
      </div>
    </div>
  );
}
