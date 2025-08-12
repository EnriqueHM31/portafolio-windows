import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

interface TooltipProps {
    text: string
    children: React.ReactNode
    position?: "top" | "bottom" | "left" | "right" | "top_right" | "bottom_right" | "top_left"
}
export default function Tooltip({ text, children, position = "top" }: TooltipProps) {
    const [isHovered, setIsHovered] = useState(false);

    const positionClasses = {
        top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
        left: "right-full mr-2 top-1/2 -translate-y-1/2",
        right: "left-full ml-2 top-1/2 -translate-y-1/2",
        top_right: "bottom-full mb-2 right-1/2 -translate-x-3/4",
        bottom_right: "top-full mt-2 right-1/2 -translate-x-1/2",
        top_left: "bottom-full mb-2 left-1/2 -translate-x-10/12",
    };

    return (
        <div
            className="relative h-full rounded-none flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        key="tooltip"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.1 }}
                        className={`absolute ${positionClasses[position]} 
                            -z-40 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white shadow-md capitalize pointer-events-none`}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
