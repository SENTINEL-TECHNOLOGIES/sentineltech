import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as KpiCard, n as Card, r as CardHeader, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { t as CREDENTIALS } from "./auth-XT4XOf5W.mjs";
import { t as useSession } from "./use-session-BevYDieA.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as MapPin, R as FingerprintPattern, X as CirclePlus, l as TriangleAlert, m as ShieldAlert, n as X, nt as Camera, o as Users, pt as Activity, r as Wrench, u as Trash2 } from "../_libs/lucide-react.mjs";
import { i as getActiveServices } from "./account-DOgxP7m4.mjs";
import { n as useDevices, t as DEVICE_TYPE_LABELS } from "./devices-CEchUaQv.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as CartesianGrid, r as YAxis, s as Bar, t as AreaChart, u as Legend } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.dashboard-DHz8zaLE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AddDeviceButton({ className = "" }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { addDevice } = useDevices();
	const [name, setName] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("camera");
	const [location, setLocation] = (0, import_react.useState)("");
	function submit(e) {
		e.preventDefault();
		if (!name.trim() || !location.trim()) return;
		addDevice({
			name: name.trim(),
			type,
			location: location.trim(),
			status: "online"
		});
		setName("");
		setLocation("");
		setType("camera");
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setOpen(true),
		className: `inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-cyan px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "h-4 w-4" }), " Adicionar Dispositivo"]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-md",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 w-full max-w-md rounded-2xl border border-primary/50 bg-card p-6 shadow-[0_30px_90px_-24px_rgba(14,165,233,0.7)] ring-1 ring-primary/30",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold",
					children: "Novo Dispositivo de Segurança"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Provisione e adicione ao monitoramento ativo."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen(false),
					className: "text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold text-muted-foreground",
						children: "Nome do dispositivo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Ex.: Câmera Recepção 02",
						required: true,
						className: "mt-1 w-full rounded-lg border border-border bg-input/50 px-3 py-2 text-sm outline-none focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold text-muted-foreground",
						children: "Tipo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: type,
						onChange: (e) => setType(e.target.value),
						className: "mt-1 w-full rounded-lg border border-border bg-input/50 px-3 py-2 text-sm outline-none focus:border-primary",
						children: Object.entries(DEVICE_TYPE_LABELS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: k,
							children: v
						}, k))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold text-muted-foreground",
						children: "Localização"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: location,
						onChange: (e) => setLocation(e.target.value),
						placeholder: "Ex.: Torre Matriz — Andar 3",
						required: true,
						className: "mt-1 w-full rounded-lg border border-border bg-input/50 px-3 py-2 text-sm outline-none focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setOpen(false),
							className: "rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent",
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90",
							children: "Provisionar"
						})]
					})
				]
			})]
		})
	})] });
}
var accessFlow = Array.from({ length: 24 }, (_, i) => ({
	hour: `${String(i).padStart(2, "0")}h`,
	entradas: 20 + Math.round(Math.sin((i - 8) / 3) * 120 + Math.max(0, 200 - Math.abs(i - 9) * 22) + Math.random() * 18),
	saidas: 15 + Math.round(Math.sin((i - 17) / 3) * 110 + Math.max(0, 200 - Math.abs(i - 18) * 22) + Math.random() * 18)
}));
var eventsWeek = [
	{
		day: "Seg",
		motion: 412,
		intrusion: 6,
		access: 1240
	},
	{
		day: "Ter",
		motion: 388,
		intrusion: 4,
		access: 1180
	},
	{
		day: "Qua",
		motion: 502,
		intrusion: 9,
		access: 1320
	},
	{
		day: "Qui",
		motion: 446,
		intrusion: 3,
		access: 1270
	},
	{
		day: "Sex",
		motion: 612,
		intrusion: 11,
		access: 1410
	},
	{
		day: "Sáb",
		motion: 184,
		intrusion: 2,
		access: 420
	},
	{
		day: "Dom",
		motion: 142,
		intrusion: 1,
		access: 380
	}
];
var activities = [];
var facilities = [
	{
		name: "Torre Matriz — São Paulo",
		cameras: "128/128",
		health: "operational"
	},
	{
		name: "DC-2 Frankfurt",
		cameras: "92/92",
		health: "operational"
	},
	{
		name: "Hub Logístico — Singapura",
		cameras: "54/56",
		health: "degraded"
	},
	{
		name: "Planta Industrial — Monterrey",
		cameras: "76/76",
		health: "operational"
	},
	{
		name: "Rede de Varejo (42 sites)",
		cameras: "498/504",
		health: "degraded"
	}
];
function Dashboard() {
	const { devices, removeDevice, updateStatus } = useDevices();
	const { firstName, session } = useSession();
	const [liveEvents, setLiveEvents] = (0, import_react.useState)([]);
	const hasDevices = devices.length > 0;
	const isDemoAccount = session?.email?.trim().toLowerCase() === CREDENTIALS.corporate.email;
	const hasActiveService = isDemoAccount || getActiveServices().length > 0;
	const [selectedDevice, setSelectedDevice] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!hasDevices) {
			setLiveEvents([]);
			return;
		}
		const timers = [];
		function addRandomEvent(device) {
			const riskRoll = Math.random();
			const risk = riskRoll < .55 ? "baixo" : riskRoll < .85 ? "médio" : "alto";
			const template = {
				camera: {
					baixo: {
						text: "IA reconheceu movimento normal em área monitorada",
						level: "info"
					},
					médio: {
						text: "IA identificou fluxo incomum em área monitorada",
						level: "warning"
					},
					alto: {
						text: "IA detectou intrusão em área restrita",
						level: "destructive"
					}
				},
				biometric: {
					baixo: {
						text: "IA validou acesso autorizado com baixa anomalia",
						level: "success"
					},
					médio: {
						text: "IA alertou para acesso fora do padrão",
						level: "warning"
					},
					alto: {
						text: "IA flagou tentativa não autorizada de acesso",
						level: "destructive"
					}
				},
				alarm: {
					baixo: {
						text: "IA confirmou sistema de alarme estável",
						level: "success"
					},
					médio: {
						text: "IA registrou falha temporária de sensor",
						level: "warning"
					},
					alto: {
						text: "IA detectou disparo crítico do sistema de alarme",
						level: "destructive"
					}
				},
				automation: {
					baixo: {
						text: "IA confirmou automação executada com sucesso",
						level: "info"
					},
					médio: {
						text: "IA apontou atraso de rotina automatizada",
						level: "warning"
					},
					alto: {
						text: "IA identificou falha crítica de automação",
						level: "destructive"
					}
				},
				sensor: {
					baixo: {
						text: "IA confirmou leitura ambiental dentro do limite",
						level: "success"
					},
					médio: {
						text: "IA sinalizou variável ambiental anormal",
						level: "warning"
					},
					alto: {
						text: "IA detectou risco ambiental elevado",
						level: "destructive"
					}
				}
			}[device.type][risk];
			const event = {
				...template,
				text: `${template.text} — ${device.name} · ${device.location}`,
				time: "agora",
				risk
			};
			if (risk === "alto") updateStatus(device.id, "offline");
			else if (risk === "baixo") updateStatus(device.id, "online");
			setLiveEvents((current) => [event, ...current].slice(0, 6));
		}
		devices.forEach((device) => {
			const timer = window.setTimeout(() => {
				addRandomEvent(device);
				const repeat = window.setInterval(() => addRandomEvent(device), 15e3 + Math.floor(Math.random() * 45e3));
				timers.push(repeat);
			}, 15e3 + Math.floor(Math.random() * 45e3));
			timers.push(timer);
		});
		return () => timers.forEach((timer) => {
			window.clearTimeout(timer);
			window.clearInterval(timer);
		});
	}, [devices, hasDevices]);
	const currentActivities = [...liveEvents, ...activities].slice(0, 6);
	if (!hasActiveService) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "mx-auto max-w-2xl border-dashed",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center px-6 py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-10 w-10 text-cyan" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-2xl font-bold",
					children: "Ative um serviço para acessar sua dashboard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-md text-sm text-muted-foreground",
					children: "Escolha um serviço Sentinel para liberar o monitoramento, o cadastro de equipamentos e os eventos da sua conta."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/explore/services",
					className: "mt-6 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90",
					children: "Conhecer serviços"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: firstName ? `Olá, ${firstName}` : "Olá"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: hasDevices ? "Visão ao vivo dos seus dispositivos e eventos de segurança." : "Adicione seu primeiro dispositivo para começar a monitorar sua operação."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-pulse-glow rounded-full bg-success" }), "Todos os sites sob vigilância ativa"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddDeviceButton, {})]
				})]
			}),
			!hasDevices ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-dashed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center px-6 py-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-10 w-10 text-cyan" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-lg font-semibold",
							children: "Sua operação ainda está vazia"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-md text-sm text-muted-foreground",
							children: "Quando você cadastrar um dispositivo, os eventos e indicadores aparecerão aqui em tempo real."
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Câmeras Ativas",
							value: isDemoAccount ? "848 / 856" : `${devices.filter((device) => device.type === "camera" && device.status === "online").length} / ${devices.filter((device) => device.type === "camera").length}`,
							delta: isDemoAccount ? "99,1% online" : "dispositivos cadastrados",
							deltaPositive: true,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5" }),
							accent: "primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Dispositivos Online",
							value: isDemoAccount ? "2.184" : String(devices.filter((device) => device.status === "online").length),
							delta: isDemoAccount ? "+18 esta semana" : `${devices.length} no inventário`,
							deltaPositive: true,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5" }),
							accent: "cyan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Eventos de Acesso (Hoje)",
							value: isDemoAccount ? "3.612" : String(liveEvents.length),
							delta: isDemoAccount ? "entradas + saídas" : "eventos simulados",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "h-5 w-5" }),
							accent: "success"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Incidentes (24h)",
							value: isDemoAccount ? "7" : String(liveEvents.filter((event) => event.risk === "médio" || event.risk === "alto").length),
							delta: isDemoAccount ? "2 em aberto" : "alertas ativos",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" }),
							accent: "warning"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Visitantes Registrados",
							value: "142",
							delta: "hoje",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" }),
							accent: "primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Locais Monitorados",
							value: "46",
							delta: "em 12 regiões",
							deltaPositive: true,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" }),
							accent: "cyan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Saúde dos Sistemas",
							value: "98,4%",
							delta: "todos subsistemas",
							deltaPositive: true,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-5 w-5" }),
							accent: "success"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Uptime da Plataforma",
							value: "99,98%",
							delta: "últimos 90 dias",
							deltaPositive: true,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5" }),
							accent: "success"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 lg:grid-cols-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							title: "Fluxo de acesso — últimas 24h",
							description: "Entradas vs saídas em todas as portas controladas",
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "info",
								children: "Ao vivo"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-72 p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
									data: accessFlow,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "g1",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "oklch(0.62 0.21 258)",
												stopOpacity: .5
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "oklch(0.62 0.21 258)",
												stopOpacity: 0
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "g2",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "oklch(0.78 0.13 210)",
												stopOpacity: .5
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "oklch(0.78 0.13 210)",
												stopOpacity: 0
											})]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "oklch(0.32 0.06 265 / 0.4)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "hour",
											stroke: "oklch(0.7 0.03 255)",
											fontSize: 11,
											tickLine: false,
											axisLine: false,
											interval: 2
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "oklch(0.7 0.03 255)",
											fontSize: 11,
											tickLine: false,
											axisLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
											background: "oklch(0.21 0.07 268)",
											border: "1px solid oklch(0.32 0.06 265)",
											borderRadius: 8,
											fontSize: 12
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
											type: "monotone",
											dataKey: "entradas",
											stroke: "oklch(0.62 0.21 258)",
											fill: "url(#g1)",
											strokeWidth: 2
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
											type: "monotone",
											dataKey: "saidas",
											name: "saídas",
											stroke: "oklch(0.78 0.13 210)",
											fill: "url(#g2)",
											strokeWidth: 2
										})
									]
								})
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						title: "Visão por instalação",
						description: "Saúde das câmeras por site"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3 p-5",
						children: facilities.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-medium",
									children: s.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-muted-foreground",
									children: ["Câmeras ", s.cameras]
								})]
							}), s.health === "operational" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "success",
								children: "● Operacional"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "warning",
								children: "● Degradado"
							})]
						}, s.name))
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					title: "Localização dos equipamentos",
					description: "Mapa operacional mockado · selecione um marcador para ver detalhes",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "info",
						children: [devices.length, " equipamentos"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 p-4 lg:grid-cols-[1fr_280px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-h-72 overflow-hidden rounded-lg border border-border bg-secondary/20 bg-grid-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[12%] top-[18%] h-24 w-36 rounded-lg border border-primary/40 bg-primary/10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[15%] top-[30%] h-32 w-40 rounded-lg border border-cyan/40 bg-cyan/10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[12%] left-[35%] h-20 w-56 rounded-lg border border-success/40 bg-success/10" }),
							devices.map((device, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSelectedDevice(device),
								className: `absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 text-xs shadow-lg transition hover:scale-110 ${device.status === "online" ? "border-success bg-success/20 text-success" : device.status === "offline" ? "border-destructive bg-destructive/20 text-destructive" : "border-warning bg-warning/20 text-warning"}`,
								style: {
									left: `${18 + index * 23 % 68}%`,
									top: `${25 + index * 31 % 58}%`
								},
								title: device.name,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" })
							}, device.id)),
							devices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 grid place-items-center text-center text-sm text-muted-foreground",
								children: "Cadastre um dispositivo para posicioná-lo no mapa."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border border-border bg-secondary/20 p-4",
						children: selectedDevice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: selectedDevice.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: DEVICE_TYPE_LABELS[selectedDevice.type]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: selectedDevice.status === "online" ? "success" : selectedDevice.status === "offline" ? "destructive" : "warning",
								children: selectedDevice.status
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 space-y-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "Localização"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selectedDevice.location })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "Última atividade"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: liveEvents.find((event) => event.text.includes(selectedDevice.name))?.time || "aguardando evento" })] })]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full min-h-40 items-center justify-center text-center text-sm text-muted-foreground",
							children: "Selecione um marcador para consultar o equipamento."
						})
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 lg:grid-cols-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							title: "Eventos de segurança — últimos 7 dias",
							description: "Movimento, intrusão e correlações de acesso"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-64 p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: eventsWeek,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "oklch(0.32 0.06 265 / 0.4)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "day",
											stroke: "oklch(0.7 0.03 255)",
											fontSize: 11,
											tickLine: false,
											axisLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "oklch(0.7 0.03 255)",
											fontSize: 11,
											tickLine: false,
											axisLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
											background: "oklch(0.21 0.07 268)",
											border: "1px solid oklch(0.32 0.06 265)",
											borderRadius: 8,
											fontSize: 12
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "access",
											name: "Eventos de acesso",
											fill: "oklch(0.62 0.21 258)",
											radius: [
												4,
												4,
												0,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "motion",
											name: "Detecções de movimento",
											fill: "oklch(0.78 0.13 210)",
											radius: [
												4,
												4,
												0,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "intrusion",
											name: "Alertas de intrusão",
											fill: "oklch(0.62 0.22 25)",
											radius: [
												4,
												4,
												0,
												0
											]
										})
									]
								})
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						title: "Saúde dos dispositivos",
						description: "Status por subsistema"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4 p-5",
						children: [
							{
								name: "Rede de CFTV",
								pct: 99
							},
							{
								name: "Controladoras de acesso",
								pct: 96
							},
							{
								name: "Leitores biométricos",
								pct: 94
							},
							{
								name: "Sensores de alarme",
								pct: 88
							},
							{
								name: "Hubs de automação",
								pct: 92
							}
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-cyan",
								children: [p.pct, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-gradient-to-r from-primary to-cyan transition-all",
								style: { width: `${p.pct}%` }
							})
						})] }, p.name))
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 lg:grid-cols-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						title: "Alertas de manutenção",
						description: "Intervenções agendadas e necessárias",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "warning",
							children: "3 abertos"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: [
							{
								device: "Câmera 14 · Perímetro DC-2",
								issue: "Calibração de lente",
								eta: "Amanhã 09:00"
							},
							{
								device: "Leitor BR-04 · Portão 2",
								issue: "Desgaste no sensor de digital",
								eta: "Sexta 14:00"
							},
							{
								device: "Hub AUT-21 · Andar 7 Matriz",
								issue: "Atualização de firmware pendente",
								eta: "Este fim de semana"
							},
							{
								device: "Câmera 88 · Varejo SP-12",
								issue: "Conectividade intermitente",
								eta: "Equipe deslocada"
							}
						].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "mt-0.5 h-4 w-4 shrink-0 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium",
										children: m.device
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: m.issue
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-mono text-[11px] text-cyan",
										children: m.eta
									})
								]
							})]
						}, m.device))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							title: "Atividade recente",
							description: "Feed de segurança entre instalações"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border",
							children: currentActivities.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `mt-1 h-2 w-2 shrink-0 rounded-full ${a.level === "success" ? "bg-success" : a.level === "warning" ? "bg-warning" : a.level === "destructive" ? "bg-destructive" : "bg-primary"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm",
										children: a.text
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex flex-wrap items-center gap-2 text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: a.time
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full border px-1.5 py-0.5 font-semibold ${a.risk === "baixo" ? "border-success/30 bg-success/10 text-success" : a.risk === "médio" ? "border-warning/30 bg-warning/10 text-warning" : "border-destructive/30 bg-destructive/10 text-destructive"}`,
											children: a.risk === "baixo" ? "Risco baixo" : a.risk === "médio" ? "Risco médio" : "Risco alto"
										})]
									})]
								})]
							}, i))
						})]
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				title: "Meus dispositivos provisionados",
				description: "Inventário de equipamentos de segurança gerenciados",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "info",
					children: [devices.length, " ativos"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border bg-secondary/30 text-left text-[11px] uppercase tracking-wider text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3",
								children: "Dispositivo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3",
								children: "Tipo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3",
								children: "Local"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 text-right",
								children: "Ações"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
						className: "divide-y divide-border",
						children: [devices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 5,
							className: "px-5 py-8 text-center text-muted-foreground",
							children: "Nenhum dispositivo. Clique em \"Adicionar Dispositivo\" no topo."
						}) }), devices.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-accent/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 font-medium",
									children: d.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-muted-foreground",
									children: DEVICE_TYPE_LABELS[d.type]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-muted-foreground",
									children: d.location
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: d.status,
										onChange: (e) => updateStatus(d.id, e.target.value),
										className: "rounded-md border border-border bg-input/50 px-2 py-1 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "online",
												children: "● Online"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "maintenance",
												children: "● Manutenção"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "offline",
												children: "● Offline"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => removeDevice(d.id),
										className: "inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:border-destructive hover:text-destructive",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" }), " Remover"]
									})
								})
							]
						}, d.id))]
					})]
				})
			})] })
		]
	});
}
//#endregion
export { Dashboard as component };
