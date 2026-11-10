import Link from "next/link"
import { Boxes, Package, PackageMinus, PackageX, Plus } from "lucide-react"
import AnimatedNumber from "@/components/AnimatedNumber"
import NavigationLink from "@/components/NavigationLink"
import { getInventoryStats, formatCurrency } from "@/lib/inventory-stats"
import { LOW_STOCK_MAX } from "@/lib/product-query"
import LinkProgress from "@/components/LinkProgress"

export const metadata = {
    title: "Dashboard | Invento",
    description: "A quick overview of your products and stock levels.",
}

// donut geometry
const R = 42
const C = 2 * Math.PI * R

/* ---------------- page ---------------- */

const DashboardPage = async () => {
    /* ---------------- derived values ---------------- */
    const {
        totalProducts,
        totalProductsNote,
        potentialProfit,
        totalUnitsInStock,
        stockValue,
        inStockCount,
        lowStockProducts,
        lowStockNote,
        outOfStockCount,
        attentionProducts
    } = await getInventoryStats()

    /* ---------------- data ---------------- */
    const summary = [
        {
            label: "Total products",
            value: Number(totalProducts),
            note: totalProductsNote,
            icon: Package,
            chip: "bg-blue-50 text-blue-700",
            card: "border-blue-200/70",
            pulse: Number(potentialProfit) < 0
                ? "bg-red-500"
                : Number(potentialProfit) === 0
                    ? "bg-amber-500"
                    : "bg-emerald-500",
        },
        {
            label: "Units in stock",
            value: Number(totalUnitsInStock),
            note: `Worth ${formatCurrency(stockValue)} at current prices`,
            icon: Boxes,
            chip: "bg-emerald-50 text-emerald-700",
            card: "border-blue-200/70",
            pulse: Number(totalUnitsInStock) === 0 ? "bg-red-500" : Number(totalUnitsInStock) >= 1 && Number(totalUnitsInStock) <= LOW_STOCK_MAX ? "bg-amber-500" : "bg-emerald-500",
        },
        {
            label: "Low stock products",
            value: lowStockProducts.length,
            note: lowStockNote,
            icon: PackageMinus,
            chip: "bg-amber-50 text-amber-700",
            card: "border-blue-200/70",
            pulse: "bg-amber-500",
        },
        {
            label: "Out of stock",
            value: outOfStockCount,
            note: `${outOfStockCount === 0 ? "No products out of stock" : "Waiting to be restocked"}`,
            icon: PackageX,
            chip: "bg-red-50 text-red-700",
            card: "border-blue-200/70",
            pulse: "bg-red-500",
        },
    ]

    const health = [
        { label: "In stock", value: inStockCount, dot: "bg-emerald-500", stroke: "#10b981" },
        { label: "Low stock", value: lowStockProducts.length, dot: "bg-amber-500", stroke: "#f59e0b" },
        { label: "Out of stock", value: outOfStockCount, dot: "bg-red-500", stroke: "#ef4444" },
    ]


    let offset = 0
    const segments = health.map((h) => {
        const length = (h.value / totalProducts) * C
        const seg = { ...h, length, offset }
        offset += length
        return seg
    })

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes drawRing {
                    from { stroke-dashoffset: var(--c); }
                    to   { stroke-dashoffset: 0; }
                }
                @keyframes ping {
                    0%   { transform: scale(1); opacity: .6; }
                    80%, 100% { transform: scale(2.6); opacity: 0; }
                }
                .fade-up { opacity: 0; animation: fadeUp 650ms cubic-bezier(.2,.7,.2,1) forwards; }
                .ring    { stroke-dashoffset: var(--c); animation: drawRing 1300ms cubic-bezier(.4,.1,.2,1) 350ms forwards; }
                .ping    { animation: ping 2.2s cubic-bezier(0,0,.2,1) infinite; }
                @media (prefers-reduced-motion: reduce) {
                    .fade-up { opacity: 1; transform: none; animation: none; }
                    .ring { stroke-dashoffset: 0; animation: none; }
                    .ping { animation: none; opacity: 0; }
                }
            `}</style>

            <div className="mx-auto w-full max-w-6xl">
                {/* Header */}
                <header
                    className="fade-up flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                    style={{ animationDelay: "0ms" }}
                >
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                                Overview
                            </h1>
                            <span className="rounded-md bg-slate-200/70 px-2 py-1 text-xs font-medium text-slate-600">
                                All Products
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600">
                            How your products and stock levels look right now.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <NavigationLink
                            href="/products"
                            variant="secondary"
                        >
                            View inventory
                        </NavigationLink>
                        <NavigationLink
                            href="/products/new"
                            variant="primary"
                        >
                            <Plus size={16} aria-hidden="true" />
                            New product
                        </NavigationLink>
                    </div>
                </header>

                {/* Summary cards */}
                <section
                    aria-label="Summary"
                    className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {summary.map((card, i) => {
                        const Icon = card.icon
                        return (
                            <article
                                key={card.label}
                                className={`fade-up group min-w-0 rounded-2xl border bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 ${card.card}`}
                                style={{ animationDelay: `${120 + i * 90}ms` }}
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-slate-500">{card.label}</p>
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded-xl transition duration-300 group-hover:scale-110 ${card.chip}`}
                                    >
                                        <Icon size={18} aria-hidden="true" />
                                    </span>
                                </div>

                                <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
                                    <AnimatedNumber
                                        value={card.value}
                                        delay={200 + i * 90}
                                    />
                                </p>

                                <p className="mt-2 flex min-w-0 items-center gap-1.5 text-xs text-slate-500">
                                    {card.pulse && (
                                        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                                            <span className={`ping absolute inset-0 rounded-full ${card.pulse}`} />
                                            <span className={`relative h-2 w-2 rounded-full ${card.pulse}`} />
                                        </span>
                                    )}
                                    <span className="truncate" title={card.note}>
                                        {card.note}
                                    </span>
                                </p>
                            </article>
                        )
                    })}
                </section>

                {/* Overview panels */}
                <section className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                    {/* Needs attention */}
                    <article
                        className="fade-up min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        style={{ animationDelay: "520ms" }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">Needs attention</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Products that are low or sold out.
                                </p>
                            </div>
                            <Link
                                href="/products"
                                className="relative isolate overflow-hidden shrink-0 rounded px-3 py-1.5 text-sm font-medium text-blue-950 transition duration-200 hover:bg-slate-100"
                            >
                                <LinkProgress className="bg-blue-950/30" />
                                View all
                            </Link>
                        </div>

                        <ul className="mt-5 divide-y divide-slate-100">
                            {attentionProducts.length > 0 ? attentionProducts.map((item, i) => {
                                const out = item.units === 0
                                return (
                                    <li
                                        key={item.id}
                                        className="fade-up"
                                        style={{ animationDelay: `${650 + i * 90}ms` }}
                                    >
                                        <Link
                                            href={`/products/${item.id}`}
                                            className="relative isolate flex items-center justify-between gap-4 overflow-hidden rounded-lg px-2 py-3 transition-colors duration-200 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40"
                                        >
                                            <LinkProgress className="bg-blue-950/10" />
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-slate-900">{item.name}</p>
                                                <p className="truncate text-xs text-slate-500">{item.sku}</p>
                                            </div>
                                            <div
                                                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${out ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"
                                                    }`}
                                            >
                                                {out ? "Out of stock" : `${item.units} left`}
                                            </div>
                                        </Link>
                                    </li>
                                )
                            }) : <li className="px-2 py-8 text-center">
                                <p className="text-sm font-medium text-slate-700">Nothing needs attention</p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Products that are low or sold out will show up here.
                                </p>
                            </li>
                            }
                        </ul>
                    </article>

                    {/* Stock health */}
                    <article
                        className="fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        style={{ animationDelay: "620ms" }}
                    >
                        <h2 className="text-base font-semibold text-slate-900">Stock health</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Products grouped by stock status.
                        </p>

                        <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row lg:flex-col xl:flex-row">
                            <div className="relative h-40 w-40 shrink-0">
                                <svg
                                    viewBox="0 0 120 120"
                                    className="h-full w-full"
                                    role="img"
                                    aria-label={`Stock health: ${health
                                        .map((h) => `${h.value} ${h.label.toLowerCase()}`)
                                        .join(", ")}`}
                                >
                                    <defs>
                                        <mask
                                            id="ring-reveal"
                                            maskUnits="userSpaceOnUse"
                                            x="0"
                                            y="0"
                                            width="120"
                                            height="120"
                                        >
                                            <circle
                                                className="ring"
                                                cx="60"
                                                cy="60"
                                                r={R}
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="18"
                                                strokeDasharray={C}
                                                style={{ "--c": C }}
                                            />
                                        </mask>
                                    </defs>

                                    <circle
                                        cx="60"
                                        cy="60"
                                        r={R}
                                        fill="none"
                                        stroke="#f1f5f9"
                                        strokeWidth="14"
                                    />

                                    <g transform="rotate(-90 60 60)" mask="url(#ring-reveal)">
                                        {segments.map((s) => (
                                            <circle
                                                key={s.label}
                                                cx="60"
                                                cy="60"
                                                r={R}
                                                fill="none"
                                                stroke={s.stroke}
                                                strokeWidth="14"
                                                strokeDasharray={`${s.length} ${C - s.length}`}
                                                strokeDashoffset={-s.offset}
                                            />
                                        ))}
                                    </g>
                                </svg>

                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-semibold tracking-tight text-slate-900">
                                        <AnimatedNumber value={totalProducts} delay={500} />
                                    </span>
                                    <span className="text-xs text-slate-500">products</span>
                                </div>
                            </div>

                            <ul className="w-full space-y-3">
                                {health.map((h) => (
                                    <li
                                        key={h.label}
                                        className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors duration-200 hover:bg-slate-50"
                                    >
                                        <span className="flex items-center gap-2.5 text-slate-700">
                                            <span className={`h-2.5 w-2.5 rounded-full ${h.dot}`} />
                                            {h.label}
                                        </span>
                                        <span className="text-slate-500">
                                            <span className="font-medium text-slate-900 tabular-nums">
                                                {h.value}
                                            </span>{" "}
                                            ({Math.round((h.value / totalProducts) * 100)}%)
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                </section>
            </div>
        </main>
    )
}

export default DashboardPage