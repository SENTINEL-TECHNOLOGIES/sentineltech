import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";

export const Route = createFileRoute("/login/customer")({
  head: () => ({ meta: [{ title: "Explore Sentinel — Login" }] }),
  component: () => <LoginForm role="customer" accent="Discovery Portal" title="Explore Sentinel" subtitle="Browse services, request proposals and schedule a consultation." redirectTo="/explore/home" />,
});
