import { type Rendimiento } from "@/types/barraTareas/Bateria";
import { FaWindows } from "react-icons/fa";
import { VscSearch } from "react-icons/vsc";
import { APPS_PREDETERMINADAS } from "../constants/Aplicaciones";
import AppTareas from "./aplicaciones/AppTareas";
import Bateria from "./barraTareas/Bateria";
import Hora from "./barraTareas/Hora";
import Notificaciones from "./barraTareas/Notificaciones";
import Volumen from "./barraTareas/Volumen";
import Wifi from "./barraTareas/Wifi";
import Tooltip from "./general/ToolTip";

interface BarraTareasProps {
    rendimiento: Rendimiento[]
    handleChangeRendimiento: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function BarraTareas({ rendimiento, handleChangeRendimiento }: BarraTareasProps) {

    return (
        <section className=" w-full z-50 bg-black text-white flex items-center max-w-full mx-auto ">
            {/* Botón de inicio */}
            <div className='flex items-center h-full group '>
                <Tooltip text="Inicio" position="top">
                    <button className=" size-12 flex items-center justify-center">
                        <FaWindows className='text-xl' />
                    </button>
                </Tooltip>
                <label
                    htmlFor="buscador-windows"
                    className="flex items-center gap-2 bg-primary h-full ps-3 pe-4 border-2 border-transparent focus-within:border-blue-500 "
                >
                    <VscSearch className="text-secondary" />
                    <input
                        type="search"
                        id="buscador-windows"
                        className="text-secondary appearance-none outline-none w-58"
                        placeholder="Buscar"
                    />
                </label>
            </div>

            {/* Espacio en medio */}
            <div className="flex-1 flex items-center gap-1 px-1">
                {
                    APPS_PREDETERMINADAS.map((app) => (
                        <Tooltip text={app.label} key={app.id} position="top">
                            <AppTareas key={app.id} icono={app.icono} active={app.active} />
                        </Tooltip>
                    ))
                }
            </div>

            {/* Hora */}
            <div className='flex items-center gap-2 ps-4 h-full z-50 bg-black'>
                <Wifi />

                <Bateria rendimiento={rendimiento} handleChangeRendimiento={handleChangeRendimiento} />

                <Volumen />

                <Hora />

                <Notificaciones />

                <div className='border-s border-white/50 h-11 w-2 hover:bg-white/20 cursor-pointer'>
                </div>
            </div>
        </section>
    )
}