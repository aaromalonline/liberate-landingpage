import { useRef, useEffect, useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { ImageIcon } from 'lucide-react';

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  title: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
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
    src: '/prjshots/circuit.jpg',
    title: 'Minimal Hardware/Circuit',
    description: 'With just a ADXL345 interfaced with ESP32 through a push button'
  }
];

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const apiRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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

          if (carouselRef.current) {
            carouselRef.current.classList.add('opacity-100');
            carouselRef.current.classList.remove('opacity-0', 'translate-y-10');
          }
          
          // Auto-play video if current slide is video and section is in view
          if (galleryItems[currentIndex].type === 'video' && videoRef.current) {
            videoRef.current.play().catch(err => console.log('Video autoplay prevented:', err));
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
  }, [currentIndex]);

  // Handle video events
  useEffect(() => {
    const handleVideoPlay = () => {
      setIsVideoPlaying(true);
    };

    const handleVideoEnded = () => {
      setIsVideoPlaying(false);
      // Move to next slide when video ends
      if (apiRef.current) {
        apiRef.current.scrollNext();
      }
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
  }, []);

  // Track current slide index
  useEffect(() => {
    const handleCarouselChange = () => {
      if (apiRef.current) {
        const currentIndex = apiRef.current.selectedScrollSnap();
        setCurrentIndex(currentIndex);

        // Auto-play video if the current slide is a video
        if (galleryItems[currentIndex].type === 'video' && videoRef.current) {
          videoRef.current.currentTime = 0; // Reset video to start
          videoRef.current.play().catch(err => console.log('Video autoplay prevented:', err));
        }
      }
    };

    if (apiRef.current) {
      apiRef.current.on("select", handleCarouselChange);
    }

    return () => {
      if (apiRef.current) {
        apiRef.current.off("select", handleCarouselChange);
      }
    };
  }, []);

  // Auto-scroll effect for images only
  useEffect(() => {
    // Don't auto-scroll if video is playing
    if (isVideoPlaying) return;
    
    // Don't set up interval if current slide is a video
    if (galleryItems[currentIndex].type === 'video') return;

    const interval = setInterval(() => {
      if (apiRef.current) {
        // Get the next slide index
        const nextIndex = (currentIndex + 1) % galleryItems.length;
        
        // Only auto-scroll if we're not on a video slide
        if (galleryItems[currentIndex].type !== 'video') {
          apiRef.current.scrollNext();
        }
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isVideoPlaying]);

  return (
    <section id="gallery" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center py-1 px-3 rounded-full bg-liberation-100 text-liberation-700 text-xs font-medium tracking-wide mb-2 reveal-on-scroll">
            <ImageIcon className="h-3.5 w-3.5 mr-1" />
            Gallery
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal-on-scroll">
            See Liberate in Action
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto reveal-on-scroll">
            Browse through our demonstration gallery to see how Liberate transforms lives through innovative accessible technology.
          </p>
        </div>
        
        <div 
          ref={carouselRef} 
          className="transition-all duration-700 ease-out opacity-0 translate-y-10"
        >
          <Carousel
            opts={{ 
              loop: true,
              align: "center",
            }}
            setApi={(api) => { apiRef.current = api; }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {galleryItems.map((item, index) => (
                <CarouselItem key={index} className="pl-4 basis-full">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
                    {item.type === 'image' ? (
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={item.src} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-black relative overflow-hidden">
                        <video 
                          ref={index === 0 ? videoRef : null}
                          src={item.src}
                          muted={index === 0} // Mute first video to allow autoplay
                          controls
                          className="w-full h-full object-cover"
                          playsInline
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
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
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative static left-auto translate-y-0 mr-2" />
              <CarouselNext className="relative static right-auto translate-y-0 ml-2" />
            </div>
          </Carousel>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              {galleryItems[currentIndex].type === 'video' 
                ? 'Video will play automatically' 
                : 'Images auto-scroll every 5 seconds'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-liberation-50 rounded-full opacity-30 filter blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 filter blur-3xl"></div>
    </section>
  );
};

export default Gallery;