interface AppTareasProps {
    icono: string
    active: boolean
}

export default function AppTareas({ icono, active }: AppTareasProps) {
    return (
        <button className={`flex items-center gap-4 h-full group ${active ? 'border-blue-300' : 'border-transparent'} border-b-2 p-1 hover:bg-white/20 transition duration-200 ease-in cursor-pointer`}>
            <div className={`w-full h-full p-1 flex items-center justify-center`}>
                <img src={icono} alt="icono" className="max-w-10/12" />
            </div>
        </button>
    )
}