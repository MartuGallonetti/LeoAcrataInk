import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    // CAMBIO: Quitamos 'container mx-auto' de la section principal para que el fondo ocupe todo el ancho.
    <section className="relative w-full py-20 lg:py-32 overflow-hidden mb-12">
      
      {/* === FONDO (Full Width) === */}
      <div className="absolute inset-0 z-0 w-full h-full">
         {/* Imagen Daruma (Local) */}
        <img 
          src="/fondoDarumaHero.webp" 
          alt="Background Texture"
           // Ajuste: scale-110 para asegurar que cubra bordes si hay algún pixel perdido
          className="w-full h-full object-cover grayscale opacity-20 mix-blend-screen pointer-events-none scale-105"
        />

         {/* Spotlight Inferior (Luz) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,_var(--tw-gradient-stops))] from-zinc-800/40 via-black to-black mix-blend-normal"></div>
        
         {/* Viñeta suave */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-90"></div>
      </div>

      {/* Contenedor interno para centrar el contenido (Texto y Fotos) */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
        
        {/* FOTOS IZQUIERDA (Estáticas) */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
          {/* Foto 1: Sin rotación, solo grayscale hover */}
          <div className="h-[350px] lg:h-[450px] bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 shadow-2xl mt-12">
              <img src="/LeoPrincipal.webp" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out" alt="Work 1" />
          </div>
          {/* Foto 2 */}
          <div className="h-[350px] lg:h-[450px] bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 shadow-2xl">
              <img src="/LeonAntebrazo.webp" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out" alt="Work 2" />
          </div>
        </div>

        {/* TEXTO DERECHA (Tamaño corregido) */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <h2 className="text-red-700 tracking-[0.4em] text-xs font-bold uppercase mb-6 pl-1">Tattoo Artist</h2>
          
          {/* CAMBIO: Tamaño reducido a 5xl/7xl (antes era 8xl) */}
          <h1 className="text-5xl lg:text-7xl font-serif font-light tracking-widest mb-6 text-white leading-none">
            LEO ACRATA
          </h1>
          
          <div className="h-px w-24 bg-red-900/50 mb-8 mx-auto lg:mx-0"></div>
          
          <p className="text-zinc-400 text-sm lg:text-base font-light leading-relaxed max-w-md mx-auto lg:mx-0 tracking-wide">
            Especialista en realismo, Black & Grey y Oriental Tradicional. Transformando ideas en marcas eternas con precisión y arte.
          </p>
        </motion.div>

      </div>
    </section>
  );
}