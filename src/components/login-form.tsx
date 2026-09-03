import { useMemo, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Eye, EyeOff, ArrowLeft, Loader2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { login, CREDENTIALS, PASSWORD_RULES, isPasswordValid, type Role } from "@/lib/auth";
import { SentinelLogo } from "./sentinel-logo";

export function LoginForm({ role, title, subtitle, redirectTo, accent }: { role: Role; title: string; subtitle: string; redirectTo: string; accent: string }) {
  const creds = CREDENTIALS[role];
  const [name, setName] = useState("");
  const [email, setEmail] = useState(creds.email);
  const [password, setPassword] = useState(creds.password);
  const [show, setShow] = useState(false);
  const [touchedPwd, setTouchedPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const nameValid = name.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const pwdValid = useMemo(() => isPasswordValid(password), [password]);
  const formValid = nameValid && emailValid && pwdValid;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid) return;
    setLoading(true);
    setTimeout(() => {
      if (login(role, email, password, name)) {
        toast.success(`Bem-vindo, ${name.trim().split(" ")[0]}! Redirecionando...`);
        navigate({ to: redirectTo });
      } else {
        toast.error("Credenciais inválidas");
        setLoading(false);
      }
    }, 500);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-cyan/15 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-10">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Voltar para acesso
        </Link>
        <SentinelLogo size="lg" variant="mark" onBackground="dark" subtitle={accent} />

        <div className="mt-10 rounded-2xl border border-border bg-card/70 p-8 backdrop-blur-sm">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                maxLength={80}
                required
                className="mt-1.5 w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2"
              />
              {name.length > 0 && !nameValid && <p className="mt-1 text-[11px] text-destructive">Informe pelo menos 2 caracteres.</p>}
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} className="mt-1.5 w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2" />
              {email.length > 0 && !emailValid && <p className="mt-1 text-[11px] text-destructive">E-mail inválido.</p>}
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Senha</label>
              <div className="relative mt-1.5">
                <input type={show ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setTouchedPwd(true); }} onFocus={() => setTouchedPwd(true)} required className="w-full rounded-lg border border-border bg-input/60 px-4 py-2.5 pr-10 text-sm outline-none ring-primary/40 transition focus:border-primary focus:ring-2" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={show ? "Ocultar senha" : "Mostrar senha"}>
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {touchedPwd && (
                <ul className="mt-3 space-y-1.5 rounded-lg border border-border/50 bg-secondary/30 p-3">
                  {PASSWORD_RULES.map((r) => {
                    const ok = r.test(password);
                    return (
                      <li key={r.id} className={`flex items-center gap-2 text-[11px] ${ok ? "text-success" : "text-muted-foreground"}`}>
                        {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                        {r.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <button type="submit" disabled={loading || !formValid} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Entrar com segurança
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-border/50 bg-secondary/40 p-3 text-xs">
            <div className="font-semibold text-muted-foreground">Credenciais de demonstração (preenchidas)</div>
            <div className="mt-1 font-mono text-[11px] text-foreground/80">{creds.email}</div>
            <div className="font-mono text-[11px] text-foreground/80">{creds.password}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
