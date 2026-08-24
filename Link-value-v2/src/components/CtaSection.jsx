import React from 'react';
import './CtaSection.css';
import { ArrowRight } from 'lucide-react';

export default function CtaSection({ onExplore }) {
  return (
    <section className="cta-section" id="cta">
      <div className="section-container">
        <div className="cta-card">
          <div className="cta-glow"></div>
          <h2>Ready to start learning?</h2>
          <p>Dive into our curated collection of the best CS resources — completely free.</p>
          <div className="cta-buttons">
            <button className="cta-primary" id="cta-explore" onClick={onExplore}>
              <span>Browse All Resources</span>
              <ArrowRight size={20} className="cta-arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
