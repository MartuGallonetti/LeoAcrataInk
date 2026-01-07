import React from 'react';
import { Droplets, SunDim, Waves, ShieldBan, Hand, AlertTriangle, Clock, Calendar } from 'lucide-react';

export default function Aftercare() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-black">
      
      {/* === FONDO DEL DRAGÓN (Más visible y estético) === */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/fondoAftercare.jpg" 
          alt="Fondo Dragón" 
          // CAMBIO CLAVE: opacity-30 (se ve más) y mix-blend-screen (resalta los claros/rojos del dibujo)
          className="w-full h-full object-cover opacity-30 mix-blend-screen pointer-events-none"
        />
        {/* Gradiente suave estilo 'Spotlight' (como el de Contacto que te gustó) */}
        {/* Deja el centro transparente para ver el dragón, oscurece solo los bordes */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_#000000_90%)]"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Título */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-red-600 tracking-[0.3em] text-xs font-bold uppercase mb-3 drop-shadow-md">
            Guía de Curación
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white font-light drop-shadow-xl tracking-wide">
            CUIDADOS ESENCIALES
          </h3>
          <p className="mt-8 text-zinc-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light bg-black/40 backdrop-blur-sm p-4 rounded-sm border border-white/5">
            El cuidado del tatuaje es una parte fundamental del proceso. De ello depende una correcta cicatrización y que el trabajo conserve sus tonos, detalles y contraste con el paso del tiempo.
          </p>
        </div>

        {/* FASE 1: EL FILM (Tarjeta bien oscura para que se lea sobre el dragón) */}
        <div className="bg-zinc-950/90 backdrop-blur-md border border-red-900/30 rounded-sm p-8 md:p-10 mb-16 flex flex-col md:flex-row items-center gap-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="p-5 bg-black rounded-full border border-red-900/60 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            <Clock className="text-red-500" size={36} />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-serif text-white mb-3 tracking-wide">Primeras 48 Horas: El Film</h4>
            <p className="text-zinc-300 text-base leading-relaxed font-light">
              Finalizada la sesión, el tatuaje se protege con un <strong className="text-white font-medium">film adherente</strong>. 
              Debe mantenerse colocado durante aproximadamente <strong className="text-white font-medium">48 horas</strong> (salvo indicación específica). 
              Esto evita bacterias y favorece la recuperación inicial.
            </p>
          </div>
        </div>

        {/* FASE 2: RUTINA DE LIMPIEZA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Paso 1 */}
          <div className="bg-black/90 backdrop-blur-md border border-zinc-800 p-8 rounded-sm text-center group hover:border-red-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(127,29,29,0.15)]">
            <Droplets className="mx-auto text-zinc-500 mb-5 group-hover:text-red-500 transition-colors duration-300" size={32} />
            <h5 className="text-white font-serif text-lg mb-3 tracking-wider">1. Lavar</h5>
            <p className="text-zinc-400 text-sm leading-relaxed font-light group-hover:text-zinc-200 transition-colors">
              Agua tibia y jabón neutro. Lavar suavemente sin frotar agresivamente.
            </p>
          </div>
          
          {/* Paso 2 */}
          <div className="bg-black/90 backdrop-blur-md border border-zinc-800 p-8 rounded-sm text-center group hover:border-red-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(127,29,29,0.15)]">
            <Hand className="mx-auto text-zinc-500 mb-5 group-hover:text-red-500 transition-colors duration-300" size={32} />
            <h5 className="text-white font-serif text-lg mb-3 tracking-wider">2. Secar</h5>
            <p className="text-zinc-400 text-sm leading-relaxed font-light group-hover:text-zinc-200 transition-colors">
              Con papel descartable o toalla limpia. Siempre a toques suaves, nunca arrastrando.
            </p>
          </div>

          {/* Paso 3 */}
          <div className="bg-black/90 backdrop-blur-md border border-zinc-800 p-8 rounded-sm text-center group hover:border-red-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(127,29,29,0.15)]">
            <Calendar className="mx-auto text-zinc-500 mb-5 group-hover:text-red-500 transition-colors duration-300" size={32} />
            <h5 className="text-white font-serif text-lg mb-3 tracking-wider">3. Hidratar</h5>
            <p className="text-zinc-400 text-sm leading-relaxed font-light group-hover:text-zinc-200 transition-colors">
              Aplicar capa fina de crema cicatrizante. Repetir 2 a 3 veces por día, por 10 a 15 días.
            </p>
          </div>
        </div>

        {/* FASE 3: PROHIBICIONES */}
        <div className="mb-16">
          <h4 className="text-center font-serif text-white text-2xl mb-10 tracking-widest opacity-90 drop-shadow-md">
            DURANTE LA CICATRIZACIÓN
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Tarjetas negras (bg-black/90) para máximo contraste */}
            <div className="flex items-center gap-4 p-5 bg-black/90 border border-red-900/20 rounded-sm hover:border-red-600/50 transition-colors">
              <ShieldBan className="text-red-600 shrink-0" size={22} />
              <span className="text-zinc-300 text-sm font-light tracking-wide">No rascar ni retirar costras</span>
            </div>
            
            <div className="flex items-center gap-4 p-5 bg-black/90 border border-red-900/20 rounded-sm hover:border-red-600/50 transition-colors">
              <SunDim className="text-red-600 shrink-0" size={22} />
              <span className="text-zinc-300 text-sm font-light tracking-wide">Evitar sol directo</span>
            </div>

            <div className="flex items-center gap-4 p-5 bg-black/90 border border-red-900/20 rounded-sm hover:border-red-600/50 transition-colors">
              <Waves className="text-red-600 shrink-0" size={22} />
              <span className="text-zinc-300 text-sm font-light tracking-wide">No piletas, mar o inmersión</span>
            </div>

            <div className="flex items-center gap-4 p-5 bg-black/90 border border-red-900/20 rounded-sm hover:border-red-600/50 transition-colors">
              <AlertTriangle className="text-red-600 shrink-0" size={22} />
              <span className="text-zinc-300 text-sm font-light tracking-wide">Evitar ropa ajustada/roce</span>
            </div>

             <div className="flex items-center gap-4 p-5 bg-black/90 border border-red-900/20 rounded-sm sm:col-span-2 lg:col-span-2 hover:border-red-600/50 transition-colors">
              <ShieldBan className="text-red-600 shrink-0" size={22} />
              <span className="text-zinc-300 text-sm font-light tracking-wide">No aplicar productos no recomendados</span>
            </div>

          </div>
        </div>

        {/* FASE 4: LARGO PLAZO */}
        {/* Fondo semitransparente para que el footer se lea bien sobre el dragón */}
        <div className="border-t border-zinc-900 pt-12 pb-8 text-center bg-black/40 backdrop-blur-sm rounded-sm">
          <h4 className="font-serif text-white mb-4 tracking-wider text-lg">Mantenimiento a Largo Plazo</h4>
          <p className="text-zinc-300 text-sm font-light max-w-3xl mx-auto leading-loose px-4">
            Una vez cicatrizado, el cuidado continuo es clave. Mantené la piel hidratada y utilizá 
            <span className="text-white font-medium border-b border-red-600 mx-1"> protector solar factor 50+ </span> 
            siempre que te expongas al sol. <br />
            <span className="italic text-red-400 block mt-4 text-xs tracking-wider font-serif">
              "El sol es el principal enemigo del contraste y los detalles."
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}