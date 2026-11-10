// app/page.jsx  ->  "/"
// Static server component: no data fetching, no client JS.
import { Boxes, Package, Pencil, Percent, Plus, Search } from "lucide-react"
import LinkIcon from "@/components/LinkIcon"
import NavigationLink from "@/components/NavigationLink"

export const metadata = {
  title: "Invento | Inventory made simple",
  description:
    "Manage your products, prices and stock levels in one place. See your margin on every item.",
}

const previewRows = [
  { name: "Ceramic coffee mug", sku: "MUG-CER-WHT", qty: 48, price: "$12.00", status: "In stock", style: "bg-emerald-50 text-emerald-700" },
  { name: "Linen throw pillow", sku: "PIL-LIN-GRY", qty: 6, price: "$28.50", status: "Low stock", style: "bg-amber-50 text-amber-700" },
  { name: "Oak desk organizer", sku: "DSK-OAK-NAT", qty: 23, price: "$39.00", status: "In stock", style: "bg-emerald-50 text-emerald-700" },
  { name: "Brass table lamp", sku: "LMP-BRS-GLD", qty: 0, price: "$64.00", status: "Out of stock", style: "bg-red-50 text-red-700" },
]

const features = [
  {
    icon: Package,
    title: "See stock at a glance",
    text: "Every product shows a clear status, so you know what is in stock, running low or sold out.",
  },
  {
    icon: Search,
    title: "Find a product in seconds",
    text: "Search by name or SKU and jump straight to the product you need.",
  },
  {
    icon: Percent,
    title: "Know your margin",
    text: "Enter the unit cost and the price. Stockly shows the profit margin and the total value of your stock.",
  },
  {
    icon: Pencil,
    title: "Edit without friction",
    text: "Update prices and quantities, or remove a product, from one simple screen. Duplicate SKUs are caught for you.",
  },
]


const HomePage = () => {
  return (
    <div className="min-h-screen scroll-smooth bg-slate-50 text-slate-900">
      {/* One page-load moment: the preview rows settle in one after another. */}
      <style>{`
                @keyframes rowIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .row-in { opacity: 0; animation: rowIn 500ms cubic-bezier(.2,.7,.2,1) forwards; }
                @media (prefers-reduced-motion: reduce) {
                    .row-in { opacity: 1; animation: none; }
                    html { scroll-behavior: auto; }
                }
            `}</style>

      <main>
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8">
          <div>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Every product, price and stock level in one place.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              Add products, keep an eye on stock, and see the margin on each item
              without opening a spreadsheet.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <NavigationLink href="/products">
                View Inventory
              </NavigationLink>
              <NavigationLink href="/products/new" variant="secondary">
                <LinkIcon icon={<Plus size={16} />} />
                Add Product
              </NavigationLink>
            </div>
          </div>

          {/* Ledger preview: mirrors the real products table */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded bg-linear-to-br from-blue-100/70 via-transparent to-slate-200/60 blur-2xl"
            />
            <div className="relative overflow-hidden rounded border border-slate-200 bg-white shadow-xl shadow-slate-900/5 transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Inventory</p>
                  <p className="text-xs text-slate-500">4 products</p>
                </div>
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  Sample data
                </span>
              </div>

              <ul className="divide-y divide-slate-100">
                {previewRows.map((row, i) => (
                  <li
                    key={row.sku}
                    className="row-in flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
                    style={{ animationDelay: `${250 + i * 120}ms` }}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">{row.name}</p>
                      <p className="text-xs text-slate-500">{row.sku}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      <span className="hidden text-sm text-slate-600 sm:inline">{row.qty} units</span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${row.style}`}>
                        {row.status}
                      </span>
                      <span className="w-16 text-right text-sm font-medium text-slate-900">
                        {row.price}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Features: a two-column list, not a grid of identical cards */}
        <section id="features" className="scroll-mt-20 border-y border-slate-200 bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:px-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Built for the daily work of running a shop
              </h2>
              <p className="mt-4 max-w-sm text-slate-600">
                The things you check every day, without the clutter of a full ERP system.
              </p>
            </div>

            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, text }) => (
                <div key={title} className="group flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-950 transition duration-300 group-hover:bg-blue-950 group-hover:text-white">
                    <Icon size={18} />
                  </span>
                  <div>
                    <dt className="font-medium text-slate-900">{title}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-slate-600">{text}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Final call to action */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 rounded bg-blue-950 px-6 py-10 text-white sm:px-12 sm:py-14 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Add your first product in under a minute
              </h2>
              <p className="mt-3 text-blue-100/80">
                Title, price, cost, SKU and quantity. That is all it takes.
              </p>
            </div>
            <NavigationLink
              href="/products/new"
              variant="secondary"
            >
              <LinkIcon icon={<Plus size={16} />} />
              New Product
            </NavigationLink>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 font-medium text-slate-700">
            <Boxes size={16} />
            Invento
          </span>
        </div>
      </footer>
    </div>
  )
}

export default HomePage