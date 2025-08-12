import { useStoreBateria } from "@/store/barraTareas/Bateria";
import { useStoreBateriaRendimiento } from "@/store/barraTareas/BateriaRendimiento";
import { TbBatteryCharging, TbBatteryEco } from "react-icons/tb";
import { getBatteryIcon } from "../Iconos/Bateria";


export default function Bateria() {


    const rendimientoActivado = useStoreBateriaRendimiento((state) => state.rendimientoActivado);
    const handleChangeRendimiento = useStoreBateriaRendimiento((state) => state.cambiarRendimiento);
    const { Bateria } = useStoreBateria()
    return (
        <div className="flex flex-col gap-6 p-5">
            <header className="flex items-center gap-5">
                {
                    getBatteryIcon(Bateria, "text-5xl")
                }
                <h2 className="text-5xl">{Bateria}%</h2>
            </header>
            <main className="flex flex-col gap-4">
                <span>Modo de energia: {rendimientoActivado.modo}</span>

                <div className="relative">
                    <span className="absolute top-0 pointer-events-none left-0 -translate-x-1/2 w-[3px] h-10/12 bg-white rounded-full"></span>
                    <span className="absolute top-0 pointer-events-none left-1/2 -translate-x-1/2 w-[3px] h-10/12 bg-white rounded-full"></span>
                    <span className="absolute top-0 pointer-events-none right-0 -translate-x-1/2 w-[3px] h-10/12 bg-white rounded-full"></span>
                    <input type="range" min={0} max={100} step={50} value={rendimientoActivado.value} className="w-full h-full" onChange={handleChangeRendimiento} name={rendimientoActivado.modo} />
                </div>

                <div className="flex items-center justify-between w-ful">
                    <span className="flex flex-col  gap-2 text-sm">
                        <TbBatteryEco className="text-2xl" />
                        Maxima duracion de la bateria
                    </span>
                    <span className="flex flex-col  gap-2 text-sm">
                        <div className="flex justify-end">
                            <TbBatteryCharging className="text-2xl" />
                        </div>
                        Maximo rendimiento
                    </span>
                </div>
            </main>
        </div>
    )
}