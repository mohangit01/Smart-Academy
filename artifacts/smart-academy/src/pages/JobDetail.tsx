import { useParams } from "wouter";
import { MapPin, Building2, Briefcase, DollarSign, Users, Calendar, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetJob } from "@workspace/api-client-react";

export default function JobDetail() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id, 10);
  const { data: job, isLoading } = useGetJob(id, { query: { enabled: !!id } });

  if (isLoading) {
    return <div className="min-h-screen pt-20 max-w-4xl mx-auto px-4 py-12 space-y-4">
      <Skeleton className="h-10 w-3/4" /><Skeleton className="h-64 w-full rounded-xl" />
    </div>;
  }

  if (!job) return <div className="pt-24 text-center text-muted-foreground">Job not found.</div>;

  const formatSalary = () => {
    if (!job.salaryMin && !job.salaryMax) return null;
    const fmt = (v: number) => job.currency === "INR" ? `₹${(v / 100000).toFixed(1)}L` : `$${(v / 1000).toFixed(0)}K`;
    if (job.salaryMin && job.salaryMax) return `${fmt(job.salaryMin)} – ${fmt(job.salaryMax)}`;
    if (job.salaryMin) return `${fmt(job.salaryMin)}+`;
    return null;
  };

  return (
    <div className="min-h-screen">
      <div className="border-b border-border/60 bg-gradient-to-br from-primary/5 to-background pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start gap-5 mb-6">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.company} className="w-16 h-16 rounded-xl border border-border/60 bg-muted object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-primary/50" />
              </div>
            )}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{job.title}</h1>
              <p className="text-muted-foreground text-lg mt-1">{job.company}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location}</span>
            <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{job.category}</span>
            {formatSalary() && <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" />{formatSalary()}</span>}
            <Badge variant="outline" className="capitalize">{job.type}</Badge>
            {job.isRemote && <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Remote</Badge>}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">About the role</h2>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>
            {job.requirements && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">Requirements</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{job.requirements}</p>
              </div>
            )}
            {job.skills && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.split(",").map((s) => <Badge key={s} variant="outline" className="text-xs">{s.trim()}</Badge>)}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-6 sticky top-20 h-fit space-y-4">
            <Button className="w-full" size="lg">Apply Now</Button>
            <Button variant="outline" className="w-full">Save Job</Button>
            <div className="space-y-3 text-sm text-muted-foreground pt-2 border-t border-border/60">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" />Posted {new Date(job.postedAt).toLocaleDateString()}</div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" />{job.applicationCount} applicants</div>
              <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" />{job.experienceYears}+ years experience</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
