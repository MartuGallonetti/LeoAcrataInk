import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import Lightbox from '../../components/Lightbox'

const images = [
  "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562962230-16bc46364924?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590246814883-0556361d3efd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550537602-366d8dc5f0ed?q=80&w=800&auto=format&fit=crop",
]

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar viewport solo del lado del cliente (Cloudflare safe)
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768)
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % images.length)
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <section className="relative py-20 px-6 overflow-hidden border-b border-white/5 bg-zinc-900">
      
      {/* Fondo */}
      <div className="absolute inset-0 bg-zinc-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/50 via-zinc-900/80 to-black/80"></div>
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-white drop-shadow-lg">Galería Selecta</h2>
          <div className="h-px w-16 bg-red-900/60 mx-auto mt-4"></div>
        </div>

        <div className="relative h-[400px] w-full flex items-center justify-center perspective-1000">
          
          {/* Botón anterior */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-20 z-50 p-3 md:p-2 text-red-900 hover:text-red-600 active:scale-95 transition-all bg-black/40 backdrop-blur-md rounded-full border border-red-900/30 shadow-lg"
          >
            <ChevronLeft size={32} strokeWidth={3} />
          </button>

          {/* Botón siguiente */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-20 z-50 p-3 md:p-2 text-red-900 hover:text-red-600 active:scale-95 transition-all bg-black/40 backdrop-blur-md rounded-full border border-red-900/30 shadow-lg"
          >
            <ChevronRight size={32} strokeWidth={3} />
          </button>

          {/* Carrusel */}
          {images.map((src, index) => {
            const position = index - activeIndex
            const isCenter = index === activeIndex

            // solo renderizar las 5 imágenes del frente (optimización)
            if (Math.abs(position) > 2) return null

            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: position * (isMobile ? 180 : 240),
                  scale: isCenter ? 1.1 : 0.85,
                  opacity: isCenter ? 1 : 0.3,
                  zIndex: isCenter ? 40 : 10,
                  filter: isCenter ? 'grayscale(0%)' : 'grayscale(100%) blur(2px)'
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
                className={cn(
                  "absolute w-[220px] md:w-[260px] aspect-[3/4] object-cover bg-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] border cursor-pointer transition-colors duration-200 rounded-sm touch-none",
                  isCenter ? "border-red-900/40" : "border-zinc-800"
                )}
                onClick={() => {
                  if (isCenter) setSelectedImage(src)
                  else setActiveIndex(index)
                }}
              >
                <img
                  src={src}
                  alt="Tattoo work"
                  className="w-full h-full object-cover pointer-events-none"
                />

                {isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20 group">
                    <Maximize2 className="text-white drop-shadow-lg" size={32} />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  )
}
