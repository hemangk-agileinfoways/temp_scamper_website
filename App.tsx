import React, { useState } from 'react';

import Benefits from './components/Benefits';
import Contact from './components/Contact';
import Courses from './components/Courses';
import FAQ from './components/FAQ';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import LegalPage from './components/LegalPage';
import Navbar from './components/Navbar';
import RegisterModal from './components/RegisterModal';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';

const App: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Check for routing query parameters
  const searchParams = new URLSearchParams(window.location.search);
  const page = searchParams.get('page');

  // If a legal page is requested, render it directly
  if (page === 'privacy-policy' || page === 'terms-conditions') {
    return <LegalPage pageType={page as 'privacy-policy' | 'terms-conditions'} />;
  }

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar onRegisterClick={openRegisterModal} />
      <main>
        <Hero onRegisterClick={openRegisterModal} />
        <Benefits />
        <Features />
        <Courses />
        <Testimonials />
        <FAQ />
        <Stats />
        <Contact />
      </main>
      <Footer />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </div>
  );
};

export default App;
