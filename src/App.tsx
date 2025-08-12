
import FONDO from '@/assets/img/fondos/fondo.webp'
import { useEffect } from 'react'
import BarraTareas from './components/BarraTareas'
import { useStoreAjustesPredeterminados } from './store/barraTareas/AjustesPredeterminados'
import { useStoreBateriaRendimiento } from './store/barraTareas/BateriaRendimiento'
import { useStoreNotificaciones } from './store/barraTareas/Notificiaciones'
import { fondoRendimiento } from './utils/barraTareas/Bateria'


function App() {

  const obtenerNotificaciones = useStoreNotificaciones((state) => state.obtenerNotificaciones)
  const obtenerAjustesPredeterminados = useStoreAjustesPredeterminados((state) => state.obtenerAjustesPredeterminados)
  const AjustesPredeterminadosActivos = useStoreAjustesPredeterminados(state => state.ajustesPredeterminadosActivados);

  const obtenerRendimientosBateria = useStoreBateriaRendimiento((state) => state.obtenerRendimiento)
  const rendimientoActivado = useStoreBateriaRendimiento((state) => state.rendimientoActivado)

  useEffect(() => {
    obtenerNotificaciones();
    obtenerAjustesPredeterminados();
    obtenerRendimientosBateria();
  }, [])

  return (
    <>
      {
        AjustesPredeterminadosActivos.find(ajuste => ajuste.titulo === "Luz Nocturna") && (
          <div className={`absolute top-0 left-0 w-full h-full z-100 pointer-events-none bg-yellow-200/15`}></div>

        )
      }
      <div className={`absolute top-0 left-0 w-full h-full z-100 pointer-events-none ${fondoRendimiento(rendimientoActivado)}`}></div>
      <section className="w-full h-screen  grid grid-rows-[1fr_auto] overflow-hidden">
        {/* Fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${FONDO})` }}
        />

        {/* Contenido del "escritorio" */}
        <section className="relative z-10 p-4 ">
          {/* Aquí puedes poner iconos, widgets, etc. */}
        </section>

        {/* Barra de tareas */}
        <BarraTareas />
      </section>

    </>
  )
}

export default App
