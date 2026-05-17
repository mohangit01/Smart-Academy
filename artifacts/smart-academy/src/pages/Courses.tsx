import { useState } from "react";
import { useSearch } from "wouter";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/shared/PageHeader";
import CourseCard from "@/components/shared/CourseCard";
import { useListCourses, useListCategories } from "@workspace/api-client-react";

const levels = ["All Levels", "beginner", "intermediate", "advanced"];

export default function Courses() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialCategory = params.get("category") || "";

  const [search, setSearch] = useState(params.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState("All Levels");

  const { data: categories } = useListCategories();
  const { data: courses, isLoading } = useListCourses({
    ...(search ? { search } : {}),
    ...(selectedCategory ? { category: selectedCategory } : {}),
    ...(selectedLevel && selectedLevel !== "All Levels" ? { level: selectedLevel } : {}),
  });

  const clearFilters = () => {
    setSearch(""); setSelectedCategory(""); setSelectedLevel("All Levels");
  };

  const hasFilters = search || selectedCategory || selectedLevel !== "All Levels";

  return (
    <div className="min-h-screen">
      <PageHeader title="All Courses" subtitle="Explore 4,500+ courses across every domain and skill level" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-9 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={selectedCategory || "all"} onValueChange={(v) => setSelectedCategory(v === "all" ? "" : v)}>
            <SelectTrigger className="w-full sm:w-48 h-9">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((c) => <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full sm:w-40 h-9">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((l) => <SelectItem key={l} value={l}>{l === "All Levels" ? l : l.charAt(0).toUpperCase() + l.slice(1)}</SelectItem>)}
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-muted-foreground h-9">
              <X className="w-3.5 h-3.5" /> Clear
            </Button>
          )}
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `${courses?.length ?? 0} course${courses?.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading
            ? Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)
            : courses?.length === 0
            ? (
              <div className="col-span-full text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No courses match your filters</p>
                <Button variant="outline" onClick={clearFilters}>Clear filters</Button>
              </div>
            )
            : courses?.map((course) => <CourseCard key={course.id} course={course} />)
          }
        </div>
      </div>
    </div>
  );
}
