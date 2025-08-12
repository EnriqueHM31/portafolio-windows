import Tooltip from "@/components/general/ToolTip";
import BateriaModal from "@/components/secciones/Bateria";
import { useOpen } from "@/hooks/general/useOpen";
import { AnimatePresence } from "framer-motion";
import { PiBatteryHighFill } from "react-icons/pi";
import Container from "../secciones/Container";


export default function Bateria() {

    const { isOpen, handleOpen, handleClose } = useOpen()
    return (
        <Tooltip text="80 % Disponible" position="top">
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
                <PiBatteryHighFill className='text-xl' />
            </span>
        </Tooltip>
    )
}