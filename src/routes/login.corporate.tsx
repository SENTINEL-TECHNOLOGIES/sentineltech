import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";

export const Route = createFileRoute("/login/corporate")({
  head: () => ({
    meta: [{ title: "Acesso Corporativo — Sentinel" }],
  }),
  component: () => (
    <LoginForm
      title="Entrar no seu portal"
      subtitle="Acesse monitoramento, projetos e relatórios da sua operação."
      redirectTo="/portal/dashboard"
    />
  ),
});