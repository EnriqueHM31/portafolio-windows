import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface AjustesAnimacion {
    initial: Record<string, number>
    animate: Record<string, number>
    exit: Record<string, number>
    transition: Record<string, number>
}

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    onClose: () => void; // Nueva prop para cerrar
    ajustesAnimacion?: AjustesAnimacion
}

const predeterminados = {
    initial: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 80 },
    transition: { duration: 0.5 },
}
export default function Container({ children, className, onClose, ajustesAnimacion = predeterminados }: ContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!containerRef.current) return;
            const path = event.composedPath();
            if (!path.includes(containerRef.current)) {
                console.log("click fuera")
                onClose();
            }

        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);
    return (

        <motion.section
            ref={containerRef}
            className={`fixed bg-black/90 backdrop-blur-3xl rounded-xl ${className} `}
            initial={ajustesAnimacion.initial}
            animate={ajustesAnimacion.animate}
            exit={ajustesAnimacion.exit}
            transition={ajustesAnimacion.transition}
        >
            {children}
        </motion.section >
    );
}
