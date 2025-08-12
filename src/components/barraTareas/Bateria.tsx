import Tooltip from "@/components/general/ToolTip";
import BateriaModal from "@/components/secciones/Bateria";
import { useOpen } from "@/hooks/general/useOpen";
import { useStoreBateria } from "@/store/barraTareas/Bateria";
import { AnimatePresence } from "framer-motion";
import { getBatteryIcon } from "../Iconos/Bateria";
import Container from "../secciones/Container";


export default function Bateria() {

    const { isOpen, handleOpen, handleClose } = useOpen()
    const { Bateria } = useStoreBateria()
    return (
        <Tooltip text={`${Bateria} % Disponible`} position="top">
            <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 cursor-pointer' onClick={() => handleOpen("Bateria-Tareas")}>
                <AnimatePresence>
                    {
                        isOpen && (
                            <Container className="w-100 bottom-1/12 rounded-xl" onClose={handleClose}>
                                <BateriaModal />
                            </Container>
                        )
                    }
                </AnimatePresence>
                {
                    getBatteryIcon(Bateria, "text-xl")
                }
            </span>
        </Tooltip>
    )
}