import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from "@heroui/react";
import App from './App.tsx'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <HeroUIProvider locale='es-ES'>
    <main className="dark text-foreground bg-background" >
      <App />
    </main>

  </HeroUIProvider>,
)
