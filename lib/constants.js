import { cacheLife, cacheTag } from "next/cache"
import { LOW_STOCK_MAX } from "./product-query"

const apiUrl = "https://6a2154b2b1d0aaf32b4f3ced.mockapi.io/api/products"


// data-fetching function - all products
export const getProducts = async () => {
    "use cache"
    cacheLife("hours") // caching the data for an hour, than refresh new data.
    cacheTag("products") // giving a label to the cached data so that allows to invalidate it later

    try {
        const res = await fetch(apiUrl)
        if (!res.ok) {
            return {
                message: "fetching products failed",
            }
        }

        return {
            message: "products fetched successfully",
            products: await res.json()
        }
    } catch (error) {
        console.log(error)
    }

}

// data-fetching function - single product by id
export const getProductById = async (id) => {
    "use cache"
    cacheLife("hours") // caching the data for an hour, than refresh new data.
    cacheTag(`product-${id}`) // giving a label to the cached data so that allows to invalidate it later

    try {
        if (!id) {
            return {
                message: "product id is undefined.",
            }
        }

        const res = await fetch(`${apiUrl}/${id}`)
        if (!res.ok) {
            return {
                message: "product fetching failed.",
            }
        }

        return {
            message: "product fetched successfully",
            product: await res.json()
        }
    } catch (error) {
        console.log(error)
    }
}

// a function that returns an object depending on the product's quantity
export const getStockStatus = (quantity) => {
    if (Number(quantity) <= LOW_STOCK_MAX && Number(quantity) >= 1) return { status: "Low Stock", style: { bg: "bg-amber-100", text: "text-amber-700" } }

    if (Number(quantity) <= 0) return { status: "Out of Stock", style: { bg: "bg-red-100", text: "text-red-700" } }

    return { status: "In Stock", style: { bg: "bg-emerald-100", text: "text-emerald-700" } }
}