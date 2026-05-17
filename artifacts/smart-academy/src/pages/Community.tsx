import { useState } from "react";
import { Heart, MessageCircle, Bookmark, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/shared/PageHeader";
import { useListCommunityPosts } from "@workspace/api-client-react";

const topics = ["All Topics", "Success Stories", "Career Advice", "Study Tips", "Well-being", "Announcements"];

export default function Community() {
  const [topic, setTopic] = useState("All Topics");
  const { data: posts, isLoading } = useListCommunityPosts(
    topic !== "All Topics" ? { topic } : {}
  );

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Community"
        subtitle="Connect with 125,000+ learners, share insights, and grow together"
      >
        <div className="mt-4">
          <Button size="sm" className="gap-2">
            <PenLine className="w-4 h-4" /> New Post
          </Button>
        </div>
      </PageHeader>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {topics.map((t) => (
            <Button
              key={t}
              variant={topic === t ? "default" : "outline"}
              size="sm"
              onClick={() => setTopic(t)}
              className="text-xs h-8"
            >
              {t}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
          </div>
        ) : (
          <div className="space-y-4">
            {posts?.map((post) => (
              <div key={post.id} className="rounded-xl border border-border/60 bg-card p-5 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={post.authorAvatar || ""}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm text-foreground">{post.authorName}</p>
                      <Badge
                        variant="outline"
                        className={`text-xs capitalize ${
                          post.authorRole === "teacher"
                            ? "border-primary/30 text-primary bg-primary/5"
                            : ""
                        }`}
                      >
                        {post.authorRole}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  {post.topic && (
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {post.topic}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">{post.content}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-primary transition-colors group">
                    <Heart className="w-4 h-4 group-hover:fill-primary group-hover:text-primary transition-all" />
                    <span>{post.likeCount.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.replyCount} replies</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-primary transition-colors ml-auto">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
