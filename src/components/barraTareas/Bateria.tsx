import Tooltip from "@/components/general/ToolTip";
import { PiBatteryHighFill } from "react-icons/pi";
import { AnimatePresence } from "framer-motion";
import Container from "../secciones/Container";
import { useOpen } from "@/hooks/general/useOpen";
import BateriaModal from "@/components/secciones/Bateria";
import { type Rendimiento } from "@/types/barraTareas/Bateria";

interface BateriaProps {
    rendimiento: Rendimiento[]
    handleChangeRendimiento: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Bateria({ rendimiento, handleChangeRendimiento }: BateriaProps) {

    const { isOpen, handleOpen, handleClose } = useOpen()
    return (
        <Tooltip text="80 % Disponible" position="top">
            <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 cursor-pointer' onClick={() => handleOpen("Bateria-Tareas")}>
                <AnimatePresence>
                    {
                        isOpen && (
                            <Container className="w-100 bottom-1/12" onClose={handleClose}>
                                <BateriaModal rendimiento={rendimiento} handleChangeRendimiento={handleChangeRendimiento} />
                            </Container>
                        )
                    }
                </AnimatePresence>
                <PiBatteryHighFill className='text-xl' />
            </span>
        </Tooltip>
    )
}