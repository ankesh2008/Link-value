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
import {
  getStoredResources,
  saveResources,
  resetResourcesToDefault
} from './utils/storage';

export default function App() {
  const [resources, setResources] = useState(() => getStoredResources());
  const [selectedCategory, setSelectedCategory] = useState('All Resources');
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
    'Academics': resources.filter((r) => r.category === 'Academics').length
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

  return (
    <div className="app-wrapper">
      {/* 1. Header Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* 2. Hero Banner */}
      <Hero />

      {/* 3. Features "WHY LINK VALUE" */}
      <Features />

      {/* 4. Interactive CS Resources Dashboard */}
      <Dashboard
        resources={filteredResources}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedSemester={selectedSemester}
        onSelectSemester={setSelectedSemester}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery('')}
        categoryCounts={categoryCounts}
        onStatusToggle={handleStatusToggle}
        onDeleteResource={handleDeleteResource}
        onResetData={handleResetData}
      />

      {/* 5. Browse Categories Section */}
      <CategoriesSection
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const dash = document.getElementById('dashboard');
          if (dash) dash.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 6. Stats Section */}
      <StatsSection />

      {/* 7. CTA Section */}
      <CtaSection onOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* 8. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const dash = document.getElementById('dashboard');
          if (dash) dash.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Add Resource Modal */}
      <AddResourceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddResource={handleAddResource}
      />
    </div>
  );
}
