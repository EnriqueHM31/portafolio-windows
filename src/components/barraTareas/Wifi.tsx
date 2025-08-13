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

    const textoTooltip = HayUnWifiConectado ? `${HayUnWifiConectado.name}<br/>Acceso a Internet` : "No hay Wifi conectado";
    return (
        <div className="relative">
            <Tooltip text={textoTooltip} position="top">
                <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 cursor-pointer' onClick={() => handleOpen("Wifi-Tareas")}>
                    {
                        HayUnWifiConectado ? (
                            <IoWifiOutline className='text-xl' />
                        ) : (
                            <FiWifiOff className='text-xl' />
                        )
                    }
                </span>
            </Tooltip>
            <AnimatePresence>
                {
                    isOpen && (
                        <Container className="w-102 h-115 bottom-1/12 right-10 overflow-y-auto scrollbar-none rounded-xl" onClose={handleClose}>
                            <WifiModal />
                        </Container>
                    )
                }
            </AnimatePresence>
        </div>
    )
}