import { MdClose } from "react-icons/md";
import NotificacionIcon from "../Iconos/Notificaciones";
import { useStoreNotificaciones } from "@/store/barraTareas/Notificiaciones";
import { AnimatePresence, motion } from "framer-motion";

interface Notificaciones {
    id: number;
    header: string;
    titulo: string;
    descripcion: string;
    icono: string;
}

interface AjustesPredeterminados {
    id: number;
    icono: React.FC<React.SVGProps<SVGSVGElement>>;
    titulo: string;
    active: boolean;
}

interface NotificacionesProps {
    notificaciones: Notificaciones[];
    ajustesPredeterminados: AjustesPredeterminados[];
    handleClickActivarAjuste: (id: number) => void;
}

export default function MenuNotificaciones({
    notificaciones,
    ajustesPredeterminados,
    handleClickActivarAjuste,
}: NotificacionesProps) {
    const handleEliminarNotificacion = useStoreNotificaciones(
        (state) => state.eliminarNotificacion
    );
    const handleEliminarAllNotificaciones = useStoreNotificaciones(
        (state) => state.eliminarAllNotificaciones
    );

    return (
        <section className="max-h-[94vh] overflow-y-auto h-full px-6 pt-5 flex flex-col gap-4 scrollbar-none">
            <div className="flex-1">
                {notificaciones.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <span className="text-primary/50">No hay notificaciones</span>
                    </div>
                ) : (
                    <>
                        <AnimatePresence>
                            {notificaciones.map((notificacion) => (
                                <motion.div
                                    key={notificacion.id}
                                    initial={{ x: 50, opacity: 0 }} // Entrada desde la derecha
                                    animate={{ x: 0, opacity: 1 }} // Posición final visible
                                    exit={{ x: 200, opacity: 0 }} // Salida hacia la derecha y desvanecer
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="flex flex-col gap-3 py-3 cursor-pointer rounded-xl"
                                >
                                    <header className="flex gap-4 items-center justify-center">
                                        <NotificacionIcon
                                            nombreIcono={notificacion.icono}
                                            styles="text-base"
                                        />
                                        <strong className="text-sm">{notificacion.header}</strong>
                                    </header>

                                    <article className="flex items-center gap-1 p-3 bg-primary/15 rounded cursor-pointer">
                                        <div className="flex items-center justify-center">
                                            <NotificacionIcon
                                                nombreIcono={notificacion.icono}
                                                styles="text-xl"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 py-3 px-5 transition duration-200 ease-in cursor-pointer">
                                            <h2 className="text-sm font-bold">{notificacion.titulo}</h2>
                                            <p className="text-xs">{notificacion.descripcion}</p>
                                        </div>
                                        <button
                                            className="cursor-pointer"
                                            onClick={() => handleEliminarNotificacion(notificacion.id)}
                                        >
                                            <MdClose className="size-9" />
                                        </button>
                                    </article>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className="flex justify-end" data-ignore-outside>
                            <button
                                className="text-primary hover:text-primary/70 transition duration-200 ease-in-out cursor-pointer"
                                onClick={handleEliminarAllNotificaciones}
                            >
                                Borrar todas las notificaciones
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="flex gap-1 py-3 rounded-xl" data-ignore-outside>
                {ajustesPredeterminados.map((ajuste) => (
                    <div
                        key={ajuste.id}
                        className={`flex-1 flex flex-col w-fit gap-3 p-3 transition duration-200 ease-in cursor-pointer ${ajuste.active
                                ? "bg-blue-700 hover:bg-blue-800"
                                : "bg-primary/15 hover:bg-primary/20"
                            }`}
                        onClick={() => handleClickActivarAjuste(ajuste.id)}
                    >
                        <header>
                            <ajuste.icono className="text-xl" />
                        </header>
                        <main className="h-full items-end flex">
                            <p className="text-[12px]">{ajuste.titulo}</p>
                        </main>
                    </div>
                ))}
            </div>
        </section>
    );
}
