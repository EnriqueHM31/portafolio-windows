'use server'
import { useAction } from "@/hooks/general/useAction"
import { useState } from "react"
import { MdWifi, MdWifiPassword } from "react-icons/md"

const WIFIS = [
    { id: 1, name: "INFINITUM_LEHM", conectado: true, abierto: true, automatico: true, },
    { id: 2, name: "INFINITUM_1234", conectado: false, abierto: false, automatico: false },
    { id: 3, name: "INFINITUM_4567", conectado: false, abierto: false, automatico: false },
    { id: 4, name: "INFINITUM_8910", conectado: false, abierto: false, automatico: false },
    { id: 5, name: "INFINITUM_7890", conectado: false, abierto: false, automatico: false },
    { id: 6, name: "INFINITUM_FRONT", conectado: false, abierto: false, automatico: false },
]


export default function Wifi() {

    const [wifis, setWifis] = useState(WIFIS)
    const { isPending, isError, handleAction } = useAction(handleClickConectar)


    const handleClickAbiertoWifi = (id: number) => {
        setWifis(prev => prev.map(w => ({
            ...w,
            abierto: w.id === id  // Solo el clickeado queda abierto; los demás cerrados
        })));
    };

    const handleClickDesconectar = (id: number) => {
        setWifis(prev => prev.map(w => {
            if (w.id === id) {
                return {
                    ...w,
                    conectado: false
                }
            }
            return w;
        }));
    };

    async function handleClickConectar(id: number) {
        // Retornar una promesa que se resuelve en 4 segundos
        await new Promise(resolve => setTimeout(resolve, 4000));

        // Luego actualizas el estado
        setWifis(prev =>
            prev.map(w => {
                if (w.id === id) {
                    return { ...w, conectado: true };  // El clickeado conectado
                }
                return { ...w, conectado: false };   // Todos los demás desconectados
            })
        );

    }


    const handleClickAutomatico = (id: number) => {
        setWifis(prev => prev.map(w => {
            if (w.id === id) {
                return {
                    ...w,
                    automatico: !w.automatico
                }
            }
            return w;
        }));
    };
    return (
        <section className="flex flex-col gap-4 py-3">
            {
                wifis.map((wifi) => (
                    <div className="flex flex-col gap-2 py-3 px-5 hover:bg-white/20 transition duration-200 ease-in cursor-pointer" key={wifi.id} onClick={() => handleClickAbiertoWifi(wifi.id)}>
                        <header className="flex gap-4">
                            {
                                wifi.conectado ? (
                                    <MdWifi className="text-2xl" />
                                ) : (
                                    <MdWifiPassword className="text-2xl" />
                                )
                            }
                            <div className="flex flex-col gap-[1px]">
                                <strong className="text-sm">{wifi.name}</strong>

                                {wifi.conectado && <span>Conectada, segura</span>}
                                {!wifi.conectado && wifi.abierto && <span>Segura</span>}
                            </div>
                        </header>

                        {
                            wifi.abierto && wifi.conectado && (
                                <div className="flex items-center justify-end  ">
                                    <button className="bg-white/25 w-fit px-4 py-1 rounded hover:bg-white/10 transition duration-200 ease-in cursor-pointer" onClick={() => handleClickDesconectar(wifi.id)}>Desconectar</button>
                                </div>
                            )
                        }
                        {
                            wifi.abierto && !wifi.conectado && (
                                <section>
                                    <div>
                                        {
                                            isError && (
                                                <span className="text-red-500">Error al conectar</span>
                                            )
                                        }
                                        <label className="flex items-center gap-5 px-1" onClick={() => handleClickAutomatico(wifi.id)}>
                                            <input type="checkbox" name={`${wifi.id}-automatico`} checked={wifi.automatico} className="w-4 h-4 rounded" readOnly />
                                            <span>Conectar automáticamente</span>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-end  ">
                                        <button className="bg-white/25 w-fit px-4 py-1 rounded hover:bg-white/10 transition duration-200 ease-in cursor-pointer"
                                            onClick={() => handleAction(wifi.id)}
                                        >{isPending ? "Conectando..." : "Conectar"}</button>
                                    </div>
                                </section>
                            )
                        }
                    </div>
                )

                )
            }

        </section >
    )
}