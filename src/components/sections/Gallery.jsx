import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

const images = [
  "/leoGorra.webp", 
  "/conveVilla.webp",
  "/diabloMonja.webp",
  "/DragonPierna.webp",
  "/espaldaCompleta.webp",
  "/foxRiver.webp",
  "/guerreAntebrzo.webp",
  "/leoMonja.webp",
  "/mangaMonja.webp",
  "/tatuandoRemeNegra.webp",
  "/Snoop.webp",
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // === LÓGICA DE NAVEGACIÓN ===
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-Play: Se frena si el mouse está encima
  useEffect(() => {
    let interval;
    if (isHovering && !isModalOpen) {
      interval = setInterval(() => {
        handleNext();
      }, 3500); // Un poco más lento para que se aprecie
    }
    return () => clearInterval(interval);
  }, [isHovering, isModalOpen]);

  // === CÁLCULO DE POSICIONES ===
  const getCardStyle = (index) => {
    const total = images.length;
    // Calculamos la distancia relativa (offset)
    let offset = (index - currentIndex + total) % total;
    if (offset > total / 2) offset -= total; // Ajuste para tener negativos (-2, -1, 0, 1, 2)

    // CONFIGURACIÓN VISUAL SEGÚN LA POSICIÓN
    if (offset === 0) {
      // --- CENTRO (PROTAGONISTA) ---
      return {
        x: "0%",
        scale: 1,
        zIndex: 50,
        opacity: 1,
        brightness: 1,
        pointerEvents: "auto", // Clickable
        transitionDuration: 0.5 // Movimiento suave
      };
    } else if (offset === 1) {
      // --- DERECHA (ACOMPAÑANTE) ---
      return {
        x: "100%", // Bien separada
        scale: 0.6, // Más chica para que no compita
        zIndex: 40,
        opacity: 0.7,
        brightness: 0.5,
        pointerEvents: "auto",
        transitionDuration: 0.5
      };
    } else if (offset === -1) {
      // --- IZQUIERDA (ACOMPAÑANTE) ---
      return {
        x: "-100%", // Bien separada
        scale: 0.6,
        zIndex: 40,
        opacity: 0.7,
        brightness: 0.5,
        pointerEvents: "auto",
        transitionDuration: 0.5
      };
    } else {
      // --- FONDO (LAS INVISIBLES) ---
      // ACÁ ESTÁ EL TRUCO:
      // Si están en el fondo, las mandamos LEJOS y al FONDO DE TODO.
      // Usamos duration 0 si es un salto grande para que no crucen la pantalla.
      return {
        x: offset > 0 ? "200%" : "-200%", // Lejísmos
        scale: 0.4,
        zIndex: 0, // Al fondo absoluto
        opacity: 0, // Invisibles
        brightness: 0,
        pointerEvents: "none", // No se pueden clickear por error
        transitionDuration: 0.5 // Mantener flujo, pero zIndex las esconde
      };
    }
  };

  return (
    <section className="py-20 bg-black overflow-hidden min-h-[80vh] flex flex-col justify-center">
      
      <div className="container mx-auto px-6 mb-12 text-center">
         <h2 className="text-red-800 tracking-[0.3em] text-xs font-bold uppercase mb-2">Portafolio</h2>
         <h3 className="text-3xl font-serif text-white">TRABAJOS RECIENTES</h3>
      </div>

      {/* CONTENEDOR CARRUSEL */}
      <div 
        className="relative w-full max-w-5xl mx-auto h-[450px] md:h-[550px] flex items-center justify-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        
        {/* BOTÓN IZQUIERDO */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-0 z-[100] bg-black/60 p-3 rounded-full text-white hover:bg-red-900 transition-colors border border-white/20 backdrop-blur-md active:scale-95 shadow-lg"
        >
          <ChevronLeft size={30} />
        </button>

        {/* --- LAS CARTAS --- */}
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((img, index) => {
            const style = getCardStyle(index);
            const isCenter = style.zIndex === 50;

            return (
              <motion.div
                key={index}
                // Animamos las propiedades
                animate={{
                  x: style.x,
                  scale: style.scale,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  filter: `grayscale(${isCenter ? 0 : 100}%) brightness(${style.brightness})`
                }}
                // Controlamos la transición
                transition={{
                  duration: style.transitionDuration, 
                  ease: "easeInOut"
                }}
                className="absolute w-[300px] md:w-[380px] h-[450px] md:h-[550px] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer border border-zinc-800 bg-zinc-900"
                style={{ 
                    pointerEvents: style.pointerEvents 
                }}
                
                // Clicks inteligentes
                onClick={() => {
                  if (isCenter) setIsModalOpen(true);
                  else if (style.x === "100%") handleNext(); // Si es la derecha, va a Next
                  else if (style.x === "-100%") handlePrev(); // Si es la izquierda, va a Prev
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
                
                {/* Overlay Zoom (Solo en el centro) */}
                {isCenter && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="text-white drop-shadow-md" size={32} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* BOTÓN DERECHO */}
        <button 
          onClick={handleNext}
          className="absolute right-4 md:right-0 z-[100] bg-black/60 p-3 rounded-full text-white hover:bg-red-900 transition-colors border border-white/20 backdrop-blur-md active:scale-95 shadow-lg"
        >
          <ChevronRight size={30} />
        </button>

      </div>

      {/* MODAL FULLSCREEN */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <button className="absolute top-6 right-6 text-zinc-400 hover:text-white z-[210]">
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }}
              src={images[currentIndex]} 
              className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm border border-zinc-800"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}