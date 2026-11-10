// app/products/[id]/loading.jsx
const Bone = ({ className = "" }) => (
    <div className={`animate-pulse rounded bg-slate-200 ${className}`} />
)

const ProductDetailsLoading = () => {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-5xl">

                {/* Back link */}
                <Bone className="h-5 w-36" />

                <article className="mt-6 grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-2 lg:gap-12">

                    {/* Image */}
                    <div className="aspect-square w-full animate-pulse rounded-xl bg-slate-200" />

                    {/* Info */}
                    <div className="flex flex-col">
                        {/* Stock badge */}
                        <Bone className="h-6 w-24 rounded-full" />

                        {/* Title */}
                        <Bone className="mt-4 h-9 w-4/5" />
                        <Bone className="mt-2 h-9 w-2/5" />

                        {/* Price */}
                        <Bone className="mt-4 h-9 w-28" />

                        {/* Description */}
                        <div className="mt-6 space-y-2.5">
                            <Bone className="h-4 w-full" />
                            <Bone className="h-4 w-full" />
                            <Bone className="h-4 w-3/4" />
                        </div>

                        {/* Details list */}
                        <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between gap-4 px-4 py-3.5"
                                >
                                    <Bone className="h-4 w-20" />
                                    <Bone className="h-4 w-28" />
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <section className="mt-8 border-t border-slate-200 pt-6">
                            <Bone className="h-4 w-16" />
                            <Bone className="mt-2 h-4 w-3/4" />

                            <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row">
                                <Bone className="h-10 w-full rounded-lg" />
                                <Bone className="h-10 w-full rounded-lg" />
                            </div>
                        </section>
                    </div>
                </article>

                {/* Pricing overview */}
                <section className="mt-8">
                    <Bone className="h-6 w-44" />
                    <Bone className="mt-2 h-4 w-64" />

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <Bone className="h-4 w-24" />
                                    <Bone className="h-8 w-8 rounded-lg" />
                                </div>
                                <Bone className="mt-3 h-9 w-24" />
                                <Bone className="mt-2 h-3 w-32" />
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    )
}

export default ProductDetailsLoading