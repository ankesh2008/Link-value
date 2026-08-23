import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ResourceCard from './components/ResourceCard';
import AddResourceModal from './components/AddResourceModal';
import AskDoubtModal from './components/AskDoubtModal';
import { INITIAL_RESOURCES } from './data/resources';
import { fetchStudyTip } from './utils/api';
import { Zap, X } from 'lucide-react';

export default function App() {
  // State 1: JavaScript array initialized into useState
  const [resources, setResources] = useState(INITIAL_RESOURCES);

  // State 2: Selected Category filter ('All', 'Core CS', 'Web Dev', etc.)
  const [selectedCategory, setSelectedCategory] = useState('All');

  // State 3: Search input text
  const [searchQuery, setSearchQuery] = useState('');

  // State 4 & 5: Modal visibility booleans
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoubtOpen, setIsDoubtOpen] = useState(false);

  // State 6 & 7: API Quote state & loading status
  const [apiTip, setApiTip] = useState(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // Compute category count badges using Array.filter()
  const categoryCounts = {
    All: resources.length,
    'Core CS': resources.filter((r) => r.category === 'Core CS').length,
    'Web Dev': resources.filter((r) => r.category === 'Web Dev').length,
    'AI & ML': resources.filter((r) => r.category === 'AI & ML').length,
    Academics: resources.filter((r) => r.category === 'Academics').length
  };

  // Filter resources using standard JavaScript Array.filter()
  const filteredResources = resources.filter((item) => {
    const matchCategory =
      selectedCategory === 'All' || item.category === selectedCategory;

    const matchSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  // API Call Handler using async/await & fetch API
  const handleFetchApiTip = async () => {
    setIsLoadingApi(true);
    try {
      const data = await fetchStudyTip();
      setApiTip(data);
    } catch (err) {
      alert('API Call Failed. Check your network connection.');
    } finally {
      setIsLoadingApi(false);
    }
  };

  // Event Handlers
  const handleAddResource = (newResource) => {
    setResources([newResource, ...resources]);
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter((item) => item.id !== id));
  };

  const handleResetData = () => {
    setResources(INITIAL_RESOURCES);
    setSelectedCategory('All');
    setSearchQuery('');
    setApiTip(null);
  };

  return (
    <div className="app-container">
      {/* 1. Navbar Component with Ask Doubt & API Quote Buttons */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAddModal={() => setIsModalOpen(true)}
        onFetchApi={handleFetchApiTip}
        isLoadingApi={isLoadingApi}
        onOpenDoubtModal={() => setIsDoubtOpen(true)}
      />

      {/* Main Body with Sidebar & Card Grid */}
      <div className="main-layout">
        {/* 2. Sidebar Component */}
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
          onResetData={handleResetData}
        />

        {/* 3. Main Dashboard Viewport */}
        <main className="dashboard-content">
          {/* API Data Banner */}
          {apiTip && (
            <div className="api-banner">
              <div className="api-banner-content">
                <Zap size={16} className="zap-icon" />
                <div>
                  <span className="api-tag">API Response (fetch & async/await):</span>
                  <p className="api-quote">"{apiTip.quote}" — <strong>{apiTip.author}</strong></p>
                </div>
              </div>
              <button className="close-banner-btn" onClick={() => setApiTip(null)}>
                <X size={14} />
              </button>
            </div>
          )}

          <div className="section-header">
            <div>
              <h2 className="section-title">
                {selectedCategory === 'All' ? 'All Resources' : selectedCategory}
              </h2>
              <p className="section-subtitle">
                Showing {filteredResources.length}{' '}
                {filteredResources.length === 1 ? 'resource' : 'resources'}
              </p>
            </div>

            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                className="clear-filter-btn"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Responsive CSS Grid of Resource Cards */}
          {filteredResources.length > 0 ? (
            <div className="resource-grid">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onDelete={handleDeleteResource}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No study resources found matching your search.</p>
              <button
                className="reset-btn"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* 4. Add Resource Modal Component */}
      <AddResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddResource={handleAddResource}
      />

      {/* 5. Free CS Doubt Solver Modal */}
      <AskDoubtModal
        isOpen={isDoubtOpen}
        onClose={() => setIsDoubtOpen(false)}
      />
    </div>
  );
}
