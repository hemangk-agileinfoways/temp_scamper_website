import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-[#F8F5FF] rounded-xl p-12 transition-colors">
            <h3 className="text-4xl md:text-5xl font-extrabold text-[#1e293b] mb-2">200+</h3>
            <p className="text-lg font-medium text-slate-600">Schools</p>
          </div>

          <div className="bg-[#F8F5FF] rounded-xl p-12 transition-colors">
            <h3 className="text-4xl md:text-5xl font-extrabold text-[#1e293b] mb-2">1200+</h3>
            <p className="text-lg font-medium text-slate-600">Students</p>
          </div>

          <div className="bg-[#F8F5FF] rounded-xl p-12 transition-colors">
            <h3 className="text-4xl md:text-5xl font-extrabold text-[#1e293b] mb-2">500+</h3>
            <p className="text-lg font-medium text-slate-600">Teachers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
