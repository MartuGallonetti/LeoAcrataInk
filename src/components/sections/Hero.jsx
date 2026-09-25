import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative mb-12 w-full overflow-hidden bg-black py-20 lg:py-32">
      <div className="absolute inset-0 z-0 h-full w-full">
        <img
          src="/hero/fondoDarumaHero-1024.webp"
          srcSet="
            /hero/fondoDarumaHero-768.webp 768w,
            /hero/fondoDarumaHero-1024.webp 1024w
          "
          sizes="100vw"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="pointer-events-none h-full w-full scale-105 object-cover grayscale opacity-20 mix-blend-screen"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,_var(--tw-gradient-stops))] from-zinc-800/40 via-black to-black mix-blend-normal" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-80" />
      </div>

      <div className="container relative z-10 mx-auto flex items-center justify-center gap-16 px-6 lg:flex-row lg:gap-24">
        <div className="grid w-full grid-cols-2 gap-4 lg:w-1/2">
          <div className="mt-12 h-[350px] overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900 shadow-2xl lg:h-[450px]">
            <img
              src="/hero/LeoPrincipal-960.webp"
              alt="Leo Acrata, tattoo artist"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover grayscale transition-all duration-700 ease-in-out hover:grayscale-0"
            />
          </div>

          <div className="h-[350px] overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900 shadow-2xl lg:h-[450px]">
            <img
              src="/hero/LeonAntebrazo-960.webp"
              alt="Tatuaje de león realizado por Leo Acrata"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover grayscale transition-all duration-700 ease-in-out hover:grayscale-0"
            />
          </div>
        </div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            delay: 0.2,
          }}
          className="w-full text-center lg:w-1/2 lg:text-left"
        >
          <h2 className="mb-6 pl-1 text-xs font-bold uppercase tracking-[0.4em] text-red-700">
            Tattoo Artist
          </h2>

          <h1 className="mb-6 font-serif text-5xl font-light leading-none tracking-widest text-white lg:text-7xl">
            LEO ACRATA
          </h1>

          <div className="mx-auto mb-8 h-px w-24 bg-red-900/50 lg:mx-0" />

          <p className="mx-auto max-w-md text-sm font-light leading-relaxed tracking-wide text-zinc-400 lg:mx-0 lg:text-base">
            Especialista en realismo y Black & Grey. Transformando
            ideas en marcas eternas con precisión y arte.
          </p>
        </motion.div>
      </div>
    </section>
  );
}