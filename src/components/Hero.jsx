import React from 'react';
import './Hero.css';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export default function Hero({ onExplore }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img src="/hero-bg.jpg" alt="" className="hero-bg-img" aria-hidden="true" />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-kicker">
          <Sparkles size={14} />
          <span>YOUR CS LEARNING COMPANION</span>
        </div>
        <h1 className="hero-title" id="hero-title">
          <span className="hero-title-line">From your first tag</span>
          <span className="hero-title-line hero-title-accent">to full-stack apps.</span>
        </h1>
        <p className="hero-subtitle" id="hero-subtitle">
          Follow a project-driven, 72-week frontend roadmap — from HTML and CSS
          through React, routing, and real-world APIs.
        </p>
        <button type="button" className="hero-cta" id="hero-cta" onClick={onExplore}>
          <BookOpen size={17} />
          <span>Explore resources</span>
          <ArrowRight size={17} className="cta-arrow" />
        </button>
        <p className="hero-footnote">Curated for curious minds. Free to explore.</p>
      </div>
    </section>
  );
}
