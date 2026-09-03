import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";

export const Route = createFileRoute("/login/customer")({
  head: () => ({
    meta: [{ title: "Acesso do Cliente — Sentinel" }],
  }),
  component: () => (
    <LoginForm
      title="Conheça a Sentinel"
      subtitle="Navegue por serviços, solicite propostas e agende uma consultoria."
      redirectTo="/explore/home"
    />
  ),
});