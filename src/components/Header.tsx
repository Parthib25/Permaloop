'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import HireModal from './HireModal';

interface HeaderProps {
  activeSection?: string;
}

export default function Header({ activeSection = 'home' }: HeaderProps) {
  const [isHireOpen, setIsHireOpen] = useState(false);
  const pathname = usePathname();

  // Listen for open-hire-modal events from other components
  useEffect(() => {
    const handleOpen = () => setIsHireOpen(true);
    window.addEventListener('open-hire-modal', handleOpen);
    return () => window.removeEventListener('open-hire-modal', handleOpen);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // Only smooth scroll if we are on the homepage
    if (pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const offset = 80; // Offset for sticky header
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const isHomeActive = (section: string) => {
    return activeSection === section ? 'active' : '';
  };

  return (
    <>
      <header className="nav-header">
        <div className="container flex items-center justify-between">
          <Link href="/" onClick={(e) => handleNavClick(e, 'home')}>
            <Logo size={28} hideText={true} />
          </Link>
          
          <nav>
            <ul className="nav-links">
              <li>
                <Link 
                  href="/#home" 
                  className={`nav-link ${pathname === '/' ? isHomeActive('home') : ''}`}
                  onClick={(e) => handleNavClick(e, 'home')}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/#experience" 
                  className={`nav-link ${pathname === '/' ? isHomeActive('experience') : ''}`}
                  onClick={(e) => handleNavClick(e, 'experience')}
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link 
                  href="/#projects" 
                  className={`nav-link ${pathname === '/' ? isHomeActive('projects') : 'active'}`}
                  onClick={(e) => handleNavClick(e, 'projects')}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/#about" 
                  className={`nav-link ${pathname === '/' ? isHomeActive('about') : ''}`}
                  onClick={(e) => handleNavClick(e, 'about')}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/#contact" 
                  className={`nav-link ${pathname === '/' ? isHomeActive('contact') : ''}`}
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => setIsHireOpen(true)}
          >
            Hire Me
          </button>
        </div>
      </header>

      {/* Reusable Hire Modal */}
      <HireModal isOpen={isHireOpen} onClose={() => setIsHireOpen(false)} />
    </>
  );
}
