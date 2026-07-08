import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumePDF } from './components/ResumePDF';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check local storage or default to light theme (clean feminine aesthetics)
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return false;
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('profileImage');
    } catch (e) {
      return null;
    }
  });

  const handleImageUpload = (base64Data: string) => {
    setProfileImage(base64Data);
    setImageError(false);
    try {
      localStorage.setItem('profileImage', base64Data);
    } catch (e) {
      console.warn('LocalStorage quota exceeded, image stored in memory only');
    }
  };

  const handleImageReset = () => {
    setProfileImage(null);
    setImageError(false);
    try {
      localStorage.removeItem('profileImage');
    } catch (e) {
      // ignore
    }
  };

  // Manage body dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Scroll to top visibility check
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Automated 2-Page PDF Resume Generation
  const handleDownloadPDF = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const page1 = document.getElementById('resume-page-1');
      const page2 = document.getElementById('resume-page-2');

      if (!page1 || !page2) {
        throw new Error('Resume DOM structures not found');
      }

      // Configure html2canvas options for print-quality (scale 2 produces crisp, high-resolution rendering)
      const options = {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false
      };

      // Capture Page 1
      const canvas1 = await html2canvas(page1, options);
      const imgData1 = canvas1.toDataURL('image/jpeg', 0.98);

      // Capture Page 2
      const canvas2 = await html2canvas(page2, options);
      const imgData2 = canvas2.toDataURL('image/jpeg', 0.98);

      // Initialize jsPDF in portrait, mm metric, standard A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Standard A4 sizes in mm: 210 width x 297 height
      pdf.addImage(imgData1, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      
      pdf.addPage();
      pdf.addImage(imgData2, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');

      // Trigger automatic browser download
      pdf.save('Saika_Shabir_Resume.pdf');
    } catch (err) {
      console.error('Failed to generate resume PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen artistic-gradient-bg text-slate-800 dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-purple-200/50 dark:selection:bg-purple-900/40 selection:text-purple-900 dark:selection:text-purple-100">
      
      {/* Off-screen high fidelity print structure for PDF capture */}
      <ResumePDF 
        imageError={imageError} 
        setImageError={setImageError} 
        profileImage={profileImage}
      />

      {/* Navigation Header */}
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        onDownloadPDF={handleDownloadPDF}
        isDownloading={isDownloading}
      />

      {/* Main Sections */}
      <main>
        {/* Home Introduction */}
        <Hero 
          imageError={imageError} 
          setImageError={setImageError} 
          onDownloadPDF={handleDownloadPDF}
          isDownloading={isDownloading}
          profileImage={profileImage}
          onImageUpload={handleImageUpload}
          onImageReset={handleImageReset}
        />

        {/* About Me & Goals */}
        <About />

        {/* Chronological Education details */}
        <Education />

        {/* Technical skills bento and languages circular panels */}
        <Skills />

        {/* Interactive Contact block */}
        <Contact />
      </main>

      {/* Footer handles */}
      <Footer />

      {/* Interactive back-to-top control */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-850 text-purple-600 dark:text-purple-400 shadow-lg hover:shadow-purple-500/10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer focus:outline-none"
            aria-label="Scroll back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
