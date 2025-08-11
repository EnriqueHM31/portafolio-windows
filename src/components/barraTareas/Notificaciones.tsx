import Tooltip from "@/components/general/ToolTip";
import { useOpen } from "@/hooks/general/useOpen";
import { useStoreNotificaciones } from "@/store/barraTareas/Notificiaciones";
import { useState } from "react";
import { FaBluetoothB } from "react-icons/fa";
import { LiaComment } from "react-icons/lia";
import { MdBrightness4, MdEco } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import Container from "../secciones/Container";
import MenuNotificaciones from "../secciones/MenuNotificaciones";



const AJUSTES_PREDETERMINADOS = [
    {
        id: 1,
        icono: SiGooglemaps,
        titulo: "Ubicación",
        active: false,
    },
    {
        id: 2,
        icono: MdEco,
        titulo: "Ahorro de bateria",
        active: false,
    },
    {
        id: 3,
        icono: FaBluetoothB,
        titulo: "No conectado",
        active: true,
    },
    {
        id: 4,
        icono: MdBrightness4,
        titulo: "Luz Nocturna",
        active: false,
    }
]

export default function Notificaciones() {
    const { isOpen, handleOpen, handleClose } = useOpen();
    const [ajustesPredeterminados, setAjustesPredeterminados] = useState(AJUSTES_PREDETERMINADOS)
    const notificaciones = useStoreNotificaciones((state) => state.notificaciones)

    const handleClickActivarAjuste = (id: number) => {
        setAjustesPredeterminados(prev => prev.map(ajuste => {
            if (ajuste.id === id) {
                return {
                    ...ajuste,
                    active: !ajuste.active
                }
            }
            return ajuste;
        }));
    }


    return (
        <Tooltip text="Notificaciones no disponibles" position="top_left">
            <span
                className="hover:bg-white/20 h-full flex items-center justify-center px-2 cursor-pointer"
                onClick={() => { handleOpen("Notificaciones-Tareas") }}
            >
                {/* Panel lateral */}{
                    isOpen && (
                        <Container className="w-110 right-0 top-0 -z-10 h-screen" onClose={handleClose} ajustesAnimacion={{ initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 100 }, transition: { duration: 0.5 } }}>
                            <MenuNotificaciones notificaciones={notificaciones} ajustesPredeterminados={ajustesPredeterminados} handleClickActivarAjuste={handleClickActivarAjuste}
                            />
                        </Container>
                    )
                }

                {/* Icono */}
                {
                    notificaciones.length > 0 && (
                        <div className="absolute bottom-2 right-1 size-4 text-secondary rounded-full bg-primary/80 border border-white flex items-center justify-center text-sm">{notificaciones.length}</div>
                    )
                }
                <LiaComment className="text-2xl" />
            </span>
        </Tooltip >
    );
}
