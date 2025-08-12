'use server'
import { useAction } from "@/hooks/general/useAction"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { MdWifi, MdWifiPassword } from "react-icons/md"
import type { Wifi } from "@/types/types";

const WIFIS = [
    { id: 1, name: "INFINITUM_LEHM", conectado: true, abierto: true, automatico: true, bloqueado: false, password: "1111", passwordUsuario: "1111", openPassword: false },
    { id: 2, name: "INFINITUM_1234", conectado: false, abierto: false, automatico: false, bloqueado: true, password: "2222", passwordUsuario: "", openPassword: false },
    { id: 3, name: "INFINITUM_4567", conectado: false, abierto: false, automatico: false, bloqueado: true, password: "3333", passwordUsuario: "", openPassword: false },
    { id: 4, name: "INFINITUM_8910", conectado: false, abierto: false, automatico: false, bloqueado: true, password: "4444", passwordUsuario: "", openPassword: false },
    { id: 5, name: "INFINITUM_7890", conectado: false, abierto: false, automatico: false, bloqueado: true, password: "5555", passwordUsuario: "", openPassword: false },
    { id: 6, name: "INFINITUM_FRONT", conectado: false, abierto: false, automatico: false, bloqueado: true, password: "6666", passwordUsuario: "", openPassword: false },
]



export default function Wifi() {

    const [wifis, setWifis] = useState(WIFIS)
    const { isPending, isError, handleAction, resetError } = useAction(handleClickConectar)
    const [password, setPassword] = useState(true)

    const handleClickVerPassword = () => {
        setPassword(prev => !prev)
    }

    const handleChangePasswordUsuario = (id: number, value: string) => {
        setWifis(prev => prev.map(w => {
            if (w.id === id) {
                return { ...w, passwordUsuario: value };
            }
            return w;
        }));
    };

    const handleClickOpenPassword = (id: number) => {
        setWifis(prev => prev.map(w => {
            if (w.id === id) {
                return {
                    ...w,
                    openPassword: true,
                    passwordUsuario: "", // resetea solo el clickeado
                };
            }
            return {
                ...w,
                openPassword: false, // cierra los demás
            };
        }));
    };


    const handleClickAbiertoWifi = (id: number) => {
        setWifis(prev => prev.map(w => ({
            ...w,
            abierto: w.id === id,
        })));

        if (isError.error) return resetError();
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

    async function handleClickConectar(id: number, password: string) {
        await new Promise(resolve => setTimeout(resolve, 4000));

        const wifiActual = wifis.find(w => w.id === id);
        if (!wifiActual) {
            throw new Error("WiFi no encontrado");
        }
        if (wifiActual.password !== password) {
            throw new Error("Contraseña inválida");
        }

        setWifis(prev =>
            prev
                .map(w => {
                    if (w.id === id) {
                        return {
                            ...w,
                            bloqueado: false,
                            conectado: true,
                            passwordUsuario: password,
                        };
                    }
                    return {
                        ...w,
                        conectado: false,
                    };
                })
                .toSorted((a: Wifi, b: Wifi) => {
                    // El que esté conectado (true) va primero
                    if (a.conectado === b.conectado) return 0;
                    if (a.conectado) return -1;
                    return 1;
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
                                !wifi.bloqueado ? (
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

                                        <label className="flex items-center gap-5 px-1" onClick={() => handleClickAutomatico(wifi.id)}>
                                            <input type="checkbox" name={`${wifi.id}-automatico`} checked={wifi.automatico} className="w-4 h-4 rounded" readOnly />
                                            <span>Conectar automáticamente</span>
                                        </label>
                                    </div>

                                    {
                                        wifi.openPassword && wifi.bloqueado && (
                                            <div className="my-3">
                                                <label htmlFor="password" className="text-sm relative">
                                                    <input
                                                        type={password ? 'password' : 'text'}
                                                        name="password"
                                                        id="password"
                                                        placeholder="Contraseña"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        value={wifi.passwordUsuario}
                                                        className="w-full px-3 py-1 rounded border border-primary/50"
                                                        onChange={(event) => handleChangePasswordUsuario(wifi.id, event.target.value)} />

                                                    <button
                                                        type="button"
                                                        className="absolute top-0 right-4 text-xs text-primary cursor-pointer scale-75 hover:scale-100 transition duration-200 ease-in"
                                                        onClick={() => handleClickVerPassword()}
                                                    >
                                                        {
                                                            password ? (
                                                                <FaEyeSlash className="text-xl" />
                                                            ) : (
                                                                <FaEye className="text-xl" />
                                                            )
                                                        }
                                                    </button>
                                                </label>
                                            </div>)
                                    }
                                    {

                                        isError && (
                                            <span className="text-red-400 font-bold">{isError.message}</span>
                                        )
                                    }
                                    <div className="flex items-center justify-end  ">
                                        <button
                                            className="bg-white/25 w-fit px-4 py-1 rounded hover:bg-white/10 transition duration-200 ease-in cursor-pointer"
                                            onClick={() => {
                                                if (!wifi.bloqueado) {
                                                    handleAction(wifi.id, wifi.passwordUsuario);
                                                } else if (!wifi.openPassword) {
                                                    handleClickOpenPassword(wifi.id);
                                                } else {
                                                    handleAction(wifi.id, wifi.passwordUsuario);
                                                }
                                            }}
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