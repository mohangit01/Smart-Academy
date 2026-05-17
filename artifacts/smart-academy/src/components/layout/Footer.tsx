import { Link } from "wouter";
import { GraduationCap, Twitter, Linkedin, Youtube, Github, Mail } from "lucide-react";

const footerLinks = {
  "Learn": [
    { label: "All Courses", href: "/courses" },
    { label: "Categories", href: "/categories" },
    { label: "Degrees & Programs", href: "/degrees" },
    { label: "Skills Programs", href: "/skills" },
    { label: "Certifications", href: "/courses" },
  ],
  "Explore": [
    { label: "Events & Webinars", href: "/events" },
    { label: "Job Portal", href: "/jobs" },
    { label: "Blog & Resources", href: "/blog" },
    { label: "Community", href: "/community" },
    { label: "AI Smart Search", href: "/search" },
  ],
  "Company": [
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/jobs" },
    { label: "Press Kit", href: "/about" },
  ],
  "For Educators": [
    { label: "Teach on SMART-ACADEMY", href: "/signup" },
    { label: "Institution Dashboard", href: "/dashboard" },
    { label: "Teacher Dashboard", href: "/dashboard" },
    { label: "Partnerships", href: "/about" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 xl:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight">
                <span className="text-primary">SMART</span>
                <span className="text-foreground">-ACADEMY</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
              The global AI-powered education platform empowering 125,000+ learners across 120 countries.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Linkedin, Youtube, Github].map((Icon, i) => (
                <a key={i} href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-semibold text-sm text-foreground mb-4">{section}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SMART-ACADEMY. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
