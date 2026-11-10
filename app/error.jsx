"use client";

import Link from "next/link";

const Error = ({ error, reset }) => {
    return (
        <div
            role="alert"
            className="flex min-h-[60vh] flex-col items-center justify-center px-4 mt-15 text-center"
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 text-red-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                </svg>
            </div>

            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
                Something went wrong
            </h1>
            <p className="mt-2 max-w-md text-base text-slate-600">
                An unexpected error occurred while loading this page. Please try again,
                or come back in a few minutes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={() => reset()}
                    className="rounded bg-blue-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:ring-offset-2 cursor-pointer transition"
                >
                    Try Again
                </button>
                <Link
                    href="/"
                    className="rounded border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400/40"
                >
                    Go Back
                </Link>
            </div>
        </div>
    );
}

export default Error