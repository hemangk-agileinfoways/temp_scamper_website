import React, { useEffect, useState } from 'react';

import { Loader2, X } from 'lucide-react';

import { submitSchoolRegister } from '../api/faqApi';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    adminName: '',
    contactNumber: '',
    adminEmail: '',
    schoolDistrict: '',
    schoolName: '',
    schoolWebsite: '',
    schoolAddress: '',
    numTeachers: '',
    numStudents: ''
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Reset all form data, messages, and loading state
      setFormData({
        adminName: '',
        contactNumber: '',
        adminEmail: '',
        schoolDistrict: '',
        schoolName: '',
        schoolWebsite: '',
        schoolAddress: '',
        numTeachers: '',
        numStudents: ''
      });
      setSuccessMessage('');
      setErrorMessage('');
      setLoading(false);
    }
  }, [isOpen]);

  // Don't auto-hide success message - let it stay visible

  if (!isOpen) return null;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Max length for phone number (including formatting characters)
    const MAX_PHONE_LENGTH = 15;
    if (phone.trim().length > MAX_PHONE_LENGTH) {
      return false;
    }
    // Allow phone numbers with +, digits, spaces, hyphens, and parentheses
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateURL = (url: string): boolean => {
    const urlRegex = /^(https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/\S*)?$/;
    return urlRegex.test(url.trim());
  };

  const validateNumber = (value: string): boolean => {
    const num = parseInt(value, 10);
    return !isNaN(num) && num > 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let filteredValue = value;

    // Apply input validation based on field name
    if (name === 'adminName') {
      // Only allow alphabets and space
      filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === 'schoolName') {
      // Allow alphabets, numbers, space, dot, hyphen, apostrophe, comma, ampersand, and parentheses
      filteredValue = value.replace(/[^a-zA-Z0-9.\s\-',&()]/g, '');
    } else if (name === 'contactNumber') {
      // Only allow digits, plus sign, hyphens, spaces, parentheses, and dots for phone number formatting
      filteredValue = value.replace(/[^0-9+\-\s().]/g, '');
      // Limit length to prevent overly long phone numbers (max 20 characters including formatting)
      if (filteredValue.length > 20) {
        filteredValue = filteredValue.slice(0, 20);
      }
    }

    setFormData((prev) => ({ ...prev, [name]: filteredValue }));
    // Clear messages when user starts typing
    if (successMessage) setSuccessMessage('');
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Check for empty fields
    if (
      !formData.adminName.trim() ||
      !formData.contactNumber.trim() ||
      !formData.adminEmail.trim() ||
      !formData.schoolDistrict.trim() ||
      !formData.schoolName.trim() ||
      !formData.schoolWebsite.trim() ||
      !formData.schoolAddress.trim() ||
      !formData.numTeachers.trim() ||
      !formData.numStudents.trim()
    ) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    // Validate email format
    if (!validateEmail(formData.adminEmail.trim())) {
      setErrorMessage('Please provide a valid email address');
      return;
    }

    // Validate phone format
    if (!validatePhone(formData.contactNumber.trim())) {
      setErrorMessage('Please provide a valid phone number (max 15 characters)');
      return;
    }

    // Validate URL format
    if (!validateURL(formData.schoolWebsite.trim())) {
      setErrorMessage('Please provide a valid website URL');
      return;
    }

    // Validate numbers
    if (!validateNumber(formData.numTeachers.trim())) {
      setErrorMessage('Please provide a valid number of teachers (must be greater than 0)');
      return;
    }

    if (!validateNumber(formData.numStudents.trim())) {
      setErrorMessage('Please provide a valid number of students (must be greater than 0)');
      return;
    }

    setLoading(true);

    try {
      // Format website URL - add protocol if missing
      let websiteUrl = formData.schoolWebsite.trim();
      if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
        websiteUrl = `https://${websiteUrl}`;
      }

      const result = await submitSchoolRegister({
        admin_name: formData.adminName.trim(),
        admin_phone: formData.contactNumber.trim(),
        admin_email: formData.adminEmail.trim(),
        district: formData.schoolDistrict.trim(),
        name: formData.schoolName.trim(),
        website: websiteUrl,
        address: formData.schoolAddress.trim(),
        total_teachers: parseInt(formData.numTeachers.trim(), 10),
        total_students: parseInt(formData.numStudents.trim(), 10)
      });

      if (result.success) {
        setSuccessMessage(result.message);
        // Reset form
        setFormData({
          adminName: '',
          contactNumber: '',
          adminEmail: '',
          schoolDistrict: '',
          schoolName: '',
          schoolWebsite: '',
          schoolAddress: '',
          numTeachers: '',
          numStudents: ''
        });
        // Don't close modal - let user close it manually
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-5 md:p-8 w-full max-w-3xl relative shadow-2xl animate-in fade-in zoom-in duration-300 my-2 sm:my-4 md:my-8 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-1.5 sm:p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
          type="button"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-slate-900" />
        </button>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6 pr-8 sm:pr-10">
          Register
        </h2>

        <form className="space-y-3 sm:space-y-4 md:space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Success Message */}
          {successMessage && (
            <div className="p-2 sm:p-2.5 md:p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-xs sm:text-sm leading-relaxed break-words">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2 sm:p-2.5 md:p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs sm:text-sm leading-relaxed break-words">
              {errorMessage}
            </div>
          )}

          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            <div>
              <label
                htmlFor="adminName"
                className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
              >
                <span className="text-red-500">*</span> School Admin Name
              </label>
              <input
                id="adminName"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="contactNumber"
                className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
              >
                <span className="text-red-500">*</span> Contact Number
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            <div>
              <label
                htmlFor="adminEmail"
                className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
              >
                <span className="text-red-500">*</span> School Admin Email
              </label>
              <input
                id="adminEmail"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                type="email"
                placeholder="admin@school.edu"
                className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="schoolDistrict"
                className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
              >
                <span className="text-red-500">*</span> School District
              </label>
              <input
                id="schoolDistrict"
                name="schoolDistrict"
                value={formData.schoolDistrict}
                onChange={handleChange}
                type="text"
                placeholder="New York City"
                className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            <div>
              <label
                htmlFor="schoolName"
                className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
              >
                <span className="text-red-500">*</span> School Name
              </label>
              <input
                id="schoolName"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                type="text"
                placeholder="Lincoln High School"
                className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="schoolWebsite"
                className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
              >
                <span className="text-red-500">*</span> School Website
              </label>
              <input
                id="schoolWebsite"
                name="schoolWebsite"
                value={formData.schoolWebsite}
                onChange={handleChange}
                type="url"
                placeholder="www.school.edu"
                className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div>
            <label
              htmlFor="schoolAddress"
              className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
            >
              <span className="text-red-500">*</span> School Address
            </label>
            <input
              id="schoolAddress"
              name="schoolAddress"
              value={formData.schoolAddress}
              onChange={handleChange}
              type="text"
              placeholder="123 Main St, City, State 12345"
              className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            <div>
              <label
                htmlFor="numTeachers"
                className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
              >
                <span className="text-red-500">*</span> Number of Teachers
              </label>
              <input
                id="numTeachers"
                name="numTeachers"
                value={formData.numTeachers}
                onChange={handleChange}
                type="number"
                min="1"
                placeholder="50"
                className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="numStudents"
                className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5"
              >
                <span className="text-red-500">*</span> Number of Students
              </label>
              <input
                id="numStudents"
                name="numStudents"
                value={formData.numStudents}
                onChange={handleChange}
                type="number"
                min="1"
                placeholder="500"
                className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-1 sm:pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#1D3C63] text-white px-6 sm:px-8 md:px-12 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
