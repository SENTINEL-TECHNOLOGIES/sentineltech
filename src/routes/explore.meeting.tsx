import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Badge } from "@/components/ui-bits";
import { Calendar, Clock, Video } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/explore/meeting")({
  head: () => ({ meta: [{ title: "Agendar Reunião — Sentinel" }] }),
  component: Meeting,
});

const days = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() + i + 1);
  return d;
});
const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

function Meeting() {
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agende uma consultoria</h1>
        <p className="mt-2 text-sm text-muted-foreground">Vídeo de 30 minutos com um engenheiro sênior. Sem pitch comercial, é uma sessão de trabalho.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader title="Escolha uma data" description="Horários no seu fuso local" action={<Badge variant="info"><Video className="mr-1 inline h-3 w-3" />Google Meet</Badge>} />
          <div className="p-5">
            <div className="flex gap-2 overflow-x-auto pb-3">
              {days.map((d, i) => (
                <button key={i} onClick={() => { setDay(i); setSlot(null); }} className={`flex shrink-0 flex-col items-center rounded-lg border px-4 py-3 transition ${day === i ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:border-primary/40"}`}>
                  <div className="text-[10px] font-mono uppercase">{d.toLocaleDateString("pt-BR", { weekday: "short" })}</div>
                  <div className="font-mono text-xl font-bold">{d.getDate()}</div>
                  <div className="text-[10px]">{d.toLocaleDateString("pt-BR", { month: "short" })}</div>
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {slots.map((s) => (
                <button key={s} onClick={() => setSlot(s)} className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm transition ${slot === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50 hover:bg-accent"}`}>
                  <Clock className="h-3.5 w-3.5" /> {s}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Seus dados" />
          <form className="space-y-3 p-5" onSubmit={(e) => { e.preventDefault(); if (!slot) return toast.error("Selecione um horário"); toast.success(`Reunião marcada para ${days[day].toLocaleDateString("pt-BR")} às ${slot}`); }}>
            <input placeholder="Nome completo" className="w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
            <input placeholder="E-mail corporativo" type="email" className="w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
            <input placeholder="Empresa" className="w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
            <textarea rows={3} placeholder="O que você gostaria de discutir?" className="w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-xs">
              <div className="flex items-center gap-2 font-semibold"><Calendar className="h-3.5 w-3.5 text-primary" /> {slot ? `${days[day].toLocaleDateString("pt-BR")} · ${slot}` : "Selecione data e horário"}</div>
            </div>
            <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">Confirmar reunião</button>
          </form>
        </Card>
      </div>
    </div>
  );
}
