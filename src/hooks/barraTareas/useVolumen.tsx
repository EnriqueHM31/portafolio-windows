import { useState } from "react"

export function useVolumen() {
    const [volumen, setVolumen] = useState(80)

    const handleChangeVolumen = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolumen(Number(event.target.value))
    }

    return { volumen, handleChangeVolumen }
}