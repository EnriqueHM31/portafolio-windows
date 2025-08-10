import Tooltip from "@/components/general/ToolTip";
import { PiBatteryHighFill } from "react-icons/pi";
import { AnimatePresence } from "framer-motion";
import Container from "../secciones/Container";
import { useOpen } from "@/hooks/general/useOpen";
import BateriaModal from "@/components/secciones/Bateria";

export default function Bateria() {

    const { isOpen, handleOpen, handleClose } = useOpen()
    return (
        <Tooltip text="80 % Disponible" position="top">
            <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 cursor-pointer' onClick={() => handleOpen("Bateria-Tareas")}>
                <AnimatePresence>
                    {
                        isOpen && (
                            <Container className="w-100 -left-49 -top-57" onClose={handleClose}>
                                <BateriaModal />
                            </Container>
                        )
                    }
                </AnimatePresence>
                <PiBatteryHighFill className='text-xl' />
            </span>
        </Tooltip>
    )
}