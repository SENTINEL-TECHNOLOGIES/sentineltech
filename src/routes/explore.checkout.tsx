import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, ChevronLeft, CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { Badge, Card } from "@/components/ui-bits";
import { activateService, getService, type ServiceId } from "@/lib/account";
import { getSession } from "@/lib/auth";
import { inputClass } from "@/components/auth-shell";

export const Route = createFileRoute("/explore/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({ service: typeof search.service === "string" ? search.service : "sentinel-core" }),
  head: () => ({ meta: [{ title: "Contratação — Sentinel" }] }),
  component: Checkout,
});

function Checkout() {
  const { service: requestedService } = Route.useSearch();
  const navigate = useNavigate();
  const service = getService(requestedService as ServiceId) || getService("sentinel-core")!;
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });

  useEffect(() => { if (!getSession()) navigate({ to: "/cadastro" }); }, [navigate]);
  function next() { if (step === 1 && (!card.name.trim() || card.number.replace(/\D/g, "").length < 12 || !/^\d{2}\/\d{2}$/.test(card.expiry) || card.cvv.length < 3)) return; setStep((current) => current + 1); }
  function pay() { setProcessing(true); window.setTimeout(() => { activateService(service.id); setProcessing(false); setStep(3); }, 1800); }

  return <div className="mx-auto w-full max-w-3xl space-y-8 px-5 py-8 pb-12 sm:px-8 md:py-12">
    <header><Badge variant="info">Contratação segura e simulada</Badge><h1 className="mt-4 text-3xl font-bold">Ativar {service.name}</h1><p className="mt-2 text-sm text-muted-foreground">Nenhum pagamento real será realizado nesta demonstração.</p></header>
    <div className="grid grid-cols-4 gap-2">{["Serviço", "Pagamento", "Revisão", "Concluído"].map((label, index) => <div key={label} className={`border-t-2 pt-2 text-xs ${index <= step ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>{index + 1}. {label}</div>)}</div>
    {step === 0 && <Card className="p-6"><div className="flex items-start justify-between gap-4"><div><div className="text-sm text-muted-foreground">Serviço selecionado</div><h2 className="mt-1 text-2xl font-bold">{service.name}</h2><p className="mt-2 text-sm text-muted-foreground">{service.description}</p></div><ShieldCheck className="h-7 w-7 text-cyan" /></div><div className="mt-6 rounded-lg border border-border bg-secondary/20 p-4"><div className="flex justify-between text-sm"><span>Periodicidade</span><strong>{service.period}</strong></div><div className="mt-2 flex justify-between text-sm"><span>Valor simulado</span><strong>R$ {service.price.toFixed(2).replace(".", ",")}</strong></div></div><button type="button" onClick={() => setStep(1)} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Continuar <CreditCard className="h-4 w-4" /></button></Card>}
    {step === 1 && <Card className="p-6"><h2 className="text-xl font-bold">Dados fictícios de pagamento</h2><p className="mt-1 text-sm text-muted-foreground">Use qualquer cartão de teste com formato válido. Nada será enviado.</p><div className="mt-5 space-y-4"><label className="block text-xs font-semibold text-muted-foreground">Nome no cartão<input className={`${inputClass} mt-1`} value={card.name} onChange={(event) => setCard({ ...card, name: event.target.value })} placeholder="Cliente Sentinel" /></label><label className="block text-xs font-semibold text-muted-foreground">Número do cartão<input className={`${inputClass} mt-1`} value={card.number} onChange={(event) => setCard({ ...card, number: event.target.value.replace(/\D/g, "").slice(0, 16) })} placeholder="4242 4242 4242 4242" inputMode="numeric" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-xs font-semibold text-muted-foreground">Validade<input className={`${inputClass} mt-1`} value={card.expiry} onChange={(event) => setCard({ ...card, expiry: event.target.value.replace(/[^\d/]/g, "").slice(0, 5) })} placeholder="12/30" /></label><label className="block text-xs font-semibold text-muted-foreground">CVV<input className={`${inputClass} mt-1`} value={card.cvv} onChange={(event) => setCard({ ...card, cvv: event.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="123" inputMode="numeric" /></label></div></div><button type="button" onClick={next} className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Continuar</button></Card>}
    {step === 2 && <Card className="p-6"><h2 className="text-xl font-bold">Confirme sua contratação</h2><div className="mt-5 divide-y divide-border rounded-lg border border-border">{[["Serviço", service.name], ["Periodicidade", service.period], ["Valor", `R$ ${service.price.toFixed(2).replace(".", ",")}`], ["Pagamento", `Cartão terminado em ${card.number.slice(-4)}`]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 px-4 py-3 text-sm"><span className="text-muted-foreground">{label}</span><strong>{value}</strong></div>)}</div><div className="mt-6 flex gap-3"><button type="button" onClick={() => setStep(1)} className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent">Voltar</button><button type="button" onClick={pay} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Confirmar pagamento</button></div></Card>}
    {step === 3 && <Card className="p-8 text-center">{processing ? <><Loader2 className="mx-auto h-10 w-10 animate-spin text-cyan" /><h2 className="mt-5 text-xl font-bold">Processando pagamento simulado</h2><p className="mt-2 text-sm text-muted-foreground">Aguarde um instante enquanto ativamos seu serviço.</p></> : <><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success/15 text-success"><Check className="h-6 w-6" /></div><h2 className="mt-5 text-xl font-bold">Pagamento aprovado</h2><p className="mt-2 text-sm text-muted-foreground">{service.name} está ativo na sua conta.</p><button type="button" onClick={() => navigate({ to: "/portal/dashboard" })} className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Acessar dashboard</button></>}</Card>}
    {step > 0 && step < 3 && <button type="button" onClick={() => setStep((current) => current - 1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ChevronLeft className="h-4 w-4" /> Voltar</button>}
  </div>;
}
