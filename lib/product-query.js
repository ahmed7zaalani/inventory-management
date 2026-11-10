
/** 1 to LOW_STOCK_MAX units counts as low stock. */
export const LOW_STOCK_MAX = 5

/**
 * Returns the first value when a URL parameter is repeated.
 * Example: ?q=a&q=b arrives in searchParams as ["a", "b"] -> "a"
 *
 * @param {string | string[] | undefined} value
 * @returns {string | undefined}
 */
export const firstValue = (value) => (Array.isArray(value) ? value[0] : value)

/** 
 * Builds the category list from the real products: unique and sorted.
 * Pass the FULL list, not the filtered one, or the select would shrink
 * every time a filter is applied.
 *
 * @param {Product[]} [products]
 * @returns {string[]}
 */
export const getCategories = (products) => {
    return [...new Set(products.map(product => product.category).filter(Boolean))].sort()
}

/**
 * Keeps the products whose title or SKU contains the search term
 * (case-insensitive, extra spaces ignored).
 * An empty or missing term returns every product, so a bare /products works.
 *
 * It uses includes() and not a RegExp, so special characters like "("
 * in the search text can't break it. The ?. stops one product with no
 * title or SKU from crashing the page.
 *
 * @param {Product[]} [products]
 * @param {string} [searchTerm]
 * @returns {Product[]}
 */
export const searchProducts = (products, searchTerm) => {
    const term = String(searchTerm ?? "").trim().toLowerCase()
    if (!term) return products

    return products.filter((product) =>
        product.title?.toLowerCase().includes(term) ||
        product.sku?.toLowerCase().includes(term)
    )
}



/**
 * Keeps the products at one stock level:
 *  - "in":  more than LOW_STOCK_MAX units
 *  - "low": 1 to LOW_STOCK_MAX units
 *  - "out": 0 units
 * Any other value (including "all" or undefined) returns every product,
 * so a typed URL like ?status=banana can't hide the whole list.
 *
 * @param {Product[]} [products]
 * @param {string} [status]
 * @returns {Product[]}
 */
export const filterByStatus = (products, status) => {
    switch (status) {
        case "in":
            return products.filter(product => Number(product.quantity) > LOW_STOCK_MAX)

        case "low":
            return products.filter(product => Number(product.quantity) <= LOW_STOCK_MAX && Number(product.quantity) >= 1)

        case "out":
            return products.filter(product => Number(product.quantity) === 0)

        default:
            return products;
    }
}


/**
 * Keeps the products with exactly this category.
 * A missing value or "all" returns every product.
 *
 * @param {Product[]} [products]
 * @param {string} [category]
 * @returns {Product[]}
 */
export const filterByCategory = (products, category) => {
    if (!category) return products
    return products.filter(product => product.category.trim().toLowerCase() === category.trim().toLowerCase())
}


/**
 * The one function the page calls. Applies search, then status, then category.
 * The three filters give the same result in any order; keeping the order here
 * means no page has to remember it.
 *
 * Every option is optional, so queryProducts(products, {}) returns the list as it is.
 *
 * @param {Product[]} [products]
 * @param {{ q?: string, status?: string, category?: string }} [options]
 * @returns {Product[]}
 */
export const queryProducts = (products, { q, status, category }) => {
    return filterByCategory(
        filterByStatus(
            searchProducts(products, q), status), category)
}