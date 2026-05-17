import { Link } from "wouter";
import { CheckCircle, X, Zap, GraduationCap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/shared/PageHeader";

const plans = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    icon: GraduationCap,
    description: "Start your learning journey",
    color: "border-border/60",
    features: [
      { label: "Access to 200+ free courses", included: true },
      { label: "Community access", included: true },
      { label: "Job board (limited)", included: true },
      { label: "AI search (3/day)", included: true },
      { label: "Certificates", included: false },
      { label: "Premium courses", included: false },
      { label: "Download content", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: 29,
    period: "month",
    icon: Zap,
    description: "Everything you need to accelerate",
    color: "border-primary",
    badge: "Most Popular",
    features: [
      { label: "All 4,500+ courses", included: true },
      { label: "Community access", included: true },
      { label: "Full job board access", included: true },
      { label: "AI search (unlimited)", included: true },
      { label: "Certificates of completion", included: true },
      { label: "Download for offline viewing", included: true },
      { label: "Live event access", included: true },
      { label: "Priority email support", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: null,
    period: "custom",
    icon: Building2,
    description: "For teams and institutions",
    color: "border-border/60",
    features: [
      { label: "All Pro features", included: true },
      { label: "Custom learning paths", included: true },
      { label: "Admin dashboard", included: true },
      { label: "SSO integration", included: true },
      { label: "Analytics & reporting", included: true },
      { label: "Dedicated account manager", included: true },
      { label: "SLA & priority support", included: true },
      { label: "Branded learning portal", included: true },
    ],
  },
];

const faqs = [
  { q: "Can I try Pro for free?", a: "Yes! Every new account gets a 7-day free trial of Pro. No credit card required." },
  { q: "Can I cancel anytime?", a: "Absolutely. Cancel your subscription anytime from your account settings. No cancellation fees." },
  { q: "Do certificates cost extra?", a: "Certificates are included in all Pro and Enterprise plans at no additional cost." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, PayPal, UPI (India), and bank transfers for Enterprise." },
  { q: "Is there a student discount?", a: "Yes! Students get 50% off Pro with a valid .edu email address." },
];

export default function Pricing() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Simple, transparent pricing"
        subtitle="Start free, upgrade when you're ready. No hidden fees."
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border-2 ${plan.color} bg-card p-6 flex flex-col relative ${
                plan.badge ? "shadow-lg shadow-primary/10" : ""
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  {plan.badge}
                </Badge>
              )}
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`p-2 rounded-lg ${plan.badge ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  <plan.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{plan.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5">{plan.description}</p>
              <div className="mb-6">
                {plan.price === null ? (
                  <p className="text-3xl font-bold text-foreground">Custom</p>
                ) : plan.price === 0 ? (
                  <p className="text-3xl font-bold text-foreground">Free</p>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground text-sm">/{plan.period}</span>
                  </div>
                )}
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature.label} className="flex items-center gap-2.5 text-sm">
                    {feature.included ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground/60"}>{feature.label}</span>
                  </li>
                ))}
              </ul>
              {plan.price === null ? (
                <Link href="/contact">
                  <Button variant="outline" className="w-full">Contact sales</Button>
                </Link>
              ) : plan.badge ? (
                <Link href="/signup">
                  <Button className="w-full shadow-sm">Start free trial</Button>
                </Link>
              ) : (
                <Link href="/signup">
                  <Button variant="outline" className="w-full">{plan.price === 0 ? "Get started free" : "Start free trial"}</Button>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-card p-5">
                <h3 className="font-semibold text-sm text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20 p-10">
          <h2 className="text-2xl font-bold text-foreground mb-3">Still not sure?</h2>
          <p className="text-muted-foreground mb-6">Start with our free plan — no credit card required. Upgrade anytime.</p>
          <Link href="/signup">
            <Button size="lg" className="shadow-md">Start learning for free</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
