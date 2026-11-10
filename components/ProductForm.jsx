"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { primaryBtn } from '@/lib/styles'
import NavigationLink from './NavigationLink'

const initialState = {
    title: "",
    cost: "",
    price: "",
    description: "",
    category: "",
    image: "",
    sku: "",
    quantity: ""
}

const ProductForm = ({ action, product }) => {
    const [formData, setFormData] = useState(product || initialState)
    const [isPending, setIsPending] = useState(false)
    const [message, setMessage] = useState({ text: "", error: false })
    const router = useRouter()
    const isEdit = Boolean(product)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsPending(true)
        setMessage({ text: "", error: false })
        try {
            const result = await action(new FormData(e.currentTarget))
            if (result.success) {
                setMessage({ text: result.message, error: false })
                toast.success(result.message)
                router.replace("/products")
                if (!isEdit) setFormData(initialState)
            } else {
                setMessage({ text: result.message, error: true })
                toast.error(result.message)
            }
        } catch (err) {
            setMessage({ text: "Something went wrong!", error: true })
            toast.error("Something went wrong, try again later")
            console.log(message)
        } finally {
            setIsPending(false)
        }
    }

    useEffect(() => {
        return () => {
            setFormData(product || initialState)
            setMessage({ text: "", error: false })
        }
    }, [])


    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
            {/* Title */}
            <div>
                <label
                    htmlFor="title"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                >
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({
                        ...formData,
                        title: e.target.value
                    })}
                    placeholder="e.g. Ceramic coffee mug"
                    className="w-full rounded border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label
                    htmlFor="description"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({
                        ...formData,
                        description: e.target.value
                    })}
                    placeholder="Describe the product in a few sentences..."
                    className="w-full resize-y rounded border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    required
                />
            </div>

            {/* Category */}
            <div>
                <label
                    htmlFor="category"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                >
                    Category
                </label>
                <input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({
                        ...formData,
                        category: e.target.value
                    })}
                    placeholder="e.g. Men's Clothes, Electronics..."
                    className="w-full resize-y rounded border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    required
                />
            </div>

            {/* Cost */}
            <div>
                <label
                    htmlFor="cost"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                >
                    Unit Cost
                </label>
                <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm text-slate-500">
                        $
                    </span>
                    <input
                        id="cost"
                        name="cost"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.cost}
                        onChange={(e) => setFormData({
                            ...formData,
                            cost: Number(e.target.value)
                        })}
                        placeholder="0.00"
                        className="w-full rounded border border-slate-300 bg-white py-2.5 pl-8 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                        required
                    />
                </div>
            </div>

            {/* Price */}
            <div>
                <label
                    htmlFor="price"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                >
                    Price
                </label>
                <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm text-slate-500">
                        $
                    </span>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({
                            ...formData,
                            price: Number(e.target.value)
                        })}
                        placeholder="0.00"
                        className="w-full rounded border border-slate-300 bg-white py-2.5 pl-8 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                        required
                    />
                </div>
            </div>

            {/* Image */}
            <div>
                <label
                    htmlFor="image"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                >
                    Image
                </label>
                <input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={(e) => setFormData({
                        ...formData,
                        image: e.target.value
                    })}
                    placeholder="e.g. https://fakestoreapi.com/img/fileName.png"
                    className="w-full resize-y rounded border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    required
                />
            </div>

            {/* SKU */}
            <div>
                <label
                    htmlFor="sku"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                >
                    SKU
                </label>
                <input
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData({
                        ...formData,
                        sku: e.target.value
                    })}
                    placeholder="DRS-ZRA-BLU-MED"
                    className="w-full resize-y rounded border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    required
                />
            </div>

            {/* Quantity */}
            <div>
                <label
                    htmlFor="quantity"
                    className="mb-1.5 block text-sm font-medium text-slate-800"
                >
                    Quantity
                </label>
                <input
                    id="quantity"
                    name="quantity"
                    type='number'
                    min={0}
                    value={formData.quantity}
                    onChange={(e) => setFormData({
                        ...formData,
                        quantity: Number(e.target.value).toFixed(0)
                    })}
                    placeholder="5"
                    className="w-full resize-y rounded border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    required
                />
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                <NavigationLink
                    href="/products"
                    disabled={isPending}
                    onClick={() => {
                        setFormData(product || initialState)
                        setMessage({ text: "", error: false })
                    }}
                    variant="secondary"
                >
                    Cancel
                </NavigationLink>
                <button
                    type="submit"
                    disabled={isPending}
                    className={primaryBtn}
                >
                    {
                        isPending
                            ? isEdit ? "Updating..." : "Creating..."
                            : isEdit ? "Update Product" : "Add Product"
                    }
                </button>
            </div>
        </form>
    )
}

export default ProductForm