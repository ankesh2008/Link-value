import React from 'react';
import './Hero.css';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onExplore }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img src="/hero-bg.jpg" alt="" className="hero-bg-img" aria-hidden="true" />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title" id="hero-title">
          <span className="hero-title-line">WELCOME</span>
        </h1>
        <p className="hero-subtitle" id="hero-subtitle">
          Your curated gateway to the best Computer Science resources — from core
          fundamentals and algorithms to AI/ML, web development, and beyond. Start
          your learning journey with Link Value.
        </p>
        <button className="hero-cta" id="hero-cta" onClick={onExplore}>
          <span>EXPLORE RESOURCES</span>
          <ArrowRight size={20} className="cta-arrow" />
        </button>
      </div>
    </section>
  );
}
