import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Send, CheckCircle2, Loader2, AlertCircle, MessageCircle, Instagram } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { cn } from '../../utils/cn'

export default function Contact() {
  const formRef = useRef()
  const fileInputRef = useRef()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const [form, setForm] = useState({
    name: '',
    age: '',
    hasTattoos: null,
    idea: '',
    files: []
  })

  // TU LÓGICA DE ARCHIVOS (INTACTA)
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      const validFiles = newFiles.filter(file => {
        const sizeInMB = file.size / (1024 * 1024)
        if (sizeInMB > 2) {
          alert(`La imagen "${file.name}" pesa más de 2MB.`)
          return false
        }
        return true
      })
      setForm(prev => ({ ...prev, files: [...prev.files, ...validFiles] }))
    }
  }

  const removeFile = (index) => {
    setForm(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    // RECUERDA PONER TUS CREDENCIALES REALES DE EMAILJS AQUÍ
    const serviceId = 'YOUR_SERVICE_ID'
    const templateId = 'YOUR_TEMPLATE_ID'
    const publicKey = 'YOUR_PUBLIC_KEY'

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer()
      form.files.forEach(file => dataTransfer.items.add(file))
      fileInputRef.current.files = dataTransfer.files
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setLoading(false)
      setStatus('success')
      setForm({ name: '', age: '', hasTattoos: null, idea: '', files: [] })
      if(fileInputRef.current) fileInputRef.current.value = ""
      setTimeout(() => setStatus(null), 5000)
    } catch (error) {
      console.error("Error:", error)
      setLoading(false)
      setStatus('error')
    }
  }

  // Componente de Etiqueta Estilizada
  const FieldLabel = ({ children }) => (
    <label className="block text-xs font-serif text-zinc-500 uppercase tracking-widest mb-2">
      {children}
    </label>
  )

  return (
    <section id="contact" className="relative py-24 px-6 bg-black border-t border-zinc-900 overflow-hidden">
      
      {/* Fondo Sutil (Spotlight) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* COLUMNA IZQUIERDA: Texto y Redes */}
        <div className="w-full lg:w-1/3 pt-4">
          <div className="sticky top-24">
            <h2 className="text-red-900 tracking-[0.3em] text-xs font-bold uppercase mb-4">
              Contacto
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 font-light leading-tight">
              INICIAR <br/> PROYECTO.
            </h3>
            <p className="text-zinc-400 text-sm leading-loose mb-8 font-light">
              Para cotizaciones y turnos, completá el formulario con la mayor cantidad de detalles posible.
            </p>

            {/* Accesos rápidos (Por si no quieren llenar el form) */}
            <div className="space-y-4">
               <a href="https://wa.me/5493410000000" target="_blank" className="flex items-center gap-4 p-4 border border-zinc-800 rounded-sm hover:border-zinc-600 transition-colors group">
                  <div className="p-2 bg-zinc-900 rounded-full text-zinc-400 group-hover:text-green-500 transition-colors">
                     <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">Respuesta Rápida</p>
                    <p className="text-white font-serif">WhatsApp</p>
                  </div>
               </a>
               
               <a href="https://instagram.com/leoacrata" target="_blank" className="flex items-center gap-4 p-4 border border-zinc-800 rounded-sm hover:border-zinc-600 transition-colors group">
                  <div className="p-2 bg-zinc-900 rounded-full text-zinc-400 group-hover:text-pink-500 transition-colors">
                     <Instagram size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">Portafolio</p>
                    <p className="text-white font-serif">Instagram</p>
                  </div>
               </a>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Formulario Minimalista */}
        <div className="w-full lg:w-2/3">
           <form ref={formRef} onSubmit={handleSubmit} className="relative space-y-8">
            
            {/* Campos Ocultos */}
            <input type="hidden" name="has_tattoos" value={form.hasTattoos === true ? 'Sí' : 'No'} />
            
            {/* Mensajes de Estado (Overlay) */}
            <AnimatePresence>
              {(loading || status === 'success') && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 rounded-sm border border-zinc-800"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin text-red-900 mb-4" size={40} />
                      <p className="text-zinc-400 text-xs tracking-[0.2em] uppercase">Procesando...</p>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="text-zinc-200 mb-4" size={40} />
                      <h3 className="text-xl font-serif text-white mb-1">Solicitud Enviada</h3>
                      <p className="text-zinc-500 text-sm">Te responderé pronto.</p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inputs - Diseño Limpio (Solo Border Bottom) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="group">
                 <FieldLabel>Nombre Completo</FieldLabel>
                 <input 
                   type="text" name="from_name" value={form.name} required
                   onChange={(e) => setForm({...form, name: e.target.value})}
                   className="w-full bg-transparent border-b border-zinc-800 py-3 text-zinc-200 focus:outline-none focus:border-red-900 transition-colors font-light text-lg placeholder-zinc-700"
                   placeholder="Ej: Juan Pérez"
                 />
               </div>
               <div className="group">
                 <FieldLabel>Edad</FieldLabel>
                 <input 
                   type="number" name="from_age" value={form.age} required
                   onChange={(e) => setForm({...form, age: e.target.value})}
                   className="w-full bg-transparent border-b border-zinc-800 py-3 text-zinc-200 focus:outline-none focus:border-red-900 transition-colors font-light text-lg placeholder-zinc-700"
                   placeholder="+18"
                 />
               </div>
            </div>

            <div>
              <FieldLabel>¿Tenes otros tatuajes?</FieldLabel>
              <div className="flex gap-4 mt-3">
                {['SI', 'NO'].map((option) => (
                  <button
                    key={option} type="button"
                    onClick={() => setForm({...form, hasTattoos: option === 'SI'})}
                    className={cn(
                      "px-6 py-2 text-xs border transition-all duration-300 rounded-sm tracking-widest",
                      (option === 'SI' && form.hasTattoos === true) || (option === 'NO' && form.hasTattoos === false)
                        ? "bg-zinc-100 border-zinc-100 text-black font-bold" 
                        : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
               <FieldLabel>Tu Idea (Zona, tamaño y estilo)</FieldLabel>
               <textarea
                 name="message" rows={4} value={form.idea} required
                 onChange={(e) => setForm({...form, idea: e.target.value})}
                 className="w-full bg-transparent border-b border-zinc-800 py-3 text-zinc-200 focus:outline-none focus:border-red-900 transition-colors font-light text-lg resize-none placeholder-zinc-700 leading-relaxed"
                 placeholder="Ej: Quiero un dragón en el antebrazo, aprox 15cm, estilo realista blanco y negro..."
               />
            </div>

            {/* Upload Zone - Estilo Dashboard */}
            <div className="bg-zinc-900/30 border border-dashed border-zinc-800 p-6 rounded-sm hover:border-zinc-600 transition-colors">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-serif text-zinc-500 uppercase tracking-widest">Referencias (Opcional)</span>
                  <span className="text-[10px] text-zinc-600">Máx 2MB por foto</span>
               </div>
               
               <div className="flex flex-wrap gap-3">
                  <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-sm text-xs text-zinc-300 border border-zinc-700">
                     <Upload size={14} />
                     <span>Subir Imagen</span>
                     <input 
                       type="file" ref={fileInputRef} multiple accept="image/*" 
                       onChange={handleFileChange} className="hidden" 
                     />
                  </label>

                  {/* Lista de archivos */}
                  <AnimatePresence>
                    {form.files.map((file, index) => (
                      <motion.div
                        key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2 bg-black border border-zinc-800 px-3 py-2 rounded-sm"
                      >
                         <span className="text-[10px] text-zinc-300 max-w-[80px] truncate">{file.name}</span>
                         <button type="button" onClick={() => removeFile(index)} className="text-zinc-500 hover:text-red-500">
                           <X size={12} />
                         </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>
            </div>

            {/* Botón de Enviar - Grande y Limpio */}
            <button 
              type="submit" disabled={loading}
              className="w-full bg-zinc-100 hover:bg-white text-black py-5 mt-4 uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 group"
            >
              <span>{loading ? 'Enviando...' : 'Enviar Solicitud'}</span>
              {!loading && <Send size={14} className="group-hover:translate-x-1 transition-transform" />}
            </button>

            {status === 'error' && (
              <p className="text-red-500 text-xs text-center mt-2 flex items-center justify-center gap-2">
                 <AlertCircle size={12} /> Hubo un error. Revisá tu conexión o el tamaño de las fotos.
              </p>
            )}

           </form>
        </div>

      </div>
    </section>
  )
}