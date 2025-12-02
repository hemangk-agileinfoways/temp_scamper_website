import React from 'react';

import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'A', value: 30 },
  { name: 'B', value: 80 },
  { name: 'C', value: 45 },
  { name: 'D', value: 60 },
  { name: 'E', value: 20 },
  { name: 'F', value: 90 }
];

const Benefits: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-[#FCFBFF] scroll-mt-20" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-[32px] sm:leading-[48px] lg:!leading-[64px]">
            Benefits: Transforming School Management and Enhancing the Learning Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Find Courses - Spans 2 cols */}
          <div
            className="
    md:col-span-2 bg-[#E7F1FF] rounded-2xl 
    px-6 sm:px-8 py-8 sm:py-12 
    flex flex-col lg:flex-row  
    gap-6 sm:gap-9 
    relative overflow-hidden group hover:shadow-lg transition-shadow
  "
          >
            <div
              className="flex flex-col gap-3 sm:gap-4 z-10 px-2 sm:px-0 
      w-full lg:w-auto
    "
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold leading-[24px] md:leading-[32px] lg:!leading-[48px]">
                Find Most Important Courses on Fingertips
              </h3>

              <p
                className="
        text-sm sm:text-base lg:text-[20px]
        leading-[20px] sm:leading-[24px] lg:!leading-[32px]
      "
              >
                Quickly Access Key Courses and Chapters for Efficient Learning and Teaching
              </p>
            </div>

            {/* Visual Representations */}
            <div
              className="
      flex gap-3 sm:gap-5 justify-center lg:justify-start
      w-full lg:w-auto
    "
            >
              <div
                className="
        bg-white p-2 sm:p-3 rounded-3xl shadow-md
        w-[200px] sm:w-[250px] lg:w-[204px]
        h-[250px] sm:h-[300px] lg:h-[272px]
        flex flex-col items-center justify-end
      "
              >
                <span className="font-bold text-slate-800 text-center mb-2 text-xs sm:text-sm md:text-base">
                  A Day at <br /> the Zoo
                </span>
                <div
                  className="
          bg-orange-100 w-full 
          h-14 sm:h-16 lg:h-20 
          rounded-lg flex items-center justify-center
        "
                >
                  <span className="text-xl sm:text-2xl">🦁</span>
                </div>
              </div>

              <div
                className="
        bg-white p-2 sm:p-3 rounded-3xl shadow-md
        w-[200px] sm:w-[250px] lg:w-[204px]
         h-[250px] sm:h-[300px] lg:h-[272px]
        flex flex-col items-center justify-end
      "
              >
                <span className="font-bold text-slate-800 text-center mb-2 text-xs sm:text-sm md:text-base">
                  My Family <br /> Trip
                </span>
                <div
                  className="
          bg-blue-100 w-full 
          h-14 sm:h-16 lg:h-20 
          rounded-lg flex items-center justify-center
        "
                >
                  <span className="text-xl sm:text-2xl">🚌</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Manage Student */}
          <div className="bg-[#E7F1FF] rounded-2xl px-6 py-8 lg:py-10 lg:px-6 flex flex-col gap-5 justify-center relative hover:shadow-lg transition-shadow">
            <div className="space-y-5">
              <div className="bg-white rounded-3xl p-3 shadow-sm flex items-center gap-3">
                <img
                  src="/assets/Images/User/user-1.png"
                  className="w-14 h-14 rounded-full object-cover"
                  alt="User"
                />
                <span className="font-semibold text-slate-800">Samantha Doe</span>
              </div>
              <div className="bg-white rounded-3xl p-3 shadow-sm flex items-center gap-3">
                <img
                  src="/assets/Images/User/user-1.png"
                  className="w-14 h-14 rounded-full object-cover"
                  alt="User"
                />
                <span className="font-semibold">John Doe</span>
              </div>
            </div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold leading-[24px] md:leading-[32px] lg:!leading-[48px]">
              Manage Student
              <br />
              and Teacher
            </h3>
          </div>

          {/* Card 3: Track Assigned Chapters */}
          <div className="bg-[#E7F1FF] flex flex-col gap-5 rounded-2xl px-6 py-8 lg:py-10 lg:px-6 hover:shadow-lg transition-shadow">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="space-y-4">
                {/* Progress Item 1 */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-500">LEGO Education- STEAM Park</span>
                    <span className="text-slate-400">10000</span>
                  </div>
                  <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#7AD3FF] to-[#4FBAF0] w-[60%] rounded-full"></div>
                  </div>
                </div>
                {/* Progress Item 2 */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-500">Learn about Earth and Space</span>
                    <span className="text-slate-400">12000</span>
                  </div>
                  <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FF9364] to-[#F25F33] w-[80%] rounded-full"></div>
                  </div>
                </div>
                {/* Progress Item 3 */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-500">From Garden to Market</span>
                    <span className="text-slate-400">7000</span>
                  </div>
                  <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#B09FFF] to-[#8D79F6] w-[40%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold leading-[24px] md:leading-[32px] lg:!leading-[48px]">
              Track Assigned Chapters
              <br />
              and Lessons
            </h3>
          </div>

          {/* Card 4: Personalize Study - Spans 2 cols */}
          <div className="md:col-span-2 bg-[#E7F1FF] rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold leading-[24px] md:leading-[32px] lg:!leading-[48px]">
                Personalize Study and Track Student Performance
              </h3>

              <div className="flex flex-col sm:flex-row gap-5">
                <div className="bg-white h-52 flex flex-col gap-4 rounded-2xl p-6 shadow-sm w-full sm:w-1/2">
                  <div className="flex items-center gap-3 border-b border-[#D4D4D4] pb-4">
                    <img
                      src="/assets/Images/User/user-1.png"
                      className="w-14 h-14 rounded-full"
                      alt="Samantha"
                    />
                    <span className="text-2xl font-medium leading-10">Samantha Doe</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Day in ZOO</span>
                      <span className="font-bold text-red-500">
                        30
                        <span className="text-slate-400 font-normal">/ 100</span>
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Life at Little Flower</span>
                      <span className="font-bold text-green-500">
                        70
                        <span className="text-slate-400 font-normal">/ 100</span>
                      </span>
                    </div>
                  </div>
                </div>
                {/* Chart */}
                <div className="w-full sm:w-1/2 h-52 bg-white rounded-2xl p-6 shadow-sm flex items-end justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index % 2 === 0 ? '#3b82f6' : '#6366f1'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
