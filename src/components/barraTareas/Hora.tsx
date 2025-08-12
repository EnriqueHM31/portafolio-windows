import { useTiempo } from "@/hooks/barraTareas/UseTiempo";
import Tooltip from "@/components/general/ToolTip";
import { AnimatePresence } from "framer-motion";
import Container from "../secciones/Container";
import { useOpen } from "@/hooks/general/useOpen";
import Calendario from "../secciones/Calendario";

export default function Hora() {
    const { hora, fechaFinal, fecha } = useTiempo();
    const { isOpen, handleOpen, handleClose } = useOpen()

    return (
        <Tooltip text={fechaFinal} position="top">
            <div className='flex flex-col hover:bg-white/20 h-full justify-center px-1 cursor-pointer' onClick={() => handleOpen("Hora-Tareas")}>

                <AnimatePresence>
                    {
                        isOpen && (
                            <Container className="w-110 bottom-1/12 left-7/12 -z-10 h-140 rounded-xl" onClose={handleClose}>
                                <Calendario hora={hora} fecha={fecha} fechaFinal={fechaFinal} />
                            </Container>
                        )
                    }
                </AnimatePresence>
                <span className='text-xs'>{hora}</span>
                <span className='text-xs'>{fecha}</span>

            </div>
        </Tooltip>
    );
}
