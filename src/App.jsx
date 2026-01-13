import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

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
    <main className="bg-zinc-950 min-h-screen text-zinc-200 selection:bg-red-900 selection:text-white relative">
      
      {/* RUIDO */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}>
      </div>

      {/* 1. NAVBAR (Menú) */}
      {/* CAMBIO: Saqué 'bg-black/95' y puse un degradado suave 'bg-gradient-to-b from-black/90 to-transparent'.
          Ahora NO es un bloque negro, deja ver el fondo del Hero por detrás. */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent transition-all duration-300">
        <div className="px-6 py-4 flex justify-between items-center">
          
          <a href="#" className="text-sm md:text-base font-serif font-bold tracking-[0.25em] text-white uppercase hover:text-red-700 transition-colors cursor-pointer">
            Leo Acrata
          </a>

          <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase items-center">
            <a href="#gallery" className="hover:text-white transition-colors">Trabajos</a>
            <a href="#about" className="hover:text-white transition-colors">Historia</a>
            <a href="#aftercare" className="hover:text-white transition-colors">Cuidados</a>
            <a href="#contact" className="hover:text-white transition-colors">Contacto</a>
          </div>

          <button className="md:hidden text-zinc-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-zinc-900 shadow-2xl py-10 flex flex-col items-center gap-8 animate-fade-in-down h-screen">
            <a href="#gallery" onClick={closeMenu} className="text-sm uppercase tracking-[0.2em] text-zinc-300 hover:text-white">Trabajos</a>
            <a href="#about" onClick={closeMenu} className="text-sm uppercase tracking-[0.2em] text-zinc-300 hover:text-white">Historia</a>
            <a href="#aftercare" onClick={closeMenu} className="text-sm uppercase tracking-[0.2em] text-zinc-300 hover:text-white">Cuidados</a>
            <a href="#contact" onClick={closeMenu} className="text-sm uppercase tracking-[0.2em] text-red-500 font-bold">Contacto</a>
          </div>
        )}
      </nav>

      {/* 2. CONTENEDOR PRINCIPAL */}
      {/* CAMBIO CRÍTICO: Quité el 'pt-16' o 'pt-20'. Ahora dice 'pt-0'. 
          Esto elimina la franja negra. El Hero va a subir hasta chocar con el techo del navegador. */}
      <div className="relative z-10 pt-0">
        
        {/* HERO MÓVIL */}
        <section className="lg:hidden relative h-[85vh] w-full flex flex-col justify-end pb-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src="/hero-1.webp" alt="Leo Mobile" className="w-full h-full object-cover object-top grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
            </div>
            <div className="relative z-10 text-center px-6 animate-fade-in-up">
              <h1 className="text-4xl font-serif text-white uppercase tracking-widest drop-shadow-md mb-2 font-light">Leo Acrata</h1>
              <div className="h-[1px] w-12 bg-red-900 mx-auto mb-4 opacity-80"></div>
              <p className="text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-bold">Tattoo Artist</p>
              <div className="mt-8 animate-bounce text-zinc-500 opacity-60"><ChevronDown size={24} className="mx-auto" /></div>
            </div>
        </section>

        {/* HERO PC */}
        <div className="hidden lg:block"><Hero /></div>

        <div id="gallery"><Gallery /></div>
        <div id="about"><About /></div>
        <div id="aftercare"><Aftercare /></div>
        <div id="contact"><Contact /></div>
      </div>

      <footer className="relative z-10 py-8 text-center border-t border-zinc-900 bg-black">
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em]">© {new Date().getFullYear()} Leo Acrata. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}