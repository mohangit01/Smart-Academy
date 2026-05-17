import { useParams } from "wouter";
import { Clock, Eye, ThumbsUp, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBlogPost } from "@workspace/api-client-react";

export default function BlogDetail() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id, 10);
  const { data: post, isLoading } = useGetBlogPost(id, { query: { enabled: !!id } });

  if (isLoading) {
    return <div className="min-h-screen pt-20 max-w-3xl mx-auto px-4 py-12 space-y-4">
      <Skeleton className="h-10 w-3/4" /><Skeleton className="h-64 w-full rounded-xl" /><Skeleton className="h-48 w-full" />
    </div>;
  }

  if (!post) return <div className="pt-24 text-center text-muted-foreground">Post not found.</div>;

  return (
    <div className="min-h-screen">
      <div className="border-b border-border/60 bg-gradient-to-br from-primary/5 to-background pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 mb-4">{post.category}</Badge>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mb-5">{post.title}</h1>
          {post.excerpt && <p className="text-muted-foreground text-lg mb-6">{post.excerpt}</p>}
          <div className="flex items-center gap-4">
            <img src={post.authorAvatar || ""} alt={post.authorName} className="w-11 h-11 rounded-full bg-muted" />
            <div>
              <p className="font-semibold text-sm text-foreground">{post.authorName}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-0.5">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readMinutes} min read</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.viewCount.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {post.thumbnail && (
          <div className="rounded-xl overflow-hidden aspect-video mb-8 bg-muted">
            <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line mb-8">
          {post.content}
        </div>
        <div className="flex items-center gap-4 border-t border-border/60 pt-6">
          <Button variant="outline" size="sm" className="gap-2">
            <ThumbsUp className="w-4 h-4" /> {post.likeCount} likes
          </Button>
          {post.tags && post.tags.split(",").map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag.trim()}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
