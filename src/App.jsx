import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import CategoriesSection from './components/CategoriesSection';
import StatsSection from './components/StatsSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import AddResourceModal from './components/AddResourceModal';
import AuthModal from './components/AuthModal';
import {
  getStoredResources,
  saveResources,
  resetResourcesToDefault
} from './utils/storage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'dashboard'
  const [resources, setResources] = useState(() => getStoredResources());
  const [selectedCategory, setSelectedCategory] = useState('All Resources');
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    saveResources(resources);
  }, [resources]);

  // Compute category count badges
  const categoryCounts = {
    'All Resources': resources.length,
    'Core CS': resources.filter((r) => r.category === 'Core CS').length,
    'AI/ML': resources.filter((r) => r.category === 'AI/ML').length,
    'Web Dev': resources.filter((r) => r.category === 'Web Dev').length,
    'Academics': resources.filter((r) => r.category === 'Academics').length,
    'Learning Roadmap': resources.filter((r) => r.category === 'Learning Roadmap').length
  };

  // Filter resources
  const filteredResources = resources.filter((item) => {
    const matchCategory =
      selectedCategory === 'All Resources' || item.category === selectedCategory;

    const matchSemester =
      selectedSemester === 'All Semesters' || item.semester === selectedSemester;

    const matchTag =
      !selectedTag || (item.tags && item.tags.includes(selectedTag));

    const matchSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.semester && item.semester.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchCategory && matchSemester && matchTag && matchSearch;
  });

  // Handlers
  const handleStatusToggle = (id) => {
    setResources(
      resources.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.status === 'To Read'
              ? 'In Progress'
              : item.status === 'In Progress'
              ? 'Mastered'
              : 'To Read';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const handleAddResource = (newRes) => {
    setResources([newRes, ...resources]);
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter((item) => item.id !== id));
  };

  const handleResetData = () => {
    const reset = resetResourcesToDefault();
    setResources(reset);
    setSelectedCategory('All Resources');
    setSelectedSemester('All Semesters');
    setSelectedTag(null);
    setSearchQuery('');
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      {/* Universal Header Navbar */}
      <Navbar
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={setAuthMode}
        authUser={authUser}
        onLogout={() => setAuthUser(null)}
      />

      {currentPage === 'home' ? (
        <>
          {/* WELCOME LANDING PAGE */}
          <Hero
            onExplore={() => {
              setCurrentPage('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <Features />

          <CategoriesSection onSelectCategory={handleCategorySelect} categoryCounts={categoryCounts} />

          <StatsSection resources={resources} />

          <CtaSection
            onExplore={() => {
              setSelectedCategory('All Resources');
              setCurrentPage('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />

          <Footer
            onSelectCategory={handleCategorySelect}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        </>
      ) : (
        <>
          {/* SEPARATE CS RESOURCE HUB DASHBOARD PAGE */}
          <Dashboard
            resources={filteredResources}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedSemester={selectedSemester}
            onSelectSemester={setSelectedSemester}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={() => setSearchQuery('')}
            categoryCounts={categoryCounts}
            onStatusToggle={handleStatusToggle}
            onDeleteResource={handleDeleteResource}
            onResetData={handleResetData}
            onNavigateHome={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />

          <Footer
            onSelectCategory={handleCategorySelect}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        </>
      )}

      {/* Add Resource Modal */}
      <AddResourceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddResource={handleAddResource}
      />

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onModeChange={setAuthMode}
          onAuthenticated={(user) => {
            setAuthUser(user);
            setAuthMode(null);
          }}
        />
      )}
    </div>
  );
}
