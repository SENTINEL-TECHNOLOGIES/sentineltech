import { useEffect, useState } from "react";
import { getVerifiedSession, firstName, type Session } from "@/lib/auth";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const sync = async () => {
      const verifiedSession = await getVerifiedSession();
      if (active) {
        setSession(verifiedSession);
        setReady(true);
      }
    };
    sync();
    window.addEventListener("sentinel-auth-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      active = false;
      window.removeEventListener("sentinel-auth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { session, firstName: firstName(session), ready };
}
