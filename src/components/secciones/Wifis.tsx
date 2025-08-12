import { useAction } from "@/hooks/general/useAction";
import { useStoreWifis } from "@/store/barraTareas/Wifis";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdWifi, MdWifiPassword } from "react-icons/md";


export default function Wifi() {

    const { wifis, conectarWifi, desconectarWifi, abrirWifi, anotarPassword, cambiarAutomatico, openFormPassword, wifiAbiertoAutomatico } = useStoreWifis()

    const [password, setPassword] = useState(true)


    useEffect(() => {
        console.log("Conectado");
        wifiAbiertoAutomatico();
    }, [])

    const handleClickVerPassword = () => {
        setPassword(prev => !prev)
    }

    const handleChangePasswordUsuario = (id: number, value: string) => {
        anotarPassword(id, value);
    };

    const handleClickOpenPassword = (id: number) => {
        const wifi = wifis.find(w => w.id === id);
        if (!wifi) return;

        // Caso 1: No está bloqueado
        if (!wifi.bloqueado) {
            return handleAction(id, wifi.passwordUsuario || "");
        }

        // Caso 2: Está bloqueado pero aún no se abrió el formulario
        if (!wifi.openPassword) {
            return openFormPassword(id);
        }

        // Caso 3: Está bloqueado, form abierto y contraseña escrita
        if (wifi.passwordUsuario.trim() !== "") {
            return handleAction(id, wifi.passwordUsuario);
        }
    };


    const handleClickAbiertoWifi = (id: number) => {
        abrirWifi(id);
        if (isError.error) resetError();
        if (isErrorDesconectar.error) resetErrorDesconectar();
    };


    async function handleClickDesconectar(id: number) {
        await desconectarWifi(id);
    };

    async function handleClickConectar(id: number, password: string) {
        await conectarWifi(id, password);
    }



    const handleClickAutomatico = (id: number) => {
        cambiarAutomatico(id);
    };

    const { isPending, isError, handleAction, resetError } = useAction(handleClickConectar);
    const { isPending: isPendingDesconectar, isError: isErrorDesconectar, handleAction: handleActionDesconectar, resetError: resetErrorDesconectar } = useAction(handleClickDesconectar);


    console.log({ isError })
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
                                    <button className="bg-white/25 w-fit px-4 py-1 rounded hover:bg-white/10 transition duration-200 ease-in cursor-pointer" onClick={() => handleActionDesconectar(wifi.id)}>{isPendingDesconectar ? "Desconectando..." : "Desconectar"}</button>
                                </div>
                            )
                        }
                        {
                            wifi.abierto && !wifi.conectado && (
                                <section>

                                    <label htmlFor="automatico" className="flex items-center gap-5 px-1 cursor-pointer" >
                                        <input type="checkbox" name={`${wifi.id}-automatico`} id="automatico" checked={wifi.automatico} className="w-4 h-4 rounded" readOnly onChange={() => handleClickAutomatico(wifi.id)} />
                                        <span className="select-none">Conectar automáticamente</span>
                                    </label>

                                    {
                                        wifi.openPassword && wifi.bloqueado && (
                                            <div
                                                className="my-3  relative"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <label htmlFor="password" className="text-sm relative block">
                                                    <input
                                                        type={password ? 'password' : 'text'}
                                                        name="password"
                                                        id="password"
                                                        placeholder="Contraseña"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        value={wifi.passwordUsuario}
                                                        className="w-full px-3 py-2 rounded border border-primary/50 pr-10"
                                                        onChange={(event) =>
                                                            handleChangePasswordUsuario(wifi.id, event.target.value)
                                                        }
                                                    />

                                                    <button
                                                        type="button"
                                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-primary cursor-pointer hover:scale-90 scale-75 transition duration-200 ease-in"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleClickVerPassword();
                                                        }}
                                                    >
                                                        {password ? (
                                                            <FaEyeSlash className="text-xl" />
                                                        ) : (
                                                            <FaEye className="text-xl" />
                                                        )}
                                                    </button>
                                                </label>
                                                {
                                                    isError.error && (
                                                        <div className="flex items-center my-1 ">
                                                            <p className="text-red-500 text-base">{isError.message}</p>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    isErrorDesconectar.error && (
                                                        <div className="flex items-center my-1 ">
                                                            <p className="text-red-500 text-base">{isErrorDesconectar.message}</p>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }

                                    <div className="flex items-center justify-end  ">
                                        <button
                                            className="bg-white/25 w-fit px-4 py-1 rounded hover:bg-white/10 transition duration-200 ease-in cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClickOpenPassword(wifi.id);
                                            }}>
                                            {

                                            }
                                            {isPending ? "Conectando..." : "Conectar"}
                                        </button>
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