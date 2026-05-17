import { useState } from "react";
import { Link } from "wouter";
import { Search, MapPin, Building2, Briefcase, DollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/shared/PageHeader";
import { useListJobs } from "@workspace/api-client-react";

const jobTypes = ["All Types", "full-time", "part-time", "contract", "internship"];

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");

  const { data: jobs, isLoading } = useListJobs({
    ...(search ? { search } : {}),
    ...(type && type !== "All Types" ? { type } : {}),
  });

  const formatSalary = (min?: number | null, max?: number | null, currency = "USD") => {
    if (!min && !max) return null;
    const fmt = (v: number) => currency === "INR" ? `₹${(v / 100000).toFixed(1)}L` : `$${(v / 1000).toFixed(0)}K`;
    if (min && max) return `${fmt(min)} – ${fmt(max)}`;
    if (min) return `${fmt(min)}+`;
    return null;
  };

  return (
    <div className="min-h-screen">
      <PageHeader title="Job Portal" subtitle="Discover opportunities matched to your skills and learning journey" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search jobs, companies..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full sm:w-40 h-9">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((t) => <SelectItem key={t} value={t}>{t === "All Types" ? t : t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-muted-foreground mb-6">{isLoading ? "Loading..." : `${jobs?.length ?? 0} opportunities`}</p>

        {isLoading ? (
          <div className="space-y-4">{Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}</div>
        ) : (
          <div className="space-y-4">
            {jobs?.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <div className="group rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-md transition-all p-5 cursor-pointer">
                  <div className="flex items-start gap-4">
                    {job.companyLogo ? (
                      <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-lg border border-border/60 bg-muted object-cover shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-primary/50" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs shrink-0">Apply</Button>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.category}</span>
                        {formatSalary(job.salaryMin, job.salaryMax, job.currency) && (
                          <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                        )}
                        <Badge variant="outline" className="text-xs capitalize">{job.type}</Badge>
                        {job.isRemote && <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs">Remote</Badge>}
                      </div>
                    </div>
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
