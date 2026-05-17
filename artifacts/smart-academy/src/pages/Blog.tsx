import { useState } from "react";
import { Link } from "wouter";
import { Clock, ThumbsUp, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/shared/PageHeader";
import { useListBlogPosts } from "@workspace/api-client-react";

const categories = ["All", "AI & Education", "Career", "Web Development", "AI & Machine Learning", "Competitive Exams"];

export default function Blog() {
  const [category, setCategory] = useState("All");
  const { data: posts, isLoading } = useListBlogPosts(category !== "All" ? { category } : {});

  return (
    <div className="min-h-screen">
      <PageHeader title="Blog & Resources" subtitle="Insights, guides, and stories from the SMART-ACADEMY community" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <Button
              key={c}
              variant={category === c ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(c)}
              className="text-xs h-8"
            >
              {c}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <div className="group rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-md transition-all cursor-pointer overflow-hidden h-full flex flex-col">
                  {post.thumbnail && (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <Badge variant="outline" className="text-xs self-start mb-3 text-primary border-primary/30">{post.category}</Badge>
                    <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                    {post.excerpt && <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>}
                    <div className="mt-auto flex items-center gap-3">
                      <img src={post.authorAvatar || ""} alt={post.authorName} className="w-7 h-7 rounded-full bg-muted" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">{post.authorName}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readMinutes}m</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.viewCount.toLocaleString()}</span>
                          <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{post.likeCount.toLocaleString()}</span>
                        </div>
                      </div>
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
