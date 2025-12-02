import React, { useState } from 'react';

import { Menu, X } from 'lucide-react';

import { RegisterButtonIcon, ScamperNavbarLogo } from './svg';

interface NavbarProps {
  onRegisterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRegisterClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    'Home',
    'Benefits',
    'Features',
    'Courses',
    'Testimonials',
    'FAQS',
    'Contact us'
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <ScamperNavbarLogo />

          {/* Desktop Links - Changed to lg:flex to hide on tablets */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const targetId = link.toLowerCase().replace(' ', '-');
              return (
                <a
                  key={link}
                  href={`#${targetId}`}
                  onClick={(e) => handleNavClick(e, targetId)}
                  className="text-base font-semibold text-[#121212] hover:text-[#141414] hover:text-lg transition-all whitespace-nowrap"
                >
                  {link}
                </a>
              );
            })}
          </div>

          {/* CTA Button - Changed to lg:flex */}
          <div className="hidden lg:flex">
            <button
              onClick={onRegisterClick}
              className="flex items-center gap-4 bg-[#1D3C63] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
            >
              Register
              <RegisterButtonIcon />
            </button>
          </div>

          {/* Mobile Menu Button - Changed to lg:hidden */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Changed to lg:hidden */}
      <div
        className={`lg:hidden bg-white border-b border-slate-100 absolute w-full left-0 shadow-lg transform transition-all duration-300 ease-out
    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}
  `}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const targetId = link.toLowerCase().replace(' ', '-');
            return (
              <a
                key={link}
                href={`#${targetId}`}
                onClick={(e) => handleNavClick(e, targetId)}
                className="block px-3 py-2 text-base font-semibold text-[#121212] hover:text-[#141414] hover:text-lg transition-all whitespace-nowrap"
              >
                {link}
              </a>
            );
          })}
          <button
            onClick={() => {
              setIsOpen(false);
              onRegisterClick();
            }}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-[#1D3C63] text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-slate-800"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
