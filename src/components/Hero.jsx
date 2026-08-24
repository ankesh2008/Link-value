import React from 'react';
import './Hero.css';
import { ArrowRight, Plus, Search, Sparkles, BookOpen, Layers, Terminal } from 'lucide-react';

export default function Hero({
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onOpenAddModal
}) {
  const quickCategories = [
    { label: 'Core CS', icon: <Terminal size={14} />, cat: 'Core CS' },
    { label: 'AI & ML', icon: <Sparkles size={14} />, cat: 'AI/ML' },
    { label: 'Web Dev', icon: <BookOpen size={14} />, cat: 'Web Dev' },
    { label: 'Academics', icon: <Layers size={14} />, cat: 'Academics' }
  ];

  return (
    <section className="hero-section" id="hero">
      {/* Background Cyber Mesh & Ambient Glowing Orbs */}
      <div className="hero-ambient-glow orb-1"></div>
      <div className="hero-ambient-glow orb-2"></div>
      <div className="hero-grid-pattern"></div>

      <div className="hero-container">
        {/* Floating Top Badge */}
        <div className="hero-badge">
          <span className="badge-pulse"></span>
          <span>CS RESOURCE HUB 2.0 — ALL 8 SEMESTERS</span>
        </div>

        {/* Hero Headline */}
        <h1 className="hero-main-title">
          Master Computer Science <br />
          <span className="hero-gradient-text">One Curated Link</span> at a Time.
        </h1>

        {/* Hero Description */}
        <p className="hero-description">
          A centralized, intelligent dashboard to organize, filter, and track your
          study roadmaps, documentation, and tools across core CS, web engineering, AI/ML, and academics.
        </p>

        {/* Hero Interactive Search Bar */}
        <div className="hero-search-wrapper">
          <Search size={18} className="hero-search-icon" />
          <input
            type="text"
            placeholder="Search resources by title, topic, tag (#DSA, #React) or semester..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="hero-search-input"
          />
          {searchQuery && (
            <button className="hero-search-clear" onClick={() => onSearchChange('')}>
              Clear
            </button>
          )}
        </div>

        {/* Quick Category Filter Pills */}
        <div className="hero-quick-pills">
          <span className="quick-label">Popular Topics:</span>
          {quickCategories.map((item) => (
            <button
              key={item.label}
              className="quick-pill-btn"
              onClick={() => {
                onSelectCategory(item.cat);
                const dash = document.getElementById('dashboard');
                if (dash) dash.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Hero Call-To-Action Buttons */}
        <div className="hero-action-row">
          <a href="#dashboard" className="hero-primary-btn">
            <span>Explore Dashboard</span>
            <ArrowRight size={16} />
          </a>

          <button className="hero-secondary-btn" onClick={onOpenAddModal}>
            <Plus size={16} />
            <span>Add Resource</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="hero-stats-row">
          <div className="hero-stat-card">
            <span className="stat-value">100%</span>
            <span className="stat-name">Free CS Resources</span>
          </div>
          <div className="stat-sep"></div>
          <div className="hero-stat-card">
            <span className="stat-value">9+</span>
            <span className="stat-name">Curated Roadmaps</span>
          </div>
          <div className="stat-sep"></div>
          <div className="hero-stat-card">
            <span className="stat-value">7</span>
            <span className="stat-name">Semesters Covered</span>
          </div>
        </div>
      </div>
    </section>
  );
}
