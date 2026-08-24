import React from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import ResourceCard from './ResourceCard';
import { Filter, X, ArrowLeft, Plus } from 'lucide-react';

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
  onResetData,
  onNavigateHome,
  onOpenAddModal
}) {
  return (
    <section className="dashboard-page" id="dashboard">
      <div className="dashboard-page-container">
        {/* Left Sidebar Navigation */}
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          selectedSemester={selectedSemester}
          onSelectSemester={onSelectSemester}
          categoryCounts={categoryCounts}
          onResetData={onResetData}
        />

        {/* Main Content Viewport */}
        <main className="dashboard-page-main">
          {/* Top Page Header Bar */}
          <div className="dashboard-page-header">
            <div>

              <h1 className="dashboard-page-title">{selectedCategory}</h1>
              <p className="dashboard-page-subtitle">
                {resources.length} {resources.length === 1 ? 'resource' : 'resources'}
              </p>
            </div>

            <div className="header-actions">
              <button className="add-resource-dash-btn" onClick={onOpenAddModal}>
                <Plus size={16} />
                <span>+ Add Resource</span>
              </button>
            </div>
          </div>

          {/* Welcome Banner */}
          <div className="dashboard-intro-banner">
            <h2>Welcome to Your Learning Hub</h2>
            <p>Explore, organize, and master your computer science journey with our curated resources. Dive into <strong>{selectedCategory}</strong> and level up your skills today.</p>
          </div>

          {/* Active Filters Row */}
          {(selectedCategory !== 'All Resources' || selectedSemester !== 'All Semesters' || selectedTag || searchQuery) && (
            <div className="active-filters-bar">
              <span className="filters-label">Active Filters:</span>
              {selectedSemester !== 'All Semesters' && (
                <span className="filter-chip">
                  {selectedSemester}
                  <X size={12} className="chip-remove" onClick={() => onSelectSemester('All Semesters')} />
                </span>
              )}
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
                className="clear-filters-btn"
                onClick={() => {
                  onSelectCategory('All Resources');
                  onSelectSemester('All Semesters');
                  onSelectTag(null);
                  onClearSearch();
                }}
              >
                Clear All
              </button>
            </div>
          )}

          {/* 3-Column Resource Cards Grid matching media_1787542931834.png */}
          {resources.length > 0 ? (
            <div className="resource-grid">
              {resources.map((resource, index) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  index={index}
                  onStatusToggle={onStatusToggle}
                  onTagClick={onSelectTag}
                  onDelete={onDeleteResource}
                />
              ))}
            </div>
          ) : (
            <div className="dashboard-empty-box">
              <Filter size={36} className="empty-icon" />
              <h3>No resources found</h3>
              <p>Try clearing your active filters or searching for a different computer science topic.</p>
              <button
                className="reset-filters-btn"
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
