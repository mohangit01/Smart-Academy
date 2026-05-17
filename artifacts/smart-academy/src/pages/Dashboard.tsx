import { Link } from "wouter";
import { BookOpen, Trophy, Clock, Flame, Award, TrendingUp, ChevronRight, BarChart2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import CourseCard from "@/components/shared/CourseCard";
import { useGetUserDashboard, useListEnrollments } from "@workspace/api-client-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const DEMO_USER_ID = 1;

export default function Dashboard() {
  const { data: dashboard, isLoading } = useGetUserDashboard(DEMO_USER_ID);
  const { data: enrollments } = useListEnrollments({ userId: DEMO_USER_ID });

  const pieData = [
    { name: "Completed", value: dashboard?.completedCourses || 0 },
    { name: "In Progress", value: (dashboard?.enrolledCourses || 0) - (dashboard?.completedCourses || 0) },
  ];
  const COLORS = ["hsl(var(--primary))", "hsl(var(--muted))"];

  const statsCards = [
    { label: "Enrolled Courses", value: dashboard?.enrolledCourses ?? 0, icon: BookOpen, color: "text-primary" },
    { label: "Completed", value: dashboard?.completedCourses ?? 0, icon: CheckCircle, color: "text-emerald-500" },
    { label: "Hours Learned", value: `${dashboard?.totalHoursLearned ?? 0}h`, icon: Clock, color: "text-amber-500" },
    { label: "Current Streak", value: `${dashboard?.currentStreak ?? 0}d`, icon: Flame, color: "text-orange-500" },
    { label: "Certificates", value: dashboard?.certificates ?? 0, icon: Trophy, color: "text-violet-500" },
    { label: "Skill Badges", value: dashboard?.skillBadges ?? 0, icon: Award, color: "text-cyan-500" },
  ];

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back — here's your learning progress</p>
          </div>
          <Link href="/courses">
            <Button size="sm" className="gap-1.5">
              <BookOpen className="w-4 h-4" /> Find courses
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statsCards.map(({ label, value, icon: Icon, color }, i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-card p-4 text-center">
              {isLoading ? (
                <Skeleton className="h-16 w-full" />
              ) : (
                <>
                  <Icon className={`w-5 h-5 mx-auto mb-2 ${color}`} />
                  <div className="text-2xl font-bold text-foreground">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> My Courses
                </h2>
                <Link href="/courses">
                  <Button variant="ghost" size="sm" className="gap-1 text-primary text-xs">
                    Browse more <ChevronRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)
                ) : enrollments?.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No courses enrolled yet</p>
                    <Link href="/courses">
                      <Button size="sm" className="mt-3">Explore courses</Button>
                    </Link>
                  </div>
                ) : (
                  enrollments?.map((enrollment) => (
                    <Link key={enrollment.id} href={`/courses/${enrollment.courseId}`}>
                      <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                        {enrollment.courseThumbnail ? (
                          <img src={enrollment.courseThumbnail} alt={enrollment.courseTitle || ""} className="w-16 h-12 rounded-lg object-cover bg-muted shrink-0" />
                        ) : (
                          <div className="w-16 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <BookOpen className="w-5 h-5 text-primary/50" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {enrollment.courseTitle || `Course #${enrollment.courseId}`}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Progress value={enrollment.progress} className="h-1.5 flex-1" />
                            <span className="text-xs text-muted-foreground shrink-0">{enrollment.progress}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {enrollment.progress >= 100 ? "Completed" : "In progress"}
                          </p>
                        </div>
                        {enrollment.progress >= 100 && (
                          <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                        )}
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress chart */}
            <div className="rounded-xl border border-border/60 bg-card p-5">
              <h3 className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-primary" /> Progress Overview
              </h3>
              {isLoading ? (
                <Skeleton className="h-40 w-full" />
              ) : (
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                      </Pie>
                      <Tooltip formatter={(v) => [v, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> Completed</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-muted inline-block" /> In Progress</span>
              </div>
            </div>

            {/* Recommended */}
            <div className="rounded-xl border border-border/60 bg-card p-5">
              <h3 className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Recommended for You
              </h3>
              <div className="space-y-3">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)
                ) : (
                  dashboard?.recommendedCourses?.slice(0, 3).map((course) => (
                    <Link key={course.id} href={`/courses/${course.id}`}>
                      <div className="group flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4 text-primary/60" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">{course.title}</p>
                          <p className="text-xs text-muted-foreground">${course.price === 0 ? "Free" : course.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
