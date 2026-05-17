import { Link } from "wouter";
import { Star, Clock, Users, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: number;
  title: string;
  shortDescription?: string | null;
  thumbnail?: string | null;
  instructorName?: string | null;
  level: string;
  durationHours: number;
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  isFree: boolean;
  categoryName?: string | null;
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="group rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 overflow-hidden cursor-pointer h-full flex flex-col">
        <div className="aspect-video bg-muted overflow-hidden relative">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <BookOpen className="w-12 h-12 text-primary/40" />
            </div>
          )}
          {course.isFree && (
            <Badge className="absolute top-2 left-2 bg-emerald-500 text-white text-xs">Free</Badge>
          )}
          <Badge variant="secondary" className="absolute top-2 right-2 text-xs capitalize">{course.level}</Badge>
        </div>
        <div className="p-4 flex flex-col flex-1">
          {course.categoryName && (
            <p className="text-xs font-medium text-primary mb-1.5">{course.categoryName}</p>
          )}
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors leading-snug">
            {course.title}
          </h3>
          {course.shortDescription && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{course.shortDescription}</p>
          )}
          {course.instructorName && (
            <p className="text-xs text-muted-foreground mb-3">{course.instructorName}</p>
          )}
          <div className="mt-auto space-y-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-medium text-foreground">{course.rating.toFixed(1)}</span>
                <span>({course.reviewCount.toLocaleString()})</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {course.durationHours}h
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {course.enrollmentCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              {course.isFree ? (
                <span className="font-bold text-emerald-500">Free</span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">${course.price}</span>
                  {course.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">${course.originalPrice}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
