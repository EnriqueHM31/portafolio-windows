import { FaWifi } from "react-icons/fa";
import Tooltip from "@/components/general/ToolTip";
import { AnimatePresence } from "framer-motion";
import Container from "../secciones/Container";
import { useOpen } from "@/hooks/general/useOpen";
import WifiModal from "@/components/secciones/Wifis";

export default function Wifi() {

    const { isOpen, handleOpen, handleClose } = useOpen()
    return (
        <Tooltip text="INFINITUM_LEHM<br/>Acceso a Internet" position="top">
            <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 cursor-pointer' onClick={() => handleOpen("Wifi-Tareas")}>
                <AnimatePresence>
                    {
                        isOpen && (
                            <Container className="w-102 h-115 bottom-1/12 overflow-y-auto scrollbar-none" onClose={handleClose}>
                                <WifiModal />
                            </Container>
                        )
                    }
                </AnimatePresence>
                <FaWifi className='text-xl' />
            </span>
        </Tooltip>
    )
}