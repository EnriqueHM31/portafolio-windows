import { useStoreAplicacionesPredeterminadas } from "@/store/aplicaciones/AplicacionesPredeterminadas";
import { useStoreAjustesPredeterminados } from "@/store/barraTareas/AjustesPredeterminados";
import { GrWindows } from "react-icons/gr";
import { VscSearch } from "react-icons/vsc";
import AppTareas from "./aplicaciones/AppTareas";
import AjustesPredeterminados from "./barraTareas/AjustesPredeterminados";
import Bateria from "./barraTareas/Bateria";
import Hora from "./barraTareas/Hora";
import Notificaciones from "./barraTareas/Notificaciones";
import Volumen from "./barraTareas/Volumen";
import Wifi from "./barraTareas/Wifi";
import Tooltip from "./general/ToolTip";

export default function BarraTareas() {

    const ajustesPredeterminadosActivados = useStoreAjustesPredeterminados(state => state.ajustesPredeterminadosActivados);
    const { aplicacionesPredeterminadas } = useStoreAplicacionesPredeterminadas();


    return (
        <section className=" w-full z-50 bg-black text-white flex items-center max-w-full mx-auto ps-1 ">
            {/* Botón de inicio */}
            <div className='flex items-center h-full group '>
                <Tooltip text="Inicio" position="top">
                    <GrWindows className='size-11 p-3' />
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
                    aplicacionesPredeterminadas.map((app) => (
                        <Tooltip text={app.label} key={app.id} position="top">
                            <AppTareas key={app.id} icono={app.icono} active={app.active} />
                        </Tooltip>
                    ))
                }
            </div>

            {/* Hora */}
            <div className='flex items-center gap-2 ps-4 h-full z-50 bg-black'>
                {
                    ajustesPredeterminadosActivados.length > 0 && (
                        <AjustesPredeterminados />
                    )
                }

                <Wifi />

                <Bateria />

                <Volumen />

                <Hora />

                <Notificaciones />


                <div className='border-s border-white/50 h-11 w-2 hover:bg-white/20 cursor-pointer'>
                </div>
            </div>
        </section>
    )
}