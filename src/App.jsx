import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Gallery from './components/sections/Gallery'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-200 selection:bg-red-900 selection:text-white">
      
      {/* Background Texture (Noise SVG) */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Navegación */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black border-b border-zinc-900 shadow-lg shadow-black/50">
        <span className="text-lg font-serif font-bold tracking-widest text-zinc-200">Leo Acrata</span>
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
          <a href="#about" className="hover:text-white transition-colors">Historia</a>
          <a href="#gallery" className="hover:text-white transition-colors">Trabajos</a>
          <a href="#contact" className="hover:text-white transition-colors">Contacto</a>
        </div>
      </nav>

      {/* Secciones */}
      <div className="relative z-10 pt-16">
        <Hero />
        <div id="about"><About /></div>
        <div id="gallery"><Gallery /></div>
        <Contact />
      </div>

      {/* Footer Corregido */}
      <footer className="relative z-10 py-8 text-center border-t border-zinc-900 bg-black">
        {/* CAMBIO AQUÍ: Se cambió text-zinc-600 a text-zinc-400 para mejor legibilidad */}
        <p className="text-zinc-200 text-[10px] uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Leo Acrata. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  )
}