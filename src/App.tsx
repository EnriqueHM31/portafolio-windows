import CHROME from '@/assets/img/aplicaciones/chrome.webp'
import EXPLORADORARCHIVOS from '@/assets/img/aplicaciones/explorador.webp'
import FONDO from '@/assets/img/fondos/fondo.webp'
import { FaWindows } from 'react-icons/fa'
import { IoVolumeHighSharp } from "react-icons/io5"
import { LiaComment } from "react-icons/lia"
import { PiBatteryHighFill } from "react-icons/pi"
import { VscSearch } from 'react-icons/vsc'
import AppTareas from './components/AppTareas'
import CONFIGURACION from '@/assets/img/aplicaciones/configuracion.webp'
import { useEffect, useState } from 'react'

const APPS = [
  { id: 1, label: 'Chrome', icono: CHROME, active: true },
  { id: 2, label: 'Explorador', icono: EXPLORADORARCHIVOS, active: false },
  { id: 3, label: 'Configuración', icono: CONFIGURACION, active: false },
] as const

function App() {

  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    return () => clearInterval(timer); // limpiar intervalo al desmontar
  }, []);

  const hora = fechaHora.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  const fecha = fechaHora.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });


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
            <button className=" size-12 flex items-center justify-center">
              <FaWindows className='text-xl' />
            </button>
            <label
              htmlFor="buscador-windows"
              className="flex items-center gap-2 bg-primary h-full ps-3 pe-4 border-2 border-transparent focus-within:border-blue-500 "
            >
              <VscSearch className="text-secondary" />
              <input
                type="search"
                id="buscador-windows"
                className="text-secondary appearance-none outline-none w-58"
                placeholder="Buscar"
              />
            </label>
          </div>

          {/* Espacio en medio */}
          <div className="flex-1 flex items-center gap-1 px-1">
            {
              APPS.map((app) => (
                <AppTareas key={app.id} icono={app.icono} active={app.active} />
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

            <div className='flex flex-col'>
              <span className='text-xs'>{hora}</span>
              <span className='text-xs'>{fecha}</span>

            </div>
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
