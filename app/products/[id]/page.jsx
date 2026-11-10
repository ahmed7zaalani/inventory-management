import Link from "next/link";
import { ArrowLeft, Package, Pencil, Percent, Tag, Trash2, Wallet } from "lucide-react";
import { getProductById, getStockStatus } from "@/lib/constants";
import { notFound } from "next/navigation";
import Image from "next/image";
import DeleteProductBtn from "@/components/DeleteProductBtn";
import LinkProgress from "@/components/LinkProgress";

const ProductDetailsPage = async ({ params }) => {
    const { id } = await params
    const { product } = await getProductById(id)
    if (!id || !product) notFound()

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-5xl">

                {/* Back to list */}
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to products
                </Link>

                <article className="mt-6 grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-2 lg:gap-12">

                    {/* Image */}
                    <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                        <Image
                            loading="eager"
                            src={product.image}
                            alt="prdImg"
                            width={200}
                            height={200}
                            className="object-cover w-auto h-auto"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col">
                        <span
                            className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium 
                        ${getStockStatus(product.quantity).style.bg} 
                        ${getStockStatus(product.quantity).style.text}`}
                        >
                            {getStockStatus(product.quantity).status}
                        </span>

                        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            {product.title}
                        </h1>

                        <p className="mt-3 text-3xl font-semibold text-blue-950">${product.price}</p>

                        <p className="mt-6 text-base leading-relaxed text-slate-600">
                            {product.description}
                        </p>

                        {/* Details */}
                        <dl className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">

                            <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                                <dt className="text-sm text-slate-500">Category</dt>
                                <dd className="text-sm font-medium text-slate-900">{product.category}</dd>
                            </div>

                            <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                                <dt className="text-sm text-slate-500">SKU</dt>
                                <dd className="text-sm font-medium text-slate-900">{product.sku}</dd>
                            </div>

                            <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                                <dt className="text-sm text-slate-500">Quantity</dt>
                                <dd className="text-sm font-medium text-slate-900">
                                    {
                                        product.quantity <= 0 ? `${product.quantity} units`
                                            : product.quantity == 1 ? `${product.quantity} unit` : `${product.quantity} units`
                                    }
                                </dd>
                            </div>

                            <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                                <dt className="text-sm text-slate-500">Unit Cost</dt>
                                <dd className="text-sm font-medium text-slate-900">${product.cost}</dd>
                            </div>

                            <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                                <dt className="text-sm text-slate-500">Status</dt>
                                <dd
                                    className={`text-sm font-medium ${getStockStatus(product.quantity).style.text}`}
                                >
                                    {getStockStatus(product.quantity).status}
                                </dd>
                            </div>
                        </dl>

                        {/* Actions */}
                        <section className="mt-8 border-t border-slate-200 pt-6">
                            <h2 className="text-sm font-medium text-slate-900">Actions</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Update this product's information or remove it from your inventory.
                            </p>

                            <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row">
                                <Link
                                    href={`/products/${id}/edit`}
                                    className="relative isolate overflow-hidden inline-flex items-center justify-center gap-2 rounded bg-blue-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:ring-offset-2 transition w-full"
                                >
                                    <LinkProgress />
                                    <Pencil className="h-4 w-4" />
                                    Edit product
                                </Link>
                                <DeleteProductBtn
                                    id={id}
                                    className="inline-flex items-center justify-center gap-2 rounded border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-2 cursor-pointer transition w-full"
                                    children={
                                        <>
                                            <Trash2 className="h-4 w-4" />
                                            Delete Product
                                        </>
                                    }
                                    redirectTo="/products"
                                />
                            </div>
                        </section>


                    </div>
                </article>

                {/* Pricing overview */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                        Pricing overview
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                        How this product's price and stock add up.
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500">Unit price</p>
                                <span className="rounded-lg bg-indigo-50 p-2 text-blue-950">
                                    <Tag className="h-4 w-4" />
                                </span>
                            </div>
                            <p className="mt-3 text-3xl font-semibold text-slate-900">${product.price}</p>
                            <p className="mt-1 text-xs text-slate-500">Price per unit</p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500">Total units</p>
                                <span className="rounded-lg bg-indigo-50 p-2 text-blue-950">
                                    <Package className="h-4 w-4" />
                                </span>
                            </div>
                            <p className="mt-3 text-3xl font-semibold text-slate-900">{product.quantity}</p>
                            <p className="mt-1 text-xs text-slate-500">Units currently in stock</p>
                        </div>

                        <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-blue-950">Total units price</p>
                                <span className="rounded-lg bg-white p-2 text-blue-950">
                                    <Wallet className="h-4 w-4" />
                                </span>
                            </div>
                            <p className="mt-3 text-3xl font-semibold text-slate-900">
                                ${product.price * product.quantity}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                {product.quantity > 1 ? `${product.quantity} unit` : `${product.quantity} units`} &times; {product.price}
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500">Profit margin per unit</p>
                                <span className="rounded-lg bg-indigo-50 p-2 text-blue-950">
                                    <Percent className="h-4 w-4" />
                                </span>
                            </div>
                            <p className="mt-3 text-3xl font-semibold text-emerald-600">
                                {(((product.price - product.cost) / product.price) * 100).toFixed(0)}%
                            </p>
                            <p className="mt-1 text-xs text-slate-500">Cost price: ${product.cost} per unit</p>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}

export default ProductDetailsPage