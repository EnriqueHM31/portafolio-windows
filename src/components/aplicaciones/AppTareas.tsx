import { motion, AnimatePresence } from "framer-motion";
import AplicacionesPredeterminadasIcon from "../Iconos/AplicacionesPredeterminadas";
import { useStoreAplicacionesPredeterminadas } from "@/store/aplicaciones/AplicacionesPredeterminadas";
import { useEffect, useRef, useState } from "react";

interface AppTareasProps {
    id: number;
    barra: boolean;
    icono: string;
    active: boolean;
}

export default function AppTareas({ id, barra, icono, active }: AppTareasProps) {
    const [submenuAbiertoId, setSubmenuAbiertoId] = useState<null | number>(null)
    const [submenuPos, setSubmenuPos] = useState<{ left: number; top: number }>({
        left: 0,
        top: 0,
    });
    const iconoRef = useRef<HTMLDivElement>(null);

    const { toggleBarraTareas } = useStoreAplicacionesPredeterminadas();



    const esSubmenuAbierto = submenuAbiertoId === id;

    const toggleSubmenu = (e: React.MouseEvent) => {
        e.preventDefault(); // para evitar menú context nativo si usas click derecho
        if (esSubmenuAbierto) {
            setSubmenuAbiertoId(null);
        } else {
            setSubmenuAbiertoId(id);
        }
    };

    useEffect(() => {
        if (esSubmenuAbierto && iconoRef.current) {
            const rect = iconoRef.current.getBoundingClientRect();
            const espacioDerecha = window.innerWidth - rect.right;
            const espacioAbajo = window.innerHeight - rect.bottom;

            let left = 0;
            let top = rect.height + 5; // 5px abajo del icono

            if (espacioDerecha < 200) {
                left = rect.width - 200; // lo alinea a la derecha del icono
            }

            if (espacioAbajo < 100) {
                top = -110; // muestra arriba del icono (alto submenu aprox 100px + algo)
            }

            setSubmenuPos({ left, top });
        }
    }, [esSubmenuAbierto]);

    const handleCancelar = () => {
        setSubmenuAbiertoId(null);
    };
    return (
        <>
            <div
                ref={iconoRef}
            >
                <AnimatePresence>
                    {barra ? (
                        <motion.button
                            key={`taskbar-${id}`}
                            initial={{ y: 30, scale: 0, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: -60, scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            onContextMenu={toggleSubmenu}
                            className="flex items-center gap-4 h-full group p-1 hover:bg-white/20 transition duration-200 ease-in cursor-pointer relative"
                        >
                            {active && (
                                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-300 rounded scale-x-75 group-hover:scale-x-100 transition duration-300 ease-in-out"></div>
                            )}

                            <div className="w-full h-full p-1 flex items-center justify-center">
                                {AplicacionesPredeterminadasIcon({ nombreIcono: icono })}
                            </div>
                        </motion.button>
                    ) : null}
                </AnimatePresence>
            </div>

            {/* Context Menu solo para ESTE id */}
            <AnimatePresence>
                {submenuAbiertoId === id && (
                    <>
                        {/* Fondo */}
                        <motion.div
                            key="overlay"
                            className="fixed inset-0 z-40"
                            onClick={handleCancelar}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Submenú */}
                        <motion.ul
                            key={`context-menu-${id}`}
                            initial={{ opacity: 0, scale: 0.9, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 100 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-50 bg-neutral-800 text-white rounded-md shadow-lg py-1 text-sm min-w-[300px]"
                            style={{ left: submenuPos.left, top: submenuPos.top }}
                        >
                            <li
                                className="px-4 py-2 hover:bg-neutral-700 cursor-pointer"
                                onClick={() => {
                                    toggleBarraTareas(id);
                                    handleCancelar();
                                }}
                            >
                                Desanclar de la barra de tareas
                            </li>
                        </motion.ul>
                    </>
                )}
            </AnimatePresence >
        </>
    );
}
