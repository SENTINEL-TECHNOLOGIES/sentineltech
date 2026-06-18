import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader } from "@/components/ui-bits";
import { MessageCircle, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/explore/contact")({
  head: () => ({ meta: [{ title: "Contato — Sentinel" }] }),
  component: Contact,
});

function Contact() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Fale com a gente</h1>
        <p className="mt-2 text-sm text-muted-foreground">Converse com vendas, suporte ou a nossa central 24/7 — o que você precisar.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader title="Envie uma mensagem" />
          <form className="space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); toast.success("Mensagem enviada — respondemos em até 24h"); }}>
            <div className="grid gap-4 md:grid-cols-2">
              <input placeholder="Nome completo" className={inputCls} />
              <input placeholder="E-mail" type="email" className={inputCls} />
              <input placeholder="Empresa" className={inputCls} />
              <input placeholder="Telefone" className={inputCls} />
            </div>
            <select className={inputCls}>
              <option>Quero falar sobre... Vendas</option>
              <option>Suporte</option>
              <option>Parcerias</option>
              <option>Imprensa</option>
            </select>
            <textarea rows={5} placeholder="Como podemos ajudar?" className={inputCls} />
            <button className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">Enviar mensagem</button>
          </form>
        </Card>

        <div className="space-y-4">
          <ContactItem icon={<MessageCircle className="h-5 w-5" />} title="WhatsApp" subtitle="+55 (11) 4002-8922" cta="Abrir chat" href="https://wa.me/551140028922" accent="success" />
          <ContactItem icon={<Mail className="h-5 w-5" />} title="E-mail" subtitle="contato@sentinel.tech" cta="Enviar e-mail" href="mailto:contato@sentinel.tech" accent="primary" />
          <ContactItem icon={<Phone className="h-5 w-5" />} title="Telefone — Global" subtitle="+55 (11) 4000-0199" cta="Ligar agora" href="tel:+551140000199" accent="cyan" />
          <ContactItem icon={<Calendar className="h-5 w-5" />} title="Agendar reunião" subtitle="Consultoria de 30 min" cta="Agendar" href="/explore/meeting" accent="warning" />

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary"><MapPin className="h-5 w-5" /></div>
              <div className="min-w-0">
                <div className="font-semibold">Sede</div>
                <div className="mt-1 text-sm text-muted-foreground">Av. Brigadeiro Faria Lima, 3500<br />Itaim Bibi · São Paulo, SP</div>
                <div className="mt-3 text-xs text-muted-foreground">Centrais de Operação · São Paulo · Rio de Janeiro · Curitiba · Recife</div>
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
