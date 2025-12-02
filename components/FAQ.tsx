import React, { useEffect, useState } from 'react';

import { Plus, X } from 'lucide-react';

import { FAQItem, fetchFAQList } from '../api/faqApi';
import Loader from './Loader';

const FAQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'School' | 'Teacher' | 'Student'>('School');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Map tab names to API type values
  const getApiType = (tab: 'School' | 'Teacher' | 'Student'): 'school' | 'student' | 'teacher' => {
    const mapping = {
      School: 'school',
      Teacher: 'teacher',
      Student: 'student'
    };
    return mapping[tab as keyof typeof mapping] as 'school' | 'student' | 'teacher';
  };

  // Fetch FAQs when component mounts or tab changes
  useEffect(() => {
    const loadFAQs = async () => {
      setLoading(true);
      setError(false);

      try {
        const apiType = getApiType(activeTab);
        const result = await fetchFAQList({
          search: '', // Empty string for no search filter
          type: apiType,
          page: 1,
          limit: 10, // Fetch more than 5 to ensure we have enough
          sort_by: 'title',
          sort_order: 'asc'
        });

        // Take only the first 5 FAQs
        const limitedFAQs = result.faqs.slice(0, 5);
        setFaqs(limitedFAQs);
        // Reset openIndex when FAQs change
        setOpenIndex(limitedFAQs.length > 0 ? 0 : null);
      } catch (err) {
        console.error('Error loading FAQs:', err);
        setError(true);
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, [activeTab]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Don't render the section if there are no FAQs and not loading
  if (!loading && !error && faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-[#FCFBFF] scroll-mt-20" id="faqs">
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-5xl font-semibold leading-[32px] sm:leading-[48px] lg:!leading-[64px]">
          Common Questions About Scamper
        </h2>

        <div>
          {/* Tabs */}
          <div className="flex justify-center">
            <div className="bg-slate-50 p-1 rounded-full flex gap-1">
              {(['School', 'Teacher', 'Student'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-[#1D3C63] text-white shadow-md'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {loading ? (
              <Loader message="Loading FAQs..." />
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-slate-600">Unable to load FAQs. Please try again later.</p>
              </div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-600">No FAQs available at the moment.</p>
              </div>
            ) : (
              faqs.map((faq, index) => (
                <div key={faq.id} className="border-b border-slate-200 pb-4">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
                  >
                    <span className=" text-lg md:text-xl lg:text-2xl font-medium leading-4 md:leading-6 lg:leading-9 break-words">
                      {faq.title}
                    </span>
                    {openIndex === index ? (
                      <X className="w-5 h-5 text-slate-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p
                      className="text-base md:text-lg lg:text-xl leading-6 md:leading-7 lg:leading-8"
                      dangerouslySetInnerHTML={{ __html: faq.description }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
