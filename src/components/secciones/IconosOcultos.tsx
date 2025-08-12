import { useStoreAjustesPredeterminados } from "@/store/barraTareas/AjustesPredeterminados";
import { useMemo, useState } from "react";
import Tooltip from "../general/ToolTip";
import AjustesPredeterminadosIcon from "../Iconos/AjustesPredeterminados";
import Container from "./Container";
import { COLORES_AJUSTESPREDETERMINADOS } from "@/constants/BarraTareas";

export default function IconosOcultos() {
    const ajustesPredeterminadosActivados = useStoreAjustesPredeterminados(
        state => state.ajustesPredeterminadosActivados
    );
    const activarAjustePredeterminado = useStoreAjustesPredeterminados(
        state => state.activarAjustePredeterminado
    );

    // Guardamos el id del ajuste que tiene abierto el menú
    const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

    const GridColumns = useMemo(() => {
        const ajustesTotal = ajustesPredeterminadosActivados.length;
        if (ajustesTotal === 1) return "grid-cols-1";
        if (ajustesTotal === 2) return "grid-cols-2";
        if (ajustesTotal >= 3) return "grid-cols-3";
    }, [ajustesPredeterminadosActivados.length]);

    // Abrir menú contextual solo para el ajuste correspondiente
    const handleContextMenu = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        setMenuOpenId(id); // Guardamos el id del ajuste que tiene abierto el menú
    };

    // Cerrar menú contextual
    const handleClose = () => {
        setMenuOpenId(null);
    };

    // Desactivar ajuste
    const handleDesactivar = (id: number) => {
        console.log("Desactivando", id);
        activarAjustePredeterminado(id);
        handleClose();
    };

    return (
        <section className={`p-2 ${GridColumns} gap-4 grid relative`}>
            {ajustesPredeterminadosActivados.map(ajuste => (
                <div key={ajuste.id} className="relative">
                    <Tooltip text={ajuste.titulo} position="top">
                        <span
                            className="flex flex-col items-center hover:bg-primary/15 p-2 rounded cursor-pointer"
                            onContextMenu={(e) => handleContextMenu(e, ajuste.id)}
                        >
                            <AjustesPredeterminadosIcon
                                nombreIcono={ajuste.icono}
                                styles="text-xl"
                                active={true}
                            />
                        </span>
                    </Tooltip>

                    {/* Menú contextual solo si el id coincide */}
                    {menuOpenId === ajuste.id && (
                        <Container
                            className={`-translate-y-25  z-50 ${COLORES_AJUSTESPREDETERMINADOS[ajuste.icono]} ${ajustesPredeterminadosActivados.length === 1 ? "w-fit" : "w-full"}`}
                            style={{
                                top: `0%`,
                                left: `0%`
                            }}
                            onClose={handleClose}
                        >
                            <div className="flex flex-col gap-2 bg-secondary p-2 rounded shadow-md">
                                <button
                                    className="px-3 py-1 hover:bg-primary/15 cursor-pointer"
                                    onClick={() => handleDesactivar(ajuste.id)}
                                >
                                    Desactivar
                                </button>
                                <button
                                    className="px-3 py-1 hover:bg-primary/15 cursor-pointer"
                                    onClick={handleClose}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </Container>
                    )}
                </div>
            ))}
        </section>
    );
}
