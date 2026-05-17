import { Link } from "wouter";
import { Globe, Users, Award, BookOpen, Heart, Target, Lightbulb, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/shared/PageHeader";

const team = [
  { name: "Dr. Rahul Verma", role: "CEO & Co-founder", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahulv", bio: "Former MIT professor and edtech pioneer with 20 years in education innovation." },
  { name: "Dr. Priya Sharma", role: "Chief Learning Officer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priyasharma", bio: "PhD in Cognitive Science from Stanford. Expert in adaptive learning systems." },
  { name: "Marcus Chen", role: "CTO", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcuschen", bio: "Ex-Google engineer. Built AI systems that power learning for 10M+ users." },
  { name: "Sarah Williams", role: "Head of Global Partnerships", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahwilliams", bio: "Oxford MBA. Previously led partnerships at Coursera and Udemy." },
];

const values = [
  { icon: Globe, title: "Education for everyone", description: "Quality learning should know no borders. We make world-class education accessible to learners everywhere." },
  { icon: Lightbulb, title: "Innovation first", description: "We leverage AI and technology to create learning experiences that adapt to each student's unique needs." },
  { icon: Heart, title: "Learner-centric", description: "Every decision we make starts with one question: how does this help our learners succeed?" },
  { icon: Handshake, title: "Community driven", description: "Learning is better together. We build communities where knowledge flows freely between teachers and students." },
];

const milestones = [
  { year: "2019", event: "Founded in Bangalore, India with 10 courses and 500 students" },
  { year: "2020", event: "Expanded to 40 countries, launched mobile app, reached 25,000 students" },
  { year: "2021", event: "Raised Series A. Launched live events platform and job board" },
  { year: "2022", event: "Partnered with MIT, IIT Delhi, and Oxford. Reached 50,000 students" },
  { year: "2023", event: "Launched AI-powered tutor and adaptive learning paths" },
  { year: "2024", event: "Crossed 100,000 students, 1,200 instructors, 4,500+ courses" },
  { year: "2026", event: "125,000+ learners across 120 countries. Category leader in Asia" },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="About SMART-ACADEMY"
        subtitle="We believe education is the most powerful force for change in the world. Our mission: make world-class learning accessible to everyone, everywhere."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 mb-4">Our Story</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-5">
              Born out of a belief that geography shouldn't determine destiny
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              SMART-ACADEMY was founded in 2019 by a group of educators and technologists who saw a fundamental inequality in global education: the best learning resources were concentrated in wealthy institutions in a handful of cities.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We set out to change that — building a platform that combines the rigor of top universities with the accessibility of the internet and the power of AI to create truly personalized learning journeys.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Students worldwide", value: "125K+" },
                { label: "Countries reached", value: "120+" },
                { label: "Courses available", value: "4,500+" },
                { label: "Satisfaction rate", value: "96%" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl border border-border/60 bg-card p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20 p-8 space-y-4">
            <Target className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To democratize access to world-class education through technology, making it possible for any learner anywhere to reach their full potential — regardless of where they were born or what resources they have.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">What we stand for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-border/60 bg-card p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Meet the team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.name} className="rounded-xl border border-border/60 bg-card p-5 text-center">
                <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full bg-muted mx-auto mb-4" />
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-xs text-primary mb-3">{member.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Our journey</h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border/60" />
            <div className="space-y-6">
              {milestones.map(({ year, event }) => (
                <div key={year} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full border-2 border-primary/30 bg-primary/10 flex items-center justify-center shrink-0 relative z-10">
                    <span className="text-xs font-bold text-primary">{year.slice(2)}</span>
                  </div>
                  <div className="pt-2.5">
                    <span className="text-xs font-semibold text-primary">{year}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20 p-10">
          <h2 className="text-2xl font-bold text-foreground mb-3">Ready to join us?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Join 125,000+ learners across 120 countries on their journey to mastery.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/signup"><Button size="lg" className="shadow-md">Start learning free</Button></Link>
            <Link href="/contact"><Button variant="outline" size="lg">Contact us</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
