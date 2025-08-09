import FONDO from '@/assets/fondo.webp'
import { FaSearch, FaWindows } from 'react-icons/fa'


function App() {

  return (
    <>
      <section className="w-full h-screen relative grid grid-rows-[1fr_auto]">
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
        <div className="relative w-full z-10 bg-black/90 text-white flex items-center max-w-full mx-auto ">
          {/* Botón de inicio */}
          <div className='flex items-center gap-4'>
            <button className=" size-12 flex items-center justify-center">
              <FaWindows />
            </button>
            <label htmlFor="buscador-windows" className=" flex items-center gap-4 bg-primary" >
              <FaSearch />
              <input type="search" id="buscador-windows" className="" />
            </label>
          </div>

          {/* Espacio en medio */}
          <div className="flex-1"></div>

          {/* Hora */}
          <span>19:45</span>
        </div>
      </section>

    </>
  )
}

export default App
