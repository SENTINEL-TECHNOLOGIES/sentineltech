import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, Badge } from "@/components/ui-bits";
import { Calendar, Clock, Video } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/explore/meeting")({
  head: () => ({ meta: [{ title: "Schedule Meeting — Sentinel" }] }),
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
        <h1 className="text-3xl font-bold">Schedule a consultation</h1>
        <p className="mt-2 text-sm text-muted-foreground">30-minute video call with a senior solutions engineer. No sales pitch, just a working session.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader title="Pick a date" description="Times shown in your local time zone" action={<Badge variant="info"><Video className="mr-1 inline h-3 w-3" />Google Meet</Badge>} />
          <div className="p-5">
            <div className="flex gap-2 overflow-x-auto pb-3">
              {days.map((d, i) => (
                <button key={i} onClick={() => { setDay(i); setSlot(null); }} className={`flex shrink-0 flex-col items-center rounded-lg border px-4 py-3 transition ${day === i ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:border-primary/40"}`}>
                  <div className="text-[10px] font-mono uppercase">{d.toLocaleDateString("en", { weekday: "short" })}</div>
                  <div className="font-mono text-xl font-bold">{d.getDate()}</div>
                  <div className="text-[10px]">{d.toLocaleDateString("en", { month: "short" })}</div>
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
          <CardHeader title="Your details" />
          <form className="space-y-3 p-5" onSubmit={(e) => { e.preventDefault(); if (!slot) return toast.error("Pick a time slot"); toast.success(`Meeting booked for ${days[day].toDateString()} at ${slot}`); }}>
            <input placeholder="Full name" className="w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
            <input placeholder="Work email" type="email" className="w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
            <input placeholder="Company" className="w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
            <textarea rows={3} placeholder="What would you like to cover?" className="w-full rounded-lg border border-border bg-input/60 px-3 py-2.5 text-sm outline-none focus:border-primary" />
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-xs">
              <div className="flex items-center gap-2 font-semibold"><Calendar className="h-3.5 w-3.5 text-primary" /> {slot ? `${days[day].toDateString()} · ${slot}` : "Pick a date and time"}</div>
            </div>
            <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">Confirm meeting</button>
          </form>
        </Card>
      </div>
    </div>
  );
}
