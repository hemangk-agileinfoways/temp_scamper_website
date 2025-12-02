import React, { useEffect, useState } from 'react';

import { Loader2 } from 'lucide-react';

import { submitConnectUs } from '../api/faqApi';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear messages when user starts typing
    if (successMessage) setSuccessMessage('');
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Check for empty fields
    const emptyFields: string[] = [];
    const fieldLabels: { [key: string]: string } = {
      fullName: 'Full Name',
      email: 'email',
      subject: 'subject',
      description: 'description'
    };

    if (!formData.fullName.trim()) emptyFields.push(fieldLabels.fullName);
    if (!formData.email.trim()) emptyFields.push(fieldLabels.email);
    if (!formData.subject.trim()) emptyFields.push(fieldLabels.subject);
    if (!formData.description.trim()) emptyFields.push(fieldLabels.description);

    // Show error message in form if any fields are empty
    if (emptyFields.length > 0) {
      setErrorMessage(`Please provide all the fields: ${emptyFields.join(', ')}`);
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address');
      return;
    }

    setLoading(true);

    try {
      const result = await submitConnectUs({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        description: formData.description.trim()
      });

      if (result.success) {
        setSuccessMessage(result.message);
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          description: ''
        });
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-8 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden scroll-mt-20"
      id="contact-us"
    >
      {/* Background decorative circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-center">
          Connect With Scamper
        </h2>

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center md:items-stretch">
          {/* Left: Image */}
          <div className="flex justify-center w-full md:w-1/2 lg:w-2/5">
            <div className="relative w-full max-w-md md:max-w-none min-h-[500px] md:h-[500px]">
              <img
                src="/assets/Images/connect-scamper/contact-image.png"
                alt="Contact Support"
                className="rounded-2xl sm:rounded-3xl w-full h-full shadow-none object-cover z-10 mask-image-gradient"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex items-start w-full md:w-1/2 lg:w-3/5 bg-white min-h-[500px] md:h-[500px] rounded-2xl sm:rounded-[30px] p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl shadow-slate-200">
            <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
              {/* Success Message */}
              {successMessage && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">
                  {successMessage}
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-900">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full border-b border-slate-300 py-2 text-sm sm:text-base focus:outline-none focus:border-slate-900 transition-colors bg-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-900">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-b border-slate-300 py-2 text-sm sm:text-base focus:outline-none focus:border-slate-900 transition-colors bg-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-900">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border-b border-slate-300 py-2 text-sm sm:text-base focus:outline-none focus:border-slate-900 transition-colors bg-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-900">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={1}
                    className="w-full border-b border-slate-300 py-2 text-sm sm:text-base focus:outline-none focus:border-slate-900 transition-colors bg-transparent resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-[140px] lg:w-[190px] sm:w-auto bg-[#704FE6] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full font-medium hover:bg-[#4f46e5] transition-colors shadow-lg hover:shadow-indigo-200/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
