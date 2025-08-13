
import FONDO from '@/assets/img/fondos/fondo.webp'
import { useEffect } from 'react'
import BarraTareas from './components/BarraTareas'
import Escritorio from './components/secciones/aplicaciones/Escritorio'
import { useStoreAplicacionesPredeterminadas } from './store/aplicaciones/AplicacionesPredeterminadas'
import { useStoreAjustesPredeterminados } from './store/barraTareas/AjustesPredeterminados'
import { useStoreBateriaRendimiento } from './store/barraTareas/BateriaRendimiento'
import { useStoreNotificaciones } from './store/barraTareas/Notificiaciones'
import { useStoreWifis } from './store/barraTareas/Wifis'
import { fondoRendimiento } from './utils/barraTareas/Bateria'


function App() {

  const { obtenerNotificaciones } = useStoreNotificaciones()

  const { obtenerAjustesPredeterminados, ajustesPredeterminadosActivados } = useStoreAjustesPredeterminados()

  const { rendimientoActivado, obtenerRendimiento } = useStoreBateriaRendimiento()
  const { obtenerAplicacionesPredeterminadas } = useStoreAplicacionesPredeterminadas();

  const { obtenerWifis } = useStoreWifis();

  useEffect(() => {
    obtenerNotificaciones();
    obtenerAjustesPredeterminados();
    obtenerRendimiento();
    obtenerAplicacionesPredeterminadas();
    obtenerWifis();
  }, [])


  return (
    <>
      {
        ajustesPredeterminadosActivados.find(ajuste => ajuste.titulo === "Luz Nocturna") && (
          <div className={`absolute top-0 left-0 w-full h-full z-100 pointer-events-none bg-yellow-200/15`}></div>

        )
      }
      <div className={`absolute top-0 left-0 w-full h-full z-100 pointer-events-none ${fondoRendimiento(rendimientoActivado)}`}></div>
      <section className="w-full h-screen  grid grid-rows-[1fr_auto] overflow-hidden">
        {/* Fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${FONDO})` }}
        />

        {/* Contenido del "escritorio" */}

        <Escritorio />

        {/* Barra de tareas */}
        <BarraTareas />
      </section>

    </>
  )
}

export default App
