import { useTiempo } from "@/hooks/barraTareas/UseTiempo";
import Tooltip from "@/components/general/ToolTip";

export default function Hora() {
    const { hora, fechaFinal, fecha } = useTiempo();

    return (
        <Tooltip text={fechaFinal} position="top">
            <div className='flex flex-col hover:bg-white/20 h-full justify-center px-1 cursor-pointer'>
                <span className='text-xs'>{hora}</span>
                <span className='text-xs'>{fecha}</span>

            </div>
        </Tooltip>
    );
}
