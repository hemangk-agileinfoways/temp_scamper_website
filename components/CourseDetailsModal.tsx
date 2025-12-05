import React, { useEffect, useState } from 'react';

import { Hourglass, X } from 'lucide-react';

import { getImageUrl } from '../utils/imageUtils';

import { CourseDetail, fetchCourseDetails } from '../api/courseApi';
import Loader from './Loader';

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number | null;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ isOpen, onClose, courseId }) => {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (courseId) {
        const loadCourseDetails = async () => {
          try {
            setLoading(true);
            const data = await fetchCourseDetails(courseId);
            setCourse(data);
          } catch (error) {
            console.error('Failed to load course details:', error);
            setCourse(null);
          } finally {
            setLoading(false);
          }
        };

        loadCourseDetails();
      } else {
        // If modal is open but no courseId, show error message
        setLoading(false);
        setCourse(null);
      }
    } else {
      // Reset state when modal closes
      setCourse(null);
      setLoading(false);
    }
  }, [isOpen, courseId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-3xl relative shadow-2xl animate-in fade-in zoom-in duration-300 my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
          type="button"
          aria-label="Close"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
        </button>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-4 sm:mb-6 md:mb-8 pr-10 sm:pr-12">
          Course Details
        </h2>

        {loading ? (
          <Loader message="Loading course details..." className="min-h-[200px] sm:min-h-[300px]" />
        ) : !course ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 min-h-[200px] sm:min-h-[300px]">
            <p className="text-slate-600 text-base sm:text-lg font-medium text-center px-4">
              Course details are not available.
            </p>
          </div>
        ) : (
          <>
            {/* Info Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 mb-4 sm:mb-6">
              <div className="flex-1 min-w-0">
                <span className="text-xs text-slate-400 font-medium block mb-1">Course name</span>
                <h3 className="text-xl sm:text-2xl font-semibold leading-7 break-words">
                  {course.course_name}
                </h3>
              </div>
              <div className="flex flex-col items-start sm:items-end shrink-0">
                <span className="text-xs text-slate-400 font-medium block mb-1">Grades</span>
                <span className="bg-[#1D3C63] text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide whitespace-nowrap">
                  {course.grades}
                </span>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <span className="text-xs text-slate-400 font-semibold block mb-2">Description</span>

              <p className="text-sm sm:text-base leading-relaxed break-words">
                {course.description ? (
                  <div
                    className="text-sm sm:text-base font-normal leading-relaxed break-words"
                    dangerouslySetInnerHTML={{
                      __html: course.description
                    }}
                  />
                ) : (
                  <p className="text-sm sm:text-base font-normal leading-relaxed break-words">
                    No description available.
                  </p>
                )}
              </p>
            </div>

            {course.chapters && course.chapters.length > 0 && (
              <>
                <hr className="border-slate-200 mb-6" />
                <div className="flex flex-col gap-6">
                  <h4 className="text-base sm:text-2xl font-bold leading-7">Chapters</h4>

                  <div className="flex flex-col gap-6">
                    {course.chapters.map((chapter) => {
                      const imageUrl = getImageUrl(chapter.thumbnail);
                      return (
                        <div
                          key={chapter.chapter_id}
                          className="bg-[#F0F2F5] rounded-xl sm:rounded-2xl p-3 sm:px-8 sm:py-4 flex flex-row items-start sm:items-center gap-4 md:gap-5 hover:bg-slate-100 transition-colors"
                        >
                          {imageUrl && (
                            <div className="w-16 h-12 md:w-20 md:h-16 shrink-0 rounded-lg sm:rounded-xl overflow-hidden relative bg-slate-200">
                              <img
                                src={imageUrl}
                                alt={chapter.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  // Hide image on error
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          <div className="flex-1 w-full min-w-0">
                            <h5 className="font-bold text-slate-900 text-sm sm:text-base mb-2 break-words">
                              {chapter.name}
                            </h5>
                            <div className="flex gap-2">
                              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500 font-medium">
                                <span className="flex items-center gap-1.5">
                                  <Hourglass className="w-3.5 h-3.5 text-[#0ea5e9] fill-[#0ea5e9] shrink-0" />
                                  {chapter.lesson_count} Lessons
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500 font-medium">
                                <span className="flex items-center gap-1.5">
                                  <Hourglass className="w-3.5 h-3.5 text-[#0ea5e9] fill-[#0ea5e9] shrink-0" />
                                  {chapter.activity_count} Activities
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsModal;
