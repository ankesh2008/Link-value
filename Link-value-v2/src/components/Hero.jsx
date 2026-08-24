import React from 'react';
import './Hero.css';
import { ArrowRight, Star, Sparkles } from 'lucide-react';

export default function Hero({ onExplore, title = "Link Value", subtitle, showButton = true, isCompact = false }) {
  const defaultSubtitle = "Your curated gateway to the best Computer Science resources. Master core fundamentals, explore algorithms, and dive into AI and web development.";

  return (
    <section className={`hero ${isCompact ? 'hero-compact' : ''}`} id="hero">
      <div className="hero-bg">
        <div className="hero-overlay"></div>
        <div className="geo-shape geo-pyramid-large"></div>
        <div className="geo-shape geo-pyramid-small"></div>
        <div className="geo-shape geo-pyramid-bottom"></div>
        <div className="geo-shape geo-circle">
          <div className="geo-nodes">
            <div className="geo-node n1"></div>
            <div className="geo-node n2"></div>
            <div className="geo-node n3"></div>
            <div className="geo-line l1"></div>
            <div className="geo-line l2"></div>
          </div>
        </div>
        <div className="geo-shape geo-dots"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title" id="hero-title">
          <span className="hero-title-line">{title}</span>
        </h1>
        <p className="hero-subtitle" id="hero-subtitle">
          {subtitle || defaultSubtitle}
        </p>
        {showButton && (
          <button className="hero-cta-primary" id="hero-cta" onClick={onExplore}>
            <span>Explore Resources</span>
            <ArrowRight size={20} className="cta-arrow" />
          </button>
        )}
        {!isCompact && (
          <div className="hero-stats-mini">
            <div className="stat-mini"><Star size={14} className="stat-icon" /> <strong>500+</strong> Curated Resources</div>
            <div className="stat-separator"></div>
            <div className="stat-mini"><Sparkles size={14} className="stat-icon" /> <strong>Daily</strong> Updates</div>
          </div>
        )}
      </div>


    </section>
  );
}
