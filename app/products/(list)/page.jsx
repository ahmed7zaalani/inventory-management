import DeleteProductBtn from '@/components/DeleteProductBtn'
import LinkIcon from '@/components/LinkIcon'
import LinkProgress from '@/components/LinkProgress'
import ProductToolbar from '@/components/ProductToolbar'
import { getProducts, getStockStatus } from '@/lib/constants'
import { firstValue, getCategories, queryProducts } from '@/lib/product-query'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'


const Products = async ({ searchParams }) => {
    const { q, status, category } = await searchParams

    // Fetch the FULL list and filter afterward, so one cached list is enough
    // when caching is added (not one cache entry per search text).
    const { products } = await getProducts()
    if (!products) notFound()

    // From the FULL list, so the select keeps every option while filtering
    const categories = getCategories(products)

    // Filtered or original list
    const visibleProducts = queryProducts(products, {
        q: firstValue(q),
        status: firstValue(status),
        category: firstValue(category)
    })

    // products exist but none are left: the filters caused it
    const noMatches = visibleProducts?.length === 0 && products.length > 0


    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
                {/* Header */}
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                            Inventory
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Manage your products, prices and stock levels.
                        </p>
                    </div>
                    <Link
                        href="/products/new"
                        className="inline-flex items-center justify-center gap-2 rounded bg-blue-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:ring-offset-2 transition"
                    >
                        <LinkIcon icon={<Plus size={16} />} />
                        New Product
                    </Link>
                </header>

                {/* Toolbar */}
                <Suspense
                    fallback={<div className="mt-6 h-10 w-full animate-pulse rounded bg-slate-200 sm:w-80" />}
                >
                    <ProductToolbar categories={categories} />
                </Suspense>

                {/* Table */}
                <section
                    className="mt-6 overflow-hidden rounded border border-slate-200 bg-white shadow-sm"
                >
                    <div className="overflow-x-auto">
                        <table
                            className="min-w-full divide-y divide-slate-200 text-left text-sm"
                        >
                            <thead className="bg-slate-50 text-slate-600">
                                <tr>

                                    {/* products */}
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium"
                                    >
                                        Product
                                    </th>

                                    {/* sku */}
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium"
                                    >
                                        SKU
                                    </th>

                                    {/* category */}
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium"
                                    >
                                        Category
                                    </th>

                                    {/* stock */}
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium"
                                    >
                                        Stock
                                    </th>

                                    {/* status */}
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium"
                                    >
                                        Status
                                    </th>

                                    {/* cost */}
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium text-center"
                                    >
                                        Unit Cost
                                    </th>

                                    {/* price */}
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium"
                                    >
                                        Price
                                    </th>

                                    {/* actions */}
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200">
                                {visibleProducts?.length > 0 ? (
                                    visibleProducts.map((prd) => (
                                        <tr className="hover:bg-slate-50" key={prd.id}>
                                            {/* product */}
                                            <td className="px-6 py-4">
                                                <Link href={`/products/${prd.id}`}>
                                                    <div className="flex items-center gap-4">
                                                        <Image
                                                            src={prd.image}
                                                            alt="prdImg"
                                                            width={30}
                                                            height={30}
                                                            className="shrink-0 rounded h-auto w-auto"
                                                        />
                                                        <div>
                                                            <p className="font-medium text-slate-900">{prd.title}</p>
                                                            <p className="max-w-xs truncate text-slate-500">
                                                                {prd.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </td>

                                            {/* sku */}
                                            <td className="px-6 py-4 text-center text-slate-700">
                                                <Link href={`/products/${prd.id}`}>
                                                    {prd.sku}
                                                </Link>
                                            </td>

                                            {/* category */}
                                            <td className="px-6 py-4 text-center text-slate-700">
                                                <Link href={`/products/${prd.id}`}>
                                                    {prd.category}
                                                </Link>
                                            </td>

                                            {/* stock */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex text-center rounded-full px-2.5 py-1 text-xs font-medium ${getStockStatus(prd.quantity).style.bg} ${getStockStatus(prd.quantity).style.text}`}
                                                >
                                                    <Link href={`/products/${prd.id}`}>
                                                        {prd.quantity}
                                                    </Link>
                                                </span>
                                            </td>

                                            {/* status - specific logic should be implemented */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex text-center rounded-full px-2.5 py-1 text-xs font-medium ${getStockStatus(prd.quantity).style.bg} ${getStockStatus(prd.quantity).style.text}`}
                                                >
                                                    <Link href={`/products/${prd.id}`}>
                                                        {getStockStatus(prd.quantity).status}
                                                    </Link>
                                                </span>
                                            </td>

                                            {/* cost */}
                                            <td className="px-6 py-4 text-slate-700">
                                                <Link href={`/products/${prd.id}`}>
                                                    ${prd.cost}
                                                </Link>
                                            </td>

                                            {/* price */}
                                            <td className="px-6 py-4 text-slate-700">
                                                <Link href={`/products/${prd.id}`}>
                                                    ${prd.price}
                                                </Link>
                                            </td>

                                            {/* actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/products/${prd.id}/edit`} className="relative isolate overflow-hidden inline-flex items-center justify-center gap-1.5 rounded border  cursor-pointer border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                                                        <LinkProgress className="bg-blue-950/40" />
                                                        Edit
                                                    </Link>
                                                    <DeleteProductBtn
                                                        id={prd.id}
                                                        className="rounded border cursor-pointer border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                                                        children="Delete"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : <tr>
                                    <td colSpan={8} className="px-6 py-10 text-center text-slate-500">
                                        {noMatches ? "No products match your filters" : "No Products Available"}
                                    </td>
                                </tr>}
                            </tbody>

                        </table>
                    </div>

                </section>
            </div>
        </main>
    )
}

export default Products