import { useParams } from "wouter";
import { Star, Clock, Users, Globe, Award, CheckCircle, Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useGetCourse, useCreateEnrollment } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListEnrollmentsQueryKey } from "@workspace/api-client-react";

export default function CourseDetail() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id, 10);
  const queryClient = useQueryClient();

  const { data: course, isLoading } = useGetCourse(id, { query: { enabled: !!id } });
  const enroll = useCreateEnrollment();

  const handleEnroll = () => {
    enroll.mutate({ data: { userId: 1, courseId: id } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListEnrollmentsQueryKey({ userId: 1 }) });
        alert("Successfully enrolled!");
      },
    });
  };

  const curriculumModules = [
    { title: "Introduction & Setup", lessons: 4, duration: "45 min" },
    { title: "Core Concepts", lessons: 8, duration: "2h 30min" },
    { title: "Hands-on Projects", lessons: 6, duration: "3h 15min" },
    { title: "Advanced Topics", lessons: 7, duration: "2h 45min" },
    { title: "Real-world Application", lessons: 5, duration: "2h 00min" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!course) return <div className="pt-24 text-center text-muted-foreground">Course not found.</div>;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/60 bg-gradient-to-br from-primary/5 to-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {course.categoryName && (
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 mb-4">{course.categoryName}</Badge>
              )}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4 leading-tight">{course.title}</h1>
              <p className="text-muted-foreground text-lg mb-6">{course.shortDescription || course.description.substring(0, 160)}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-foreground">{course.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({course.reviewCount.toLocaleString()} reviews)</span>
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-4 h-4" />{course.enrollmentCount.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" />{course.durationHours} hours
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Globe className="w-4 h-4" />{course.language}
                </span>
                <Badge variant="secondary" className="capitalize">{course.level}</Badge>
              </div>

              {course.instructorName && (
                <div className="flex items-center gap-3">
                  <img src={course.instructorAvatar || ""} alt={course.instructorName} className="w-9 h-9 rounded-full bg-muted" />
                  <div>
                    <p className="text-xs text-muted-foreground">Instructor</p>
                    <p className="font-semibold text-sm text-foreground">{course.instructorName}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Enrollment Card */}
            <div className="lg:row-start-1">
              <div className="rounded-xl border border-border/60 bg-card shadow-lg overflow-hidden sticky top-20">
                {course.thumbnail && (
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-baseline gap-3 mb-4">
                    {course.isFree ? (
                      <span className="text-3xl font-bold text-emerald-500">Free</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-foreground">${course.price}</span>
                        {course.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">${course.originalPrice}</span>
                        )}
                        {course.originalPrice && (
                          <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                            {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                  <Button className="w-full mb-3 shadow-sm" size="lg" onClick={handleEnroll} disabled={enroll.isPending}>
                    {enroll.isPending ? "Enrolling..." : "Enroll Now"}
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Play className="w-4 h-4 mr-2" /> Preview course
                  </Button>
                  <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Full lifetime access</div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Certificate of completion</div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Access on mobile & desktop</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">About this course</h2>
              <p className="text-muted-foreground leading-relaxed">{course.description}</p>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Course Curriculum</h2>
              <p className="text-sm text-muted-foreground mb-5">
                {curriculumModules.reduce((a, m) => a + m.lessons, 0)} lessons • {course.durationHours}h total
              </p>
              <div className="space-y-2">
                {curriculumModules.map((module, i) => (
                  <div key={i} className="rounded-lg border border-border/60 bg-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{module.title}</p>
                        <p className="text-xs text-muted-foreground">{module.lessons} lessons</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{module.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            {course.tags && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.split(",").map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag.trim()}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
