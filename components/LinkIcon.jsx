"use client"
import { useLinkStatus } from "next/link"
import { Loader2 } from "lucide-react"

const LinkIcon = ({ icon, size = 16 }) => {
    const { pending } = useLinkStatus()

    // Link with its own icon: show the icon, swap to a spinner while pending
    if (icon) {
        return pending
            ? <Loader2 size={size} aria-hidden="true" className="shrink-0 animate-spin" />
            : icon
    }

    // Link without an icon: a spinner that slides open while pending
    return (
        <Loader2
            size={size}
            aria-hidden="true"
            className={`shrink-0 animate-spin transition-all duration-200 ${pending ? "mr-0 w-4 opacity-100" : "-mr-2 w-0 opacity-0"
                }`}
        />
    )
}

export default LinkIcon