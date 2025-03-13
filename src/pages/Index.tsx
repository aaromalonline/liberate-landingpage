
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
        
        // Add console log to debug
        console.log('Scrolling to:', targetId);
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) {
          console.warn(`Element with id ${targetId} not found`);
          return;
        }
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
        });
      }
    };
    
    // Reveal animations on scroll - modified to ensure elements are visible
    const initRevealAnimations = () => {
      // Initially show elements that should be visible without scrolling
      document.querySelectorAll('.hero-section .opacity-0').forEach((el) => {
        el.classList.remove('opacity-0');
        el.classList.remove('translate-y-10');
        el.classList.add('opacity-100');
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              
              // For hero section elements
              const heroElements = entry.target.querySelectorAll('.opacity-0');
              heroElements.forEach((el) => {
                el.classList.remove('opacity-0');
                el.classList.remove('translate-y-10');
                el.classList.add('opacity-100');
              });
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        observer.observe(el);
      });
      
      // Ensure the main sections are observed
      document.querySelectorAll('section').forEach((el) => {
        observer.observe(el);
      });
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    // Delay slightly to ensure DOM is fully loaded
    setTimeout(initRevealAnimations, 100);
    
    // Show back-to-top button on scroll
    const handleScroll = () => {
      const backToTop = document.getElementById('back-to-top');
      if (backToTop) {
        if (window.scrollY > 500) {
          backToTop.classList.add('opacity-100');
          backToTop.classList.remove('translate-y-10');
        } else {
          backToTop.classList.remove('opacity-100');
          backToTop.classList.add('translate-y-10');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <Technology />
        <div id="about">
          {/* This is a placeholder. You can replace it with an actual About component when available */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Us</h2>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Liberate is dedicated to transforming how businesses approach their digital infrastructure.
                  Founded with a vision to empower organizations through innovative technology solutions,
                  we're on a mission to make advanced tools accessible to everyone.
                </p>
                <p className="text-lg text-gray-700">
                  Our team of experts combines deep technical knowledge with a passion for solving
                  complex problems. We believe in creating technology that adapts to people, not the other way around.
                </p>
              </div>
            </div>
          </section>
        </div>
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
    </div>
  );
};

export default Index;
