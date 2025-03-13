
import { useEffect, useRef } from 'react';

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
            <div className="text-center mb-10">
              <div className="inline-block py-1 px-3 rounded-full bg-liberation-100 text-liberation-700 text-xs font-medium tracking-wide mb-4 reveal-on-scroll">
                Join Us
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal-on-scroll">
                Breaking barriers, <br />one motion at a time
              </h2>
              
              <p className="text-gray-600 max-w-xl mx-auto reveal-on-scroll">
                Be among the first to experience Liberate and help shape the future of accessibility technology. Register for early access and updates.
              </p>
            </div>
            
            <form className="max-w-md mx-auto space-y-4 reveal-on-scroll">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-liberation-500 focus:border-liberation-500 transition-all duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-liberation-500 focus:border-liberation-500 transition-all duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="interest" className="sr-only">Interest</label>
                <select
                  id="interest"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-liberation-500 focus:border-liberation-500 transition-all duration-200"
                >
                  <option value="" disabled selected>I'm interested in...</option>
                  <option value="personal">Personal use</option>
                  <option value="professional">Professional/Medical use</option>
                  <option value="research">Research collaboration</option>
                  <option value="investment">Investment opportunity</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-liberation-500 hover:bg-liberation-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm"
              >
                Get Early Access
              </button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                By signing up, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
