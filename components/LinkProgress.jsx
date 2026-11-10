"use client"
import { useLinkStatus } from "next/link"

const LinkProgress = ({ className = "bg-white/40" }) => {
    const { pending } = useLinkStatus()

    return (
        <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-0 -z-10 ${className} ${pending
                ? "w-[90%] opacity-100 transition-[width,opacity] duration-8000 ease-[cubic-bezier(.1,.6,.2,1)] delay-150 motion-reduce:w-full motion-reduce:transition-none"
                : "w-0 opacity-0 transition-none"
                }`}
        />
    )
}

export default LinkProgress