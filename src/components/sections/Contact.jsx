import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Send,
  CheckCircle2,
  Loader2,
  ImagePlus,
  AlertCircle,
  Instagram,
} from 'lucide-react'
import emailjs from '@emailjs/browser'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const FILE_INPUT_ID = 'file-upload-input'

const inputStyle = {
  WebkitBoxShadow: '0 0 0px 1000px #09090b inset',
  WebkitTextFillColor: 'white',
  caretColor: 'white',
}

const initialForm = {
  nombre: '',
  email: '',
  zona: '',
  tamano: '',
  mensaje: '',
  files: [],
}

const InputBase = ({ label, id, ...props }) => (
  <div className="group flex flex-col gap-2">
    <label
      htmlFor={id}
      className="ml-1 text-[11px] font-black uppercase tracking-[0.15em] text-zinc-300"
    >
      {label}
    </label>

    <input
      {...props}
      id={id}
      style={inputStyle}
      className="w-full appearance-none rounded-sm border border-zinc-700 bg-zinc-950 px-4 py-4 text-sm font-medium text-white transition-all placeholder:text-zinc-600 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-900"
    />
  </div>
)

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [status, setStatus] = useState(null)
  const [fileError, setFileError] = useState('')
  const [form, setForm] = useState(initialForm)

  const updateField = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  const resetFileInput = () => {
    const fileInput = document.getElementById(FILE_INPUT_ID)

    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]

    setFileError('')

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      setFileError('El archivo seleccionado debe ser una imagen.')
      resetFileInput()
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('La imagen supera el máximo permitido de 10 MB.')
      resetFileInput()
      return
    }

    setForm((currentForm) => ({
      ...currentForm,
      files: [file],
    }))
  }

  const removeFile = () => {
    setForm((currentForm) => ({
      ...currentForm,
      files: [],
    }))

    setFileError('')
    resetFileInput()
  }

  const uploadToCloudinary = async (file) => {
    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', 'alrp7v6n')

    const cloudName = 'dfofi41bh'
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Cloudinary no pudo subir la imagen.')
    }

    const data = await response.json()

    if (!data.secure_url) {
      throw new Error('Cloudinary no devolvió una URL válida.')
    }

    return data.secure_url
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (loading) {
      return
    }

    setLoading(true)
    setLoadingText('Preparando consulta...')
    setStatus(null)
    setFileError('')

    const serviceId = 'service_c4273bg'
    const templateId = 'template_javeiqu'
    const publicKey = 'pvDY7rIDJypYZqU6H'

    try {
      let imageUrl = ''

      if (form.files.length > 0) {
        setLoadingText('Subiendo imagen...')
        imageUrl = await uploadToCloudinary(form.files[0])
      }

      const templateParams = {
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        zona: form.zona.trim(),
        tamano: form.tamano.trim(),
        mensaje: form.mensaje.trim(),
        has_image: Boolean(imageUrl),
        imagen_url: imageUrl,
      }

      setLoadingText('Enviando consulta...')

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey,
      )

      setForm(initialForm)
      resetFileInput()
      setStatus('success')
    } catch (error) {
      console.error('No se pudo enviar la consulta:', error)
      setStatus('error')
    } finally {
      setLoading(false)
      setLoadingText('')
    }
  }

  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden border-t border-zinc-900 bg-black px-4 py-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-[11px] font-black uppercase tracking-[0.4em] text-red-600">
            Contacto
          </h2>

          <h3 className="mb-3 font-serif text-4xl text-white md:text-5xl">
            PRESUPUESTOS
          </h3>

          <p className="mx-auto max-w-sm text-sm font-medium text-zinc-300">
            Completá los datos y, si querés, agregá una imagen de referencia.
          </p>
        </div>

        <div className="relative rounded-sm border border-zinc-800 bg-zinc-950 p-6 shadow-2xl md:p-8">
          <form
            onSubmit={handleSubmit}
            className="relative z-10 space-y-6"
          >
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  aria-live="polite"
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-6 text-center backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                  >
                    <CheckCircle2
                      className="mx-auto mb-5 text-green-500"
                      size={60}
                    />

                    <h3 className="mb-3 font-serif text-3xl text-white">
                      ¡Enviado!
                    </h3>

                    <p className="mb-8 text-sm text-zinc-300">
                      La consulta llegó correctamente. Leo te responderá pronto.
                    </p>

                    <button
                      type="button"
                      onClick={() => setStatus(null)}
                      className="rounded-full bg-white px-8 py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-zinc-200"
                    >
                      Cerrar
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <InputBase
                id="contact-name"
                label="Nombre completo"
                name="nombre"
                autoComplete="name"
                value={form.nombre}
                onChange={(event) =>
                  updateField('nombre', event.target.value)
                }
                placeholder="Tu nombre"
                disabled={loading}
                required
              />

              <InputBase
                id="contact-email"
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) =>
                  updateField('email', event.target.value)
                }
                placeholder="tumail@ejemplo.com"
                disabled={loading}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <InputBase
                id="contact-zone"
                label="Zona del cuerpo"
                name="zona"
                value={form.zona}
                onChange={(event) =>
                  updateField('zona', event.target.value)
                }
                placeholder="Ej: Antebrazo"
                disabled={loading}
                required
              />

              <InputBase
                id="contact-size"
                label="Tamaño aproximado (cm)"
                name="tamano"
                value={form.tamano}
                onChange={(event) =>
                  updateField('tamano', event.target.value)
                }
                placeholder="Ej: 15 × 10 cm"
                disabled={loading}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="ml-1 text-[11px] font-black uppercase tracking-[0.15em] text-zinc-300"
              >
                Descripción
              </label>

              <textarea
                id="contact-message"
                name="mensaje"
                rows={4}
                value={form.mensaje}
                onChange={(event) =>
                  updateField('mensaje', event.target.value)
                }
                style={inputStyle}
                className="w-full resize-none appearance-none rounded-sm border border-zinc-700 bg-zinc-950 px-4 py-4 text-sm font-medium text-white transition-all placeholder:text-zinc-600 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-900"
                placeholder="Contanos los detalles de la idea..."
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor={FILE_INPUT_ID}
                className={`flex w-full flex-col items-center justify-center gap-3 rounded-sm border border-dashed p-6 transition-all ${
                  loading
                    ? 'cursor-not-allowed border-zinc-800 bg-zinc-900/30 opacity-60'
                    : 'cursor-pointer border-zinc-600 bg-zinc-900/50 hover:border-zinc-500 hover:bg-zinc-900'
                }`}
              >
                <ImagePlus
                  size={24}
                  className="text-zinc-400"
                />

                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-white">
                    Subir imagen de referencia
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-500">
                    JPG, PNG o WebP. Máximo 10 MB.
                  </p>
                </div>
              </label>

              <input
                id={FILE_INPUT_ID}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={loading}
                className="hidden"
              />

              {fileError && (
                <div
                  role="alert"
                  className="flex items-center justify-center gap-2 text-sm text-red-400"
                >
                  <AlertCircle size={16} />
                  <span>{fileError}</span>
                </div>
              )}

              {form.files.length > 0 && (
                <div className="mt-3 flex justify-center">
                  <div className="flex max-w-full items-center gap-2 rounded-full border border-zinc-600 bg-zinc-800 px-3 py-1.5 text-[10px] text-white">
                    <CheckCircle2
                      size={14}
                      className="shrink-0 text-green-400"
                    />

                    <span className="max-w-[220px] truncate">
                      {form.files[0].name}
                    </span>

                    <button
                      type="button"
                      onClick={removeFile}
                      disabled={loading}
                      aria-label="Eliminar imagen seleccionada"
                      className="rounded-full p-1 text-red-400 transition-colors hover:bg-red-950 hover:text-red-300"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {status === 'error' && (
              <div
                role="alert"
                aria-live="assertive"
                className="flex items-start gap-3 rounded-sm border border-red-900/70 bg-red-950/30 p-4 text-sm text-red-200"
              >
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-red-500"
                />

                <div>
                  <p className="font-bold">
                    No pudimos enviar la consulta.
                  </p>

                  <p className="mt-1 text-xs text-red-200/80">
                    Tus datos siguen cargados. Revisá la conexión e intentá
                    nuevamente.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-sm bg-white py-5 text-xs font-black uppercase tracking-[0.3em] text-black shadow-xl transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
            >
              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin text-red-700"
                  />
                  <span>{loadingText}</span>
                </>
              ) : (
                <>
                  <span>Enviar consulta</span>
                  <Send
                    size={16}
                    className="text-red-700"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        <footer className="mt-12 flex flex-col items-center gap-6 pb-10">
          <div className="flex items-center gap-6">
            <img
              src="/logo.png"
              alt="Logo de Leo Acrata"
              loading="lazy"
              decoding="async"
              className="h-32 w-32 object-contain brightness-110"
            />

            <div
              aria-hidden="true"
              className="h-8 w-px bg-zinc-800"
            />

            <a
              href="https://instagram.com/leo_acrata"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 transition-all hover:text-white"
            >
              <Instagram size={18} />
              @leo_acrata
            </a>
          </div>

          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">
            © 2026 Leo Acrata. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </section>
  )
}