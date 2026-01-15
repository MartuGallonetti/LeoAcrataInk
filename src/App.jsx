import React, { useState } from 'react';
import { Menu, X, ChevronDown, Instagram } from 'lucide-react';

// Importamos tus componentes
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import About from './components/sections/About';
import Aftercare from './components/sections/Aftercare';
import Contact from './components/sections/Contact';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Función para ir arriba de todo al tocar el logo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-200 selection:bg-red-900 selection:text-white relative">
      
      {/* RUIDO */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}>
      </div>

      {/* 1. NAVBAR (Menú) - MODIFICADO CON LOGO */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent transition-all duration-300">
        <div className="px-6 py-4 flex justify-between items-center">
          
          {/* === CAMBIO: LOGO EN VEZ DE TEXTO === */}
          <div onClick={scrollToTop} className="relative group cursor-pointer">
             {/* Luz Roja (Glow) - Efecto hover */}
            <div className="absolute inset-0 bg-red-600 blur-xl rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-500 scale-150"></div>
            
             {/* Imagen del Logo */}
            <img 
              src="/logo.png" 
              alt="Leo Acrata" 
              className="relative z-10 w-12 h-12 object-contain brightness-110 drop-shadow-md transition-transform duration-300 group-hover:scale-105" 
            />
          </div>

          {/* Menú Escritorio */}
          <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase items-center">
            <a href="#gallery" className="hover:text-white transition-colors relative group">
              Trabajos
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" className="hover:text-white transition-colors relative group">
              Historia
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#aftercare" className="hover:text-white transition-colors relative group">
              Cuidados
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="hover:text-white transition-colors relative group">
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="https://instagram.com/leo_acrata" target="_blank" className="text-white hover:text-red-500 transition-colors">
              <Instagram size={18} />
            </a>
          </div>

          {/* Botón Hamburguesa Móvil */}
          <button className="md:hidden text-zinc-300 hover:text-white z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú Desplegable Móvil */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 animate-fade-in-down">
            {/* Logo en menú móvil también */}
            <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain mb-4 opacity-80" />

            <a href="#gallery" onClick={closeMenu} className="text-xl uppercase tracking-[0.2em] text-zinc-300 hover:text-white font-serif">Trabajos</a>
            <a href="#about" onClick={closeMenu} className="text-xl uppercase tracking-[0.2em] text-zinc-300 hover:text-white font-serif">Historia</a>
            <a href="#aftercare" onClick={closeMenu} className="text-xl uppercase tracking-[0.2em] text-zinc-300 hover:text-white font-serif">Cuidados</a>
            <a href="#contact" onClick={closeMenu} className="text-xl uppercase tracking-[0.2em] text-red-500 font-bold font-serif">Contacto</a>
          </div>
        )}
      </nav>

      {/* 2. CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 pt-0">
        
        {/* HERO MÓVIL (Solo visible en celular) */}
        <section className="lg:hidden relative h-[85vh] w-full flex flex-col justify-end pb-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
              {/* === ACÁ ESTÁ EL ARREGLO DEL FONDO MÓVIL === 
                  Cambié '/hero-1.webp' por '/leo-mobile.webp' 
              */}
              <img 
                src="/leo-mobile.webp" 
                alt="Leo Mobile" 
                className="w-full h-full object-cover object-top grayscale opacity-60" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
            </div>
            
            <div className="relative z-10 text-center px-6 animate-fade-in-up">
              {/* === ACÁ ESTÁ EL CAMBIO DE TEXTO POR LOGO EN EL CENTRO DEL HERO MÓVIL === */}
              <div className="flex justify-center mb-6">
                <img src="/logo.png" className="w-24 h-24 object-contain brightness-125 drop-shadow-2xl" alt="Logo Central" />
              </div>
              
              <h1 className="text-4xl font-serif text-white uppercase tracking-widest drop-shadow-md mb-2 font-light">Leo Acrata</h1>
              <div className="h-[1px] w-12 bg-red-900 mx-auto mb-4 opacity-80"></div>
              <p className="text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-bold">Tattoo Artist</p>
              
              <div className="mt-12 animate-bounce text-zinc-500 opacity-60">
                <ChevronDown size={24} className="mx-auto" />
              </div>
            </div>
        </section>

        {/* HERO PC (Solo visible en escritorio) */}
        <div className="hidden lg:block"><Hero /></div>

        <div id="gallery"><Gallery /></div>
        <div id="about"><About /></div>
        <div id="aftercare"><Aftercare /></div>
        <div id="contact"><Contact /></div>
      </div>
    </main>
  );
}