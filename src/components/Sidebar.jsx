import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';

const CATEGORIES = ['All', 'Core CS', 'Web Dev', 'AI & ML', 'Academics'];

export default function Sidebar({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  onResetData
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-heading">
          <Compass size={14} />
          <span>CATEGORIES</span>
        </div>

        <nav className="sidebar-nav">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                className={`sidebar-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat)}
              >
                <span>{cat}</span>
                <span className="count-badge">{count}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="reset-data-btn" onClick={onResetData}>
          <RotateCcw size={13} />
          <span>Reset Default List</span>
        </button>
      </div>
    </aside>
  );
}
