import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth";

export type DeviceType = "camera" | "biometric" | "alarm" | "automation" | "sensor";
export interface SecurityDevice {
  id: string;
  name: string;
  type: DeviceType;
  location: string;
  status: "online" | "offline" | "maintenance";
  createdAt: number;
}

function getKey() {
  const email = getSession()?.email?.trim().toLowerCase();
  return email ? `sentinel:devices:${email}` : "sentinel:devices";
}

function read(): SecurityDevice[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(getKey());
    if (!stored) return [];
    const devices: unknown = JSON.parse(stored);
    return Array.isArray(devices) ? devices as SecurityDevice[] : [];
  } catch {
    return [];
  }
}

function write(list: SecurityDevice[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getKey(), JSON.stringify(list));
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
