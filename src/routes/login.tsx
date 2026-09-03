import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, UserRound, ArrowRight } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Entrar — Sentinel" }],
  }),
  component: LoginChoice,
});

function LoginChoice() {
  return (
    <AuthShell
      title="Entrar na Sentinel"
      subtitle="Escolha o tipo de acesso que deseja utilizar."
    >
      <div className="mt-6 space-y-3">
        <Link
          to="/login/corporate"
          className="group flex items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4 transition hover:border-primary/60 hover:bg-primary/5"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Building2 className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="font-semibold">Acesso Corporativo</div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              Monitoramento, projetos e operações de segurança.
            </div>
          </div>

          <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
        </Link>

        <Link
          to="/login/customer"
          className="group flex items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4 transition hover:border-cyan/60 hover:bg-cyan/5"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
            <UserRound className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="font-semibold">Acesso do Cliente</div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              Serviços, propostas e consultoria da Sentinel.
            </div>
          </div>

          <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-cyan" />
        </Link>
      </div>

      <div className="mt-6 border-t border-border pt-5 text-center text-sm text-muted-foreground">
        Ainda não tem conta?{" "}
        <Link
          to="/cadastro"
          className="font-semibold text-primary hover:underline"
        >
          Criar conta
        </Link>
      </div>
    </AuthShell>
  );
}