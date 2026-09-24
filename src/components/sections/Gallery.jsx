import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';

const SWIPE_THRESHOLD = 60;
const CARD_SIZES = '(max-width: 767px) 78vw, 380px';

const galleryItems = [
  {
    fileName: 'leoGorra',
    alt: 'Trabajo de tatuaje realizado por Leo Acrata',
  },
  {
    fileName: 'conveVilla',
    alt: 'Tatuaje presentado en la convención de Villa',
  },
  {
    fileName: 'diabloMonja',
    alt: 'Tatuaje de composición diablo y monja',
  },
  {
    fileName: 'DragonPierna',
    alt: 'Tatuaje de dragón realizado en la pierna',
  },
  {
    fileName: 'espaldaCompleta',
    alt: 'Tatuaje de espalda completa',
  },
  {
    fileName: 'foxRiver',
    alt: 'Tatuaje inspirado en Fox River',
  },
  {
    fileName: 'guerreAntebrzo',
    alt: 'Tatuaje realizado en el antebrazo',
  },
  {
    fileName: 'leoMonja',
    alt: 'Leo Acrata junto a un tatuaje de monja',
  },
  {
    fileName: 'mangaMonja',
    alt: 'Manga de tatuaje con diseño de monja',
  },
  {
    fileName: 'tatuandoRemeNegra',
    alt: 'Leo Acrata durante una sesión de tatuaje',
  },
  {
    fileName: 'Snoop',
    alt: 'Tatuaje de retrato inspirado en Snoop Dogg',
  },
];

const images = galleryItems.map(({ fileName, alt }) => ({
  originalSrc: `/${fileName}.webp`,
  smallSrc: `/gallery/${fileName}-480.webp`,
  cardSrc: `/gallery/${fileName}-960.webp`,
  alt,
}));

const getWrappedIndex = (index) =>
  (index + images.length) % images.length;

const getCardSrcSet = (image) =>
  `${image.smallSrc} 480w, ${image.cardSrc} 960w`;

const slideStyles = {
  previous: {
    x: '-72%',
    scale: 0.72,
    opacity: 0.48,
    filter: 'grayscale(100%) brightness(0.55)',
    zIndex: 10,
  },
  current: {
    x: '0%',
    scale: 1,
    opacity: 1,
    filter: 'grayscale(0%) brightness(1)',
    zIndex: 30,
  },
  next: {
    x: '72%',
    scale: 0.72,
    opacity: 0.48,
    filter: 'grayscale(100%) brightness(0.55)',
    zIndex: 10,
  },
};

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleSlides = useMemo(
    () => [
      {
        position: 'previous',
        index: getWrappedIndex(currentIndex - 1),
      },
      {
        position: 'current',
        index: currentIndex,
      },
      {
        position: 'next',
        index: getWrappedIndex(currentIndex + 1),
      },
    ],
    [currentIndex],
  );

  const showNext = useCallback(() => {
    setCurrentIndex((previousIndex) =>
      getWrappedIndex(previousIndex + 1),
    );
  }, []);

  const showPrevious = useCallback(() => {
    setCurrentIndex((previousIndex) =>
      getWrappedIndex(previousIndex - 1),
    );
  }, []);

  const openImage = () => {
    setIsModalOpen(true);
  };

  const closeImage = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    const nextImageIndex = getWrappedIndex(currentIndex + 2);
    const nextImage = images[nextImageIndex];
    const preloadImage = new Image();

    preloadImage.srcset = getCardSrcSet(nextImage);
    preloadImage.sizes = CARD_SIZES;
    preloadImage.src = nextImage.cardSrc;
  }, [currentIndex]);

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeImage();
      }

      if (event.key === 'ArrowLeft') {
        showPrevious();
      }

      if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    closeImage,
    isModalOpen,
    showNext,
    showPrevious,
  ]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x <= -SWIPE_THRESHOLD) {
      showNext();
      return;
    }

    if (info.offset.x >= SWIPE_THRESHOLD) {
      showPrevious();
    }
  };

  const handleSlideSelection = (position) => {
    if (position === 'previous') {
      showPrevious();
      return;
    }

    if (position === 'next') {
      showNext();
      return;
    }

    openImage();
  };

  return (
    <section className="flex min-h-[80vh] flex-col justify-center overflow-hidden bg-black py-20">
      <div className="container mx-auto mb-12 px-6 text-center">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-red-800">
          Portafolio
        </h2>

        <h3 className="font-serif text-3xl text-white">
          TRABAJOS RECIENTES
        </h3>
      </div>

      <div className="relative mx-auto flex h-[450px] w-full max-w-5xl items-center justify-center md:h-[550px]">
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Ver trabajo anterior"
          className="absolute left-4 z-50 rounded-full border border-white/20 bg-black/60 p-3 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-red-900 active:scale-95 md:left-0"
        >
          <ChevronLeft size={30} />
        </button>

        <div className="relative flex h-full w-full items-center justify-center">
          {visibleSlides.map(({ position, index }) => {
            const image = images[index];
            const isCurrent = position === 'current';

            return (
              <motion.div
                key={image.originalSrc}
                initial={false}
                animate={slideStyles[position]}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                drag={isCurrent ? 'x' : false}
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                dragElastic={0.12}
                onDragEnd={handleDragEnd}
                onTap={() =>
                  handleSlideSelection(position)
                }
                className="absolute h-[450px] w-[78vw] max-w-[300px] cursor-pointer overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900 shadow-[0_20px_60px_rgba(0,0,0,0.9)] md:h-[550px] md:max-w-[380px]"
              >
                <img
                  src={image.cardSrc}
                  srcSet={getCardSrcSet(image)}
                  sizes={CARD_SIZES}
                  alt={image.alt}
                  loading="eager"
                  fetchPriority={
                    isCurrent ? 'high' : 'auto'
                  }
                  decoding="async"
                  draggable="false"
                  className="h-full w-full select-none object-cover"
                />

                {isCurrent && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <Maximize2
                      className="text-white drop-shadow-md"
                      size={32}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={showNext}
          aria-label="Ver trabajo siguiente"
          className="absolute right-4 z-50 rounded-full border border-white/20 bg-black/60 p-3 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-red-900 active:scale-95 md:right-0"
        >
          <ChevronRight size={30} />
        </button>
      </div>

      <div
        className="mt-8 flex justify-center gap-2"
        aria-label="Selector de trabajos"
      >
        {images.map((image, index) => (
          <button
            key={image.originalSrc}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ver trabajo ${index + 1}`}
            aria-current={
              index === currentIndex
                ? 'true'
                : undefined
            }
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-7 bg-red-700'
                : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
            }`}
          />
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={closeImage}
            role="dialog"
            aria-modal="true"
            aria-label="Vista ampliada del trabajo"
          >
            <button
              type="button"
              onClick={closeImage}
              aria-label="Cerrar imagen ampliada"
              className="absolute right-6 top-6 z-[210] text-zinc-400 transition-colors hover:text-white"
            >
              <X size={32} />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Ver trabajo anterior"
              className="absolute left-4 z-[210] rounded-full bg-black/60 p-3 text-white transition-colors hover:bg-red-900 md:left-8"
            >
              <ChevronLeft size={30} />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={images[currentIndex].originalSrc}
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                }}
                transition={{ duration: 0.25 }}
                src={images[currentIndex].originalSrc}
                alt={images[currentIndex].alt}
                decoding="async"
                className="max-h-[90vh] max-w-full rounded-sm border border-zinc-800 object-contain shadow-2xl"
                onClick={(event) =>
                  event.stopPropagation()
                }
              />
            </AnimatePresence>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Ver trabajo siguiente"
              className="absolute right-4 z-[210] rounded-full bg-black/60 p-3 text-white transition-colors hover:bg-red-900 md:right-8"
            >
              <ChevronRight size={30} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}