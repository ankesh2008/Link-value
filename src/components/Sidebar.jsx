import React from 'react';
import './Sidebar.css';
import { RotateCcw, Code, Brain, Globe, GraduationCap, Layers, BookOpen } from 'lucide-react';

const CATEGORIES = [
  { name: 'All Resources', icon: <Layers size={15} /> },
  { name: 'Core CS', icon: <Code size={15} /> },
  { name: 'AI/ML', icon: <Brain size={15} /> },
  { name: 'Web Dev', icon: <Globe size={15} /> },
  { name: 'Academics', icon: <GraduationCap size={15} /> },
  { name: 'Learning Roadmap', icon: <BookOpen size={15} /> }
];

export default function Sidebar({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  onResetData
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-group">
        <div className="sidebar-group-title">CATEGORIES</div>
        <nav className="sidebar-menu">
          {CATEGORIES.map((catObj) => {
            const count = categoryCounts[catObj.name] || 0;
            const isActive = selectedCategory === catObj.name;
            return (
              <button
                key={catObj.name}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(catObj.name)}
              >
                <div className="sidebar-item-left">
                  <span className="sidebar-cat-icon">{catObj.icon}</span>
                  <span className="sidebar-item-label">{catObj.name}</span>
                </div>
                <span className={`sidebar-badge ${isActive ? 'active' : ''}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-status">
          <span className="status-dot"></span>
          <span>Saved locally in browser</span>
        </div>
        <button className="sidebar-reset-btn" onClick={onResetData} title="Reset to default links">
          <RotateCcw size={12} />
          <span>Reset Defaults</span>
        </button>
      </div>
    </aside>
  );
}
