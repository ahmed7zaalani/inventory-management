// app/products/loading.jsx
const Bone = ({ className = "" }) => (
    <div className={`animate-pulse rounded bg-slate-200 ${className}`} />
)

const columns = ["Product", "SKU", "Category", "Stock", "Status", "Unit Cost", "Price", "Actions"]

const ProductsLoading = () => {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">

                {/* Header */}
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Bone className="h-9 w-40" />
                        <Bone className="mt-2 h-4 w-72 max-w-full" />
                    </div>
                    <Bone className="h-10 w-36" />
                </header>

                {/* Toolbar (search input) */}
                <Bone className="mt-6 h-10 w-full sm:w-80" />

                {/* Table */}
                <section className="mt-6 overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                            <thead className="bg-slate-50 text-slate-600">
                                <tr>
                                    {columns.map((col) => (
                                        <th key={col} scope="col" className="px-6 py-3 font-medium">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <tr key={i}>
                                        {/* product: image + title + description */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <Bone className="h-7.5 w-7.5 shrink-0" />
                                                <div className="space-y-2">
                                                    <Bone className="h-4 w-36" />
                                                    <Bone className="h-3 w-48" />
                                                </div>
                                            </div>
                                        </td>

                                        {/* sku */}
                                        <td className="px-6 py-4"><Bone className="h-4 w-24" /></td>

                                        {/* category */}
                                        <td className="px-6 py-4"><Bone className="h-4 w-20" /></td>

                                        {/* stock badge */}
                                        <td className="px-6 py-4"><Bone className="h-6 w-10 rounded-full" /></td>

                                        {/* status badge */}
                                        <td className="px-6 py-4"><Bone className="h-6 w-20 rounded-full" /></td>

                                        {/* cost */}
                                        <td className="px-6 py-4"><Bone className="mx-auto h-4 w-12" /></td>

                                        {/* price */}
                                        <td className="px-6 py-4"><Bone className="h-4 w-12" /></td>

                                        {/* actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Bone className="h-7 w-12 rounded-lg" />
                                                <Bone className="h-7 w-14 rounded-lg" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </main>
    )
}

export default ProductsLoading 