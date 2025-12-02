import React, { useState } from 'react';

import { X } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
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

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock API Call
    try {
      // Simulating a network request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Sending registration data to kailesh.sanjava@agileinfoways.com', formData);
      alert('Registration data sent to kailesh.sanjava@agileinfoways.com');

      // Reset form and close
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
      onClose();
    } catch (error) {
      console.error('Submission failed', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl p-8 w-full max-w-3xl relative shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
          type="button"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-slate-900" />
        </button>

        <h2 className="text-3xl font-bold text-slate-800 mb-8">Register</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              required
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              type="text"
              placeholder="School Admin Name"
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
            <input
              required
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              type="tel"
              placeholder="Contact number"
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              required
              name="adminEmail"
              value={formData.adminEmail}
              onChange={handleChange}
              type="email"
              placeholder="School Admin Email"
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
            <input
              required
              name="schoolDistrict"
              value={formData.schoolDistrict}
              onChange={handleChange}
              type="text"
              placeholder="School District"
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              required
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              type="text"
              placeholder="School Name"
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
            <input
              required
              name="schoolWebsite"
              value={formData.schoolWebsite}
              onChange={handleChange}
              type="url"
              placeholder="School Website"
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
          </div>

          {/* Row 4 */}
          <div>
            <input
              required
              name="schoolAddress"
              value={formData.schoolAddress}
              onChange={handleChange}
              type="text"
              placeholder="School Adress"
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              required
              name="numTeachers"
              value={formData.numTeachers}
              onChange={handleChange}
              type="number"
              placeholder="Number of Teachers"
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
            <input
              required
              name="numStudents"
              value={formData.numStudents}
              onChange={handleChange}
              type="number"
              placeholder="Number of Students"
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1e293b] text-white px-12 py-3 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
