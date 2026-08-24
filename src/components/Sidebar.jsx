import React from 'react';
import './Sidebar.css';
import { RotateCcw } from 'lucide-react';

const CATEGORIES = ['All Resources', 'Core CS', 'AI/ML', 'Web Dev', 'Academics'];
const SEMESTERS = [
  'All Semesters',
  'Semester 1',
  'Semester 2',
  'Semester 3',
  'Semester 4',
  'Semester 5',
  'Semester 6',
  'Semester 7'
];

export default function Sidebar({
  selectedCategory,
  onSelectCategory,
  selectedSemester,
  onSelectSemester,
  categoryCounts,
  onResetData
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-group">
        <div className="sidebar-group-title">CATEGORIES</div>
        <nav className="sidebar-menu">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat)}
              >
                <span className="sidebar-item-label">{cat}</span>
                <span className={`sidebar-badge ${isActive ? 'active' : ''}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-group">
        <div className="sidebar-group-title">SEMESTER</div>
        <nav className="sidebar-menu">
          {SEMESTERS.map((sem) => {
            const isActive = selectedSemester === sem;
            return (
              <button
                key={sem}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectSemester(sem)}
              >
                <span className="sidebar-item-label">{sem}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-status">
          <span className="status-dot"></span>
          <span>Saved locally in your browser</span>
        </div>
        <button className="sidebar-reset-btn" onClick={onResetData} title="Reset to default links">
          <RotateCcw size={12} />
          <span>Reset Defaults</span>
        </button>
      </div>
    </aside>
  );
}
