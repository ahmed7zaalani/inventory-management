import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/lib/actions";

const NewProduct = () => {
    return (
        <section className="min-h-screen bg-slate-50 px-5 py-15 sm:py-20">
            <div className="mx-auto w-full max-w-lg">

                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-4xl font-semibold text-center text-slate-900">
                        New Product
                    </h1>
                    <p className="mt-2 text-base text-center text-slate-600">
                        Add the details below to list a product in your store.
                    </p>
                </header>

                <ProductForm action={createProduct} />
            </div>
        </section>
    );
}

export default NewProduct