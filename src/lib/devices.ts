import { useEffect, useState } from "react";

export type DeviceType = "camera" | "biometric" | "alarm" | "automation" | "sensor";
export interface SecurityDevice {
  id: string;
  name: string;
  type: DeviceType;
  location: string;
  status: "online" | "offline" | "maintenance";
  createdAt: number;
}

const KEY = "sentinel:devices";

const SEED: SecurityDevice[] = [
  { id: "dev-001", name: "Câmera Lobby 03", type: "camera", location: "Torre Matriz — SP", status: "online", createdAt: Date.now() - 86400000 * 12 },
  { id: "dev-002", name: "Leitor Biométrico BR-04", type: "biometric", location: "Portão 2 — Galpão SP", status: "online", createdAt: Date.now() - 86400000 * 8 },
  { id: "dev-003", name: "Hub Automação AUT-21", type: "automation", location: "Andar 7 — Matriz", status: "maintenance", createdAt: Date.now() - 86400000 * 4 },
];

function read(): SecurityDevice[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return SEED;
    return JSON.parse(raw) as SecurityDevice[];
  } catch { return SEED; }
}

function write(list: SecurityDevice[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("sentinel:devices-changed"));
}

export function useDevices() {
  const [devices, setDevices] = useState<SecurityDevice[]>(() => read());
  useEffect(() => {
    const sync = () => setDevices(read());
    window.addEventListener("sentinel:devices-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("sentinel:devices-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return {
    devices,
    addDevice(d: Omit<SecurityDevice, "id" | "createdAt">) {
      const next: SecurityDevice = { ...d, id: `dev-${Date.now().toString(36)}`, createdAt: Date.now() };
      write([next, ...devices]);
    },
    removeDevice(id: string) { write(devices.filter((d) => d.id !== id)); },
    updateStatus(id: string, status: SecurityDevice["status"]) {
      write(devices.map((d) => (d.id === id ? { ...d, status } : d)));
    },
  };
}

export const DEVICE_TYPE_LABELS: Record<DeviceType, string> = {
  camera: "Câmera CFTV",
  biometric: "Leitor Biométrico",
  alarm: "Sensor de Alarme",
  automation: "Hub de Automação",
  sensor: "Sensor Ambiental",
};
