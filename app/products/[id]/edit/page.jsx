import ProductForm from "@/components/ProductForm";
import { editProduct } from "@/lib/actions";
import { getProductById } from "@/lib/constants";
import { notFound } from "next/navigation";

const EditProduct = async ({ params }) => {
    const { id } = await params
    const { product, message } = await getProductById(id)
    if (!id || !product) notFound()

    const updateProductById = editProduct.bind(null, id)
    console.log(product)
    return (
        <section className="min-h-screen bg-slate-50 px-5 py-15 sm:py-20">
            <div className="mx-auto w-full max-w-lg">

                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-4xl font-semibold text-center text-slate-900">
                        Edit Product
                    </h1>
                    <p className="mt-2 text-base text-center text-slate-600">
                        Change any detail below, then save to update the product.
                    </p>
                </header>

                <ProductForm
                    key={JSON.stringify(product)}
                    action={updateProductById}
                    product={product}

                />
            </div>
        </section>
    );
}

export default EditProduct