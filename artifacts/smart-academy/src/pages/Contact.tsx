import { useState } from "react";
import { Mail, MapPin, Phone, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/shared/PageHeader";

const offices = [
  { city: "Bangalore (HQ)", address: "100 Koramangala, Bangalore 560034, India", phone: "+91 80 4611 0000" },
  { city: "Singapore", address: "1 Raffles Place, #40-02, Singapore 048616", phone: "+65 6804 0000" },
  { city: "London", address: "22 Bishopsgate, London EC2N 4BQ, UK", phone: "+44 20 7946 0000" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <PageHeader title="Contact Us" subtitle="Have a question or want to partner with us? We'd love to hear from you." />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-semibold text-foreground mb-4">Get in touch</h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p>hello@smart-academy.io</p>
                    <p>support@smart-academy.io</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Live Chat</p>
                    <p>Available 24/7 for Pro users</p>
                    <p>Mon–Fri for Free users</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Our Offices</h3>
              <div className="space-y-4">
                {offices.map((office) => (
                  <div key={office.city} className="rounded-xl border border-border/60 bg-card p-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1.5">{office.city}</p>
                    <p className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" />{office.address}</p>
                    <p className="flex items-center gap-2 mt-1"><Phone className="w-3.5 h-3.5 shrink-0 text-primary" />{office.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 rounded-xl border border-border/60 bg-card p-6">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">Message sent!</h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>Send another message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-semibold text-foreground mb-4">Send us a message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>First name</Label>
                    <Input placeholder="Alex" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Last name</Label>
                    <Input placeholder="Johnson" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input type="email" placeholder="alex@example.com" required />
                </div>
                <div className="space-y-1.5">
                  <Label>Topic</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select a topic" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General inquiry</SelectItem>
                      <SelectItem value="support">Technical support</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="partnerships">Partnerships</SelectItem>
                      <SelectItem value="teaching">Teach on SMART-ACADEMY</SelectItem>
                      <SelectItem value="enterprise">Enterprise plans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Message</Label>
                  <Textarea placeholder="How can we help you?" className="min-h-[120px]" required />
                </div>
                <Button type="submit" className="w-full gap-2">
                  <Send className="w-4 h-4" /> Send message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
