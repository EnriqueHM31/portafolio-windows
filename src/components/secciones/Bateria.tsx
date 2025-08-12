import { PiBatteryHighFill } from "react-icons/pi";
import { TbBatteryCharging, TbBatteryEco } from "react-icons/tb";
import { type Rendimiento } from "@/types/barraTareas/Bateria";
interface BateriaModalProps {
    rendimiento: Rendimiento[]
    handleChangeRendimiento: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Bateria({ rendimiento, handleChangeRendimiento }: BateriaModalProps) {
    return (
        <div className="flex flex-col gap-6 p-5">
            <header className="flex items-center gap-5">
                <PiBatteryHighFill className='text-5xl' />
                <h2 className="text-5xl">87%</h2>
            </header>
            <main className="flex flex-col gap-4">
                <span>Modo de energia: {rendimiento.find((r) => r.active)?.modo}</span>

                <div className="relative">
                    <span className="absolute top-0 pointer-events-none left-0 -translate-x-1/2 w-[3px] h-10/12 bg-white rounded-full"></span>
                    <span className="absolute top-0 pointer-events-none left-1/2 -translate-x-1/2 w-[3px] h-10/12 bg-white rounded-full"></span>
                    <span className="absolute top-0 pointer-events-none right-0 -translate-x-1/2 w-[3px] h-10/12 bg-white rounded-full"></span>
                    <input type="range" min={0} max={100} step={50} value={rendimiento.find((r) => r.active)?.value} className="w-full h-full" onChange={handleChangeRendimiento} name={rendimiento.find((r) => r.active)?.modo} />
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