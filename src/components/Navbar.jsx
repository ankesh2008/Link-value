import React from 'react';
import { Search, Plus, X, Link2, Zap, HelpCircle } from 'lucide-react';

export default function Navbar({
  searchQuery,
  onSearchChange,
  onOpenAddModal,
  onFetchApi,
  isLoadingApi,
  onOpenDoubtModal
}) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="brand-logo">
          <Link2 size={18} />
        </div>
        <h1 className="brand-name">linkvalue</h1>
      </div>

      <div className="search-box">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search by title, category, or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button className="clear-search-btn" onClick={() => onSearchChange('')}>
            <X size={14} />
          </button>
        )}
      </div>

      <div className="nav-actions">
        <button
          className="api-fetch-btn"
          onClick={onOpenDoubtModal}
          title="Free Doubt Solver (100% Free, Zero Key Needed)"
        >
          <HelpCircle size={15} />
          <span>Ask Doubt</span>
        </button>

        <button
          className="api-fetch-btn"
          onClick={onFetchApi}
          disabled={isLoadingApi}
          title="Demonstrate API Call with fetch() and async/await"
        >
          <Zap size={15} />
          <span>{isLoadingApi ? 'Fetching...' : 'API Quote'}</span>
        </button>

        <button className="add-resource-btn" onClick={onOpenAddModal}>
          <Plus size={16} />
          <span>Add Resource</span>
        </button>
      </div>
    </header>
  );
}
