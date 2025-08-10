
import FONDO from '@/assets/img/fondos/fondo.webp'
import BarraTareas from './components/BarraTareas'

function App() {
  return (
    <>
      <section className="w-full h-screen relative grid grid-rows-[1fr_auto] overflow-hidden">
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
        <BarraTareas />
      </section>

    </>
  )
}

export default App
