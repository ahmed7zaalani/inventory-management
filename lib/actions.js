"use server"
import { revalidatePath, updateTag } from "next/cache"
import { getProducts } from "./constants"

const apiUrl = "https://6a2154b2b1d0aaf32b4f3ced.mockapi.io/api/products"

// Server Action Function - Creating New Product
export const createProduct = async (formData) => {
    const product = Object.fromEntries(formData.entries())
    try {
        // get request - fetching all products
        const { products } = await getProducts()
        if (!products) {
            console.log("createProduct: fetching products failed")
            return {
                message: "Could not verify the SKU, please try again",
                success: false
            }
        }
        // const products = await getProductsResponse.json()

        // destructuring the values from the form
        const {
            title,
            price,
            description,
            category,
            image,
            cost,
            sku,
            quantity
        } = product


        // prevent creating duplicated products with the same sku
        const isSkuExisting = products?.find((prd) => prd.sku.toLowerCase() === sku.toLowerCase())
        if (isSkuExisting) {
            return {
                message: `An item with this (${sku}) sku already exists.`,
                success: false
            }
        }

        // checking empty fields
        if (
            !title || !price || !description || !category || !image || !cost || !sku || !quantity
        ) {
            return {
                message: "Missing Required Fields",
                success: false
            }
        }

        // post request - sending new product
        const createProductResponse = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...product,
                category: category.trim().toLowerCase()
            })
        })
        if (!createProductResponse.ok) {
            return {
                message: "Creating Product Failed",
                success: false
            }
        }

        updateTag("products")

        // returning the succeeded result.
        return {
            message: "Created Successfully",
            success: true,
            product: {
                ...product,
                category: category.trim().toLowerCase()
            }
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Could not reach the server, try again later"
        }
    }

}

// Server Action Function - Editing A Product
export const editProduct = async (id, formData) => {
    const product = Object.fromEntries(formData.entries())
    try {
        // accepting only valid ids
        if (!id) {
            return {
                message: "Cannot find productID",
                success: false,
            }
        }

        // get request - fetching all products
        const { products } = await getProducts()
        if (!products) {
            console.log("updateProduct: fetching products failed")
            return {
                message: "Could not verify the SKU, please try again",
                success: false
            }
        }

        // destructuring the values from the form
        const {
            title,
            price,
            description,
            category,
            image,
            cost,
            sku,
            quantity
        } = product


        // checking empty fields
        if (
            !title || !price || !description || !category || !image || !cost || !sku || !quantity
        ) {
            return {
                message: "Missing Required Fields",
                success: false
            }
        }

        // prevent updating duplicated products with the same sku
        const isSkuExisting = products?.find((prd) => prd.sku.toLowerCase() === sku.toLowerCase() && String(prd.id) !== String(id))
        if (isSkuExisting) {
            return {
                message: `An item with this (${sku}) sku already exists.`,
                success: false
            }
        }


        // put request - updating a product
        const updateProductResponse = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...product,
                category: category.trim().toLowerCase()
            })
        })
        if (!updateProductResponse.ok) {
            return {
                message: "Updating Product Failed",
                success: false
            }
        }

        const updatedProduct = await updateProductResponse.json()

        updateTag("products")  // update the cached products
        updateTag(`product-${id}`)  // update the cached product

        revalidatePath("/products")
        revalidatePath(`/products/${id}`)
        revalidatePath(`/products/${id}/edit`)
        revalidatePath(`/dashboard`)

        // returning the succeeded result.
        return {
            message: "Updated Successfully",
            success: true,
            product: updatedProduct
        }

    } catch (error) {
        console.log(error)
        return {
            message: "Could not reach the server, try again later",
            success: false,
        }
    }
}

// Server Action Function - Deleting A Product
export const deleteProduct = async (id) => {
    try {
        // accepting only valid ids
        if (!id) {
            return {
                message: "Cannot find productID",
                error: true,
            }
        }

        // delete request - deleting a product
        const deleteProductResponse = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!deleteProductResponse.ok) {
            return {
                message: "Deleting Product Failed",
                error: true
            }
        }

        updateTag("products")  // update the cached products
        updateTag(`product-${id}`)  // update the cached product

        return {
            message: "Product Deleted Successfully",
            success: true
        }

    } catch (error) {
        console.error(error)
        return {
            message: "Could not reach the server, try again later",
            error: true,
        }
    }
}
