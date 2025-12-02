import React, { useEffect, useState } from 'react';

import { ArrowLeft, Loader2 } from 'lucide-react';

interface LegalPageProps {
  pageType: 'privacy-policy' | 'terms-conditions';
}

const LegalPage: React.FC<LegalPageProps> = ({ pageType }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API Fetch function
    const fetchData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800));

      if (pageType === 'privacy-policy') {
        setHtmlContent(`
          <h1 class="text-3xl md:text-4xl font-bold mb-2 text-slate-900">Privacy Policy</h1>
          <p class="mb-8 text-slate-500 font-medium">Last Updated: October 27, 2025</p>
          
          <div class="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <p class="mb-4">At Scamper Education ("we", "our", or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use our school management platform.</p>
            </section>
            
            <section>
              <h2 class="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
              <p class="mb-3">We may collect personal identification information from Users in various ways, including, but not limited to, when Users visit our site, register on the site, subscribe to the newsletter, and in connection with other activities, services, features, or resources we make available on our Site.</p>
              <ul class="list-disc pl-5 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <li>Name, email address, and phone number</li>
                <li>School institution details</li>
                <li>Student performance data (encrypted)</li>
                <li>Login credentials and usage logs</li>
              </ul>
            </section>
            
            <section>
              <h2 class="text-xl font-bold text-slate-900 mb-3">2. How We Use Collected Information</h2>
              <p class="mb-2">Scamper Education may collect and use Users personal information for the following purposes:</p>
              <ul class="list-disc pl-5 space-y-2">
                <li>To improve customer service and support needs.</li>
                <li>To personalize user experience and deliver relevant content.</li>
                <li>To send periodic emails regarding updates, products, or service information.</li>
                <li>To process transactions and manage academic records securely.</li>
              </ul>
            </section>

            <section>
              <h2 class="text-xl font-bold text-slate-900 mb-3">3. Data Security</h2>
              <p>We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Site.</p>
            </section>

             <section>
              <h2 class="text-xl font-bold text-slate-900 mb-3">4. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at support@scamper.edu.</p>
            </section>
          </div>
        `);
      } else {
        setHtmlContent(`
          <h1 class="text-3xl md:text-4xl font-bold mb-2 text-slate-900">Terms and Conditions</h1>
          <p class="mb-8 text-slate-500 font-medium">Last Updated: October 27, 2025</p>
          
          <div class="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <p class="mb-4">Welcome to Scamper Education. These terms and conditions outline the rules and regulations for the use of Scamper Education's Website and Services.</p>
            </section>
            
            <section>
              <h2 class="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Scamper Education if you do not agree to take all of the terms and conditions stated on this page.</p>
            </section>
            
            <section>
              <h2 class="text-xl font-bold text-slate-900 mb-3">2. License to Use</h2>
              <p class="mb-3">Unless otherwise stated, Scamper Education and/or its licensors own the intellectual property rights for all material on Scamper Education. All intellectual property rights are reserved. You may access this from Scamper Education for your own personal use subjected to restrictions set in these terms and conditions.</p>
              <p class="font-semibold mb-2">You must not:</p>
              <ul class="list-disc pl-5 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <li>Republish material from Scamper Education</li>
                <li>Sell, rent or sub-license material from Scamper Education</li>
                <li>Reproduce, duplicate or copy material from Scamper Education</li>
                <li>Redistribute content from Scamper Education</li>
              </ul>
            </section>

            <section>
              <h2 class="text-xl font-bold text-slate-900 mb-3">3. User Responsibilities</h2>
              <p>Users are responsible for maintaining the confidentiality of their account information, including their password. Users agree to accept responsibility for all activities that occur under their account or password.</p>
            </section>
            
            <section>
              <h2 class="text-xl font-bold text-slate-900 mb-3">4. Limitation of Liability</h2>
              <p>In no event shall Scamper Education, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Scamper Education, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website.</p>
            </section>
          </div>
        `);
      }
      setLoading(false);
    };

    fetchData();
  }, [pageType]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 md:p-16 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[10rem] -z-0 opacity-50 pointer-events-none"></div>

        <a
          href="/"
          className="relative z-10 inline-flex items-center gap-2 text-slate-500 hover:text-[#1e293b] mb-10 transition-colors font-bold text-sm uppercase tracking-wide group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </a>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-[#1e293b] animate-spin mb-4" />
            <p className="text-slate-500 font-medium animate-pulse">Loading legal document...</p>
          </div>
        ) : (
          <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* We render the HTML string safely */}
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalPage;
