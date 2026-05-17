import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search, ArrowRight, Star, Users, BookOpen, Trophy, Globe, Award, Briefcase, Play, CheckCircle, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import CourseCard from "@/components/shared/CourseCard";
import {
  useGetPlatformStats,
  useGetFeaturedCourses,
  useGetTrendingCourses,
  useListCategories,
  useListEvents,
  useListCommunityPosts,
} from "@workspace/api-client-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const trendingSkills = [
  "React", "Python", "Machine Learning", "AWS", "TypeScript", "Data Science",
  "Node.js", "Flutter", "Cybersecurity", "Blockchain", "DevOps", "Figma",
];

const testimonials = [
  { name: "Arjun Mehta", role: "Software Engineer at Google", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun", text: "SMART-ACADEMY's React course was the launchpad for my career at Google. The project-based approach made the difference.", rating: 5 },
  { name: "Priya Nair", role: "Data Scientist at Amazon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya2", text: "I transitioned from biology to data science in 8 months using SMART-ACADEMY. The ML courses are world-class.", rating: 5 },
  { name: "David Okonkwo", role: "Product Manager at Stripe", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david", text: "The MBA Essentials course gave me the business foundation I needed to move into product management.", rating: 5 },
];

const partners = ["MIT", "IIT Delhi", "Stanford", "Oxford", "Cambridge", "NUS", "IIM", "Carnegie Mellon"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [, navigate] = useLocation();

  const { data: stats, isLoading: statsLoading } = useGetPlatformStats();
  const { data: featuredCourses, isLoading: featuredLoading } = useGetFeaturedCourses();
  const { data: trendingCourses, isLoading: trendingLoading } = useGetTrendingCourses();
  const { data: categories, isLoading: categoriesLoading } = useListCategories();
  const { data: events, isLoading: eventsLoading } = useListEvents({ upcoming: "true" });
  const { data: communityPosts } = useListCommunityPosts();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  const statsItems = [
    { label: "Active Learners", value: stats?.totalStudents?.toLocaleString() ?? "125K+", icon: Users },
    { label: "Courses", value: stats?.totalCourses?.toLocaleString() ?? "4,500+", icon: BookOpen },
    { label: "Instructors", value: stats?.totalInstructors?.toLocaleString() ?? "1,200+", icon: Award },
    { label: "Countries", value: stats?.totalCountries?.toString() ?? "120+", icon: Globe },
    { label: "Certificates Issued", value: stats?.totalCertificates?.toLocaleString() ?? "89K+", icon: Trophy },
    { label: "Job Placements", value: stats?.totalJobPlacements?.toLocaleString() ?? "45K+", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-xs font-medium border-primary/30 text-primary bg-primary/5">
              <Zap className="w-3 h-3 mr-1.5" /> AI-Powered Global Education Platform
            </Badge>
          </motion.div>
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6 leading-[1.1]"
          >
            Learn smarter,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">grow faster</span>
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From K-12 to professional certifications — access world-class courses, AI tutoring, live events, and career opportunities. Education without borders.
          </motion.p>

          {/* Search */}
          <motion.form
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            onSubmit={handleSearch}
            className="flex items-center gap-2 max-w-xl mx-auto mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, skills, topics..."
                className="pl-10 h-12 text-sm bg-background border-border/80 rounded-lg shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-6 shadow-sm">
              Search
            </Button>
          </motion.form>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4} className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            <span>Popular:</span>
            {["React", "Python", "JEE", "AWS", "MBA", "Data Science"].map((t) => (
              <Link key={t} href={`/search?q=${t}`}>
                <span className="text-primary hover:text-primary/80 cursor-pointer transition-colors">{t}</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-y border-border/60 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {statsItems.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  {statsLoading ? <Skeleton className="h-8 w-16 mx-auto" /> : value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Browse by Category</h2>
              <p className="text-muted-foreground mt-1">Explore our wide range of learning paths</p>
            </div>
            <Link href="/categories">
              <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categoriesLoading
              ? Array(10).fill(0).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
              : categories?.slice(0, 10).map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.05}
                >
                  <Link href={`/courses?category=${cat.slug}`}>
                    <div className="group p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer h-24 flex flex-col justify-between">
                      <span className="text-2xl">{cat.icon && iconEmoji(cat.icon)}</span>
                      <div>
                        <p className="font-medium text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">{cat.courseCount} courses</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Featured Courses</h2>
              <p className="text-muted-foreground mt-1">Hand-picked by our education team</p>
            </div>
            <Link href="/courses">
              <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
                All courses <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featuredLoading
              ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)
              : featuredCourses?.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </div>
      </section>

      {/* Trending Skills */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Trending Skills</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {trendingSkills.map((skill, i) => (
              <motion.div key={skill} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.04}>
                <Link href={`/search?q=${skill}`}>
                  <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-border/80 hover:border-primary/50 hover:bg-primary/5 hover:text-primary cursor-pointer transition-all">
                    {skill}
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Trending Now</h2>
              <p className="text-muted-foreground mt-1">What learners are enrolling in this week</p>
            </div>
            <Link href="/courses">
              <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {trendingLoading
              ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)
              : trendingCourses?.slice(0, 4).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Upcoming Events</h2>
              <p className="text-muted-foreground mt-1">Live webinars, workshops, and sessions</p>
            </div>
            <Link href="/events">
              <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
                All events <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {eventsLoading
              ? Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)
              : events?.slice(0, 3).map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <div className="group rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-md transition-all p-5 cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-xs capitalize">{event.type}</Badge>
                      {event.isFree ? (
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Free</Badge>
                      ) : (
                        <Badge variant="secondary">${event.price}</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">by {event.hostName}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(event.scheduledAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      <span>{event.durationMinutes}min</span>
                      <span>{event.registrationCount.toLocaleString()} registered</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">Student Success Stories</h2>
            <p className="text-muted-foreground">Real outcomes from real learners</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1}>
                <div className="rounded-xl border border-border/60 bg-card p-6">
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array(t.rating).fill(0).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full bg-muted" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Community Highlights</h2>
              <p className="text-muted-foreground mt-1">Join the conversation with 125,000+ learners</p>
            </div>
            <Link href="/community">
              <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
                Join community <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communityPosts?.slice(0, 2).map((post) => (
              <div key={post.id} className="rounded-xl border border-border/60 bg-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img src={post.authorAvatar || ""} alt={post.authorName} className="w-9 h-9 rounded-full bg-muted" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{post.authorName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{post.authorRole}</p>
                  </div>
                  {post.topic && <Badge variant="outline" className="ml-auto text-xs">{post.topic}</Badge>}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                  <span>{post.likeCount.toLocaleString()} likes</span>
                  <span>{post.replyCount} replies</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Institutions */}
      <section className="py-14 border-y border-border/60 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-widest mb-8">Trusted by leading institutions worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((p) => (
              <span key={p} className="text-sm md:text-base font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tutor CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-violet-500/10 border border-primary/20 p-8 md:p-12 text-center">
            <Badge className="mb-5 bg-primary/10 text-primary border-primary/20">AI-Powered</Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
              Meet your AI learning assistant
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Get instant answers, personalized study plans, AI-generated notes and flashcards, and adaptive recommendations — available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/search">
                <Button size="lg" className="gap-2 shadow-md">
                  <Zap className="w-4 h-4" /> Try AI Search
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg" className="gap-2">
                  Browse courses <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 border-t border-border/60 bg-card/20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Stay ahead of the curve</h3>
          <p className="text-sm text-muted-foreground mb-6">Weekly digest of top courses, career tips, and industry insights. No spam.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Enter your email" type="email" className="flex-1 h-10" />
            <Button type="submit" size="sm" className="px-5">Subscribe</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-3">Join 50,000+ subscribers. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}

function iconEmoji(iconName: string): string {
  const map: Record<string, string> = {
    Code2: "💻", Brain: "🧠", BarChart3: "📊", Smartphone: "📱",
    Cloud: "☁️", Shield: "🛡️", Briefcase: "💼", GraduationCap: "🎓",
    Trophy: "🏆", Link: "🔗",
  };
  return map[iconName] || "📚";
}
