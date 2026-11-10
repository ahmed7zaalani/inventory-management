"use client"
import { useEffect, useState } from "react"

// Counts from 0 to `value` with an ease-out curve.
// Respects prefers-reduced-motion (jumps straight to the final number).
const AnimatedNumber = ({ value, duration = 1200, delay = 0 }) => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setCurrent(value)
            return
        }

        let raf
        let start
        const timer = setTimeout(() => {
            const tick = (now) => {
                if (start === undefined) start = now
                const t = Math.min((now - start) / duration, 1)
                const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
                setCurrent(Math.round(value * eased))
                if (t < 1) raf = requestAnimationFrame(tick)
            }
            raf = requestAnimationFrame(tick)
        }, delay)

        return () => {
            clearTimeout(timer)
            cancelAnimationFrame(raf)
        }
    }, [value, duration, delay])

    // fixed locale so server and client render the same text
    return <span className="tabular-nums">{current.toLocaleString("en-US")}</span>
}

export default AnimatedNumber