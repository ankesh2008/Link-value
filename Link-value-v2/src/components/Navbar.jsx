import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Search } from 'lucide-react';

export default function Navbar({
  currentPage,
  onNavigate,
  searchQuery,
  onSearchChange
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-left">
        <button className="logo-btn" onClick={() => onNavigate('home')}>
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#00e5ff" />
              <path d="M8 9h12M8 14h8M8 19h10" stroke="#0a0e1a" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-name">Link Value</span>
            <span className="logo-sub">CS RESOURCE HUB</span>
          </div>
        </button>
      </div>

      <div className="nav-center">
        {currentPage === 'dashboard' && (
          <div className="search-bar" id="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search for resources..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentPage !== 'dashboard' && e.target.value.trim() !== '') {
                  onNavigate('dashboard');
                }
              }}
              id="search-input"
            />
          </div>
        )}
      </div>

      <div className="nav-right">
      </div>
    </nav >
  );
}
