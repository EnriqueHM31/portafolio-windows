import {
    FaBatteryFull,
    FaBatteryThreeQuarters,
    FaBatteryHalf,
    FaBatteryQuarter,
    FaBatteryEmpty
} from 'react-icons/fa';

export function getBatteryIcon(bateria: number, clases: string = "") {
    if (bateria >= 90) return <FaBatteryFull className={`${clases}`} />;
    if (bateria >= 70) return <FaBatteryThreeQuarters className={`${clases}`} />;
    if (bateria >= 40) return <FaBatteryHalf className={`${clases}`} />;
    if (bateria >= 10) return <FaBatteryQuarter className={`${clases}`} />;
    return <FaBatteryEmpty className={`${clases}`} />;
}

// En el render:
