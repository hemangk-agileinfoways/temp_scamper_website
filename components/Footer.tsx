import React from 'react';

import { ScamperFooterLogo } from './svg';

const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <ScamperFooterLogo />

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <a
                    href="#benefits"
                    onClick={(e) => handleNavClick(e, 'benefits')}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    onClick={(e) => handleNavClick(e, 'features')}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#courses"
                    onClick={(e) => handleNavClick(e, 'courses')}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    Courses
                  </a>
                </li>
              </ul>
            </div>
            <div className="self-end">
              <ul className="space-y-4 text-sm text-gray-400 -mt-10 md:mt-0">
                <li>
                  <a
                    href="#testimonials"
                    onClick={(e) => handleNavClick(e, 'testimonials')}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#faqs"
                    onClick={(e) => handleNavClick(e, 'faqs')}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    FAQS
                  </a>
                </li>
                <li>
                  <a
                    href="#contact-us"
                    onClick={(e) => handleNavClick(e, 'contact-us')}
                    className="hover:text-white cursor-pointer transition-colors"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
            {/* Empty col for spacing/design matching */}
            <div className="hidden md:block"></div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="text-white">© 2025 Scamper all right Reserved</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="?page=privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Privacy policy
            </a>
            <a
              href="?page=terms-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white "
            >
              Terms and conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
