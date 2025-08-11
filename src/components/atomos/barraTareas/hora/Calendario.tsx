import type { DateValue } from "@react-types/calendar";

import { useState } from "react";
import { Calendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import '@/styles/Calendario.css'
import '@heroui/theme';

export default function CalendarioIU({ fecha }: { fecha: string }) {
    const partes = fecha.split("/"); // ["10", "08", "2025"]

    // Reordenar y unir
    const fechaInvertida = `${partes[2]}-${partes[1]}-${partes[0]}`;

    const [value, setValue] = useState<DateValue | null>(parseDate(fechaInvertida));

    return <Calendar
        aria-label="Date (Controlled)"
        value={value}
        onChange={setValue}
        className="w-full flex items-center justify-center bg-transparent p-0 border-none "
        style={{ width: "100 % ", border: "none", boxShadow: "none", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "30px" }}
    />;
}
