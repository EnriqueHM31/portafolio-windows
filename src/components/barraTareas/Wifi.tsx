import Tooltip from "@/components/general/ToolTip";
import WifiModal from "@/components/secciones/Wifis";
import { useOpen } from "@/hooks/general/useOpen";
import { useStoreWifis } from "@/store/barraTareas/Wifis";
import { AnimatePresence } from "framer-motion";
import { FiWifiOff } from "react-icons/fi";
import { IoWifiOutline } from "react-icons/io5";
import Container from "../secciones/Container";


export default function Wifi() {

    const { wifis } = useStoreWifis();
    const HayUnWifiConectado = wifis.find(w => w.conectado);
    const { isOpen, handleOpen, handleClose } = useOpen()
    return (
        <Tooltip text="INFINITUM_LEHM<br/>Acceso a Internet" position="top">
            <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 cursor-pointer' onClick={() => handleOpen("Wifi-Tareas")}>
                <AnimatePresence>
                    {
                        isOpen && (
                            <Container className="w-102 h-115 bottom-1/12 overflow-y-auto scrollbar-none rounded-xl" onClose={handleClose}>
                                <WifiModal />
                            </Container>
                        )
                    }
                </AnimatePresence>
                {
                    HayUnWifiConectado ? (
                        <IoWifiOutline className='text-xl' />
                    ) : (
                        <FiWifiOff className='text-xl' />
                    )
                }
            </span>
        </Tooltip>
    )
}