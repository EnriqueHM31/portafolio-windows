import { useState } from "react";

export function useOpen() {
    const [isOpen, setIsOpen] = useState('')

    const handleOpen = (id: string) => {
        setIsOpen(id)
    }

    const handleClose = () => {
        setIsOpen('')
    }

    return { isOpen, handleOpen, handleClose }
}
