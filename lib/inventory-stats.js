import { getProducts } from "./constants";
import { LOW_STOCK_MAX } from "./product-query";

/**
 * Formats a number as US dollars with no cents.
 * Example: 18400.15 -> "$18,400"
 *
 * @param {number} amount - The money value to format.
 * @returns {string}
 */
export const formatCurrency = (amount) =>
    amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    })


/**
 * Builds the note shown under the "Low stock products" card.
 * The text depends on how many low stock products there are:
 *  - 0: No low stock products
 *  - 1: names the product and its remaining units
 *  - 2: names both products
 *  - 3 or more: names the first two, then "+N more"
 *
 * @param {Array<{ title: string, quantity: number | string }>} lowStockProducts
 * @returns {string}
 */
export const getLowStockNote = (lowStockProducts) => {
    const count = lowStockProducts.length

    switch (true) {
        case count === 0:
            return "No low stock products"

        case count === 1: {
            const { title, quantity } = lowStockProducts[0]
            return `Only ${title} is low, with ${quantity} ${Number(quantity) === 1 ? "unit" : "units"} left`
        }

        case count === 2:
            return `${lowStockProducts[0].title} and ${lowStockProducts[1].title}`

        default:
            return `${lowStockProducts[0].title}, ${lowStockProducts[1].title}, +${count - 2} more`
    }
}

/**
 * Builds the note shown under the "Total products" card.
 * Cases are checked in this order, and the first match wins:
 *  1. No products at all
 *  2. Products exist, but every one has 0 units
 *  3. Potential profit is exactly 0
 *  4. Potential profit is negative (prices are below cost)
 *  5. Otherwise, shows the potential profit
 *
 * @param {number} totalProducts - How many products exist.
 * @param {number} potentialProfit - Sum of (price - cost) * quantity for in-stock products.
 * @param {number} totalUnitsInStock - Sum of all quantities.
 * @returns {string}
 */
export const getTotalProductsNote = (totalProducts, potentialProfit, totalUnitsInStock) => {
    switch (true) {
        case totalProducts === 0:
            return "No products yet"

        case totalUnitsInStock === 0:
            return "All products are out of stock"

        case potentialProfit === 0:
            return "No profit at current prices"

        case potentialProfit < 0:
            return `Check prices: potential loss ${formatCurrency(potentialProfit)}`

        default:
            return `Potential profit: ${formatCurrency(potentialProfit)}`
    }
}

/**
 * Fetches all products once and calculates everything the dashboard needs.
 *
 * Stock rules (every product falls into exactly one group):
 *  - Out of stock: 0 units
 *  - Low stock:    1 to LOW_STOCK_MAX units
 *  - In stock:     more than LOW_STOCK_MAX units
 *
 * Money rules (only products with units on the shelf are counted):
 *  - stockValue:      sum of price * quantity
 *  - potentialProfit: sum of (price - cost) * quantity
 *
 * Money values are plain numbers. Format them with formatCurrency when
 * displaying, so comparisons like `potentialProfit === 0` stay reliable.
 *
 * If the products can't be loaded, every count is 0 and the lists are empty.
 *
 * @returns {Promise<{
 *   totalProducts: number, // all products, whatever their stock
 *   totalProductsNote: string, // text under the "Total products" card
 *   potentialProfit: number,
 *   totalUnitsInStock: number, // sum of all quantities
 *   stockValue: number,
 *   inStockCount: number, // products with more than LOW_STOCK_MAX units
 *   lowStockProducts: Array<object>,  // products in the low stock group
 *   lowStockNote: string, // text under the "Low stock" card
 *   outOfStockCount: number,
 *   attentionProducts: Array<{ id: string | number, name: string, sku: string, units: number }> // low and out-of-stock products, emptiest first, max 5
 * }>}
 */
export const getInventoryStats = async () => {
    const { products } = await getProducts()
    const list = products || []

    // calculating total products & potential profit from active products
    const totalProducts = list.length
    const potentialProfit = list
        .filter(product => Number(product.quantity) > 0)
        .reduce((sum, product) => sum + (Number(product.price) - Number(product.cost)) * Number(product.quantity), 0)

    // calculating total units in stock & total units in stock price 
    const totalUnitsInStock = list.reduce((sum, product) => sum + Number(product.quantity), 0)
    const stockValue = list
        .filter(product => Number(product.quantity) > 0)
        .reduce((sum, product) => sum + (Number(product.price) * Number(product.quantity)), 0)

    // calculating total products that have units more than LOW_STOCK_MAX
    const inStockCount = list.filter(product => Number(product.quantity) > LOW_STOCK_MAX).length

    // calculating low stock products
    const lowStockProducts = list.filter(product => Number(product.quantity) <= LOW_STOCK_MAX && Number(product.quantity) >= 1)


    // calculating out of stock products
    const outOfStockCount = list.filter(product => Number(product.quantity) === 0).length

    // needs attention section products
    const attentionProducts = list
        .filter(product => Number(product.quantity) <= LOW_STOCK_MAX)
        .map(product => {
            const { id, title, sku, quantity } = product
            return {
                id,
                name: title,
                sku,
                units: Number(quantity)
            }
        })
        .sort((a, b) => a.units - b.units).slice(0, 5)



    return {
        totalProducts,
        totalProductsNote: getTotalProductsNote(totalProducts, potentialProfit, totalUnitsInStock),
        potentialProfit,
        totalUnitsInStock,
        stockValue,
        inStockCount,
        lowStockProducts,
        lowStockNote: getLowStockNote(lowStockProducts),
        outOfStockCount,
        attentionProducts
    }
} 