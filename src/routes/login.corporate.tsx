import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";

export const Route = createFileRoute("/login/corporate")({
  head: () => ({ meta: [{ title: "Corporate Login — Sentinel" }] }),
  component: () => <LoginForm role="corporate" accent="Client Portal" title="Sign in to your portal" subtitle="Access infrastructure monitoring, projects and reports." redirectTo="/portal/dashboard" />,
});
