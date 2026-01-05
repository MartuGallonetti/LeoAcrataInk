import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="relative py-32 px-6 md:px-12 flex justify-center items-center overflow-hidden border-b border-white/5">
      
      <div className="absolute inset-0 bg-zinc-900"></div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/50 via-zinc-900/80 to-black/80"></div>
      
      <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-red-500/80 text-xs tracking-[0.3em] uppercase mb-6 font-bold">
            Historia
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 drop-shadow-lg">
            Más que tinta, una extensión <br /> de tu propia identidad.
          </h2>
          <div className="w-px h-16 bg-gradient-to-b from-red-600 to-transparent mx-auto mb-8 shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
          <p className="text-zinc-300 leading-loose text-lg font-light text-balance drop-shadow-md">
            Soy Leo Acrata y tatúo desde 2015. Desde muy chico me sedujo el mundo del tatuaje: las convenciones, las personas y las historias que uno va conociendo en el camino. Siempre me impactó que un cliente te permita plasmar algo tan importante, algo que significa realmente para ellos, y te dé la confianza de dejarlo en su piel. Esa confianza la valoré desde el primer día.

Con los años ese interés se transformó en compromiso, estudio y disciplina, hasta encontrar mi lugar en el realismo black & grey, estilo en el que me siento más conectado y donde puedo explotar mi lado más detallista.

Me especializo en proyectos grandes y mangas completas, donde puedo construir composposiciones con impacto visual, buen contraste y detalles definidos. Busco que cada pieza sea sólida, prolija y duradera, pensada para envejecer bien y mantener su fuerza con el tiempo.

Para mí, tatuar es un proceso artístico y también humano. Disfruto escuchar al cliente, entender lo que quiere representar y transformarlo en un diseño con identidad, fuerza y sentido. Cada trabajo es una colaboración: una idea que llega, un concepto que crece y una pieza final que queda para toda la vida
          </p>
        </motion.div>
      </div>
    </section>
  )
}