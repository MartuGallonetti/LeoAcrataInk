import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      
      {/* FONDO DE LUZ AMBIENTE (Mejora lectura) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_70%)] pointer-events-none"></div>

      <div className="container mx-auto relative z-10 max-w-5xl text-center">
        
        <div className="mb-12">
          <h2 className="text-red-800 tracking-[0.3em] text-xs font-bold uppercase mb-4">Historia</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white font-light leading-tight">
            MÁS QUE TINTA.
          </h3>
          <div className="w-px h-16 bg-gradient-to-b from-red-900 via-red-900/50 to-transparent mx-auto mt-8"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          // Fondo del texto sutilmente más claro que negro puro
          className="bg-zinc-950/50 backdrop-blur-sm p-8 md:p-12 rounded-sm border border-white/5"
        >
          <p className="text-zinc-300 text-sm md:text-lg leading-relaxed font-light text-justify md:text-center tracking-wide">
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
          
          <div className="mt-12 opacity-80">
            <span className="font-serif text-white text-xl italic tracking-widest">Leo Acrata</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}