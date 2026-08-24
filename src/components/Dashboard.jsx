import React from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import ResourceCard from './ResourceCard';
import { Filter, X } from 'lucide-react';

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
      <div className="dashboard-container">
        {/* Left Sidebar Navigation */}
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          selectedSemester={selectedSemester}
          onSelectSemester={onSelectSemester}
          categoryCounts={categoryCounts}
          onResetData={onResetData}
        />

        {/* Main Content Area */}
        <main className="dashboard-main">
          {/* Header Row */}
          <div className="dashboard-header">
            <div>
              <h2 className="dashboard-title">{selectedCategory}</h2>
              <span className="dashboard-count">{resources.length} resources</span>
            </div>

            {(selectedCategory !== 'All Resources' || selectedSemester !== 'All Semesters' || selectedTag || searchQuery) && (
              <div className="active-filters">
                {selectedTag && (
                  <span className="filter-chip">
                    Tag: #{selectedTag}
                    <X size={12} className="chip-remove" onClick={() => onSelectTag(null)} />
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
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Cards Grid */}
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
              <Filter size={32} className="empty-icon" />
              <h3>No resources found</h3>
              <p>Try adjusting your search query, category, or semester filter.</p>
              <button
                className="empty-reset-btn"
                onClick={() => {
                  onSelectCategory('All Resources');
                  onSelectSemester('All Semesters');
                  onSelectTag(null);
                  onClearSearch();
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
