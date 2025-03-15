
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
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
    };
  }, []);
  
  return <section ref={heroRef} className="hero-section relative min-h-screen pt-24 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white" id="hero">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
        {/* Hero content */}
        <div className="w-full md:w-1/2 pt-12 md:pt-20 pb-12 space-y-6 md:space-y-8 transition-all duration-700 delay-100">
          <div className="inline-block py-1 px-3 rounded-full bg-liberation-100 text-liberation-700 text-xs font-medium tracking-wide animate-fade-in">
            Introducing Liberate
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Freedom Beyond <br /> 
            <span className="text-liberation-500">Barriers</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-lg">
            Muscle movement detection system that converts subtle muscle activity into control signals, enabling hands-free device control.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#contact" className="inline-flex items-center justify-center bg-liberation-500 hover:bg-liberation-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm transform hover:scale-105 hover:shadow">
              Get Early Access
            </a>
            <a href="#features" className="inline-flex items-center justify-center bg-white text-liberation-600 border border-liberation-200 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:border-liberation-300 hover:bg-liberation-50">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
          <div className="pt-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-gray-600 hover:text-liberation-700 border-gray-200 hover:border-liberation-200 bg-white/50 backdrop-blur-sm transition-all"
              onClick={() => window.open("https://github.com/aaromalonline/liberate", "_blank")}
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </div>
        </div>
        
        {/* Hero image */}
        <div ref={imageContainerRef} className="w-full md:w-1/2 flex justify-center hero-mouse-parallax-container">
          <div className="relative w-full max-w-md hero-mouse-parallax-child transition-all duration-700 delay-300">
            {/* Enhanced visual representation of Liberate */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-liberation-50/80 to-blue-100/60">
              <div className="aspect-w-4 aspect-h-3 bg-transparent relative">
                {/* Background gradient layers */}
                <div className="absolute inset-0 bg-gradient-radial from-liberation-100/90 via-liberation-50/60 to-transparent z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 via-liberation-100/30 to-white/20 z-10"></div>
                
                {/* Main visualization */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="relative w-full h-full overflow-hidden">
                    {/* Center brain-interface like structure */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center z-30 animate-pulse-subtle">
                      <div className="w-28 h-28 rounded-full bg-liberation-300/20 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-liberation-400/40 flex items-center justify-center shadow-inner">
                          <div className="w-8 h-8 rounded-full bg-liberation-500/60 shadow-inner"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Neural network and connection visualization */}
                    {[...Array(16)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-liberation-300/90 via-blue-300/60 to-transparent z-20"
                        style={{
                          width: '60%',
                          transform: `rotate(${i * 22.5}deg)`,
                          transformOrigin: '0 center'
                        }}
                      >
                        <div className="absolute right-0 w-2 h-2 rounded-full bg-liberation-400/70 animate-pulse-subtle" 
                          style={{ animationDelay: `${i * 0.15}s` }}></div>
                        
                        {/* Additional nodes along neural connections */}
                        <div className="absolute right-1/3 w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse-subtle" 
                          style={{ animationDelay: `${i * 0.15 + 0.3}s` }}></div>
                        
                        <div className="absolute right-2/3 w-1 h-1 rounded-full bg-liberation-300/50 animate-pulse-subtle" 
                          style={{ animationDelay: `${i * 0.15 + 0.6}s` }}></div>
                      </div>
                    ))}
                    
                    {/* Neural pattern wave background */}
                    <div className="absolute inset-0 opacity-20" 
                      style={{ 
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 12px, rgba(99, 102, 241, 0.1) 12px, rgba(99, 102, 241, 0.1) 24px)',
                        backgroundSize: '100% 100%',
                        animation: 'moveLines 15s linear infinite'
                      }}>
                    </div>
                    
                    {/* Cross pattern for brain signal visualization */}
                    <div className="absolute inset-0 opacity-10" 
                      style={{ 
                        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(79, 148, 212, 0.2) 12px, rgba(79, 148, 212, 0.2) 24px)',
                        backgroundSize: '100% 100%',
                        animation: 'moveLines 20s linear infinite'
                      }}>
                    </div>
                    
                    {/* Scattered small nodes representing neural activity */}
                    {[...Array(20)].map((_, i) => {
                      const randomSize = 0.5 + Math.random() * 1.5;
                      const randomX = 15 + Math.random() * 70;
                      const randomY = 15 + Math.random() * 70;
                      const randomDelay = Math.random() * 5;
                      
                      return (
                        <div 
                          key={`node-${i}`}
                          className="absolute rounded-full bg-liberation-300/80 animate-pulse-subtle"
                          style={{
                            width: `${randomSize}px`,
                            height: `${randomSize}px`,
                            left: `${randomX}%`,
                            top: `${randomY}%`,
                            animationDelay: `${randomDelay}s`
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Overlay gradients for better blending */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 rounded-xl z-30"></div>
                
                {/* Animated highlight effect */}
                <div className="device-shine z-40"></div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-liberation-100/80 filter blur-2xl opacity-60 animate-pulse-subtle"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-blue-100/80 filter blur-2xl opacity-60 animate-pulse-subtle animation-delay-2000"></div>
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
