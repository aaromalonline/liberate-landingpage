import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, FileText, Download } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = "Freedom Beyond Barriers";
  
  useEffect(() => {
    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageContainerRef.current || !heroRef.current) return;
      const {
        clientX,
        clientY
      } = e;
      const {
        width,
        height,
        left,
        top
      } = heroRef.current.getBoundingClientRect();

      // Calculate mouse position relative to the center of the hero section
      const x = (clientX - left - width / 2) / width;
      const y = (clientY - top - height / 2) / height;

      // Apply subtle movement to the image
      imageContainerRef.current.style.transform = `translate3d(${x * -20}px, ${y * -20}px, 0) rotateX(${y * 5}deg) rotateY(${x * -5}deg)`;
    };

    // Typing animation
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // Immediately show hero elements without waiting for intersection
    const showHeroElements = () => {
      if (heroRef.current) {
        const elements = heroRef.current.querySelectorAll('.opacity-0');
        elements.forEach(el => {
          el.classList.remove('opacity-0');
          el.classList.remove('translate-y-10');
          el.classList.add('opacity-100');
        });
      }
    };

    // Show elements immediately
    showHeroElements();
    if (heroRef.current) {
      heroRef.current.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (heroRef.current) {
        heroRef.current.removeEventListener("mousemove", handleMouseMove);
      }
      clearInterval(typingInterval);
    };
  }, []);
  
  return <section ref={heroRef} className="hero-section relative min-h-screen pt-24 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white" id="hero">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
        {/* Hero content */}
        <div className="w-full md:w-1/2 pt-12 md:pt-20 pb-12 space-y-6 md:space-y-8 transition-all duration-700 delay-100">
          <div className="inline-block py-1 px-3 rounded-full bg-liberation-100 text-liberation-700 text-xs font-medium tracking-wide animate-fade-in">
            Introducing Liberate : ATCS - Adaptive Typing & Control System
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            <span className="inline-block min-h-[1.5em]">
              {typedText}
              <span className="inline-block w-1 h-8 bg-gray-900 animate-pulse ml-1"></span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-lg">
          A muscle-twitch-based control system that translates subtle muscle movements into control signals through an adaptive typing interface enabling handsfree assistive control & accessibility for people with limited mobility.
          </p>
          
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button 
                variant="default"
                size="lg"
                className="bg-liberation-500 hover:bg-liberation-600 text-white px-8 py-3 rounded-sm font-medium transition-all duration-300 shadow-sm transform hover:scale-105 hover:shadow flex-1"
                onClick={() => window.open("https://github.com/aaromalonline/liberate", "_blank")}
              >
                <Github className="mr-2 h-4 w-4" />
                Discover & Support on Github
              </Button>
              <a href="#features" className="inline-flex items-center justify-center bg-white text-liberation-600 border border-liberation-200 px-8 py-3 rounded-sm font-medium transition-all duration-300 hover:border-liberation-300 hover:bg-liberation-50 flex-1">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            <div className="sm:px-0 flex sm:w-full">
              <Button 
                onClick={() => window.open('/LiberateATCS-Report.pdf', '_blank')}
                className="inline-flex items-center justify-center bg-liberation-50 text-liberation-700 border border-liberation-300 px-8 py-3 rounded-sm font-medium transition-all duration-300 hover:bg-liberation-100 w-full"
              >
                <FileText className="mr-2 h-4 w-4" />
                Technical Report
              </Button>
            </div>
          </div>
        </div>
        
        {/* Hero image */}
        <div ref={imageContainerRef} className="w-full md:w-1/2 flex justify-center hero-mouse-parallax-container">
          <div className="relative w-full max-w-md hero-mouse-parallax-child transition-all duration-700 delay-300">
            <div className="relative">
              <img alt="Liberate device being used to control a keyboard interface" 
                   loading="lazy" 
                   src="/prjshots/pnglogo.png" 
                   className="w-full h-full object-contain" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-liberation-100 filter blur-xl opacity-60 animate-pulse-subtle"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-blue-100 filter blur-xl opacity-60 animate-pulse-subtle animation-delay-2000"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-all duration-700 delay-700">
        <span className="text-xs text-gray-500 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>;
};
export default Hero;