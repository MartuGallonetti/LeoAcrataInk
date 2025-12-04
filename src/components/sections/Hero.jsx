import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-20 pb-8 px-6 md:px-12 overflow-hidden border-b border-white/5">
      
      {/* Fondo */}
      <div className="absolute inset-0 bg-zinc-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/50 via-zinc-900/80 to-black/80"></div>
      <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:items-start h-full relative z-10">
        
        {/* CAMBIO CLAVE 1 (IMÁGENES): 
            - Móvil: order-2 (Va abajo)
            - Desktop: lg:order-1 (Va a la izquierda/primero)
        */}
        <div className="lg:col-span-5 h-[50vh] lg:h-[80vh] flex flex-col gap-4 transition-all duration-500 order-2 lg:order-1 w-full">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full overflow-hidden border border-zinc-800 border-t-red-900/50 relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1000&auto=format&fit=crop" 
              alt="Tattoo Process" 
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full overflow-hidden border border-zinc-800 relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1000&auto=format&fit=crop" 
              alt="Tattoo Detail" 
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
          </motion.div>
        </div>

        {/* CAMBIO CLAVE 2 (TÍTULO): 
            - Móvil: order-1 (Va arriba), items-center (Centrado), text-center (Texto centrado)
            - Desktop: lg:order-2 (Va a la derecha), lg:items-end (Alineado der.), lg:text-right
        */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center text-center lg:justify-start lg:items-end lg:text-right z-10 pt-4 lg:pt-2 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Línea decorativa: Centrada en móvil (mx-auto), Derecha en Desktop (lg:ml-auto) */}
            <div className="h-px w-16 md:w-24 bg-red-900/60 mb-4 mx-auto lg:mx-0 lg:ml-auto"></div>

            <h2 className="text-red-900 tracking-[0.5em] text-[10px] md:text-sm font-bold uppercase mb-2">
              Professional Tattoo Artist
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
              Leo Acrata<br />
              <span className="text-zinc-700 italic">Ink</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Footer: Firma */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="w-full flex justify-center lg:justify-end lg:pr-12 relative z-10 pt-4 order-3"
      >
        <div className="font-serif text-2xl md:text-3xl text-zinc-500 italic rotate-[-5deg] opacity-60 select-none">
          Leo A.
        </div>
      </motion.div>
    </section>
  )
}