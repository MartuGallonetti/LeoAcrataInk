import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Send, CheckCircle2, Loader2, AlertCircle, Instagram } from 'lucide-react'
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

  // --- LÓGICA DE ARCHIVOS ---
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

  // Componente de Input (TEXTOS EN BLANCO PURO)
  const InputBase = ({ label, ...props }) => (
    <div className="flex flex-col gap-2">
      {/* CAMBIO: text-white (Blanco puro para el título) */}
      <label className="text-[11px] font-bold uppercase tracking-wider text-white">{label}</label>
      <input 
        {...props}
        // CAMBIO: Borde más claro (border-zinc-600) para que se vea bien el recuadro
        className="w-full bg-zinc-900 border border-zinc-600 rounded-sm px-3 py-3 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all placeholder-zinc-500"
      />
    </div>
  )

  return (
    <section id="contact" className="relative py-20 px-4 bg-black border-t border-zinc-800">
      
      {/* Fondo con luz roja */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/15 via-black to-black pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Cabecera */}
        <div className="text-center mb-10">
          <h2 className="text-red-500 tracking-[0.2em] text-[10px] font-bold uppercase mb-2 drop-shadow-sm">Contacto</h2>
          <h3 className="text-3xl font-serif text-white mb-2">Presupuestos</h3>
          <p className="text-zinc-300 text-sm font-light">Completá el formulario para cotizar tu idea.</p>
        </div>

        {/* TARJETA DEL FORMULARIO (Fondo Gris visible) */}
        <div className="bg-zinc-950 border border-zinc-700 rounded-sm p-6 md:p-8 shadow-[0_0_40px_rgba(220,38,38,0.05)] relative overflow-hidden">
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
             
             {/* Overlay de Carga */}
             <AnimatePresence>
              {(loading || status === 'success') && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-zinc-900/95 flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin text-red-500 mb-3" size={32} />
                      <p className="text-white text-xs tracking-widest uppercase animate-pulse">Enviando...</p>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="text-red-500 mb-3" size={40} />
                      <h3 className="text-lg font-bold text-white mb-1">¡Enviado!</h3>
                      <p className="text-zinc-300 text-xs">Te responderé pronto.</p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <input type="hidden" name="has_tattoos" value={form.hasTattoos === true ? 'Sí' : 'No'} />

            {/* Fila 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <InputBase label="Nombre Completo" name="from_name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Tu nombre" required />
              </div>
              <div className="md:col-span-1">
                <InputBase label="Edad" type="number" name="from_age" value={form.age} onChange={(e) => setForm({...form, age: e.target.value})} placeholder="+18" required />
              </div>
            </div>

            {/* Fila 2: Tatuajes previos */}
            <div className="flex flex-col gap-2">
              {/* CAMBIO: Título en Blanco Puro */}
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">¿Tenes tatuajes?</span>
              <div className="flex gap-3">
                {['SI', 'NO'].map((option) => (
                  <button
                    key={option} type="button"
                    onClick={() => setForm({...form, hasTattoos: option === 'SI'})}
                    className={cn(
                      "flex-1 py-3 text-xs border rounded-sm transition-all duration-300 font-bold",
                      (option === 'SI' && form.hasTattoos === true) || (option === 'NO' && form.hasTattoos === false)
                        ? "bg-red-700 border-red-700 text-white shadow-md shadow-red-900/40" 
                        // CAMBIO: Botón inactivo con texto más claro (text-zinc-300) y borde visible
                        : "bg-zinc-900 border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-white"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Fila 3: Idea */}
            <div className="flex flex-col gap-2">
              {/* CAMBIO: Título en Blanco Puro */}
              <label className="text-[11px] font-bold uppercase tracking-wider text-white">Tu Idea</label>
              <textarea
                name="message" rows={3} value={form.idea} onChange={(e) => setForm({...form, idea: e.target.value})}
                // CAMBIO: Borde más visible (zinc-600)
                className="w-full bg-zinc-900 border border-zinc-600 rounded-sm px-3 py-3 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all placeholder-zinc-500 resize-none"
                placeholder="Describí zona, tamaño aproximado en cm y estilo..." required
              />
            </div>

            {/* Fila 4: Archivos */}
            <div className="bg-zinc-900 rounded-sm p-4 border border-zinc-600 hover:border-red-500/50 transition-colors">
               <div className="flex items-center justify-between mb-3">
                 {/* CAMBIO: Título en Blanco Puro */}
                 <span className="text-[10px] uppercase text-white font-bold tracking-wider">Referencias</span>
                 <span className="text-[10px] text-zinc-400">Máx 2MB</span>
               </div>
               
               <div className="flex flex-wrap items-center gap-3">
                  <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-sm text-xs flex items-center gap-2 transition-all border border-zinc-500 hover:border-white shadow-sm font-medium">
                     <Upload size={14} />
                     <span>Subir Fotos</span>
                     <input type="file" ref={fileInputRef} multiple accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>

                  <AnimatePresence>
                    {form.files.map((file, index) => (
                      <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.5}} key={index} 
                        className="bg-red-900/30 border border-red-500/50 px-3 py-1 rounded-sm flex items-center gap-2">
                         <span className="text-[10px] text-white max-w-[80px] truncate">{file.name}</span>
                         <button type="button" onClick={() => removeFile(index)} className="text-red-400 hover:text-white transition-colors"><X size={12} /></button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>
            </div>

            {/* Botón Enviar */}
            <button 
              type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white py-4 rounded-sm uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/30 hover:shadow-red-600/40 flex justify-center items-center gap-2 group mt-4 border border-red-900/50"
            >
              <span>{loading ? 'Procesando...' : 'Enviar Solicitud'}</span>
              {!loading && <Send size={14} className="group-hover:translate-x-1 transition-transform" />}
            </button>

            {status === 'error' && (
              <div className="text-center">
                <p className="text-red-400 text-[10px] mt-3 flex items-center justify-center gap-1 font-bold">
                  <AlertCircle size={12} /> Error al enviar. Verifica tu conexión.
                </p>
              </div>
            )}

          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-center mt-12 opacity-80 hover:opacity-100 transition-opacity">
          <a href="https://instagram.com/leo_acrata" target="_blank" className="flex items-center gap-2 text-white hover:text-red-400 transition-colors text-xs uppercase tracking-widest group font-bold">
              <Instagram size={16} className="text-red-500 group-hover:scale-110 transition-transform" /> Instagram Portafolio
          </a>
        </div>

      </div>
    </section>
  )
}