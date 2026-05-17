import { useState, useRef } from "react";
import { useSearch } from "wouter";
import { Search as SearchIcon, Sparkles, Loader2, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import CourseCard from "@/components/shared/CourseCard";
import { useAiSearch, useListCourses } from "@workspace/api-client-react";

const suggestions = [
  "How do I start learning machine learning as a beginner?",
  "Best courses for JEE 2026 preparation",
  "Python for data science or JavaScript for web dev?",
  "Top cybersecurity certifications for career growth",
  "How to transition from engineering to product management",
];

export default function Search() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const [query, setQuery] = useState(params.get("q") || "");
  const [submitted, setSubmitted] = useState(params.get("q") ? true : false);

  const aiSearch = useAiSearch();
  const { data: courses, isLoading: coursesLoading } = useListCourses(
    submitted && query ? { search: query } : {}
  );

  const handleSearch = async (q: string) => {
    setQuery(q);
    setSubmitted(true);
    aiSearch.mutate({ data: { query: q } });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero search bar */}
      <div className="border-b border-border/60 bg-gradient-to-br from-primary/5 via-background to-background py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AI Smart Search</h1>
          </div>
          <p className="text-muted-foreground text-sm mb-6">Ask anything — get personalized learning guidance and course recommendations</p>
          <form
            onSubmit={(e) => { e.preventDefault(); handleSearch(query); }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Ask a question or search for a topic..."
                className="pl-10 h-11 bg-background border-border/80"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="h-11 px-5 gap-2" disabled={aiSearch.isPending}>
              {aiSearch.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Search
            </Button>
          </form>
          <div className="flex flex-wrap gap-2 mt-4">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSearch(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* AI Answer */}
        {submitted && (
          <div className="mb-10">
            {aiSearch.isPending ? (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-3">
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <Loader2 className="w-4 h-4 animate-spin" /> AI is thinking...
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ) : aiSearch.data ? (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
                  <Sparkles className="w-4 h-4" /> AI Answer
                </div>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {aiSearch.data.answer}
                </p>
                {aiSearch.data.relatedTopics && aiSearch.data.relatedTopics.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs text-muted-foreground">Related:</span>
                    {aiSearch.data.relatedTopics.map((t) => (
                      <button key={t} onClick={() => handleSearch(t)}>
                        <Badge variant="outline" className="text-xs hover:border-primary/50 cursor-pointer">{t}</Badge>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : aiSearch.isError ? (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                Failed to get AI response. Please try again.
              </div>
            ) : null}
          </div>
        )}

        {/* Course results */}
        {submitted && (
          <div>
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> Related Courses
            </h2>
            {coursesLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
              </div>
            ) : courses?.length === 0 ? (
              <p className="text-sm text-muted-foreground">No courses found for "{query}"</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses?.slice(0, 4).map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!submitted && (
          <div className="text-center py-16">
            <Sparkles className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">What do you want to learn?</h3>
            <p className="text-sm text-muted-foreground">Ask any question and our AI will guide you to the right resources</p>
          </div>
        )}
      </div>
    </div>
  );
}
