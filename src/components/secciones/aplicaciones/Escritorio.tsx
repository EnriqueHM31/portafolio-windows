import AplicacionIcono from "@/components/aplicaciones/AplicacionIcono";
import { useStoreAplicacionesPredeterminadas } from "@/store/aplicaciones/AplicacionesPredeterminadas";
import { useState } from "react";

interface Aplicacion {
    id: number;
    label: string;
    icono: string;
    escritorio: boolean;
    barraTareas: boolean;
}

export default function Escritorio() {

    const { aplicacionesEscritorio, onRemove, onRename } = useStoreAplicacionesPredeterminadas();
    const [submenuAbiertoId, setSubmenuAbiertoId] = useState<number | null>(null);

    // Cierra submenu si clickeas fuera
    const handleClickFuera = () => {
        setSubmenuAbiertoId(null);
    };

    return (
        <div
            className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 p-4 w-full "
            onClick={handleClickFuera}
            style={{ minHeight: "90vh" }}
        >
            {

            }
            {aplicacionesEscritorio.map((aplicacion: Aplicacion) => (
                <AplicacionIcono
                    key={aplicacion.id}
                    aplicacion={aplicacion}
                    submenuAbiertoId={submenuAbiertoId}
                    setSubmenuAbiertoId={setSubmenuAbiertoId}
                    onRemove={onRemove}
                    onRename={onRename}
                />
            ))}
        </div>
    );
}
