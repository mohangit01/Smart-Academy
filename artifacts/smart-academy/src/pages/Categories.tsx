import { Link } from "wouter";
import { BookOpen, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/shared/PageHeader";
import { useListCategories } from "@workspace/api-client-react";

const iconEmoji = (iconName: string): string => {
  const map: Record<string, string> = {
    Code2: "💻", Brain: "🧠", BarChart3: "📊", Smartphone: "📱",
    Cloud: "☁️", Shield: "🛡️", Briefcase: "💼", GraduationCap: "🎓",
    Trophy: "🏆", Link: "🔗",
  };
  return map[iconName] || "📚";
};

export default function Categories() {
  const { data: categories, isLoading } = useListCategories();

  return (
    <div className="min-h-screen">
      <PageHeader title="Browse Categories" subtitle="Explore our full library organized by domain and expertise area" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array(10).fill(0).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {categories?.map((cat) => (
              <Link key={cat.id} href={`/courses?category=${cat.slug}`}>
                <div className="group rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all p-6 cursor-pointer h-full">
                  <div className="text-4xl mb-4">{cat.icon && iconEmoji(cat.icon)}</div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      <BookOpen className="w-3 h-3 mr-1" /> {cat.courseCount} courses
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
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
