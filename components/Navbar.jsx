import { Boxes, Plus } from "lucide-react"
import Link from "next/link"
import LinkIcon from "./LinkIcon"
import LinkProgress from "./LinkProgress"

const Navbar = () => {
    return (
        <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="inline-flex items-center gap-2">
                    <span className="rounded bg-blue-950 p-2 text-white">
                        <Boxes size={18} />
                    </span>
                    <span className="text-lg font-semibold tracking-tight">Invento</span>
                </Link>

                <nav className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href="/products"
                        className="relative isolate overflow-hidden inline-flex items-center gap-1.5 rounded px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200/60 hover:text-slate-900"
                    >
                        <LinkProgress className="bg-blue-950/40" />
                        Products
                    </Link>
                    <Link
                        href="/dashboard"
                        className="relative isolate overflow-hidden inline-flex items-center gap-1.5 rounded px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200/60 hover:text-slate-900"
                    >
                        <LinkProgress className="bg-blue-950/40" />
                        Dashboard
                    </Link>
                    <Link
                        href="/products/new"
                        className="relative isolate overflow-hidden inline-flex items-center gap-1.5 rounded bg-blue-950 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-blue-800 active:scale-[0.98]"
                    >
                        <LinkProgress />
                        <LinkIcon icon={<Plus size={16} />} />
                        New product
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar