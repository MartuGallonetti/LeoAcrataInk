import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, Loader2, ImagePlus, AlertCircle, Instagram } from 'lucide-react'
import emailjs from '@emailjs/browser'

// ESTILOS
const inputStyle = {
  WebkitBoxShadow: "0 0 0px 1000px #09090b inset",
  WebkitTextFillColor: "white",
  caretColor: "white"
}

const InputBase = ({ label, ...props }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[11px] font-black uppercase tracking-[0.15em] text-zinc-300 ml-1">
      {label}
    </label>
    <input 
      {...props}
      style={inputStyle}
      className="w-full bg-zinc-950 border border-zinc-700 rounded-sm px-4 py-4 text-sm text-white font-medium
                placeholder:text-zinc-600
                focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-900
                transition-all appearance-none"
    />
  </div>
)

export default function Contact() {
  const formRef = useRef()
  const fileInputId = "file-upload-input" 
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [status, setStatus] = useState(null)
  
  const [form, setForm] = useState({
    nombre: '', email: '', zona: '', tamano: '', mensaje: '', files: [] 
  })

  // FOTOS
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("La foto es muy pesada (Máx 10MB).");
        return;
      }
      setForm(prev => ({ ...prev, files: [file] }));
    }
  }

  const removeFile = () => {
    setForm(prev => ({ ...prev, files: [] }));
    const input = document.getElementById(fileInputId);
    if (input) input.value = "";
  }

  // ---- CLAVES CLOUDINARY ------
    const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "alrp7v6n"); // TU PRESET
    const cloudName = "dfofi41bh"; // <--- CAMBIAR POR TU CLOUD NAME

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: formData });
      if (!response.ok) throw new Error("Error Cloudinary");
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
// -----CLAVES EMAILJS-----
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const serviceId = 'service_c4273bg'
    const templateId = 'template_javeiqu'
    const publicKey = 'pvDY7rIDJypYZqU6H'

    try {
      let imageUrl = "Sin adjunto";
      if (form.files.length > 0) {
        setLoadingText('Subiendo foto...');
        imageUrl = await uploadToCloudinary(form.files[0]);
      }

      const templateParams = { ...form, imagen_url: imageUrl };
      setLoadingText('Enviando...');
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setLoading(false); setStatus('success');
      setForm({ nombre: '', email: '', zona: '', tamano: '', mensaje: '', files: [] });
    } catch (error) {
      setLoading(false); setStatus('error');
    }
  }

  return (
    <section id="contact" className="relative py-20 px-4 bg-black border-t border-zinc-900 overflow-hidden min-h-screen flex flex-col items-center justify-center">
      
      <div className="max-w-4xl w-full mx-auto relative z-10">
        
        <div className="text-center mb-10">
          <h2 className="text-red-600 tracking-[0.4em] text-[11px] font-black uppercase mb-3">CONTACTO</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-3">PRESUPUESTOS</h3>
          <p className="text-zinc-300 text-sm font-medium max-w-sm mx-auto">
            Completá todos los datos para cotizar tu idea.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-sm p-6 md:p-8 shadow-2xl relative">
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <AnimatePresence>
              {status === 'success' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm">
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                    <CheckCircle2 className="text-green-500 mb-5 mx-auto" size={60} />
                    <h3 className="text-3xl font-serif text-white mb-3">¡Enviado!</h3>
                    <p className="text-zinc-300 text-sm mb-8">Leo te responderá pronto.</p>
                    <button type="button" onClick={() => setStatus(null)} className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest">Cerrar</button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputBase label="Nombre Completo" name="nombre" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} placeholder="Tu nombre" required />
              <InputBase label="Email" type="email" name="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="tumail@ejemplo.com" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputBase label="Zona del Cuerpo" name="zona" value={form.zona} onChange={(e) => setForm({...form, zona: e.target.value})} placeholder="Ej: Antebrazo" required />
              <InputBase label="Tamaño Aprox (cm)" name="tamano" value={form.tamano} onChange={(e) => setForm({...form, tamano: e.target.value})} placeholder="Ej: 15x10 cm" required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase tracking-[0.15em] text-zinc-300 ml-1">Descripción</label>
              <textarea name="mensaje" rows={4} value={form.mensaje} onChange={(e) => setForm({...form, mensaje: e.target.value})} style={inputStyle} className="w-full bg-zinc-950 border border-zinc-700 rounded-sm px-4 py-4 text-sm text-white font-medium focus:outline-none focus:border-red-600 transition-all resize-none appearance-none" placeholder="Detalles de la idea..." required />
            </div>

            <div className="space-y-3">
              <label htmlFor={fileInputId} className="w-full border border-dashed border-zinc-600 bg-zinc-900/50 rounded-sm p-6 flex flex-col items-center justify-center gap-3 hover:bg-zinc-900 transition-all cursor-pointer">
                  <ImagePlus size={24} className="text-zinc-400"/>
                  <p className="text-white text-xs font-bold uppercase tracking-wider">Subir Referencia</p>
              </label>
              <input id={fileInputId} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              {form.files.length > 0 && (
                <div className="flex justify-center mt-3">
                    <div className="bg-zinc-800 border border-zinc-600 text-white text-[10px] px-3 py-1.5 rounded-full flex items-center gap-2">
                        <span className="max-w-[150px] truncate">{form.files[0].name}</span>
                        <button type="button" onClick={removeFile} className="text-red-400 p-1"><X size={14} /></button>
                    </div>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-white text-black py-5 rounded-sm uppercase tracking-[0.3em] text-xs font-black active:scale-[0.98] flex justify-center items-center gap-3 hover:bg-zinc-200 shadow-xl transition-all">
              <span>{loading ? loadingText : 'Enviar Consulta'}</span>
              {!loading && <Send size={16} className="text-red-700" />}
            </button>
          </form>
        </div>

        {/* === FOOTER CORRECTO === */}
        <footer className="mt-12 flex flex-col items-center gap-6 pb-10">
          <div className="flex items-center gap-6">
            
            {/* Llama a la imagen desde la carpeta PUBLIC */}
            <img 
              src="/logo.png" 
              alt="LA Logo" 
              className="w-32 h-32 object-contain brightness-110" 
            />
            
            <div className="h-8 w-px bg-zinc-800"></div> 

            <a href="https://instagram.com/leo_acrata" target="_blank" className="flex items-center gap-2 text-zinc-400 text-[11px] uppercase tracking-[0.2em] hover:text-white transition-all font-bold">
              <Instagram size={18} /> @leo_acrata
            </a>
          </div>

          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.15em] font-medium">
            © 2026 Leo Acrata. Todos los derechos reservados.
          </p>
        </footer>

      </div>
    </section>
  )
}