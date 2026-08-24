import React from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import ResourceCard from './ResourceCard';
import { Filter, X, Sparkles, Layers } from 'lucide-react';

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

export default function Dashboard({
  resources,
  selectedCategory,
  onSelectCategory,
  selectedSemester,
  onSelectSemester,
  selectedTag,
  onSelectTag,
  searchQuery,
  onClearSearch,
  categoryCounts,
  onStatusToggle,
  onDeleteResource,
  onResetData
}) {
  return (
    <section className="dashboard-section" id="dashboard">
      <div className="dashboard-wrapper">
        {/* Horizontal Semester Navigation Tabs */}
        <div className="semester-tabs-container">
          <div className="semester-tabs-header">
            <Layers size={15} className="sem-header-icon" />
            <span>FILTER BY SEMESTER:</span>
          </div>
          <div className="semester-tabs">
            {SEMESTERS.map((sem) => {
              const isActive = selectedSemester === sem;
              return (
                <button
                  key={sem}
                  className={`sem-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectSemester(sem)}
                >
                  {sem === 'All Semesters' ? 'All Semesters' : sem.replace('Semester ', 'Sem ')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dashboard Main Grid with Left Sidebar */}
        <div className="dashboard-container">
          {/* Left Sidebar Category Navigation */}
          <Sidebar
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            selectedSemester={selectedSemester}
            onSelectSemester={onSelectSemester}
            categoryCounts={categoryCounts}
            onResetData={onResetData}
          />

          {/* Main Resource Cards Viewport */}
          <main className="dashboard-main">
            {/* Active Header Row */}
            <div className="dashboard-header">
              <div>
                <div className="active-category-title-row">
                  <h2 className="dashboard-title">{selectedCategory}</h2>
                  {selectedSemester !== 'All Semesters' && (
                    <span className="sem-active-badge">{selectedSemester}</span>
                  )}
                </div>
                <p className="dashboard-count">
                  Showing {resources.length} {resources.length === 1 ? 'curated link' : 'curated links'}
                </p>
              </div>

              {/* Active Filter Chips */}
              {(selectedCategory !== 'All Resources' || selectedSemester !== 'All Semesters' || selectedTag || searchQuery) && (
                <div className="active-filters-box">
                  {selectedTag && (
                    <span className="filter-chip">
                      #{selectedTag}
                      <X size={12} className="chip-remove" onClick={() => onSelectTag(null)} />
                    </span>
                  )}

                  {searchQuery && (
                    <span className="filter-chip">
                      Search: "{searchQuery}"
                      <X size={12} className="chip-remove" onClick={onClearSearch} />
                    </span>
                  )}

                  <button
                    className="clear-all-filters-btn"
                    onClick={() => {
                      onSelectCategory('All Resources');
                      onSelectSemester('All Semesters');
                      onSelectTag(null);
                      onClearSearch();
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* 3-Column Resource Cards Grid */}
            {resources.length > 0 ? (
              <div className="resource-grid">
                {resources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onStatusToggle={onStatusToggle}
                    onTagClick={onSelectTag}
                    onDelete={onDeleteResource}
                  />
                ))}
              </div>
            ) : (
              <div className="dashboard-empty">
                <Filter size={36} className="empty-icon" />
                <h3>No resources match your filters</h3>
                <p>Try clearing your active tags, search keyword, or selected semester.</p>
                <button
                  className="empty-reset-btn"
                  onClick={() => {
                    onSelectCategory('All Resources');
                    onSelectSemester('All Semesters');
                    onSelectTag(null);
                    onClearSearch();
                  }}
                >
                  <Sparkles size={14} />
                  <span>Show All Resources</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
