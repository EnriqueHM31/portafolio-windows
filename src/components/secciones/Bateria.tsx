import { PiBatteryHighFill } from "react-icons/pi";
import { TbBatteryCharging, TbBatteryEco } from "react-icons/tb";

export default function Bateria() {
    return (
        <div className="flex flex-col gap-6 p-5">
            <header className="flex items-center gap-5">
                <PiBatteryHighFill className='text-4xl' />
                <h2 className="text-3xl">87%</h2>
            </header>
            <main className="flex flex-col gap-4">
                <span>Modo de energia: Mejor Rendimiento</span>

                <input type="range" min={0} max={100} step={50} value={0} className="w-full h-full" />

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