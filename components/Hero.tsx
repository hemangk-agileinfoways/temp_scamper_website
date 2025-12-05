import React from 'react';

interface HeroProps {
  onRegisterClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  return (
    <section
      id="home"
      className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden hero-grid scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col gap-4">
        <h1 className="text-3xl md:text-6xl lg:text-[60px] font-semibold text-slate-900 tracking-tight !leading-[130%]">
          A K–12 <span className="text-amber-500">learning platform</span> built for
          <span className="text-[#1D3C63]"> schools</span>—delivering hands-on STEM,
          <br /> <span className="text-amber-500">entrepreneurship</span>, and financial literacy to
          prepare <span className="text-[#1D3C63]">students</span>
          <br /> for life beyond the classroom.
        </h1>

        <div className="relative flex items-center justify-center gap-[200px]">
          {/* Left Image (Boy) */}
          <div className="relative flex-shrink-0 hidden lg:block">
            <img
              src="/assets/Images/HeroSection/boy.png"
              alt="Boy Student"
              className="object-contain"
            />

            {/* Arrow pointing towards button */}
            <img
              src="/assets/Images/HeroSection/hero_image_arrow.png"
              alt="Arrow"
              className="absolute left-full top-1/2 -translate-y-[36%] object-contain"
            />
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center self-start">
            <button
              onClick={onRegisterClick}
              className="bg-[#1E3C63] text-white lg:px-10 lg:py-4 md:px-8 py-3 px-6 rounded-full font-semibold text-sm md:text-base lg:text-lg shadow-xl hover:scale-105 transition-transform duration-300"
            >
              Register Now
            </button>
          </div>

          {/* Right Image (Girl) */}
          <div className="relative flex-shrink-0 hidden lg:block">
            <img
              src="/assets/Images/HeroSection/girl.png"
              alt="Girl Student"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Center white gradient overlay - hides grid in center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] md:w-[400px] md:h-[300px] lg:w-[500px] lg:h-[350px] rounded-full pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle, white 0%, white 50%, rgba(255, 255, 255, 0.8) 70%, transparent 100%)'
        }}
      ></div>

      {/* Decorative gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
