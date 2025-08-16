import React, { useRef, useEffect, useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem 
} from '@/components/ui/carousel';
import { ImageIcon } from 'lucide-react';

interface GalleryItem {
  type: 'image' | 'video' | 'youtube';
  src: string;
  title: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    type: 'youtube',
    src: 'https://www.youtube.com/embed/9NmNVjKmtew',
    title: 'Watch Liberate presentation',
    description: 'Click to play on YouTube'
  },
  {
    type: 'video',
    src: '/prjshots/liberateatcs-intro.mp4',
    title: 'Liberate:ATCS - Introduction',
    description: 'Prototype Overview'
  },
  {
    type: 'image',
    src: '/prjshots/ui.jpg',
    title: 'Adaptive Interface',
    description: 'Our adaptive keyboard interface provides an intuitive experience for users with limited mobility'
  },
  {
    type: 'image',
    src: '/prjshots/product2.jpg',
    title: 'Sensor Technology',
    description: 'The ADXL345 accelerometer detects subtle muscle movements with high precision'
  },
  {
    type: 'image',
    src: '/prjshots/protodevice.png',
    title: 'Device Prototype',
    description: 'Device prototype with ADXL345 accelerometer, TCRT5000 IR sensor and ESP32'
  },
  {
    type: 'image',
    src: '/prjshots/circuit.jpg',
    title: 'Minimal Hardware/Circuit',
    description: 'With just a ADXL345 interfaced with ESP32 through a push button'
  },
  {
    type: 'image',
    src: '/prjshots/present.jpg',
    title: 'Presenting Liberate',
    description: "We built & demonstrated the prototype in an 8hr hardware hackathon, Buildathon-Hertz25' @ CUSAT, India"
  }
];

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const apiRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          const elements = entry.target.querySelectorAll('.reveal-on-scroll');
          elements.forEach((el, index) => {
            setTimeout(() => el.classList.add('revealed'), 100 * index);
          });
          if (carouselRef.current) {
            carouselRef.current.classList.add('opacity-100');
            carouselRef.current.classList.remove('opacity-0', 'translate-y-10');
          }
          if (galleryItems[currentIndex].type === 'video' && videoRef.current) {
            videoRef.current.play().catch(err => console.log('Video autoplay prevented:', err));
          }
        } else {
          setIsInViewport(false);
        }
      });
    }, observerOptions);
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, [currentIndex]);

  useEffect(() => {
    const handleVideoPlay = () => setIsVideoPlaying(true);
    const handleVideoEnded = () => {
      setIsVideoPlaying(false);
      if (apiRef.current) apiRef.current.scrollNext();
    };
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('play', handleVideoPlay);
      videoElement.addEventListener('ended', handleVideoEnded);
      videoElement.addEventListener('pause', () => setIsVideoPlaying(false));
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('play', handleVideoPlay);
        videoElement.removeEventListener('ended', handleVideoEnded);
        videoElement.removeEventListener('pause', () => setIsVideoPlaying(false));
      }
    };
  }, [videoRef.current]);

  useEffect(() => {
    const handleCarouselChange = () => {
      if (apiRef.current) {
        const idx = apiRef.current.selectedScrollSnap();
        setCurrentIndex(idx);
        if (galleryItems[idx].type === 'video' && videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(err => console.log('Video autoplay prevented:', err));
        }
      }
    };
    if (apiRef.current) apiRef.current.on("select", handleCarouselChange);
    return () => { if (apiRef.current) apiRef.current.off("select", handleCarouselChange); };
  }, [apiRef.current]);

  useEffect(() => {
    if (!isInViewport || isVideoPlaying || galleryItems[currentIndex].type === 'video') return;
    const interval = setInterval(() => { if (apiRef.current) apiRef.current.scrollNext(); }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isVideoPlaying, isInViewport]);

  const handlePrevious = () => { if (apiRef.current) apiRef.current.scrollPrev(); };
  const handleNext = () => { if (apiRef.current) apiRef.current.scrollNext(); };

  return (
    <section id="gallery" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center py-1 px-3 rounded-full bg-liberation-100 text-liberation-700 text-xs font-medium tracking-wide mb-2 reveal-on-scroll">
            <ImageIcon className="h-3.5 w-3.5 mr-1" />
            Gallery
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal-on-scroll">See Liberate in Action</h2>
          <p className="text-gray-600 max-w-2xl mx-auto reveal-on-scroll">
            Browse through our demonstration gallery to see how Liberate transforms lives through innovative accessible technology.
          </p>
        </div>

        <div ref={carouselRef} className="transition-all duration-700 ease-out opacity-0 translate-y-10">
          <div className="relative">
            <Carousel opts={{ loop: true, align: "center" }} setApi={api => { apiRef.current = api; }} className="w-full">
              <CarouselContent className="-ml-4">
                {galleryItems.map((item, index) => (
                  <CarouselItem key={index} className="pl-4 basis-full">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
                      {item.type === 'image' && (
                        <div className="aspect-video relative overflow-hidden">
                          <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                        </div>
                      )}
                      {item.type === 'video' && (
                        <div className="aspect-video bg-black relative overflow-hidden">
                          <video ref={index === 1 ? videoRef : null} src={item.src} muted controls className="w-full h-full object-cover" playsInline preload="metadata">
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                      {item.type === 'youtube' && (
                        <div className="aspect-video relative overflow-hidden">
                          <iframe
                            className="w-full h-full"
                            src={item.src}
                            title={item.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm flex-grow">{item.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-2 md:px-6 transform -translate-y-1/2 pointer-events-none">
              <button onClick={handlePrevious} className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 md:p-3 shadow-md transition-all duration-300 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-liberation-500" aria-label="Previous slide">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={handleNext} className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 md:p-3 shadow-md transition-all duration-300 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-liberation-500" aria-label="Next slide">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <div className="flex items-center space-x-2">
              {galleryItems.map((_, index) => (
                <button key={index} onClick={() => apiRef.current?.scrollTo(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-liberation-600 w-4' : 'bg-gray-300'}`} aria-label={`Go to slide ${index + 1}`} />
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              {galleryItems[currentIndex].type === 'video' ? 'Video will play automatically' : 'Images auto-scroll every 5 seconds'}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-0 w-64 h-64 bg-liberation-50 rounded-full opacity-30 filter blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 filter blur-3xl"></div>
    </section>
  );
};

export default Gallery;
