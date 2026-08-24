import React from 'react';
import './Footer.css';

export default function Footer({ onSelectCategory, onOpenAddModal }) {
  return (
    <footer className="footer" id="footer">
      <div className="section-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="6" fill="#00e5ff" />
                  <path d="M8 9h12M8 14h8M8 19h10" stroke="#0a0e1a" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="logo-text">
                <span class="logo-name">Link Value</span>
                <span class="logo-sub">CS RESOURCE HUB</span>
              </div>
            </div>
            <p className="footer-desc">
              A curated collection of the best Computer Science learning resources,
              organized by category and semester.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Categories</h4>
              <a href="#dashboard" onClick={() => onSelectCategory('Core CS')}>Core CS</a>
              <a href="#dashboard" onClick={() => onSelectCategory('AI/ML')}>AI / ML</a>
              <a href="#dashboard" onClick={() => onSelectCategory('Web Dev')}>Web Dev</a>
              <a href="#dashboard" onClick={() => onSelectCategory('Academics')}>Academics</a>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <a href="#dashboard">All Resources</a>
              <button className="footer-btn-link" onClick={onOpenAddModal}>Add Resource</button>
              <a href="#explore">About Us</a>
              <a href="#cta">FAQ</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Link Value. Built for CS students, by CS students.</p>
        </div>
      </div>
    </footer>
  );
}
