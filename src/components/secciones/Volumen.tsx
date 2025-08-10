import { motion } from "framer-motion"
import { useState } from "react"
import { IoVolumeHighSharp } from "react-icons/io5"
export default function Volumen() {

    const [volumen, setVolumen] = useState(80)

    const handleChangeVolumen = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolumen(Number(event.target.value))
    }
    return (
        <motion.section className="flex flex-col gap-3 p-3 rounded-xl bg-black backdrop-blur-3xl">
            <h2>Altavoces (Realtek(R) Audio)</h2>

            <div>
                <IoVolumeHighSharp className='text-xl' />
                <input onChange={handleChangeVolumen} type="range" min="0" max="100" value="80" className="w-full h-full" />
                <span>{volumen}</span>
            </div>
        </motion.section>
    )
}