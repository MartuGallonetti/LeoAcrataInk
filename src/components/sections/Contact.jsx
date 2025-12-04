import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
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

  // --- CAMBIO CLAVE AQUÍ ---
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      
      // Filtramos archivos que pesen más de 2MB (Límite EmailJS Free)
      const validFiles = newFiles.filter(file => {
        const sizeInMB = file.size / (1024 * 1024)
        if (sizeInMB > 2) {
          alert(`La imagen "${file.name}" pesa más de 2MB. Por favor sube una versión más liviana.`)
          return false
        }
        return true
      })

      setForm(prev => ({
        ...prev,
        files: [...prev.files, ...validFiles]
      }))
    }
  }
  // -------------------------

  const removeFile = (index) => {
    setForm(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const serviceId = 'YOUR_SERVICE_ID'
    const templateId = 'YOUR_TEMPLATE_ID'
    const publicKey = 'YOUR_PUBLIC_KEY'

    // Sincronización técnica para enviar solo los archivos válidos
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
      console.error("Error al enviar:", error)
      setLoading(false)
      setStatus('error')
    }
  }

  const FieldLabel = ({ children }) => (
    <div className="mb-2">
      <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">{children}</label>
      <div className="h-px w-full bg-gradient-to-r from-red-900/60 to-transparent mt-1"></div>
    </div>
  )

  return (
    <section id="contact" className="relative py-16 px-6 overflow-hidden border-t border-white/5 bg-zinc-900">
      
      <div className="absolute inset-0 bg-zinc-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/50 via-zinc-900/80 to-black/80"></div>
      <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        <div className="w-full lg:w-1/3 pt-4 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 drop-shadow-md">Contacto</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6 text-balance">
            Para agendar una cita, completa el formulario. Responderé a la brevedad posible.
          </p>
          <div className="flex flex-col gap-2 text-xs text-zinc-500 uppercase tracking-widest">
            <span>Buenos Aires, ARG</span>
            <span>Estudio Privado</span>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="w-full lg:w-2/3 bg-zinc-900/50 border border-zinc-800/50 p-6 md:p-8 rounded-sm backdrop-blur-sm shadow-xl relative">
          
          <input type="hidden" name="has_tattoos" value={form.hasTattoos === true ? 'Sí' : form.hasTattoos === false ? 'No' : ''} />
          <input type="hidden" name="attachments_count" value={form.files.length} />

          <AnimatePresence>
            {(loading || status === 'success') && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-zinc-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 rounded-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin text-red-600 mb-4" size={48} />
                    <p className="text-zinc-300 text-sm tracking-widest uppercase animate-pulse">Enviando solicitud y archivos...</p>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="text-green-500 mb-4" size={48} />
                    <h3 className="text-2xl font-serif text-white mb-2">¡Mensaje Enviado!</h3>
                    <p className="text-zinc-400 text-sm">Me pondré en contacto contigo pronto.</p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            <div className="col-span-1 md:col-span-6">
              <FieldLabel>Nombre Completo</FieldLabel>
              <input 
                type="text" 
                name="from_name"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full bg-transparent border-b border-zinc-800 py-2 text-zinc-200 focus:outline-none focus:border-red-800 transition-colors text-sm"
                placeholder="Tu nombre" required disabled={loading}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <FieldLabel>Edad</FieldLabel>
              <input 
                type="number" 
                name="from_age"
                value={form.age}
                onChange={(e) => setForm({...form, age: e.target.value})}
                className="w-full bg-transparent border-b border-zinc-800 py-2 text-zinc-200 focus:outline-none focus:border-red-800 transition-colors text-sm"
                placeholder="18+" required disabled={loading}
              />
            </div>
            <div className="col-span-1 md:col-span-4">
              <FieldLabel>¿Tatuajes?</FieldLabel>
              <div className="flex gap-2 mt-2">
                {['SI', 'NO'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setForm({...form, hasTattoos: option === 'SI'})}
                    disabled={loading}
                    className={cn(
                      "flex-1 py-1 text-xs border transition-all duration-300",
                      (option === 'SI' && form.hasTattoos === true) || (option === 'NO' && form.hasTattoos === false)
                        ? "bg-red-900/20 border-red-900 text-red-100" 
                        : "border-zinc-700 text-zinc-500 hover:border-zinc-500"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <FieldLabel>Descripción de la Idea</FieldLabel>
            <textarea
              rows={3}
              name="message"
              value={form.idea}
              onChange={(e) => setForm({...form, idea: e.target.value})}
              className="w-full bg-transparent border-b border-zinc-800 py-2 text-zinc-200 focus:outline-none focus:border-red-800 transition-colors text-sm resize-none"
              placeholder="Zona, tamaño, estilo..." required disabled={loading}
            />
          </div>

          <div className="mb-8">
            <FieldLabel>Referencias (Máx 2MB por foto)</FieldLabel>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-2">
              <label className={cn(
                "w-full md:w-auto text-center cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 transition-colors rounded-sm text-xs text-zinc-300 border border-zinc-700",
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-700"
              )}>
                <Upload size={14} />
                <span>Subir Fotos</span>
                <input 
                  type="file" 
                  name="my_file" 
                  ref={fileInputRef}
                  multiple 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                  disabled={loading} 
                />
              </label>
              
              <div className="flex gap-2 overflow-x-auto w-full pb-2 md:pb-0">
                <AnimatePresence>
                  {form.files.map((file, index) => (
                    <motion.div
                      key={`${file.name}-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex-shrink-0 flex items-center gap-1 bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-[10px] text-zinc-400"
                    >
                      <span className="max-w-[60px] truncate">{file.name}</span>
                      <button type="button" onClick={() => removeFile(index)} className="hover:text-red-500" disabled={loading}>
                        <X size={10} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-950 to-red-900 hover:from-red-900 hover:to-red-800 text-white py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 border border-red-900/50 shadow-lg shadow-red-900/10 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Procesando...' : 'Enviar Solicitud'}</span>
              {!loading && <Send size={14} />}
            </button>
            
            {status === 'error' && (
              <div className="flex items-center justify-center gap-2 text-red-500 text-xs mt-2">
                <AlertCircle size={14} />
                <span>Error al enviar. Verifica el peso de las imágenes.</span>
              </div>
            )}
          </div>

        </form>
      </div>
    </section>
  )
}