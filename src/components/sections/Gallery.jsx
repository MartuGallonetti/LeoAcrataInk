import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import Lightbox from '../../components/Lightbox'

const images = [
  "/leoGorra.webp", 
  "/conveVilla.webp",
  "/diabloMonja.webp",
  "/DragonPierna.webp",
  "/espaldaCompleta.webp",
  // Agrega aquí tus nuevas fotos:
  "/foxRiver.webp",
  "/guerreAntebrzo.webp",
  "/leoMonja.webp",
  "/mangaMonja.webp",
  "/tatuandoRemeNegra.webp",
  "/Snoop.webp",
]

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(1000)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // 1. PRECARGA DE IMÁGENES (El truco mágico)
  useEffect(() => {
    // Esto fuerza al navegador a descargar todas las fotos en segundo plano
    // apenas se monta el componente, sin esperar a que el usuario haga click.
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // 2. DETECTOR DE MOVIL
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768)
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  const handleNext = () => setActiveIndex((prev) => prev + 1)
  const handlePrev = () => setActiveIndex((prev) => prev - 1)

  return (
    <section className="relative py-20 px-6 overflow-hidden border-b border-white/5 bg-zinc-900">
      
      {/* Fondo */}
      <div className="absolute inset-0 bg-zinc-900"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-black/80"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-white drop-shadow-lg">Galeria</h2>
          <div className="h-px w-16 bg-red-900/60 mx-auto mt-4"></div>
        </div>

        <div className="relative h-[400px] w-full flex items-center justify-center">
          
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-20 z-50 p-3 text-red-900 bg-black/60 rounded-full border border-red-900/30 hover:bg-red-900 hover:text-white transition-colors"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 md:right-20 z-50 p-3 text-red-900 bg-black/60 rounded-full border border-red-900/30 hover:bg-red-900 hover:text-white transition-colors"
          >
            <ChevronRight size={32} />
          </button>

          {/* Renderizado Virtual */}
          {[-2, -1, 0, 1, 2].map((offset) => {
            const visualIndex = activeIndex + offset;
            const imageIndex = ((visualIndex % images.length) + images.length) % images.length;
            const src = images[imageIndex];
            const isCenter = offset === 0;

            return (
              <motion.div
                key={visualIndex}
                initial={false}
                animate={{
                  x: offset * (isMobile ? 180 : 260),
                  scale: isCenter ? 1.1 : 0.85,
                  opacity: isCenter ? 1 : 0.3,
                  zIndex: isCenter ? 40 : 10,
                  filter: isCenter ? 'grayscale(0%)' : 'grayscale(100%) brightness(0.7)'
                }}
                transition={{
                  type: "spring",
                  stiffness: 400, 
                  damping: 40,    
                  mass: 1         
                }}
                style={{
                  position: 'absolute',
                  width: isMobile ? '200px' : '240px',
                  aspectRatio: '3/4',
                  transformStyle: 'preserve-3d', 
                  backfaceVisibility: 'hidden'   
                }}
                className={cn(
                  "object-cover bg-zinc-800 shadow-2xl border cursor-pointer rounded-sm touch-none",
                  isCenter ? "border-red-900/50 shadow-red-900/20" : "border-zinc-800"
                )}
                onClick={() => {
                  if (isCenter) setSelectedImage(src)
                  else setActiveIndex(visualIndex)
                }}
              >
                <img
                  src={src}
                  alt="Tattoo"
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                  decoding="async"
                  // 'eager' fuerza al navegador a darle prioridad alta a la carga
                  loading="eager" 
                />

                {isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/20">
                    <Maximize2 className="text-white drop-shadow-md" size={32} />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <Lightbox selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  )
}