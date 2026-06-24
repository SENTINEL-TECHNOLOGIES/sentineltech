import { useState, type FormEvent } from "react";
import { X, PlusCircle } from "lucide-react";
import { useDevices, DEVICE_TYPE_LABELS, type DeviceType } from "@/lib/devices";

export function AddDeviceButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { addDevice } = useDevices();
  const [name, setName] = useState("");
  const [type, setType] = useState<DeviceType>("camera");
  const [location, setLocation] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !location.trim()) return;
    addDevice({ name: name.trim(), type, location: location.trim(), status: "online" });
    setName(""); setLocation(""); setType("camera");
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-cyan px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90 ${className}`}
      >
        <PlusCircle className="h-4 w-4" /> Adicionar Dispositivo
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">Novo Dispositivo de Segurança</h2>
                <p className="text-xs text-muted-foreground">Provisione e adicione ao monitoramento ativo.</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Nome do dispositivo</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Câmera Recepção 02" required className="mt-1 w-full rounded-lg border border-border bg-input/50 px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Tipo</label>
                <select value={type} onChange={(e) => setType(e.target.value as DeviceType)} className="mt-1 w-full rounded-lg border border-border bg-input/50 px-3 py-2 text-sm outline-none focus:border-primary">
                  {Object.entries(DEVICE_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Localização</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ex.: Torre Matriz — Andar 3" required className="mt-1 w-full rounded-lg border border-border bg-input/50 px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent">Cancelar</button>
                <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Provisionar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
