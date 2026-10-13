import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Badge, Card, CardHeader } from "@/components/ui-bits";
import { useSession } from "@/hooks/use-session";
import { getAccountProfile, saveAccountProfile, type AccountProfile } from "@/lib/account";

export function AccountSettings() {
  const { session } = useSession();
  const [profile, setProfile] = useState<AccountProfile | null>(null);

  useEffect(() => {
    if (!session) return;
    setProfile(getAccountProfile() ?? {
      fullName: session.name ?? "",
      companyName: "",
      taxId: "",
      username: session.name ?? "",
      email: session.email,
      phone: "",
      recoveryEmail: "",
      address: { zip: "", state: "", city: "", neighborhood: "", street: "", number: "", complement: "" },
    });
  }, [session]);

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    saveAccountProfile(profile);
    toast.success("Dados do perfil salvos neste dispositivo.");
  }

  const isCustomer = session?.role === "customer";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold">{isCustomer ? "Perfil da Conta" : session?.role === "administrative" ? "Perfil Administrativo" : "Perfil Corporativo"}</h1><Badge variant="outline">{isCustomer ? "Cliente" : session?.role === "administrative" ? "Admin Sentinel" : "Empresa"}</Badge></div>
      <p className="-mt-5 text-sm text-muted-foreground">Dados associados à sessão autenticada. Não há configurações globais nem integrações conectadas neste módulo.</p>

      <Card>
        <CardHeader title={isCustomer ? "Dados pessoais e da empresa" : "Dados do usuário"} description="Informações locais desta conta" />
        {profile ? <form onSubmit={save} className="grid gap-4 p-5 sm:grid-cols-2">
          {isCustomer && <>
            <label className="space-y-1 text-xs font-medium text-muted-foreground">Empresa<input value={profile.companyName ?? ""} onChange={(event) => setProfile({ ...profile, companyName: event.target.value })} className="w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm text-foreground" /></label>
            <label className="space-y-1 text-xs font-medium text-muted-foreground">CNPJ<input value={profile.taxId ?? ""} onChange={(event) => setProfile({ ...profile, taxId: event.target.value })} className="w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm text-foreground" /></label>
          </>}
          <label className="space-y-1 text-xs font-medium text-muted-foreground">Nome<input value={profile.fullName} onChange={(event) => setProfile({ ...profile, fullName: event.target.value, username: event.target.value })} className="w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm text-foreground" /></label>
          <label className="space-y-1 text-xs font-medium text-muted-foreground">E-mail da conta<input value={session?.email ?? ""} readOnly className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm text-muted-foreground" /></label>
          <label className="space-y-1 text-xs font-medium text-muted-foreground">Telefone<input value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} className="w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm text-foreground" /></label>
          <label className="space-y-1 text-xs font-medium text-muted-foreground">E-mail alternativo<input value={profile.recoveryEmail} onChange={(event) => setProfile({ ...profile, recoveryEmail: event.target.value })} className="w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm text-foreground" /></label>
          <div className="sm:col-span-2"><button type="submit" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Salvar dados</button><p className="mt-2 text-xs text-muted-foreground">Os dados de perfil são armazenados localmente neste navegador; não são sincronizados com um backend.</p></div>
        </form> : <div className="p-5 text-sm text-muted-foreground">Carregando perfil...</div>}
      </Card>
    </div>
  );
}