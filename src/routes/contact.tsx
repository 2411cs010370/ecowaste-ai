import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageShell, SectionTitle } from "@/components/eco/Section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — EcoWaste AI" },
      { name: "description", content: "Get in touch with the EcoWaste AI project team." },
      { property: "og:title", content: "Contact — EcoWaste AI" },
      { property: "og:description", content: "Questions or collaboration ideas? Reach the EcoWaste AI team." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "Message is too short").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) { toast.error(r.error.issues[0]?.message ?? "Invalid input"); return; }
    toast.success("Thanks! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <PageShell>
      <SectionTitle eyebrow="Contact" title="Get in Touch" />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          {[
            { icon: Mail, text: "team@ecowaste.ai", href: "mailto:team@ecowaste.ai" },
            { icon: Phone, text: "+91 70329 89461", href: "tel:+917032989461" },
            { icon: MapPin, text: "Hyderabad, India", href: undefined },
          ].map((item, i) => {
            const Icon = item.icon;
            const content = (
              <div key={i} className="glass lift flex items-center gap-3 p-5">
                <Icon className="size-5 text-primary shrink-0" />
                <span>{item.text}</span>
              </div>
            );
            return item.href ? (
              <a key={i} href={item.href} className="block hover:opacity-90 transition-opacity">
                {content}
              </a>
            ) : (
              content
            );
          })}
        </div>
        <form onSubmit={submit} className="glass space-y-4 p-6 lg:col-span-2">
          <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Textarea rows={5} placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <Button type="submit"><Send className="size-4" /> Send Message</Button>
        </form>
      </div>
    </PageShell>
  );
}
