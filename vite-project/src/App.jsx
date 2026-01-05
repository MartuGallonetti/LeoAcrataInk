import React from 'react';
import { ChevronDown } from 'lucide-react';

// Importamos tus componentes originales
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Gallery from './components/sections/Gallery';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-200 selection:bg-red-900 selection:text-white">
      
      {/* 1. TEXTURA DE FONDO (Global para todo) */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. NAVEGACIÓN (Global para todo) */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black border-b border-zinc-900 shadow-lg shadow-black/50">
        
        {/* CAMBIO: Ahora es un enlace 'a' que lleva al inicio (#) */}
        <a href="#" className="text-lg font-serif font-bold tracking-widest text-zinc-200 hover:text-white transition-colors cursor-pointer">
          Leo Acrata
        </a>

        <div className="hidden md:flex gap-8 text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
          <a href="#gallery" className="hover:text-white transition-colors">Trabajos</a>
          <a href="#about" className="hover:text-white transition-colors">Historia</a>
          <a href="#contact" className="hover:text-white transition-colors">Contacto</a>
        </div>
      </nav>

      {/* CONTENEDOR PRINCIPAL (Con padding-top para no quedar atrás del Nav) */}
      <div className="relative z-10 pt-16">
        
        {/* OPCIÓN A: HERO MÓVIL (Solo visible en lg:hidden) */}
        <section className="lg:hidden relative h-[85vh] w-full flex flex-col justify-end pb-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img 
                  src="/leo-mobile.jpg" 
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

        {/* OPCIÓN B: HERO PC (Solo visible en hidden lg:block) */}
        <div className="hidden lg:block">
          <Hero />
        </div>

        {/* RESTO DE SECCIONES */}
        <div id="about"><About /></div>
        <div id="gallery"><Gallery /></div>
        <Contact />
      </div>

      {/* 3. FOOTER (Global para todo) */}
      <footer className="relative z-10 py-8 text-center border-t border-zinc-900 bg-black">
        <p className="text-zinc-400 text-[10px] uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Leo Acrata. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  );
}