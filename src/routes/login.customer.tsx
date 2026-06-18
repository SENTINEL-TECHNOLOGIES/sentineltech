import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";

export const Route = createFileRoute("/login/customer")({
  head: () => ({ meta: [{ title: "Conheça a Sentinel — Acesso" }] }),
  component: () => <LoginForm role="customer" accent="Portal de Descoberta" title="Conheça a Sentinel" subtitle="Navegue por serviços, solicite propostas e agende uma consultoria." redirectTo="/explore/home" />,
});
