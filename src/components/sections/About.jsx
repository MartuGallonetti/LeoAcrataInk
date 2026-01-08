import React from 'react';
import { motion } from 'framer-motion';

export default function History() {
  return (
    <section id="historia" className="py-24 px-6 bg-black relative overflow-hidden">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent"></div>

      <div className="container mx-auto relative z-10">
        
        {/* Encabezado */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-red-900 tracking-[0.3em] text-xs font-bold uppercase mb-4">
            Historia
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif text-white font-light max-w-3xl mx-auto leading-tight">
            Más que tinta, una extensión <br className="hidden md:block" /> de tu propia identidad.
          </h3>
          <div className="w-px h-16 bg-gradient-to-b from-red-900 via-red-900/50 to-transparent mx-auto mt-8"></div>
        </div>

        {/* CONTENIDO DEL TEXTO */}
        {/* CAMBIO 1: max-w-5xl (Antes era max-w-2xl o 3xl). Esto lo hace mucho más ancho. */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* CAMBIO 2: leading-normal (Antes leading-relaxed). Esto reduce el espacio entre renglones. */}
          {/* También agregué 'text-justify md:text-center' para que en pantallas grandes se vea equilibrado pero ancho */}
          <p className="text-zinc-400 text-sm md:text-base leading-normal font-light">
            Soy Leo Acrata y tatúo desde 2015. Desde muy chico me sedujo el mundo del tatuaje: las convenciones, las 
            personas y las historias que uno va conociendo en el camino. Siempre me impactó que un cliente te permita 
            plasmar algo tan importante, algo que significa realmente para ellos, y te dé la confianza de dejarlo en su piel. 
            Esa confianza la valoré desde el primer día. Con los años ese interés se transformó en compromiso, estudio y 
            disciplina, hasta encontrar mi lugar en el realismo black & grey, estilo en el que me siento más conectado y 
            donde puedo explotar mi lado más detallista. Me especializo en proyectos grandes y mangas completas, 
            donde puedo construir composiciones con impacto visual, buen contraste y detalles definidos. Busco que 
            cada pieza sea sólida, prolija y duradera, pensada para envejecer bien y mantener su fuerza con el tiempo. Para 
            mí, tatuar es un proceso artístico y también humano. Disfruto escuchar al cliente, entender lo que quiere 
            representar y transformarlo en un diseño con identidad, fuerza y sentido. Cada trabajo es una colaboración: 
            una idea que llega, un concepto que crece y una pieza final que queda para toda la vida.
          </p>

          {/* Firma o detalle final opcional */}
          <div className="mt-12 opacity-80">
            <span className="font-serif text-white text-lg italic tracking-widest">Leo Acrata</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}