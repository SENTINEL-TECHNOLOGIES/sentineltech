import { createFileRoute } from "@tanstack/react-router";
import { Card, Badge } from "@/components/ui-bits";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/explore/case-studies")({
  head: () => ({ meta: [{ title: "Cases de Sucesso — Sentinel" }] }),
  component: Cases,
});

const cases = [
  {
    client: "LogiPort SA", industry: "Logística e Portos",
    challenge: "Operadora de 42 km² de infraestrutura portuária com 6 portões, perímetro vulnerável e vigilância reativa feita por equipe interna pequena.",
    solution: "312 câmeras com IA, detecção térmica de perímetro, biometria em todos os portões e monitoramento 24/7 centralizado na nossa central.",
    results: [{ k: "42 km²", v: "Perímetro coberto" }, { k: "-82%", v: "Entradas não autorizadas" }, { k: "3min", v: "Tempo médio de resposta" }],
  },
  {
    client: "MetroRetail Group", industry: "Varejo · 240 lojas",
    challenge: "Perdas e invasões fora do horário em uma rede nacional sem visibilidade centralizada nem resposta padronizada.",
    solution: "CFTV unificado em todas as lojas, analítica comportamental de furtos e monitoramento remoto com coordenação policial fora do expediente.",
    results: [{ k: "-68%", v: "Incidentes de perda" }, { k: "240", v: "Sites monitorados" }, { k: "R$ 18M", v: "Perdas anuais evitadas" }],
  },
  {
    client: "MediCore Saúde", industry: "Saúde · 38 unidades",
    challenge: "Rede hospitalar precisava de fluxo de visitantes em compliance, controle de zonas restritas e registros de acesso auditáveis em farmácia e pediatria.",
    solution: "Biometria + gestão de visitantes, câmeras com IA em zonas restritas e integração com RH para provisionamento e offboarding automáticos.",
    results: [{ k: "100%", v: "Registros prontos para auditoria" }, { k: "-91%", v: "Boletins de ocorrência" }, { k: "6.400", v: "Usuários gerenciados" }],
  },
  {
    client: "EnerCore Utilities", industry: "Energia e Utilities",
    challenge: "Subestações sem operador em regiões remotas eram alvo de roubo de cobre e vandalismo, com resposta por rondas lenta demais.",
    solution: "Câmeras térmicas com IA, detecção a laser de perímetro, automação de iluminação/sirenes e despacho com verificação pela central.",
    results: [{ k: "100%", v: "Subestações monitoradas" }, { k: "<2 min", v: "Detecção até alerta" }, { k: "-94%", v: "Eventos de furto" }],
  },
];

function Cases() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="info">Cases de Sucesso</Badge>
        <h1 className="mt-3 text-3xl font-bold">Resultados reais em instalações reais</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Empresas confiam na Sentinel porque entregamos resultados mensuráveis em segurança física — não slides.</p>
      </div>

      <div className="space-y-5">
        {cases.map((c) => (
          <Card key={c.client} className="overflow-hidden">
            <div className="grid gap-6 md:grid-cols-[1fr_320px]">
              <div className="p-7">
                <div className="flex items-center gap-3"><h3 className="text-xl font-bold">{c.client}</h3><Badge variant="info">{c.industry}</Badge></div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <Section label="Desafio" body={c.challenge} />
                  <Section label="Solução" body={c.solution} />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-primary">Resultados</div>
                    <div className="mt-2 space-y-2">
                      {c.results.map((r) => (
                        <div key={r.v}><div className="font-mono text-lg font-bold text-gradient-blue">{r.k}</div><div className="text-[11px] text-muted-foreground">{r.v}</div></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative hidden border-l border-border bg-gradient-to-br from-primary/15 via-card to-cyan/10 p-7 md:flex md:flex-col md:justify-between">
                <div className="absolute inset-0 bg-grid-sm opacity-30" />
                <div className="relative">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Setor</div>
                  <div className="mt-1 text-lg font-bold">{c.industry}</div>
                </div>
                <a className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Ler case completo <ArrowRight className="h-3.5 w-3.5" /></a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-primary">{label}</div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
