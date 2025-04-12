
import { useRef, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { GalleryIcon } from 'lucide-react';

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  title: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=1200&h=800',
    title: 'User Interface',
    description: 'Our adaptive keyboard interface provides an intuitive experience for users with limited mobility'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1200&h=800',
    title: 'Hardware Integration',
    description: 'Liberate seamlessly connects with existing tech ecosystems for a smooth setup experience'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&h=800',
    title: 'Sensor Technology',
    description: 'The ADXL345 accelerometer detects subtle muscle movements with high precision'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200&h=800',
    title: 'Accessibility Options',
    description: 'Configure the system for various mobility needs and preferences'
  }
];

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="gallery" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center py-1 px-3 rounded-full bg-liberation-100 text-liberation-700 text-xs font-medium tracking-wide mb-2 reveal-on-scroll">
            <GalleryIcon className="h-3.5 w-3.5 mr-1" />
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
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {galleryItems.map((item, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
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
                      <div className="aspect-video bg-black flex items-center justify-center text-white">
                        <span>Video Content</span>
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
              Swipe or use arrows to navigate through the gallery
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
