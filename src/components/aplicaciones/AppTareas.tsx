import AplicacionesPredeterminadasIcon from "../Iconos/AplicacionesPredeterminadas"

interface AppTareasProps {
    icono: string
    active: boolean
}

export default function AppTareas({ icono, active }: AppTareasProps) {
    return (
        <button className={`flex items-center gap-4 h-full group  p-1 hover:bg-white/20 transition duration-200 ease-in cursor-pointer relative`}>
            {
                active && (
                    <div className="absolute left-0  bottom-0  w-full h-[2px] bg-blue-300 rounded scale-x-75 group-hover:scale-x-100 transition duration-300 ease-in-out"></div>
                )
            }

            <div className={`w-full h-full p-1 flex items-center justify-center`}>
                {
                    AplicacionesPredeterminadasIcon({ nombreIcono: icono })
                }
            </div>
        </button >
    )
}