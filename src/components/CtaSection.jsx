import React from 'react';
import './CtaSection.css';
import { ArrowRight } from 'lucide-react';

export default function CtaSection({ onOpenAddModal }) {
  return (
    <section className="cta-section" id="cta">
      <div className="section-container">
        <div className="cta-card">
          <div className="cta-glow"></div>
          <h2>Ready to start learning?</h2>
          <p>Dive into our curated collection of the best CS resources — completely free.</p>
          <div className="cta-buttons">
            <a href="#dashboard" className="hero-cta" id="cta-explore">
              <span>Browse All Resources</span>
              <ArrowRight size={20} className="cta-arrow" />
            </a>
            <button className="cta-secondary" id="cta-add" onClick={onOpenAddModal}>
              + Add a Resource
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
