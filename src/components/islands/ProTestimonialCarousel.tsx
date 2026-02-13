/**
 * ProTestimonialCarousel — auto-playing testimonial slider (Preact island).
 *
 * Matches Webflow's uui-testimonial15_component:
 *  - 3-up on desktop, 2 on tablet, 1 on mobile
 *  - autoplay every 4s, 500ms transition
 *  - arrow buttons (bottom-right) + dot indicators
 *  - card: white bg, primary-50 border, 1rem radius, 2rem padding
 */
import { useState, useEffect, useRef, useCallback } from "preact/hooks";

export interface CarouselTestimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
  companyLogo: string;
}

interface Props {
  testimonials: CarouselTestimonial[];
  autoplayMs?: number;
  transitionMs?: number;
}

export default function ProTestimonialCarousel({
  testimonials,
  autoplayMs = 4000,
  transitionMs = 500,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSlides = testimonials.length;
  const maxIndex = Math.max(0, totalSlides - slidesPerView);

  // Responsive slides-per-view
  useEffect(() => {
    const updateSlidesPerView = () => {
      const w = window.innerWidth;
      if (w < 640) setSlidesPerView(1);
      else if (w < 1024) setSlidesPerView(2);
      else setSlidesPerView(3);
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  // Clamp index when slidesPerView changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (index: number) => {
      setIsTransitioning(true);
      // Wrap around for infinite feel
      if (index > maxIndex) setCurrentIndex(0);
      else if (index < 0) setCurrentIndex(maxIndex);
      else setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), transitionMs);
    },
    [maxIndex, transitionMs],
  );

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(next, autoplayMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, autoplayMs]);

  // Pause on hover
  const pauseAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const resumeAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, autoplayMs);
  };

  // Dot count = number of "pages"
  const dotCount = maxIndex + 1;

  const slideWidthPercent = 100 / slidesPerView;

  return (
    <div
      class="relative"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Slide track */}
      <div class="overflow-hidden">
        <div
          class="flex"
          style={{
            transform: `translateX(-${currentIndex * slideWidthPercent}%)`,
            transition: `transform ${transitionMs}ms ease-in-out`,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              class="flex-shrink-0 px-3"
              style={{ width: `${slideWidthPercent}%` }}
            >
              <div class="flex h-full flex-col rounded-2xl border border-primary-50 bg-white p-6 sm:p-8">
                {/* Company logo */}
                <img
                  src={t.companyLogo}
                  alt="Company logo"
                  class="mb-4 h-6 w-auto max-w-[120px] object-contain"
                  loading="lazy"
                />
                {/* Quote */}
                <p class="flex-1 text-sm font-medium leading-relaxed text-gray-900 sm:text-base">
                  {t.quote}
                </p>
                {/* Attribution — pinned to bottom */}
                <div class="mt-6 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    class="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p class="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p class="text-xs text-gray-500">{t.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation: arrows + dots */}
      <div class="mt-8 flex items-center justify-between px-3">
        {/* Dots */}
        <div class="flex items-center gap-2">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              class={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === currentIndex
                  ? "bg-purple-700"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div class="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50"
          >
            <svg
              class="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next testimonials"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50"
          >
            <svg
              class="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
