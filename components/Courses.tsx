import React, { useEffect, useState } from 'react';

import { Eye, Loader2 } from 'lucide-react';

import { fetchAllCourses, CourseListItem } from '../api/courseApi';
import CourseDetailsModal from './CourseDetailsModal';

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

  // Don't render the section at all if no courses or still loading
  // Only render if we have valid courses data (non-empty array)
  const hasCourses = !loading && Array.isArray(courses) && courses.length > 0;

  if (!hasCourses) {
    // Don't render anything if loading or no courses
    return null;
  }

  return (
    <section className="py-24 bg-[#FCFBFF] scroll-mt-20" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-[32px] sm:leading-[48px] lg:!leading-[64px]">
            Courses : Simple pricing. Flexible options.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              name={course.name}
              chapters={course.chapter_count}
              gradeLabel={course.grades}
              onView={() => setSelectedCourseId(course.id)}
            />
          ))}
        </div>
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
