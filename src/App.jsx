import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

// Importamos tus componentes
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import About from './components/sections/About';
import Aftercare from './components/sections/Aftercare';
import Contact from './components/sections/Contact';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-200 selection:bg-red-900 selection:text-white">
      
      {/* 1. TEXTURA DE FONDO */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. NAVEGACIÓN */}
      {/* CAMBIO: Aumenté el padding vertical a 'py-6' (antes era py-4). 
          Esto despega todo del borde superior y lo deja bien centrado verticalmente. */}
      <nav className="fixed top-0 w-full z-50 bg-black/95 border-b border-zinc-900 shadow-lg shadow-black/50 backdrop-blur-sm transition-all duration-300">
        <div className="px-6 py-6 flex justify-between items-center">
          
          {/* LOGO (Este te gustó, no lo toqué) */}
          <a href="#" className="text-lg md:text-xl font-serif font-bold tracking-[0.2em] text-white uppercase hover:text-red-700 transition-colors cursor-pointer">
            Leo Acrata
          </a>

          {/* MENÚ DE ESCRITORIO (PC) */}
          {/* CAMBIO: Aumenté el gap a 'gap-10' para que respiren más los links */}
          <div className="hidden md:flex gap-10 text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
            <a href="#gallery" className="hover:text-white hover:border-b hover:border-red-900 transition-all pb-1">Trabajos</a>
            <a href="#about" className="hover:text-white hover:border-b hover:border-red-900 transition-all pb-1">Historia</a>
            <a href="#aftercare" className="hover:text-white hover:border-b hover:border-red-900 transition-all pb-1">Cuidados</a>
            
            {/* CAMBIO: Contacto ahora es igual al resto (sin caja blanca) */}
            <a href="#contact" className="hover:text-white hover:border-b hover:border-red-900 transition-all pb-1">Contacto</a>
          </div>

          {/* BOTÓN SANDWICH (MÓVIL) */}
          <button 
            className="md:hidden text-zinc-300 hover:text-white transition-colors focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MENÚ DESPLEGABLE (SOLO MÓVIL) */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-zinc-900 shadow-2xl py-8 flex flex-col items-center gap-8 animate-fade-in-down">
            <a href="#gallery" onClick={closeMenu} className="text-sm uppercase tracking-[0.2em] text-zinc-300 hover:text-white">Trabajos</a>
            <a href="#about" onClick={closeMenu} className="text-sm uppercase tracking-[0.2em] text-zinc-300 hover:text-white">Historia</a>
            <a href="#aftercare" onClick={closeMenu} className="text-sm uppercase tracking-[0.2em] text-zinc-300 hover:text-white">Cuidados</a>
            {/* En móvil también le saqué el botón para mantener la coherencia */}
            <a href="#contact" onClick={closeMenu} className="text-sm uppercase tracking-[0.2em] text-red-500 hover:text-white font-bold">Contacto</a>
          </div>
        )}
      </nav>

      {/* CONTENEDOR PRINCIPAL */}
      {/* Ajusté el pt-24 para compensar que la barra ahora es más alta */}
      <div className="relative z-10 pt-24">
        
        {/* HERO MÓVIL */}
        <section className="lg:hidden relative h-[85vh] w-full flex flex-col justify-end pb-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="/leo-mobile.webp" 
                alt="Leo Mobile" 
                className="w-full h-full object-cover object-top grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
            </div>

            <div className="relative z-10 text-center px-6 animate-fade-in-up">
              <h1 className="text-3xl font-serif text-zinc-200 uppercase tracking-widest drop-shadow-md mb-3 font-light">
                Leo Acrata
              </h1>
              <div className="h-[1px] w-8 bg-red-900 mx-auto mb-4 opacity-50"></div>
              <p className="text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-light">
                Professional Tattoo Artist
              </p>
              <div className="mt-8 animate-bounce text-zinc-600 opacity-60">
                <ChevronDown size={20} className="mx-auto" />
              </div>
            </div>
        </section>

        {/* HERO PC */}
        <div className="hidden lg:block">
          <Hero />
        </div>

        {/* RESTO DE SECCIONES */}
        <div id="gallery"><Gallery /></div>
        <div id="about"><About /></div>
        <div id="aftercare"><Aftercare /></div>
        <div id="contact"><Contact /></div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 py-8 text-center border-t border-zinc-900 bg-black">
        <p className="text-zinc-400 text-[10px] uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Leo Acrata. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  );
}