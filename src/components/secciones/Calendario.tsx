import CalendarioIU from "../atomos/barraTareas/hora/Calendario"

interface CalendarioProps {
    hora: string
    fecha: string
    fechaFinal: string

}

export default function Calendario({ hora, fecha, fechaFinal }: CalendarioProps) {
    return (
        <section className="flex flex-col gap-4 px-6 py-4 h-full ">
            <header className="flex flex-col gap-3">
                <h2 className="text-5xl">{hora}</h2>
                <h3 className="text-lg text-primary/50">{fechaFinal}</h3>
            </header>

            <hr className="border-primary/30" />

            <div className="h-fit  flex items-start justify-start">
                <CalendarioIU fecha={fecha} />
            </div>

            <hr className="border-primary/30 mt-4" />
        </section>
    )
}