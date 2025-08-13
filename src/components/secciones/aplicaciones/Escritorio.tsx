import { useState } from "react";
import AplicacionIcono from "@/components/aplicaciones/AplicacionIcono";
import { useStoreAplicacionesPredeterminadas } from "@/store/aplicaciones/AplicacionesPredeterminadas";


export default function Escritorio() {

    const { aplicacionesPredeterminadas, onRemove, onRename } = useStoreAplicacionesPredeterminadas();
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
            {aplicacionesPredeterminadas.map(({ id, icono, label }) => (
                <AplicacionIcono
                    key={id}
                    id={id}
                    icono={icono}
                    name={label}
                    submenuAbiertoId={submenuAbiertoId}
                    setSubmenuAbiertoId={setSubmenuAbiertoId}
                    onRemove={onRemove}
                    onRename={onRename}
                />
            ))}
        </div>
    );
}
