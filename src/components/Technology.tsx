import { useEffect, useRef } from 'react';
const technologies = [{
  name: "Python",
  description: "Powers signal processing and control logic",
  color: "bg-blue-100 text-blue-800"
}, {
  name: "ESP32",
  description: "Handles sensor data acquisition via I2C",
  color: "bg-purple-100 text-purple-800"
}, {
  name: "ADXL345",
  description: "Digital accelerometer for movement detection",
  color: "bg-green-100 text-green-800"
}, {
  name: "PyQt5",
  description: "Creates the desktop application interface",
  color: "bg-yellow-100 text-yellow-800"
}, {
  name: "gTTS",
  description: "Google's Text-to-Speech for voice synthesis",
  color: "bg-red-100 text-red-800"
}];
const Technology = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.reveal-on-scroll');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('revealed');
            }, 100 * index);
          });
          if (imageRef.current) {
            imageRef.current.classList.add('animate-scale-in');
            imageRef.current.classList.remove('opacity-0', 'scale-95');
          }
        }
      });
    }, observerOptions);
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return <section id="technology" ref={sectionRef} className="py-24 bg-gradient-subtle relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Technology image */}
          <div className="w-full md:w-1/2 flex justify-center order-2 md:order-1">
            <div ref={imageRef} className="relative max-w-md opacity-0 scale-95 transition-all duration-700">
              <div className="bg-white rounded-2xl shadow-elevated p-4 overflow-hidden relative">
                <img alt="Liberate device and visualizer interface" loading="lazy" src="/lovable-uploads/dcbeafa7-4eb2-4426-8a29-3bcbbd105aed.jpg" className="rounded-lg w-full object-cover" />
                <div className="device-shine"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-100 filter blur-xl opacity-70 animate-pulse-subtle"></div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-liberation-100 filter blur-xl opacity-70 animate-pulse-subtle animation-delay-2000"></div>
            </div>
          </div>
          
          {/* Technology content */}
          <div className="w-full md:w-1/2 space-y-6 order-1 md:order-2">
            <div className="inline-block py-1 px-3 rounded-full bg-liberation-100 text-liberation-700 text-xs font-medium tracking-wide mb-2 reveal-on-scroll">
              Technology
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal-on-scroll">
              How It Works
            </h2>
            
            <p className="text-gray-600 reveal-on-scroll">
              Liberate combines hardware and software technologies to create a seamless experience. The system detects subtle muscle movements and transforms them into precise control signals.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6 reveal-on-scroll">
              {technologies.map((tech, index) => <span key={index} className={`tech-chip ${tech.color} cursor-default`}>
                  {tech.name}
                </span>)}
            </div>
            
            <div className="space-y-4 reveal-on-scroll">
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-liberation-500 text-white flex items-center justify-center mr-2 text-xs">1</span>
                  Sensor + Encoder
                </h3>
                <p className="text-gray-600 text-sm">
                  The ADXL345 accelerometer records muscle twitches as 3-axis accelerations, which are encoded into clicks using baseline calibration and filtering algorithms.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-liberation-500 text-white flex items-center justify-center mr-2 text-xs">2</span>
                  Data Transmission
                </h3>
                <p className="text-gray-600 text-sm">
                  Data is sent serially/wirelessly via ESP32 to the Python application using I2C, where the user can control a keyboard interface using the decoded twitch clicks.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-liberation-500 text-white flex items-center justify-center mr-2 text-xs">3</span>
                  Adaptive Keyboard Interface
                </h3>
                <p className="text-gray-600 text-sm">
                  The PyQt5 interface provides a moving highlight bar which spans across the rows of a adaptive keyboard interface (incl QWERTY, SOS, Mobility, Speak Keys), allowing selection of rows and keys through muscle twitches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Technology;
