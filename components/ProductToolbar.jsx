"use client"

import React, { useEffect, useState, useTransition } from 'react'
import { Loader2, RotateCcw, Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const ProductToolbar = ({ categories }) => {
    const router = useRouter()
    // current pathname url (/products)
    const pathname = usePathname()
    // it allows us to read-only. new URLSearchParams(searchParams) allows us to set,update and append
    const searchParams = useSearchParams()

    // search box state - reading the value from url or default value (empty string)
    const [value, setValue] = useState(searchParams.get("q") ?? "")
    // status select state - reading the value from url or default value (all statuses)
    const [status, setStatus] = useState(searchParams.get("status") ?? "all")
    // category select state - reading the value from url or default value (all categories)
    const [category, setCategory] = useState(searchParams.get("category") ?? "all")

    // isPending drives the spinner: loading.jsx doesn't show again when only
    // the query string changes.
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        // wait 300ms after the last keystroke before navigating
        const timer = setTimeout(() => {
            // a copy from the current url params
            const params = new URLSearchParams(searchParams)

            const term = value.trim()
            if (term) params.set("q", term)
            else params.delete("q")

            if (status === "all") params.delete("status")
            else params.set("status", status)

            if (category === "all") params.delete("category")
            else params.set("category", category)

            // If they're identical, there's no reason to navigate again (nothing changed)
            if (params.toString() === searchParams.toString()) return

            // replace, not push, so Back doesn't step through every search
            startTransition(() => {
                router.replace(params.size ? `${pathname}?${params}` : pathname)
            })

        }, 300)

        return () => clearTimeout(timer)
    }, [value, status, category, searchParams, pathname, router])


    return (
        <>
            <section className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                        type="search"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        aria-label="Search products"
                        placeholder="Search products..."
                        className="w-full rounded border border-slate-300 bg-white py-2.5 pl-11 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                    {isPending && (
                        <Loader2
                            size={16}
                            aria-hidden="true"
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-slate-400"
                        />
                    )}
                </div>

                {/* status */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="rounded border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                >
                    <option value="all">All statuses</option>
                    <option value="in">In stock</option>
                    <option value="low">Low stock</option>
                    <option value="out">Out of stock</option>
                </select>

                {/* category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                >
                    <option value="all">All categories</option>
                    {
                        categories.map((category) => (
                            <option value={category} key={category}>{category}</option>
                        ))
                    }
                </select>

                {/* Reset button */}
                <button
                    type="button"
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition duration-200 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50 disabled:opacity-50 disabled:pointer-events-none"
                    disabled={
                        value.trim() !== "" ||
                            status !== "all" ||
                            category !== "all"
                            ? false : true
                    }
                    onClick={() => {
                        setValue("")
                        setStatus("all")
                        setCategory("all")
                    }}
                >
                    <RotateCcw size={15} />
                    Reset
                </button>
            </section>
        </>
    )
}

export default ProductToolbar