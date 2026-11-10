import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center mt-15 px-4 text-center">
            <p className="text-7xl font-bold tracking-tight text-blue-950 sm:text-8xl">
                404
            </p>

            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
                Page not found
            </h1>
            <p className="mt-2 max-w-md text-base text-slate-600">
                Sorry, we couldn't find the page you're looking for. It may have been
                moved, deleted, or the link might be incorrect.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                    href="/"
                    className="text-white rounded  bg-blue-950 px-5 py-2.5 text-sm font-medium  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:ring-offset-2 transition"
                >
                    Go Back
                </Link>
                <Link
                    href="/"
                    className="rounded border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400/40"
                >
                    Contact Support
                </Link>
            </div>
        </div>
    );
}

export default NotFound