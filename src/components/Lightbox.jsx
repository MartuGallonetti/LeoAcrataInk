import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function Lightbox({ selectedImage, onClose }) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <button 
            className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors p-2"
            onClick={onClose}
          >
            <X size={32} />
          </button>
          
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            src={selectedImage}
            alt="Full size"
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl shadow-black/50 select-none"
            onClick={(e) => e.stopPropagation()} // Evita cerrar si clickeas la imagen
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}