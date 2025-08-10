import { FaWindows } from "react-icons/fa";
import Tooltip from "./general/ToolTip";
import { VscSearch } from "react-icons/vsc";
import { FaWifi } from "react-icons/fa";
import { LiaComment } from "react-icons/lia";
import { APPS_PREDETERMINADAS } from "../constants/Aplicaciones";
import AppTareas from "./AppTareas";
import { useTiempo } from "@/hooks/barraTareas/UseTiempo";
import Volumen from "./barraTareas/Volumen";
import Bateria from "./barraTareas/Bateria";

export default function BarraTareas() {

    const { hora, fecha, fechaFinal } = useTiempo()
    return (
        <section className="relative w-full z-10 bg-black/90 text-white flex items-center max-w-full mx-auto ">
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
            <div className='flex items-center gap-2 ps-4 h-full'>
                <Tooltip text="INFINITUM_LEHM<br/>Acceso a Internet" position="top">
                    <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 cursor-pointer'>
                        <FaWifi className='text-xl' />
                    </span>
                </Tooltip>

                <Bateria />

                <Volumen />

                <Tooltip text={fechaFinal} position="top">
                    <div className='flex flex-col hover:bg-white/20 h-full justify-center px-1 cursor-pointer'>
                        <span className='text-xs'>{hora}</span>
                        <span className='text-xs'>{fecha}</span>

                    </div>
                </Tooltip>

                <Tooltip text="Notificaciones no disponibles" position="top_left">
                    <span className='hover:bg-white/20 h-full flex items-center justify-center px-2 cursor-pointer'>

                        <LiaComment className=' text-2xl' />
                    </span>
                </Tooltip>


                <div className='border-s border-white/50 h-11 w-2 hover:bg-white/20 cursor-pointer'>

                </div>
            </div>
        </section>
    )
}