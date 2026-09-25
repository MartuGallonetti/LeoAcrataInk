import React, { useEffect, useState } from 'react';
import { Menu, X, ChevronDown, Instagram } from 'lucide-react';

import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import About from './components/sections/About';
import Aftercare from './components/sections/Aftercare';
import Contact from './components/sections/Contact';

const LOADER_DISPLAY_TIME = 1400;
const LOADER_EXIT_TIME = 350;

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const loader = document.getElementById('initial-loader');

    if (!loader) {
      return undefined;
    }

    let removeTimer;

    const hideTimer = window.setTimeout(() => {
      loader.classList.add('is-hiding');

      removeTimer = window.setTimeout(() => {
        loader.remove();
      }, LOADER_EXIT_TIME);
    }, LOADER_DISPLAY_TIME);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="relative min-h-screen bg-zinc-950 text-zinc-200 selection:bg-red-900 selection:text-white">
      <div
        className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />

      <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center justify-between px-6 py-4">
          <div
            onClick={scrollToTop}
            className="group relative cursor-pointer"
          >
            <div className="absolute inset-0 scale-150 rounded-full bg-red-600 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-80" />

            <img
              src="/logo.png"
              alt="Leo Acrata"
              className="relative z-10 h-12 w-12 object-contain brightness-110 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="hidden items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 md:flex">
            <a
              href="#gallery"
              className="group relative transition-colors hover:text-white"
            >
              Trabajos
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#about"
              className="group relative transition-colors hover:text-white"
            >
              Historia
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#aftercare"
              className="group relative transition-colors hover:text-white"
            >
              Cuidados
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#contact"
              className="group relative transition-colors hover:text-white"
            >
              Contacto
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="https://instagram.com/leo_acrata"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Leo Acrata"
              className="text-white transition-colors hover:text-red-500"
            >
              <Instagram size={18} />
            </a>
          </div>

          <button
            type="button"
            aria-label={
              isMenuOpen
                ? 'Cerrar menú de navegación'
                : 'Abrir menú de navegación'
            }
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="z-50 text-zinc-300 hover:text-white md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] flex h-screen w-screen flex-col items-center justify-center gap-10 bg-black">
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Cerrar menú de navegación"
              className="absolute right-6 top-6 p-2 text-zinc-400 hover:text-red-500"
            >
              <X size={32} />
            </button>

            <img
              src="/logo.png"
              alt="Leo Acrata"
              className="mb-4 h-24 w-24 object-contain brightness-125"
            />

            <a
              href="#gallery"
              onClick={closeMenu}
              className="font-serif text-2xl font-bold uppercase tracking-[0.2em] text-zinc-300 hover:text-white"
            >
              Trabajos
            </a>

            <a
              href="#about"
              onClick={closeMenu}
              className="font-serif text-2xl font-bold uppercase tracking-[0.2em] text-zinc-300 hover:text-white"
            >
              Historia
            </a>

            <a
              href="#aftercare"
              onClick={closeMenu}
              className="font-serif text-2xl font-bold uppercase tracking-[0.2em] text-zinc-300 hover:text-white"
            >
              Cuidados
            </a>

            <a
              href="#contact"
              onClick={closeMenu}
              className="font-serif text-2xl font-bold uppercase tracking-[0.2em] text-red-600 hover:text-red-500"
            >
              Contacto
            </a>
          </div>
        )}
      </nav>

      <div className="relative z-10 pt-0">
        <section className="relative flex h-[85vh] w-full flex-col justify-end overflow-hidden pb-12 lg:hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/hero/leo-mobile-1280.webp"
              srcSet="
                /hero/leo-mobile-640.webp 640w,
                /hero/leo-mobile-1280.webp 1280w,
                /hero/leo-mobile-1920.webp 1920w
              "
              sizes="100vw"
              alt="Leo Acrata, tattoo artist"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-top grayscale opacity-60"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          </div>

          <div className="relative z-10 px-6 text-center animate-fade-in-up">
            <div className="mb-6 flex justify-center">
              <img
                src="/logo.png"
                alt="Logo de Leo Acrata"
                className="h-24 w-24 object-contain brightness-125 drop-shadow-2xl"
              />
            </div>

            <h1 className="mb-2 font-serif text-4xl font-light uppercase tracking-widest text-white drop-shadow-md">
              Leo Acrata
            </h1>

            <div className="mx-auto mb-4 h-px w-12 bg-red-900 opacity-80" />

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Tattoo Artist
            </p>

            <div className="mt-12 animate-bounce text-zinc-500 opacity-60">
              <ChevronDown size={24} className="mx-auto" />
            </div>
          </div>
        </section>

        <div className="hidden lg:block">
          <Hero />
        </div>

        <div id="gallery">
          <Gallery />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="aftercare">
          <Aftercare />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </div>
    </main>
  );
}