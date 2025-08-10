import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    onClose: () => void; // Nueva prop para cerrar
}

export default function Container({ children, className, onClose }: ContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onClose(); // Si el clic fue fuera, cerramos
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
            className={`absolute z-30 bg-black/90 backdrop-blur-3xl rounded-xl ${className}`}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.section>
    );
}
