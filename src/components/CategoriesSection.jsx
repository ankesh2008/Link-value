import React from 'react';
import './CategoriesSection.css';
import { Code, Brain, Globe, GraduationCap, BookOpen } from 'lucide-react';
import CategoryLink from './CategoryLink';

const CATEGORIES = [
  {
    category: 'Core CS',
    title: 'Core CS',
    description: 'Data structures, algorithms, system design, and foundational CS concepts.',
    count: 2,
    icon: Code
  },
  {
    category: 'AI/ML',
    title: 'AI / ML',
    description: 'Deep learning, NLP, transformers, and practical machine learning courses.',
    count: 3,
    icon: Brain
  },
  {
    category: 'Web Dev',
    title: 'Web Development',
    description: 'Frontend, backend, React, modern CSS, and full-stack development resources.',
    count: 3,
    icon: Globe
  },
  {
    category: 'Academics',
    title: 'Academics',
    description: 'Operating systems, missing semester tools, and university-level CS education.',
    count: 2,
    icon: GraduationCap
  },
  {
    category: 'Learning Roadmap',
    title: 'Frontend learning roadmap',
    description: 'A guided 72-week path from HTML and CSS through React, routing, and real API projects.',
    count: 12,
    icon: BookOpen
  }
];

export default function CategoriesSection({ onSelectCategory, categoryCounts }) {
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
          {CATEGORIES.map((category) => (
            <CategoryLink
              key={category.category}
              {...category}
              count={categoryCounts[category.category] ?? category.count}
              onSelect={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
