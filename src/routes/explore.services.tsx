import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { Camera, Fingerprint, Building2, Globe, Lightbulb, Layers, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/explore/services")({
  head: () => ({ meta: [{ title: "Serviços — Sentinel" }] }),
  component: Services,
});

const services = [
  {
    icon: <Camera className="h-6 w-6" />, title: "Soluções de CFTV com IA",
    desc: "Câmeras de vigilância inteligentes com analítica de IA on-device e on-premise.",
    benefits: ["Detecção de pessoas e objetos", "Reconhecimento de placas (LPR)", "Analítica de comportamento e permanência"],
    features: ["4K · pouca luz · térmica", "Inferência de IA na borda", "Kits para atualizar CFTV existente"],
    install: ["Levantamento (1 dia)", "Cabeamento e instalação (2-5 dias)", "VMS + calibração de IA (1 dia)"],
    value: "Pare incidentes antes que escalem. Reduza o tempo de investigação em 70%.",
  },
  {
    icon: <Fingerprint className="h-6 w-6" />, title: "Controle de Acesso Biométrico",
    desc: "Face, digital, cartão, mobile e crachás de visitante — unificados em todas as portas.",
    benefits: ["Multifator na porta", "Fluxo de visitantes e prestadores", "Gestão centralizada de usuários"],
    features: ["Biometria anti-fraude", "Mustering e evacuação", "Integração com ERP / RH"],
    install: ["Auditoria de portas (1 dia)", "Controladoras e leitores (3-7 dias)", "Onboarding de usuários (contínuo)"],
    value: "Saiba quem está no seu prédio agora. Acabe com crachás compartilhados e caronas.",
  },
  {
    icon: <Building2 className="h-6 w-6" />, title: "Automação Predial Inteligente",
    desc: "Iluminação, portões, alarmes, HVAC e sensores ambientais orquestrados como um só.",
    benefits: ["Economia de energia 15-30%", "Automações por regras", "Integração com combate a incêndio"],
    features: ["BACnet / Modbus / KNX", "App de controle móvel", "API aberta para integrações"],
    install: ["Scan do prédio e BIM", "Hub e sensores (5-10 dias)", "Workshop de regras"],
    value: "Reduza opex elevando conforto e segurança. Um painel único para facilities.",
  },
  {
    icon: <Globe className="h-6 w-6" />, title: "Monitoramento Remoto 24/7",
    desc: "Operadores treinados acompanham suas instalações 24h por dia direto da nossa central.",
    benefits: ["Resposta média de 3 min", "Verificação ao vivo de alarmes", "Coordenação com polícia e despacho"],
    features: ["Operadores bilíngues", "Verificação por vídeo", "Relatório executivo mensal"],
    install: ["Onboarding de sites e câmeras", "Desenho de runbook e escalonamento", "Go-live em até 14 dias"],
    value: "Troque câmeras passivas por prevenção ativa. Tranquilidade com SLA.",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />, title: "Consultoria em Segurança",
    desc: "Análise de risco, master plan e design vendor-neutral para o seu parque.",
    benefits: ["Avaliação de ameaças e vulnerabilidades", "Master plan de segurança", "Apoio a auditorias e certificações"],
    features: ["Alinhado a ISO / ONVIF / NDAA", "Projetos amigáveis ao seguro", "Especificações vendor-neutral"],
    install: ["Workshops com stakeholders", "Avaliação e relatório", "Roadmap em 4-6 semanas"],
    value: "Invista o orçamento de segurança onde ele realmente reduz risco — com dados.",
  },
  {
    icon: <Layers className="h-6 w-6" />, title: "Projetos Integrados de Segurança",
    desc: "Entrega turnkey para novos sites: CFTV, acesso, automação e SOC — em um único contrato.",
    benefits: ["Parceiro único responsável", "Orçamento previsível", "Operação no ar mais rápido"],
    features: ["Civil + baixa tensão + TI", "Parcerias com fabricantes (OEM)", "Planos de manutenção do ciclo de vida"],
    install: ["Modelo design-build-operate", "Comissionamento em fases", "Plano de serviço de 5 anos opcional"],
    value: "Abra uma nova unidade 100% segura desde o primeiro dia. Sem disputas entre fornecedores.",
  },
];

function Services() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">Catálogo de Serviços</Badge>
        <h1 className="mt-3 text-3xl font-bold">Segurança física, de ponta a ponta</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Seis práticas integradas, um único time responsável. Projetadas, instaladas e operadas pela Sentinel.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s) => (
          <Card key={s.title} className="flex h-full flex-col p-6 transition hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-gradient-to-br from-primary/20 to-cyan/10 text-cyan">{s.icon}</div>
            <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>

            <Section title="Benefícios" items={s.benefits} />
            <Section title="Recursos" items={s.features} />
            <Section title="Instalação" items={s.install} />

            <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary">Valor para o negócio</div>
              <p className="mt-1 text-xs text-foreground/90">{s.value}</p>
            </div>

            <Link to="/explore/proposal" className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-primary/50 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10">Solicitar Proposta <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Card>
        ))}
      </div>

      <div className="pt-6 text-center">
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Modelos de contratação</div>
        <h2 className="mt-2 text-3xl font-bold">Sob medida para sua escala</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { name: "Site Único", price: "A partir de R$ 4.900", popular: false, items: ["Até 32 câmeras", "Até 12 portas", "Monitoramento 8×5", "Revisão trimestral", "Suporte de campo local"], cta: "Começar" },
          { name: "Multi-Site", price: "A partir de R$ 14.900", popular: true, items: ["Até 250 câmeras", "Até 80 portas", "Monitoramento 24/7", "Time dedicado de operadores", "Revisão mensal", "Despacho prioritário em campo"], cta: "Mais Popular" },
          { name: "Programa Enterprise", price: "Sob consulta", popular: false, items: ["Câmeras e portas ilimitadas", "Monitoramento 24/7 + despacho", "Master plan de segurança", "Time de conta nomeado", "Engenheiro on-site (opcional)", "Integrações customizadas"], cta: "Falar com Vendas" },
        ].map((p) => (
          <Card key={p.name} className={`relative p-7 ${p.popular ? "border-primary/60 ring-1 ring-primary/30" : ""}`}>
            {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-lg shadow-primary/40">Mais Popular</div>}
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{p.name}</div>
            <div className="mt-3 font-mono text-3xl font-bold">{p.price}{p.price !== "Sob consulta" && <span className="text-base font-normal text-muted-foreground"> / mês</span>}</div>
            <div className="mt-6 space-y-2.5">
              {p.items.map((i) => <div key={i} className="flex items-center gap-2 text-sm"><Check className="h-3.5 w-3.5 text-cyan" />{i}</div>)}
            </div>
            <Link to="/explore/proposal" className={`mt-8 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${p.popular ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90" : "border border-primary/50 text-primary hover:bg-primary/10"}`}>{p.cta}</Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="mt-1.5 space-y-1.5">
        {items.map((b) => (
          <div key={b} className="flex items-start gap-2 text-xs"><Check className="mt-0.5 h-3 w-3 shrink-0 text-success" />{b}</div>
        ))}
      </div>
    </div>
  );
}
