import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryLink({ category, title, description, count, icon: Icon, onSelect }) {
  return (
    <a
      href="#dashboard"
      className="category-card"
      onClick={(event) => {
        event.preventDefault();
        onSelect(category);
      }}
    >
      <span className="category-icon"><Icon size={27} aria-hidden="true" /></span>
      <span className="category-card-content">
        <span className="category-name">{title}</span>
        <span className="category-description">{description}</span>
        <span className="category-count">{count} {count === 1 ? 'resource' : 'resources'}</span>
      </span>
      <ArrowUpRight className="category-arrow" size={18} aria-hidden="true" />
    </a>
  );
}
