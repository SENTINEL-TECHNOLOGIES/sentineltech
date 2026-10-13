import { createFileRoute } from "@tanstack/react-router";
import { AccountSettings } from "@/components/account-settings";

export const Route = createFileRoute("/portal/settings")({
  head: () => ({ meta: [{ title: "Configurações — Sentinel" }] }),
  component: AccountSettings,
});

