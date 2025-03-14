
import { useEffect, useRef } from 'react';
import CallToActionHeader from './CallToActionHeader';
import EarlyAccessForm from './EarlyAccessForm';

const CallToAction = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.reveal-on-scroll');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('revealed');
            }, 100 * index);
          });
        }
      });
    }, observerOptions);

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <section
      id="contact"
      ref={ctaRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-liberation-50 opacity-50 transform -skew-y-6"></div>
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
        <div className="bg-white rounded-2xl shadow-elevated p-8 md:p-12 overflow-hidden relative glass-morph">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-liberation-100 filter blur-3xl opacity-70"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-100 filter blur-3xl opacity-70"></div>
          
          <div className="relative z-10">
            <CallToActionHeader />
            <EarlyAccessForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
