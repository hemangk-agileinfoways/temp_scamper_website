import React, { useRef } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstCard = container.querySelector('.testimonial-card') as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 32; // gap-8 = 2rem = 32px
    const scrollAmount = cardWidth + gap;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white scroll-mt-20" id="testimonials">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center md:items-end">
          <div className="text-center md:text-left mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-[32px] sm:leading-[48px] lg:!leading-[64px]">
              Client Testimonials: Real Experiences
            </h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-slate-200 transition-colors bg-[#1D3C63] text-white hover:bg-[#1a3454]"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-slate-200 transition-colors bg-[#1D3C63] text-white hover:bg-[#1a3454]"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Testimonial 1 */}
          <div
            className="testimonial-card flex-shrink-0 w-full md:w-[calc(50%-16px)] bg-orange-50 rounded-3xl p-8 md:p-10"
            style={{ scrollSnapAlign: 'start' }}
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Scamper Software Streamlines School Management
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              As a school administrator, Scamper Software has significantly simplified the
              management of both students and teachers. The centralized platform allows me to easily
              monitor attendance, track academic progress, and manage exam schedules without the
              usual complexity.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://picsum.photos/id/65/60/60"
                alt="Sara L"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-slate-900">Sara L</p>
                <p className="text-xs text-slate-500">School Administrator, Little Flower School</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div
            className="testimonial-card flex-shrink-0 w-full md:w-[calc(50%-16px)] bg-cyan-50 rounded-3xl p-8 md:p-10"
            style={{ scrollSnapAlign: 'start' }}
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              How Scamper Transformed My Learning Experience
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              As a student, Scamper Software has truly transformed my learning experience. The
              seamless integration of class schedules, assignments, and exam management has made it
              incredibly easy to stay on top of my studies. I love how the exam-taking feature
              works.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://picsum.photos/id/103/60/60"
                alt="John Smith"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-slate-900">John Smith</p>
                <p className="text-xs text-slate-500">Student, Saint Bosch School</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
