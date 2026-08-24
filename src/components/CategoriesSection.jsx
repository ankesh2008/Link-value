import React from 'react';
import './CategoriesSection.css';
import { Code, Brain, Globe, GraduationCap } from 'lucide-react';

export default function CategoriesSection({ onSelectCategory }) {
  return (
    <section className="categories-section" id="categories">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">BROWSE BY CATEGORY</span>
          <h2 className="section-title">
            Find resources in your <span className="gradient-text">area of interest</span>
          </h2>
        </div>

        <div className="categories-grid">
          <a
            href="#dashboard"
            className="category-card"
            id="cat-core-cs"
            onClick={() => onSelectCategory('Core CS')}
          >
            <div className="category-glow" style={{ '--glow-color': '#00e5ff' }}></div>
            <div className="category-icon">
              <Code size={40} color="#00e5ff" />
            </div>
            <h3>Core CS</h3>
            <p>Data structures, algorithms, system design, and foundational CS concepts.</p>
            <span className="category-count">2 Resources</span>
          </a>

          <a
            href="#dashboard"
            className="category-card"
            id="cat-aiml"
            onClick={() => onSelectCategory('AI/ML')}
          >
            <div className="category-glow" style={{ '--glow-color': '#a855f7' }}></div>
            <div className="category-icon">
              <Brain size={40} color="#a855f7" />
            </div>
            <h3>AI / ML</h3>
            <p>Deep learning, NLP, transformers, and practical machine learning courses.</p>
            <span className="category-count">3 Resources</span>
          </a>

          <a
            href="#dashboard"
            className="category-card"
            id="cat-webdev"
            onClick={() => onSelectCategory('Web Dev')}
          >
            <div className="category-glow" style={{ '--glow-color': '#10b981' }}></div>
            <div className="category-icon">
              <Globe size={40} color="#10b981" />
            </div>
            <h3>Web Dev</h3>
            <p>Frontend, backend, React, modern CSS, and full-stack development resources.</p>
            <span className="category-count">3 Resources</span>
          </a>

          <a
            href="#dashboard"
            className="category-card"
            id="cat-academics"
            onClick={() => onSelectCategory('Academics')}
          >
            <div className="category-glow" style={{ '--glow-color': '#f59e0b' }}></div>
            <div className="category-icon">
              <GraduationCap size={40} color="#f59e0b" />
            </div>
            <h3>Academics</h3>
            <p>Operating systems, missing semester tools, and university-level CS education.</p>
            <span className="category-count">2 Resources</span>
          </a>
        </div>
      </div>
    </section>
  );
}
