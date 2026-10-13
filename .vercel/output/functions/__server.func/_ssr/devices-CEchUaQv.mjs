import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useSession } from "./use-session-BevYDieA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/devices-CEchUaQv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function getKey(email) {
	const normalizedEmail = email?.trim().toLowerCase();
	return normalizedEmail ? `sentinel:devices:${normalizedEmail}` : "sentinel:devices";
}
function read(email) {
	if (typeof window === "undefined") return [];
	try {
		const stored = window.localStorage.getItem(getKey(email));
		if (!stored) return [];
		const devices = JSON.parse(stored);
		return Array.isArray(devices) ? devices : [];
	} catch {
		return [];
	}
}
function write(list, email) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(getKey(email), JSON.stringify(list));
	window.dispatchEvent(new CustomEvent("sentinel:devices-changed"));
}
function useDevices() {
	const { session } = useSession();
	const email = session?.email;
	const [devices, setDevices] = (0, import_react.useState)(() => read());
	(0, import_react.useEffect)(() => {
		const sync = () => setDevices(read(email));
		sync();
		window.addEventListener("sentinel:devices-changed", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("sentinel:devices-changed", sync);
			window.removeEventListener("storage", sync);
		};
	}, [email]);
	return {
		devices,
		addDevice(d) {
			write([{
				...d,
				id: `dev-${Date.now().toString(36)}`,
				createdAt: Date.now()
			}, ...devices], email);
		},
		removeDevice(id) {
			write(devices.filter((d) => d.id !== id), email);
		},
		updateStatus(id, status) {
			write(devices.map((d) => d.id === id ? {
				...d,
				status
			} : d), email);
		}
	};
}
var DEVICE_TYPE_LABELS = {
	camera: "Câmera CFTV",
	biometric: "Leitor Biométrico",
	alarm: "Sensor de Alarme",
	automation: "Hub de Automação",
	sensor: "Sensor Ambiental"
};
//#endregion
export { useDevices as n, DEVICE_TYPE_LABELS as t };
