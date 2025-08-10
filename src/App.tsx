import FONDO from '@/assets/img/fondos/fondo.webp'
import { FaSearch, FaWindows } from 'react-icons/fa'
import CHROME from '@/assets/img/aplicaciones/chrome.webp'
import EXPLORADORARCHIVOS from '@/assets/img/aplicaciones/explorador.webp'
import AppTareas from './components/AppTareas'
import { PiBatteryHighFill } from "react-icons/pi";
import { IoVolumeHighSharp } from "react-icons/io5";
import { LiaComment } from "react-icons/lia";




const APPS = [
  { icono: CHROME, active: true },
  { icono: EXPLORADORARCHIVOS, active: false },
]

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
          <div className='flex items-center h-full group '>
            <button className=" size-11 flex items-center justify-center">
              <FaWindows />
            </button>
            <label
              htmlFor="buscador-windows"
              className="flex items-center gap-4 bg-primary h-full px-4 border-2 border-transparent focus-within:border-blue-500"
            >
              <FaSearch className="text-secondary" />
              <input
                type="search"
                id="buscador-windows"
                className="text-secondary appearance-none outline-none"
                placeholder="Buscar"
              />
            </label>
          </div>

          {/* Espacio en medio */}
          <div className="flex-1 flex items-center gap-2 px-4">
            {
              APPS.map((app, index) => (
                <AppTareas key={index} icono={app.icono} active={app.active} />
              ))
            }
          </div>

          {/* Hora */}
          <div className='flex items-center gap-2 ps-4 h-full'>
            <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 cursor-pointer'>
              <PiBatteryHighFill className='text-xl' />
            </span>
            <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 cursor-pointer'>
              <IoVolumeHighSharp className=' text-xl ' />

            </span>
            <span className='hover:bg-white/20 h-full flex items-center justify-center px-1 cursor-pointer'>

              <LiaComment className=' text-xl' />
            </span>

            <div className='border-s border-white/50 h-11 w-2 hover:bg-white/20 cursor-pointer'>

            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default App
