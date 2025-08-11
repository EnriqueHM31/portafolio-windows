
import FONDO from '@/assets/img/fondos/fondo.webp'
import { useEffect, useState } from 'react'
import BarraTareas from './components/BarraTareas'
import { type Rendimiento, ModoRendimiento } from './types/barraTareas/Bateria'
import { useStoreNotificaciones } from './store/barraTareas/Notificiaciones'

const RENDIMIENTO_INITIAL = [
  { modo: ModoRendimiento.MaximaDuracion, active: false, value: 0 },
  { modo: ModoRendimiento.Equilibrado, active: false, value: 50 },
  { modo: ModoRendimiento.MaximoRendimiento, active: true, value: 100 },
] as Rendimiento[]

function App() {

  const [rendimiento, setRendimiento] = useState(RENDIMIENTO_INITIAL)
  const obtenerNotificaciones = useStoreNotificaciones((state) => state.obtenerNotificaciones)

  const handleChangeRendimiento = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    setRendimiento(rendimiento.map((r) => ({
      ...r,
      active: r.value === value // el seleccionado queda true, los demás false
    })));
  };

  const fondoRendimiento = (() => {
    const activo = rendimiento.find(r => r.active);

    if (!activo) return "bg-transparent";

    if (activo.modo === ModoRendimiento.MaximaDuracion) return "bg-black/30";
    if (activo.modo === ModoRendimiento.Equilibrado) return "bg-black/10";
    if (activo.modo === ModoRendimiento.MaximoRendimiento) return "bg-transparent";

    return "bg-transparent";
  })();


  useEffect(() => {
    obtenerNotificaciones();
  }, [])

  return (
    <>
      <div className={`absolute top-0 left-0 w-full h-full z-100 pointer-events-none ${fondoRendimiento}`}></div>
      <section className="w-full h-screen  grid grid-rows-[1fr_auto] overflow-hidden">
        {/* Fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${FONDO})` }}
        />

        {/* Contenido del "escritorio" */}
        <div className="relative z-10 p-4 ">
          {/* Aquí puedes poner iconos, widgets, etc. */}
        </div>

        {/* Barra de tareas */}
        <BarraTareas rendimiento={rendimiento} handleChangeRendimiento={handleChangeRendimiento} />
      </section>

    </>
  )
}

export default App
