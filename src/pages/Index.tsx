
import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Technology from "../components/Technology";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
        });
      }
    };
    
    // Reveal animations on scroll
    const initRevealAnimations = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        observer.observe(el);
      });
    };
    
    document.addEventListener('click', handleAnchorClick);
    initRevealAnimations();
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <Technology />
        <CallToAction />
      </main>
      <Footer />
      
      {/* Floating "Back to top" button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-white text-liberation-600 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-40 opacity-0 translate-y-10"
        id="back-to-top"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Add JS for showing/hiding the back to top button on scroll */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', function() {
            const backToTop = document.getElementById('back-to-top');
            if (window.scrollY > 500) {
              backToTop.classList.add('opacity-100');
              backToTop.classList.remove('translate-y-10');
            } else {
              backToTop.classList.remove('opacity-100');
              backToTop.classList.add('translate-y-10');
            }
          });
        `
      }} />
    </div>
  );
};

export default Index;
