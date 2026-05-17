import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Moon, Sun, Menu, X, Search, GraduationCap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { BASE } from "@/lib/api";

const navLinks = [
  { label: "Courses", href: "/courses" },
  { label: "Events", href: "/events" },
  { label: "Jobs", href: "/jobs" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shadow-sm group-hover:shadow-md transition-shadow">
              <GraduationCap className="w-4.5 h-4.5" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-primary">SMART</span>
              <span className="text-foreground">-ACADEMY</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  location === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <Link href="/search">
              <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-foreground" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-sm font-medium">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="text-sm font-medium shadow-sm">Get started</Button>
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-3 border-t border-border/60 mt-3">
            <Link href="/login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">Sign in</Button>
            </Link>
            <Link href="/signup" className="flex-1">
              <Button size="sm" className="w-full">Get started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
