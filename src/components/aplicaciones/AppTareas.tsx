import { motion, AnimatePresence } from "framer-motion";
import AplicacionesPredeterminadasIcon from "../Iconos/AplicacionesPredeterminadas";

interface AppTareasProps {
    barra: boolean;
    icono: string;
    active: boolean;
}

export default function AppTareas({ barra, icono, active }: AppTareasProps) {
    return (
        <AnimatePresence mode="wait">
            {barra && ( // 👈 importante: solo se renderiza si barra = true
                <motion.button
                    key={icono}
                    initial={{ y: 30, scale: 0, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    exit={{ y: -30, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 h-full group p-1 hover:bg-white/20 transition duration-200 ease-in cursor-pointer relative"
                >
                    {active && (
                        <div className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-300 rounded scale-x-75 group-hover:scale-x-100 transition duration-300 ease-in-out"></div>
                    )}

                    <div className="w-full h-full p-1 flex items-center justify-center">
                        {AplicacionesPredeterminadasIcon({ nombreIcono: icono })}
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
