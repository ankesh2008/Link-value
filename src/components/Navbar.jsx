import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { LogOut } from 'lucide-react';

export default function Navbar({
  onNavigate,
  onOpenAuth,
  authUser,
  onLogout
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
              <rect width="28" height="28" rx="6" fill="currentColor" />
              <path d="M8 9h12M8 14h8M8 19h10" stroke="var(--bg-primary)" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-name">Link Value</span>
            <span className="logo-sub">CS RESOURCE HUB</span>
          </div>
        </button>
      </div>

      <div className="nav-right">
        <a href="#explore" className="nav-link" onClick={() => onNavigate('home')}>ABOUT US</a>
        <a href="#categories" className="nav-link" onClick={() => onNavigate('home')}>CATEGORIES</a>
        <a href="#cta" className="nav-link" onClick={() => onNavigate('home')}>FAQ</a>

        {authUser ? (
          <div className="nav-account">
            <span className="nav-account-name">{authUser.name || authUser.email}</span>
            <button className="nav-auth-btn" onClick={onLogout} aria-label="Log out">
              <LogOut size={15} />
              <span>Log out</span>
            </button>
          </div>
        ) : (
          <div className="nav-auth-actions">
            <button className="nav-auth-btn" onClick={() => onOpenAuth('login')}>Log in</button>
            <button className="nav-auth-btn nav-auth-btn-primary" onClick={() => onOpenAuth('signup')}>Sign up</button>
          </div>
        )}
      </div>
    </nav>
  );
}
