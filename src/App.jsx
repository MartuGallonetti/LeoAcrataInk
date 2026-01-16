import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Importamos tus componentes
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import About from './components/sections/About';
import Aftercare from './components/sections/Aftercare';
import Contact from './components/sections/Contact';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // TIEMPO DE CARGA (2.5 segundos)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-200 selection:bg-red-900 selection:text-white relative">
      
      {/* === PANTALLA DE CARGA CON TU IMAGEN === */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center"
          >
            {/* Animación de Latido */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1], // Efecto latido
                opacity: [0.8, 1, 0.8] 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="relative"
            >
              {/* Luz roja difusa detrás */}
              <div className="absolute inset-0 bg-red-900 blur-3xl rounded-full opacity-30 scale-150"></div>
              
              {/* IMAGEN DE CALAVERA */}
              <img 
                src="/calaveraPrecarga.png" 
                alt="Loading..." 
                className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10 drop-shadow-2xl" 
              />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-red-800 font-serif tracking-[0.5em] text-[10px] md:text-xs uppercase font-bold animate-pulse"
            >
              Cargando...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RUIDO */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${isLoading ? 'opacity-0 translate-y-[-20px]' : 'opacity-100 translate-y-0'} bg-gradient-to-b from-black/90 to-transparent`}>
        <div className="px-6 py-4 flex justify-between items-center">
          
          {/* Logo Izquierda */}
          <div onClick={scrollToTop} className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-red-600 blur-xl rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-500 scale-150"></div>
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

          {/* Botón Mobile */}
          <button className="md:hidden text-zinc-300 hover:text-white z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú Desplegable Mobile */}
{/* === MENÚ MÓVIL CORREGIDO (FONDO NEGRO SÓLIDO) === */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-10 h-screen w-screen">
            
            {/* Botón X para cerrar (Arriba a la derecha) */}
            <button onClick={closeMenu} className="absolute top-6 right-6 text-zinc-400 hover:text-red-500 p-2">
              <X size={32} />
            </button>

            {/* Logo en menú móvil */}
            <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain mb-4 brightness-125" />

            {/* Enlaces con más espacio entre ellos (gap-10 arriba) */}
            <a href="#gallery" onClick={closeMenu} className="text-2xl uppercase tracking-[0.2em] text-zinc-300 hover:text-white font-serif font-bold">Trabajos</a>
            <a href="#about" onClick={closeMenu} className="text-2xl uppercase tracking-[0.2em] text-zinc-300 hover:text-white font-serif font-bold">Historia</a>
            <a href="#aftercare" onClick={closeMenu} className="text-2xl uppercase tracking-[0.2em] text-zinc-300 hover:text-white font-serif font-bold">Cuidados</a>
            <a href="#contact" onClick={closeMenu} className="text-2xl uppercase tracking-[0.2em] text-red-600 hover:text-red-500 font-serif font-bold">Contacto</a>
          </div>
        )}
      </nav>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 pt-0">
        
        {/* HERO MÓVIL */}
        <section className="lg:hidden relative h-[85vh] w-full flex flex-col justify-end pb-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="/leo-mobile.webp" 
                alt="Leo Mobile" 
                className="w-full h-full object-cover object-top grayscale opacity-60" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
            </div>
            
            <div className="relative z-10 text-center px-6 animate-fade-in-up">
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

        {/* HERO PC */}
        <div className="hidden lg:block"><Hero /></div>

        <div id="gallery"><Gallery /></div>
        <div id="about"><About /></div>
        <div id="aftercare"><Aftercare /></div>
        <div id="contact"><Contact /></div>
      </div>
    </main>
  );
}