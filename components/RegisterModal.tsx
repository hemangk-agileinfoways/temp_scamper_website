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
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-3xl relative shadow-2xl animate-in fade-in zoom-in duration-300 my-4 sm:my-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
          type="button"
          aria-label="Close"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 pr-8 sm:pr-10">
          Register
        </h2>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Success Message */}
          {successMessage && (
            <div className="p-2.5 sm:p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-xs sm:text-sm leading-relaxed break-words">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 sm:p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs sm:text-sm leading-relaxed break-words">
              {errorMessage}
            </div>
          )}

          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <input
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              type="text"
              placeholder="School Admin Name"
              className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              type="tel"
              placeholder="Contact number"
              className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <input
              name="adminEmail"
              value={formData.adminEmail}
              onChange={handleChange}
              type="email"
              placeholder="School Admin Email"
              className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
            <input
              name="schoolDistrict"
              value={formData.schoolDistrict}
              onChange={handleChange}
              type="text"
              placeholder="School District"
              className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <input
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              type="text"
              placeholder="School Name"
              className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
            <input
              name="schoolWebsite"
              value={formData.schoolWebsite}
              onChange={handleChange}
              type="url"
              placeholder="School Website"
              className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
          </div>

          {/* Row 5 */}
          <div>
            <input
              name="schoolAddress"
              value={formData.schoolAddress}
              onChange={handleChange}
              type="text"
              placeholder="School Address"
              className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <input
              name="numTeachers"
              value={formData.numTeachers}
              onChange={handleChange}
              type="number"
              min="1"
              placeholder="Number of Teachers"
              className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
            <input
              name="numStudents"
              value={formData.numStudents}
              onChange={handleChange}
              type="number"
              min="1"
              placeholder="Number of Students"
              className="w-full border border-slate-300 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#1D3C63] text-white px-8 sm:px-12 py-2.5 sm:py-3 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
