import { useStoreAjustesPredeterminados } from "@/store/barraTareas/AjustesPredeterminados"
import AjustesPredeterminadosIcon from "../Iconos/AjustesPredeterminados"
import { useMemo, useState } from "react";
import Tooltip from "../general/ToolTip";
import Container from "./Container";

export default function IconosOcultos() {

    const ajustesPredeterminadosActivados = useStoreAjustesPredeterminados(state => state.ajustesPredeterminadosActivados);
    const desactivarAjustePredeterminado = useStoreAjustesPredeterminados(state => state.desactivarAjustePredeterminado);

    // Estado local para menú contextual
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [ajusteSeleccionadoId, setAjusteSeleccionadoId] = useState<number | null>(null);

    const GridColumns = useMemo(() => {
        const ajustesTotal = ajustesPredeterminadosActivados.length;
        if (ajustesTotal === 1) return "grid-cols-1";
        if (ajustesTotal === 2) return "grid-cols-2";
        if (ajustesTotal >= 3) return "grid-cols-3";
    }, [ajustesPredeterminadosActivados.length]);


    // Abrir menú contextual en posición del cursor, con id del ajuste
    const handleContextMenu = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setAjusteSeleccionadoId(id);
        setMenuOpen(true);
    };

    // Cerrar menú contextual
    const handleClose = () => {
        setMenuOpen(false);
        setAjusteSeleccionadoId(null);
    };

    // Desactivar ajuste
    const handleDesactivar = () => {
        if (ajusteSeleccionadoId !== null) {
            desactivarAjustePredeterminado(ajusteSeleccionadoId);
            handleClose();
        }
    };

    return (
        <section className={`p-2 ${GridColumns} gap-4 grid relative`}>

            {ajustesPredeterminadosActivados.map(ajuste => (
                <Tooltip text={ajuste.titulo} key={ajuste.id} position="top">
                    <span
                        className="flex flex-col items-center hover:bg-primary/15 p-2 rounded cursor-pointer"
                        onContextMenu={(e) => handleContextMenu(e, ajuste.id)}
                    >
                        <AjustesPredeterminadosIcon nombreIcono={ajuste.icono} styles="text-xl" active={true} />
                    </span>
                </Tooltip>
            ))}

            {menuOpen && (
                <Container
                    className={` -translate-y-25`}
                    style={{
                        top: `${menuPosition.y / 100}px`,
                        left: `${menuPosition.x / 100}px`
                    }}
                    onClose={handleClose}
                >
                    <div className="flex flex-col gap-2 bg-secondary p-2 rounded shadow-md">
                        <button
                            className="px-3 py-1 hover:bg-primary/15 cursor-pointer "
                            onClick={handleDesactivar}
                        >
                            Desactivar
                        </button>
                        <button
                            className="px-3 py-1 hover:bg-primary/15 cursor-pointer "
                            onClick={handleClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </Container>
            )}
        </section>
    );
}
