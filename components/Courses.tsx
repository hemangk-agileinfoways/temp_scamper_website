import React, { useEffect, useRef, useState } from 'react';

import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';

import { CourseListItem, fetchAllCourses } from '../api/courseApi';
import CourseDetailsModal from './CourseDetailsModal';
import Loader from './Loader';

interface CourseCardProps {
  name: string;
  chapters: number;
  gradeLabel: string;
  onView: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, chapters, gradeLabel, onView }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
            Course Name
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">{name}</h3>
        </div>
        <div className="p-2 bg-[#1D3C63] rounded-md">
          <Eye className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="flex justify-between items-end mb-6 mt-auto">
        <div>
          <span className="text-xs text-slate-400 font-semibold block mb-1">Chapters</span>
          <span className="text-2xl font-bold text-slate-900">{chapters}</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 font-semibold block mb-1 text-right">Grade</span>
          <span className="bg-[#1D3C63] text-white text-xs px-3 py-1 rounded-full">
            {gradeLabel}
          </span>
        </div>
      </div>

      <button
        onClick={onView}
        className="w-full bg-[#1D3C63] text-white py-3 rounded-3xl text-sm font-semibold hover:bg-slate-800 transition-colors"
      >
        View
      </button>
    </div>
  );
};

// --- COMPONENT ---

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to load courses:', error);
        // fetchAllCourses already returns empty array on error, so courses will be empty
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstCard = container.querySelector('.course-card') as HTMLElement;
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

  // Don't render the section at all if no courses (after loading)
  // Only render if we have valid courses data (non-empty array)
  const hasCourses = !loading && Array.isArray(courses) && courses.length > 0;

  if (!hasCourses && !loading) {
    // Don't render anything if no courses (but not while loading)
    return null;
  }

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-[#FCFBFF] scroll-mt-20" id="courses">
      <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center md:items-end">
          <div className="text-center md:text-left mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-[32px] sm:leading-[48px] lg:!leading-[64px]">
              Courses : Simple pricing. Flexible options.
            </h2>
          </div>
          {!loading && hasCourses && (
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
          )}
        </div>

        {loading ? (
          <Loader message="Loading courses..." />
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className="course-card flex-shrink-0 w-full sm:w-[calc(50%-16px)] md:w-[320px] lg:w-[360px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <CourseCard
                  name={course.name}
                  chapters={course.chapter_count}
                  gradeLabel={course.grades}
                  onView={() => setSelectedCourseId(course.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <CourseDetailsModal
        isOpen={!!selectedCourseId}
        onClose={() => setSelectedCourseId(null)}
        courseId={selectedCourseId}
      />
    </section>
  );
};

export default Courses;
