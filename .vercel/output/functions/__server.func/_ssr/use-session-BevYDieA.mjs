import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as firstName, o as getVerifiedSession } from "./auth-XT4XOf5W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-session-BevYDieA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useSession() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
	return {
		session,
		firstName: firstName(session),
		ready
	};
}
//#endregion
export { useSession as t };
