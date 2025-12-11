import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    // CAMBIO 1: Aumenté el 'gap' a lg:gap-32 para separar mucho más el texto de las fotos (limpiar el medio)
    <section className="container mx-auto px-6 py-12 min-h-[40vh] flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-32">
      
      {/* COLUMNA IZQUIERDA: FOTOS */}
      <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
        <div className="h-[350px] bg-zinc-900/50 rounded-sm overflow-hidden relative group">
            <img 
                src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1000&auto=format&fit=crop" 
                // CAMBIO 2: Agregué 'group-hover:grayscale-0' para que recupere el color al pasar el mouse
                className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out" 
                alt="Tattoo work 1" 
            />
        </div>
        <div className="h-[350px] bg-zinc-900/50 rounded-sm overflow-hidden mt-8 relative group">
            <img 
                src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1000&auto=format&fit=crop" 
                // CAMBIO 2: Mismo efecto aquí
                className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out" 
                alt="Tattoo work 2" 
            />
        </div>
      </div>

      {/* COLUMNA DERECHA: TEXTO */}
      {/* Agregamos 'lg:pl-12' para empujarlo aún más a la derecha si es necesario */}
      <div className="w-full lg:w-1/2 text-center lg:text-left animate-fade-in-up lg:pl-12">
        
        {/* CAMBIO 3: Aumenté el tamaño a 'text-sm' (antes era text-xs) */}
        <h2 className="text-red-900 tracking-[0.3em] text-sm font-bold uppercase mb-4 opacity-90">
          Tattoo Artist
        </h2>

        {/* Título */}
        <h1 className="text-5xl font-serif font-light tracking-widest mb-4 text-zinc-200 leading-tight">
          LEO ACRATA
        </h1>

        {/* Descripción */}
        <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 tracking-wide">
          Transformando ideas en marcas eternas. Especialista en realismo y Black & Grey. 
        </p>
      </div>
      
    </section>
  );
}