import Tooltip from "@/components/general/ToolTip";
import VolumenModal from "@/components/secciones/Volumen";
import { useOpen } from "@/hooks/general/useOpen";
import { useStoreVolumen } from "@/store/barraTareas/Volumen";
import { AnimatePresence } from "framer-motion";
import { IoVolumeHighSharp } from "react-icons/io5";
import Container from "../secciones/Container";

export default function Volumen() {

    const { isOpen, handleOpen, handleClose } = useOpen()

    const { volumen } = useStoreVolumen()
    return (
        <div className="relative">

            <Tooltip text={`Altavoces: ${volumen}%`} position="top">
                <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 relative cursor-pointer' onClick={() => handleOpen("Volumen-Tareas")}>
                    <IoVolumeHighSharp className=' text-xl ' />
                </span>
            </Tooltip>
            <AnimatePresence>
                {
                    isOpen && (
                        <Container className="w-70  bottom-1/12 rounded-xl right-10" onClose={handleClose}>
                            <VolumenModal />
                        </Container>
                    )
                }
            </AnimatePresence>
        </div>
    )
}