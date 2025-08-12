import { useOpen } from "@/hooks/general/useOpen";
import Tooltip from "../general/ToolTip";
import { AnimatePresence } from "framer-motion";
import Container from "../secciones/Container";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import IconosOcultos from "../secciones/IconosOcultos";

export default function AjustesPredeterminados() {

    const { isOpen, handleOpen, handleClose } = useOpen()
    return (
        <div className=" h-full">
            <AnimatePresence>
                {
                    isOpen && (
                        <Container className="bottom-1/12" onClose={handleClose}>
                            <IconosOcultos />
                        </Container>
                    )
                }
            </AnimatePresence>
            <Tooltip text="Mostrar iconos ocultos" position="top">

                <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 cursor-pointer' onClick={() => handleOpen("Bateria-Tareas")}>
                    <MdOutlineKeyboardArrowUp className='text-xl' />
                </span>
            </Tooltip>

        </div>
    )
}