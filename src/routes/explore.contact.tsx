import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader } from "@/components/ui-bits";
import { MessageCircle, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/explore/contact")({
  head: () => ({ meta: [{ title: "Contact — Sentinel" }] }),
  component: Contact,
});

function Contact() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Get in touch</h1>
        <p className="mt-2 text-sm text-muted-foreground">Talk to sales, support or our 24/7 SOC desk — whichever you need.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader title="Send us a message" />
          <form className="space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); toast.success("Message sent — we'll reply within 24h"); }}>
            <div className="grid gap-4 md:grid-cols-2">
              <input placeholder="Full name" className={inputCls} />
              <input placeholder="Email" type="email" className={inputCls} />
              <input placeholder="Company" className={inputCls} />
              <input placeholder="Phone" className={inputCls} />
            </div>
            <select className={inputCls}>
              <option>I'd like to talk about... Sales</option>
              <option>Support</option>
              <option>Partnership</option>
              <option>Media / Press</option>
            </select>
            <textarea rows={5} placeholder="How can we help?" className={inputCls} />
            <button className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">Send message</button>
          </form>
        </Card>

        <div className="space-y-4">
          <ContactItem icon={<MessageCircle className="h-5 w-5" />} title="WhatsApp" subtitle="+1 (415) 555-0142" cta="Open chat" href="https://wa.me/14155550142" accent="success" />
          <ContactItem icon={<Mail className="h-5 w-5" />} title="Email" subtitle="hello@sentinel.tech" cta="Send email" href="mailto:hello@sentinel.tech" accent="primary" />
          <ContactItem icon={<Phone className="h-5 w-5" />} title="Phone — Global" subtitle="+1 (415) 555-0199" cta="Call now" href="tel:+14155550199" accent="cyan" />
          <ContactItem icon={<Calendar className="h-5 w-5" />} title="Book a meeting" subtitle="30-min consultation" cta="Schedule" href="/explore/meeting" accent="warning" />

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary"><MapPin className="h-5 w-5" /></div>
              <div className="min-w-0">
                <div className="font-semibold">Headquarters</div>
                <div className="mt-1 text-sm text-muted-foreground">350 Mission St, Floor 32<br />San Francisco, CA 94105</div>
                <div className="mt-3 text-xs text-muted-foreground">SOC locations · São Paulo · Frankfurt · Singapore · Toronto</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary";

function ContactItem({ icon, title, subtitle, cta, href, accent }: { icon: React.ReactNode; title: string; subtitle: string; cta: string; href: string; accent: string }) {
  const map: Record<string, string> = { primary: "text-primary bg-primary/15", cyan: "text-cyan bg-cyan/15", success: "text-success bg-success/15", warning: "text-warning bg-warning/15" };
  return (
    <Card className="flex items-center gap-4 p-5 transition hover:border-primary/50">
      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${map[accent]}`}>{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold">{title}</div>
        <div className="truncate text-xs text-muted-foreground">{subtitle}</div>
      </div>
      <a href={href} className="shrink-0 text-xs font-semibold text-primary hover:underline">{cta} →</a>
    </Card>
  );
}
