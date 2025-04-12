import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12',
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#" 
          className="text-2xl font-medium tracking-tighter transition-opacity duration-300 hover:opacity-80"
        >
          Liberate
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {/* Desktop navigation */}
          <nav className="flex space-x-8">
            {[
              { name: 'Gallery', id: 'gallery' },
              { name: 'Features', id: 'features' },
              { name: 'Technology', id: 'technology' },
              { name: 'About', id: 'about' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <a 
                key={item.name} 
                href={`#${item.id}`}
                className="nav-link text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* GitHub Star Count */}
          <a
            href="https://github.com/aaromalonline/liberate-atcs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[12px] leading-4 font-medium text-gray-700 hover:text-gray-800"
          >
            <span className="inline-flex items-center space-x-2 border border-gray-300 rounded-md px-2 py-0.5 hover:bg-gray-50 transition-colors">
              <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-current">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <svg aria-hidden="true" height="14" viewBox="0 0 16 16" version="1.1" width="14" className="fill-current">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
              </svg>
              <span>Star</span>
              <span className="px-1.5 py-0.5 bg-gray-100 rounded-[20px] text-[11px] font-semibold">4</span>
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-4 space-y-3">
          {[
            { name: 'Gallery', id: 'gallery' },
            { name: 'Features', id: 'features' },
            { name: 'Technology', id: 'technology' },
            { name: 'About', id: 'about' },
            { name: 'Contact', id: 'contact' }
          ].map((item) => (
            <a 
              key={item.name} 
              href={`#${item.id}`}
              className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          
          {/* GitHub Star Count - Mobile */}
          <a
            href="https://github.com/aaromalonline/liberate-atcs"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="inline-flex items-center space-x-2 border border-gray-300 rounded-md px-2 py-0.5 hover:bg-gray-50 transition-colors">
              <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-current">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <svg aria-hidden="true" height="14" viewBox="0 0 16 16" version="1.1" width="14" className="fill-current">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
              </svg>
              <span>Star</span>
              <span className="px-1.5 py-0.5 bg-gray-100 rounded-[20px] text-[11px] font-semibold">4</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
