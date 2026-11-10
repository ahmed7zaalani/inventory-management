import Link from "next/link"
import LinkProgress from "@/components/LinkProgress"
import { primaryBtn, secondaryBtn } from "@/lib/styles"

const variants = { primary: primaryBtn, secondary: secondaryBtn }
const bars = { primary: "bg-white/40", secondary: "bg-blue-950/30" }

const NavigationLink = ({ href, variant = "primary", className = "", onClick, children }) => (
    <Link href={href} onClick={onClick} className={`${variants[variant]} ${className}`}>
        <LinkProgress className={bars[variant]} />
        {children}
    </Link>
)

export default NavigationLink