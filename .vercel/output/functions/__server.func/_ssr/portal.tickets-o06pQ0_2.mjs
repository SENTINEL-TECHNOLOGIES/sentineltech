import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as KpiCard, n as Card, r as CardHeader, t as Badge } from "./ui-bits-DQh5hywF.mjs";
import { t as CREDENTIALS } from "./auth-XT4XOf5W.mjs";
import { t as useSession } from "./use-session-BevYDieA.mjs";
import { d as Ticket } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal.tickets-o06pQ0_2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var corporateDemoTickets = [
	{
		id: "#1842",
		title: "CAM-09 offline — Planta Portão 4",
		priority: "Crítica",
		status: "Aberto",
		date: "15 Jun"
	},
	{
		id: "#1841",
		title: "CAM-03 com drift de imagem — sala servidores andar 3",
		priority: "Alta",
		status: "Em Andamento",
		date: "15 Jun"
	},
	{
		id: "#1839",
		title: "Leitor de acesso não responde — Portão B",
		priority: "Média",
		status: "Em Andamento",
		date: "14 Jun"
	},
	{
		id: "#1837",
		title: "Exportação do relatório mensal de vigilância falhando (Maio 2026)",
		priority: "Baixa",
		status: "Aberto",
		date: "13 Jun"
	},
	{
		id: "#1835",
		title: "Limite de armazenamento do NVR atingido — Galpão SG",
		priority: "Baixa",
		status: "Aberto",
		date: "12 Jun"
	},
	{
		id: "#1832",
		title: "Cadastro de visitantes pendente para 4 usuários",
		priority: "Média",
		status: "Resolvido",
		date: "11 Jun"
	}
];
function ticketStorageKey(email) {
	return `sentinel:tickets:${email.trim().toLowerCase()}`;
}
function readTickets(email) {
	try {
		const stored = localStorage.getItem(ticketStorageKey(email));
		if (stored) return JSON.parse(stored);
	} catch {}
	return email.toLowerCase() === CREDENTIALS.corporate.email ? corporateDemoTickets : [];
}
function priorityClass(p) {
	if (p === "Crítica") return "text-destructive";
	if (p === "Alta") return "text-warning";
	if (p === "Média") return "text-cyan";
	return "text-muted-foreground";
}
function statusBadge(s) {
	if (s === "Resolvido") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "success",
		children: s
	});
	if (s === "Em Andamento") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "info",
		children: s
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "warning",
		children: s
	});
}
function Tickets() {
	const { session } = useSession();
	const [filter, setFilter] = (0, import_react.useState)("Todos");
	const [accountTickets, setAccountTickets] = (0, import_react.useState)([]);
	const [subject, setSubject] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Infraestrutura");
	const [priority, setPriority] = (0, import_react.useState)("Média");
	const [description, setDescription] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (session?.email) setAccountTickets(readTickets(session.email));
	}, [session?.email]);
	const filtered = accountTickets.filter((ticket) => filter === "Todos" || ticket.status === filter);
	const openCount = accountTickets.filter((ticket) => ticket.status === "Aberto").length;
	const inProgressCount = accountTickets.filter((ticket) => ticket.status === "Em Andamento").length;
	function submitTicket(event) {
		event.preventDefault();
		if (!session?.email || !subject.trim() || !description.trim()) {
			toast.error("Informe o assunto e a descrição da solicitação.");
			return;
		}
		const next = [{
			id: `#${Math.floor(Date.now() / 1e3)}`,
			title: `${category}: ${subject.trim()}`,
			priority,
			status: "Aberto",
			date: new Intl.DateTimeFormat("pt-BR", {
				day: "2-digit",
				month: "short"
			}).format(/* @__PURE__ */ new Date())
		}, ...accountTickets];
		setAccountTickets(next);
		localStorage.setItem(ticketStorageKey(session.email), JSON.stringify(next));
		setSubject("");
		setDescription("");
		toast.success("Solicitação registrada neste navegador.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "Solicitações"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Acompanhe seus pedidos e histórico de atendimento."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Solicitações abertas",
						value: String(openCount),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "h-5 w-5" }),
						accent: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Em atendimento",
						value: String(inProgressCount),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "h-5 w-5" }),
						accent: "cyan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Histórico",
						value: String(accountTickets.length),
						delta: "associado à sua conta",
						deltaPositive: true,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "h-5 w-5" }),
						accent: "success"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1fr_360px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 border-b border-border p-3",
					children: [
						"Todos",
						"Aberto",
						"Em Andamento",
						"Resolvido"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFilter(s),
						className: `rounded-md px-3 py-1.5 text-xs font-semibold ${filter === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`,
						children: s
					}, s))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-secondary/40 text-left text-xs uppercase text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Título"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Prioridade"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Data"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border hover:bg-accent/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-mono text-cyan",
									children: t.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-medium",
									children: t.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: `px-4 py-3 font-semibold ${priorityClass(t.priority)}`,
									children: t.priority
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: statusBadge(t.status)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: t.date
								})
							]
						}, t.id)) })]
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { title: "Abrir novo chamado" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-3 p-5",
					onSubmit: submitTicket,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Assunto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: subject,
							onChange: (event) => setSubject(event.target.value),
							className: "mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary",
							placeholder: "Descrição breve do pedido"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Categoria"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: category,
							onChange: (event) => setCategory(event.target.value),
							className: "mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Incidente de Segurança" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Infraestrutura" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Acesso" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Financeiro" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Prioridade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: priority,
							onChange: (event) => setPriority(event.target.value),
							className: "mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Baixa" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Média" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Alta" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Crítica" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Descrição"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 4,
							value: description,
							onChange: (event) => setDescription(event.target.value),
							className: "mt-1 w-full rounded-lg border border-border bg-input/60 px-3 py-2 text-sm outline-none focus:border-primary",
							placeholder: "Conte o que aconteceu..."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90",
							children: "Enviar solicitação"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Solicitações desta demonstração são armazenadas neste navegador e não são enviadas a um backend."
						})
					]
				})] })]
			})
		]
	});
}
//#endregion
export { Tickets as component };
