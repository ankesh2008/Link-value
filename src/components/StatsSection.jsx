import React from 'react';
import './StatsSection.css';

export default function StatsSection() {
  return (
    <section className="stats-section" id="stats">
      <div className="section-container">
        <div className="stats-grid">
          <div className="stat-item" id="stat-1">
            <div className="stat-value-row">
              <span className="stat-number">10</span>
            </div>
            <span className="stat-label">Curated Resources</span>
          </div>
          <div className="stat-divider"></div>

          <div className="stat-item" id="stat-2">
            <div className="stat-value-row">
              <span className="stat-number">4</span>
            </div>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-divider"></div>

          <div className="stat-item" id="stat-3">
            <div className="stat-value-row">
              <span className="stat-number">7</span>
            </div>
            <span className="stat-label">Semesters Covered</span>
          </div>
          <div className="stat-divider"></div>

          <div className="stat-item" id="stat-4">
            <div className="stat-value-row">
              <span className="stat-number">100</span>
              <span className="stat-suffix">%</span>
            </div>
            <span className="stat-label">Free Resources</span>
          </div>
        </div>
      </div>
    </section>
  );
}
