import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  bgColor: string;
  textColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  bgColor,
  textColor = 'text-slate-900'
}) => (
  <div
    className={`
      ${bgColor} ${textColor} 
      w-full
      px-6 py-8 lg:py-10 lg:px-6
      rounded-2xl flex flex-col gap-5
      hover:shadow-lg transition-shadow
    `}
  >
    <h3
      className={`
        text-xl md:text-2xl lg:text-3xl
        font-semibold
        leading-[24px] md:leading-[32px] lg:!leading-[48px]
        ${textColor === 'text-white' ? 'text-white' : 'text-[#01132A]'}
      `}
    >
      {title}
    </h3>

    <p
      className={`
        text-sm sm:text-base lg:text-[20px]
        leading-[20px] sm:leading-[24px] lg:!leading-[32px]
        ${textColor === 'text-white' ? 'text-white' : 'text-[#01132A]'}
      `}
    >
      {description}
    </p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white scroll-mt-20" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-[32px] sm:leading-[48px] lg:!leading-[64px]">
            Features: Shaping the Future of Education for Students and Teachers
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Centralized School Management"
            description="SCAMPER allows school administrators to efficiently manage all aspects of school operations, including teacher assignments, student progress, and educational content, through a user-friendly web panel."
            bgColor="bg-[#FFF2D7]"
          />

          <FeatureCard
            title="Chapters and Lessons Management"
            description="Admins can create and organise Chapters and Lessons for a structured learning experience, ensuring students receive the necessary lessons and tasks."
            bgColor="bg-[#E7F1FF]"
          />

          <FeatureCard
            title="Student Assessment Management"
            description="Students can take exams and complete tasks directly on the platform, and teachers can provide timely feedback, scores, and performance-based remarks."
            bgColor="bg-[#FFF2D7]"
          />

          <FeatureCard
            title="Real-Time Progress Tracking"
            description="Teachers can monitor each student's performance in real-time, allowing for personalized feedback and effective learning interventions."
            bgColor="bg-[#E7F1FF]"
          />

          <FeatureCard
            title="Data-Driven Insights"
            description="The platform offers data analytics on student performance, helping teachers and administrators make informed decisions about curriculum adjustments and student support."
            bgColor="bg-[#1D3C63]"
            textColor="text-white"
          />

          <FeatureCard
            title="Scalable and Flexible"
            description="The system can scale to accommodate schools of various sizes and can be adapted to different educational needs and structures."
            bgColor="bg-[#E7F1FF]"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
