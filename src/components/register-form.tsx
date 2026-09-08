import { useMemo, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Check, X, UserRound } from "lucide-react";
import { toast } from "sonner";
import { register, PASSWORD_RULES, isPasswordValid, isEmailValid } from "@/lib/auth";
import { AuthShell, Field, inputClass } from "./auth-shell";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [touchedPwd, setTouchedPwd] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const nameValid = name.trim().length >= 2;
  const emailValid = isEmailValid(email);
  const pwdValid = useMemo(() => isPasswordValid(password), [password]);
  const formValid = nameValid && emailValid && pwdValid;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitted(true);
    if (!formValid) {
      setTouchedPwd(true);
      setError("Verifique os campos destacados antes de continuar.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = register(name, email, password, "customer");
      if (result.ok) {
        toast.success(`Conta criada com sucesso. Bem-vindo, ${name.trim().split(" ")[0]}!`);
        navigate({ to: "/explore/home" });
      } else {
        setError(result.error);
        toast.error(result.error);
        setLoading(false);
      }
    }, 600);
  }

  return (
    <AuthShell
      title="Criar conta de cliente"
      subtitle="Tenha acesso a serviços, propostas e consultoria da Sentinel."
      footer={
        <>
          Já tem uma conta?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <div className="mt-6 flex items-center gap-2 rounded-lg border border-cyan/30 bg-cyan/10 px-3 py-2.5 text-xs text-cyan">
        <UserRound className="h-4 w-4 shrink-0" />
        <span>Você está criando uma conta como <strong>cliente</strong>.</span>
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
        <Field label="Nome completo" required hint="Como devemos chamar você?" error={(submitted || name.length > 0) && !nameValid ? "Informe pelo menos 2 caracteres." : null}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Caio Gabriel"
            maxLength={80}
            autoComplete="name"
            aria-invalid={(submitted || name.length > 0) && !nameValid}
            className={inputClass}
          />
        </Field>

        <Field label="E-mail" required hint="Use um endereço que você acompanha." error={(submitted || email.length > 0) && !emailValid ? "Digite um e-mail válido, como voce@empresa.com." : null}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@empresa.com"
            maxLength={255}
            autoComplete="email"
            aria-invalid={(submitted || email.length > 0) && !emailValid}
            className={inputClass}
          />
        </Field>

        <Field label="Senha" required hint="Crie uma senha para entrar na sua conta.">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setTouchedPwd(true);
              }}
              onFocus={() => setTouchedPwd(true)}
              placeholder="Digite uma senha segura"
              autoComplete="new-password"
              aria-invalid={touchedPwd && !pwdValid}
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={show ? "Ocultar senha" : "Mostrar senha"}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {touchedPwd ? (
            <ul aria-label="Requisitos da senha" className="mt-3 space-y-1.5 rounded-lg border border-border/50 bg-secondary/30 p-3">
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
          ) : null}
        </Field>

        {error ? (
          <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">{error}</div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Criar conta de cliente
        </button>
      </form>
    </AuthShell>
  );
}
