
import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Technology from "../components/Technology";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (!targetId) return;
        
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
    
    const initRevealAnimations = () => {
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
      
      document.querySelectorAll('section').forEach((el) => {
        observer.observe(el);
      });
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    setTimeout(initRevealAnimations, 100);
    
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
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Liberate</h2>
              <div className="max-w-3xl mx-auto">
                <div className="mb-12">
                  <p className="text-gray-700 mb-6">
                    We are addressing both mobility and communication barriers faced by individuals with severe physical impairments—such as those with ALS (Amyotrophic Lateral Sclerosis), muscular dystrophy, or paralysis—who can only move specific muscle groups, by providing a muscle-twitch-based control system that detects subtle muscle movements and converts them into control signals, enabling hands-free assistive control of assistive devices like wheelchairs and adaptive typing interfaces, thereby restoring independence and accessibility.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Built by Team Lumen (Aaromal A & Deeraj P Menon) for the hardware hackathon Buildathon - Hertz'25, Liberate is designed to break down barriers for those with mobility challenges through innovative technology.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                    <p className="text-gray-700">
                      We're on a mission to transform how people with limited mobility interact with technology and communicate with the world around them, creating more independence and freedom through accessible design.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">The Future</h3>
                    <p className="text-gray-700">
                      As we move towards commercialization, we envision Liberate becoming an essential tool that empowers individuals with mobility limitations to engage more fully with their digital environment and communicate effectively.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4 text-center">Why Choose Liberate</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-liberation-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Low-Cost & Non-Invasive – Uses cheap, surface sensors—no implants or complex gear</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-liberation-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>No Head/Eye/Voice Needed – Works with just subtle muscle twitches</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-liberation-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Smart Typing Interface – Adapts to individual muscle input for communication</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-liberation-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Portable & Easy to Use – Compact, quick to set up, usable anywhere</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
        <CallToAction />
      </main>
      <Footer />
      
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
      
      <Toaster />
    </div>
  );
};

export default Index;
