import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";

export const Route = createFileRoute("/login-admin")({
  head: () => ({ meta: [{ title: "Acesso Administrativo — Sentinel" }] }),
  component: AdministrativeLogin,
});

function AdministrativeLogin() {
  return (
    <LoginForm
      title="Administração Sentinel"
      subtitle="Acesse a gestão interna da plataforma Sentinel Technologies."
      showDemoCredentials={false}
    />
  );
}