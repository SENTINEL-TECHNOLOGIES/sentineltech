import { useEffect, useState } from "react";
import { getSession, firstName } from "@/lib/auth";

export function useSession() {
  const [session, setSession] = useState<ReturnType<typeof getSession>>(null);

  useEffect(() => {
    const sync = () => setSession(getSession());
    sync();
    window.addEventListener("sentinel-auth-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("sentinel-auth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { session, firstName: firstName(session) };
}
