import Tooltip from "@/components/general/ToolTip";
import { useOpen } from "@/hooks/general/useOpen";
import { useStoreNotificaciones } from "@/store/barraTareas/Notificiaciones";
import { LiaComment } from "react-icons/lia";
import Container from "../secciones/Container";
import MenuNotificaciones from "../secciones/MenuNotificaciones";


export default function Notificaciones() {
    const { isOpen, handleOpen, handleClose } = useOpen();
    const notificaciones = useStoreNotificaciones((state) => state.notificaciones)




    return (
        <Tooltip text="Notificaciones no disponibles" position="top_left">
            <span
                className="hover:bg-white/20 h-full flex items-center justify-center px-2 cursor-pointer"
                onClick={() => { handleOpen("Notificaciones-Tareas") }}
            >
                {/* Panel lateral */}{
                    isOpen && (
                        <Container className="w-110 right-0 top-0 -z-10 h-screen" onClose={handleClose} ajustesAnimacion={{ initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 100 }, transition: { duration: 0.5 } }}>
                            <MenuNotificaciones notificaciones={notificaciones}
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
