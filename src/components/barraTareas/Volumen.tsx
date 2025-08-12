import Tooltip from "@/components/general/ToolTip";
import { useOpen } from "@/hooks/general/useOpen";
import { IoVolumeHighSharp } from "react-icons/io5";
import VolumenModal from "@/components/secciones/Volumen";
import { useVolumen } from "@/hooks/barraTareas/useVolumen";
import Container from "../secciones/Container";
import { AnimatePresence } from "framer-motion";

export default function Volumen() {

    const { isOpen, handleOpen, handleClose } = useOpen()
    const { volumen, handleChangeVolumen } = useVolumen()

    return (
        <>

            <Tooltip text={`Altavoces: ${volumen}%`} position="top">
                <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 relative cursor-pointer' onClick={() => handleOpen("Volumen-Tareas")}>
                    <AnimatePresence>
                        {
                            isOpen && (
                                <Container className="w-70  bottom-1/12 rounded-xl" onClose={handleClose}>
                                    <VolumenModal volumen={volumen} handleChangeVolumen={handleChangeVolumen} />
                                </Container>
                            )
                        }
                    </AnimatePresence>
                    <IoVolumeHighSharp className=' text-xl ' />
                </span>
            </Tooltip>
        </>
    )
}