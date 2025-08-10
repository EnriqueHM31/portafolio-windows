import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

interface TooltipProps {
    text: string
    children: React.ReactNode
    position?: "top" | "bottom" | "left" | "right" | "top_right" | "bottom_right" | "top_left"
}

export default function Tooltip({ text, children, position = "top" }: TooltipProps) {
    const [isHovered, setIsHovered] = useState(false)

    const positionClasses = {
        top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
        left: "right-full mr-2 top-1/2 -translate-y-1/2",
        right: "left-full ml-2 top-1/2 -translate-y-1/2",
        top_right: "bottom-full mb-2 right-1/2 -translate-x-3/4",
        bottom_right: "top-full mt-2 right-1/2 -translate-x-1/2",
        top_left: "bottom-full mb-2 left-1/2 -translate-x-10/12",
    }

    const handleClickHovered = () => {
        setIsHovered(!isHovered)
    }
    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleClickHovered}
            onMouseLeave={handleClickHovered}
        >
            {children}
            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        key="tooltip"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute ${positionClasses[position]} 
                            z-10 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white shadow-md capitalize`}
                        dangerouslySetInnerHTML={{ __html: text }}
                    >
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    )
}