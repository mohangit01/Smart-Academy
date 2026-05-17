import { useState } from "react";
import { Link } from "wouter";
import { Calendar, Clock, Users, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/shared/PageHeader";
import { useListEvents } from "@workspace/api-client-react";

export default function Events() {
  const [filter, setFilter] = useState("upcoming");
  const { data: events, isLoading } = useListEvents(filter === "upcoming" ? { upcoming: "true" } : {});

  return (
    <div className="min-h-screen">
      <PageHeader title="Events & Webinars" subtitle="Live sessions, workshops, and expert talks from around the world" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={filter} onValueChange={setFilter} className="mb-8">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="all">All Events</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
          </div>
        ) : events?.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">No events found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events?.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="group rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-md transition-all cursor-pointer overflow-hidden h-full flex flex-col">
                  {event.thumbnail && (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs capitalize">{event.type}</Badge>
                      {event.isFree ? (
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs">Free</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">${event.price}</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
                    <div className="mt-auto space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(event.scheduledAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{event.durationMinutes} min</span>
                        <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{event.registrationCount.toLocaleString()} registered</span>
                      </div>
                      <p className="font-medium text-foreground">by {event.hostName}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
