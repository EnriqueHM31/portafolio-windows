import { useState, useRef, useEffect } from "react";
import AplicacionesPredeterminadasIcon from "../Iconos/AplicacionesPredeterminadas";

interface AplicacionIconoProps {
    id: number;
    icono: string;
    name: string;
    submenuAbiertoId: number | null;
    setSubmenuAbiertoId: (id: number | null) => void;
    onRemove: (id: number) => void;
    onRename: (id: number, nuevoNombre: string) => void;
}

export default function AplicacionIcono({
    id,
    icono,
    name,
    submenuAbiertoId,
    setSubmenuAbiertoId,
    onRemove,
    onRename,
}: AplicacionIconoProps) {
    const [editandoNombre, setEditandoNombre] = useState(false);
    const [nuevoNombre, setNuevoNombre] = useState(name);
    const iconoRef = useRef<HTMLDivElement>(null);
    const [submenuPos, setSubmenuPos] = useState<{ left: number; top: number }>({
        left: 0,
        top: 0,
    });

    const esSubmenuAbierto = submenuAbiertoId === id;

    const toggleSubmenu = (e: React.MouseEvent) => {
        e.preventDefault(); // para evitar menú context nativo si usas click derecho
        if (esSubmenuAbierto) {
            setSubmenuAbiertoId(null);
            setEditandoNombre(false);
            setNuevoNombre(name);
        } else {
            setSubmenuAbiertoId(id);
        }
    };

    useEffect(() => {
        if (esSubmenuAbierto && iconoRef.current) {
            const rect = iconoRef.current.getBoundingClientRect();
            const espacioDerecha = window.innerWidth - rect.right;
            const espacioAbajo = window.innerHeight - rect.bottom;

            let left = 0;
            let top = rect.height + 5; // 5px abajo del icono

            // Ajustar horizontalmente para no salir del viewport
            if (espacioDerecha < 200) {
                // ancho submenu ~ 200px
                left = rect.width - 200; // lo alinea a la derecha del icono
            }

            // Ajustar verticalmente para no salir del viewport
            if (espacioAbajo < 100) {
                top = -110; // muestra arriba del icono (alto submenu aprox 100px + algo)
            }

            setSubmenuPos({ left, top });
        }
    }, [esSubmenuAbierto]);

    const handleModificarNombre = () => {
        setEditandoNombre(true);
    };

    const handleCancelar = () => {
        setSubmenuAbiertoId(null);
        setEditandoNombre(false);
        setNuevoNombre(name);
    };

    const handleGuardarNombre = () => {
        setEditandoNombre(false);
        console.log(nuevoNombre.trim());
        onRename(id, nuevoNombre.trim());
    };

    return (
        <div
            className="relative flex flex-col items-center min-w-full p-2 cursor-pointer select-none hover:bg-primary/15 h-fit"
            ref={iconoRef}
            onContextMenu={(e) => {
                // para demo usar click izquierdo para abrir submenu también (opcional)
                e.stopPropagation(); // evita cerrar el submenu si clickeas el icono mismo
                toggleSubmenu(e);
            }}
        >
            <div className="p-2 rounded">
                <AplicacionesPredeterminadasIcon nombreIcono={icono} />
            </div>

            <div className="mt-1 w-full text-center">
                {editandoNombre ? (
                    <input
                        type="text"
                        value={nuevoNombre}
                        onChange={(e) => setNuevoNombre(e.target.value)}
                        onBlur={handleGuardarNombre}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleGuardarNombre();
                            } else if (e.key === "Escape") {
                                handleCancelar();
                            }
                        }}
                        autoFocus
                        className="border bg-primary text-secondary border-gray-400  px-1 text-center text-sm w-full"
                    />
                ) : (
                    <span>{name}</span>
                )}
            </div>

            {esSubmenuAbierto && (
                <div
                    className="absolute bg-secondary/80 border border-gray-100 rounded shadow-lg w-60 z-10 px-1 py-3 flex gap-2 flex-col"
                    style={{ left: submenuPos.left, top: submenuPos.top }}
                    onClick={(e) => e.stopPropagation()} // evitar cierre si clic en submenu
                >
                    <button
                        className="block w-full text-left py-1 hover:bg-primary/15 text-xs px-4"
                        onClick={() => {
                            handleModificarNombre();
                        }}
                    >
                        Modificar nombre
                    </button>
                    <hr className="border-primary/30" />
                    <button
                        className="block w-full text-left py-1 hover:bg-primary/15 text-xs px-4"
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </button>
                    <hr className="border-primary/30" />
                    <button
                        className="block w-full text-left py-1 hover:bg-primary/15 text-xs px-4 "
                        onClick={() => {
                            if (onRemove) onRemove(id);
                            setSubmenuAbiertoId(null);
                        }}
                    >
                        Quitar de escritorio
                    </button>
                </div>
            )}
        </div>
    );
}
