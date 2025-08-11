import Tooltip from "@/components/general/ToolTip";
import { useOpen } from "@/hooks/general/useOpen";
import { GrProjects } from "react-icons/gr";
import { LiaComment } from "react-icons/lia";
import { MdBrightness4, MdEco, MdOutlineEventAvailable } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { SiGooglemaps } from "react-icons/si";
import { FaBluetoothB } from "react-icons/fa";
import MenuNotificaciones from "../secciones/MenuNotificaciones";
import { useState } from "react";
import Container from "../secciones/Container";


const NOTIFICACIONES = [
    {
        id: 1,
        header: "Disponibilidad",
        titulo: "Disponibilidad para trabajo",
        descripcion:
            "Disponibilidad activa, para trabajar en proyectos en donde intervenga JavaScript entre mis preferidos; React y Astro o solo HTML, CSS y JavaScript, Manejo de Tailwind",
        icono: MdOutlineEventAvailable, // solo referencia
    },
    {
        id: 2,
        header: "Proyectos",
        titulo: "Proyectos Recientes",
        descripcion:
            "En mi GitHub, cuento con algunos proyectos como Frontend y algunas APIs que he utilizado en algunos proyectos",
        icono: GrProjects,
    },
    {
        id: 3,
        header: "Estudios",
        titulo: "Cursando la carrera de Ingeniería en Sistemas Computacionales",
        descripcion:
            "Cursando la carrera de Ingeniería en Sistemas Computacionales, estoy aprendiendo sobre el desarrollo de aplicaciones web, desde el front-end hasta el back-end",
        icono: PiStudentBold,
    },
];


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
    const [notificaciones, setNotificaciones] = useState(NOTIFICACIONES)

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

    const handleEliminarNotificaciones = () => {
        setNotificaciones([])
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
                                handleEliminarNotificaciones={handleEliminarNotificaciones}
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
