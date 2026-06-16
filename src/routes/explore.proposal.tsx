import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader } from "@/components/ui-bits";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/explore/proposal")({
  head: () => ({ meta: [{ title: "Request Proposal — Sentinel" }] }),
  component: Proposal,
});

function Proposal() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Request a proposal</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tell us about your environment — we'll come back within one business day with scoping and pricing.</p>
      </div>
      <Card>
        <CardHeader title="Project details" description="All fields are confidential" />
        {sent ? (
          <div className="p-10 text-center">
            <div className="text-5xl">✓</div>
            <h2 className="mt-3 text-xl font-bold">Request received</h2>
            <p className="mt-2 text-sm text-muted-foreground">A Sentinel solutions engineer will reach out within 24 hours.</p>
          </div>
        ) : (
          <form className="space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); toast.success("Proposal request sent"); setSent(true); }}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" placeholder="Jane Doe" />
              <Field label="Work email" placeholder="jane@company.com" type="email" />
              <Field label="Company" placeholder="Acme Corp" />
              <Field label="Role" placeholder="CISO" />
              <Field label="Company size">
                <select className={inputCls}><option>1-50</option><option>51-250</option><option>251-1000</option><option>1000+</option></select>
              </Field>
              <Field label="Annual budget">
                <select className={inputCls}><option>Under $50k</option><option>$50k - $250k</option><option>$250k - $1M</option><option>$1M+</option></select>
              </Field>
            </div>
            <Field label="Services of interest">
              <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {["AI CCTV", "Biometric Access", "Smart Automation", "Remote Monitoring", "Consulting", "Integrated Project"].map((s) => (
                  <label key={s} className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm hover:border-primary/50"><input type="checkbox" className="accent-primary" />{s}</label>
                ))}
              </div>
            </Field>
            <Field label="Tell us about your environment">
              <textarea rows={5} placeholder="Endpoints, sites, cloud providers, compliance needs..." className={inputCls} />
            </Field>
            <button className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">Send proposal request</button>
          </form>
        )}
      </Card>
    </div>
  );
}

const inputCls = "mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary";

function Field({ label, placeholder, type = "text", children }: { label: string; placeholder?: string; type?: string; children?: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      {children ?? <input type={type} placeholder={placeholder} className={inputCls} />}
    </div>
  );
}
