import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Search, Plus } from 'lucide-react';

export default function Navbar({
  searchQuery,
  onSearchChange,
  onOpenAddModal
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
        <a href="#hero" className="logo" id="logo">
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
        </a>
      </div>

      <div className="nav-center">
        <div className="search-bar" id="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            id="search-input"
          />
        </div>
      </div>

      <div className="nav-right">
        <a href="#dashboard" className="nav-link" id="nav-dashboard">DASHBOARD</a>
        <a href="#explore" className="nav-link" id="nav-about">ABOUT US</a>
        <a href="#categories" className="nav-link" id="nav-contact">CATEGORIES</a>
        <a href="#cta" className="nav-link" id="nav-faq">FAQ</a>

        <button className="nav-add-btn" onClick={onOpenAddModal}>
          <Plus size={16} />
          <span>+ Add Resource</span>
        </button>
      </div>
    </nav>
  );
}
