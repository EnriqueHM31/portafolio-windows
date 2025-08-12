import { useStoreVolumen } from "@/store/barraTareas/Volumen"
import { IoVolumeHighSharp } from "react-icons/io5"


export default function Volumen() {


    const { volumen, modificarVolumen } = useStoreVolumen()
    return (
        <div className="flex flex-col gap-2 p-3">
            <h2>Altavoces (Realtek(R) Audio)</h2>

            <div className="flex justify-between  gap-5 items-center">
                <IoVolumeHighSharp className='text-4xl' />
                <input onChange={modificarVolumen} type="range" min="0" max="100" value={volumen} className="w-full h-full" />
                <span className="text-2xl">{volumen}</span>
            </div>
        </div>
    )
}