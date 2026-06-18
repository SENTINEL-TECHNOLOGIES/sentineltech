import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader } from "@/components/ui-bits";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/explore/proposal")({
  head: () => ({ meta: [{ title: "Solicitar Proposta — Sentinel" }] }),
  component: Proposal,
});

function Proposal() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Solicitar proposta</h1>
        <p className="mt-2 text-sm text-muted-foreground">Conte sobre seu ambiente — retornamos em até um dia útil com escopo e investimento.</p>
      </div>
      <Card>
        <CardHeader title="Detalhes do projeto" description="Todos os campos são confidenciais" />
        {sent ? (
          <div className="p-10 text-center">
            <div className="text-5xl">✓</div>
            <h2 className="mt-3 text-xl font-bold">Solicitação recebida</h2>
            <p className="mt-2 text-sm text-muted-foreground">Um engenheiro de soluções Sentinel entrará em contato em até 24h.</p>
          </div>
        ) : (
          <form className="space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); toast.success("Solicitação de proposta enviada"); setSent(true); }}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nome completo" placeholder="Maria Silva" />
              <Field label="E-mail corporativo" placeholder="maria@empresa.com" type="email" />
              <Field label="Empresa" placeholder="Acme Corp" />
              <Field label="Cargo" placeholder="Diretor de Segurança" />
              <Field label="Porte da empresa">
                <select className={inputCls}><option>1-50</option><option>51-250</option><option>251-1000</option><option>1000+</option></select>
              </Field>
              <Field label="Orçamento anual">
                <select className={inputCls}><option>Até R$ 250 mil</option><option>R$ 250 mil – R$ 1 mi</option><option>R$ 1 mi – R$ 5 mi</option><option>Acima de R$ 5 mi</option></select>
              </Field>
            </div>
            <Field label="Serviços de interesse">
              <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {["CFTV com IA", "Acesso Biométrico", "Automação Predial", "Monitoramento Remoto", "Consultoria", "Projeto Integrado"].map((s) => (
                  <label key={s} className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm hover:border-primary/50"><input type="checkbox" className="accent-primary" />{s}</label>
                ))}
              </div>
            </Field>
            <Field label="Conte sobre seu ambiente">
              <textarea rows={5} placeholder="Quantidade de sites, câmeras, portas, requisitos de compliance..." className={inputCls} />
            </Field>
            <button className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">Enviar solicitação</button>
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
