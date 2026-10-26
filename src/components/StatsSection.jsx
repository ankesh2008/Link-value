import React from 'react';
import './StatsSection.css';

export default function StatsSection({ resources }) {
  const categoryCount = new Set(
    resources.map((resource) => resource.category).filter(Boolean)
  ).size;
  const roadmapCount = resources.filter(
    (resource) => resource.category === 'Learning Roadmap'
  ).length;

  return (
    <section className="stats-section" id="stats">
      <div className="section-container">
        <div className="stats-grid">
          <div className="stat-item" id="stat-1">
            <div className="stat-value-row">
              <span className="stat-number">{resources.length}</span>
            </div>
            <span className="stat-label">Resources to explore</span>
          </div>
          <div className="stat-divider"></div>

          <div className="stat-item" id="stat-2">
            <div className="stat-value-row">
              <span className="stat-number">{categoryCount}</span>
            </div>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-divider"></div>

          <div className="stat-item" id="stat-3">
            <div className="stat-value-row">
              <span className="stat-number">{roadmapCount}</span>
            </div>
            <span className="stat-label">Roadmap modules</span>
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
