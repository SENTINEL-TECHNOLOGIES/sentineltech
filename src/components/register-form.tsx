import { useMemo, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { register, PASSWORD_RULES, isPasswordValid, isEmailValid } from "@/lib/auth";
import { AuthShell, Field, inputClass } from "./auth-shell";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [touchedPwd, setTouchedPwd] = useState(false);
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
    if (!formValid) {
      setTouchedPwd(true);
      setError("Verifique os campos destacados antes de continuar.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = register(name, email, password);
      if (result.ok) {
        toast.success(`Conta criada com sucesso. Bem-vindo, ${name.trim().split(" ")[0]}!`);
        navigate({ to: "/portal/dashboard" });
      } else {
        setError(result.error);
        toast.error(result.error);
        setLoading(false);
      }
    }, 600);
  }

  return (
    <AuthShell
      title="Criar sua conta"
      subtitle="Cadastre-se para acompanhar suas operações de segurança."
      footer={
        <>
          Já tem uma conta?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <Field label="Nome" error={name.length > 0 && !nameValid ? "Informe pelo menos 2 caracteres." : null}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            maxLength={80}
            autoComplete="name"
            className={inputClass}
          />
        </Field>

        <Field label="E-mail" error={email.length > 0 && !emailValid ? "E-mail inválido." : null}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@empresa.com"
            maxLength={255}
            autoComplete="email"
            className={inputClass}
          />
        </Field>

        <Field label="Senha">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setTouchedPwd(true);
              }}
              onFocus={() => setTouchedPwd(true)}
              placeholder="Crie uma senha segura"
              autoComplete="new-password"
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
          ) : null}
        </Field>

        {error ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">{error}</div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Criar conta
        </button>
      </form>
    </AuthShell>
  );
}
