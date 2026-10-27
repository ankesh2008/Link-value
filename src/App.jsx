import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
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
import { getDefaultResources } from './utils/storage';
import {
  addResource,
  deleteResource,
  resetExplorer,
  selectCategoryCounts,
  selectFilteredResources,
  setSearchQuery,
  setSelectedCategory,
  setSelectedSemester,
  setSelectedTag,
  toggleResourceStatus
} from './store/appSlice';

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    resources,
    selectedCategory,
    selectedSemester,
    selectedTag,
    searchQuery
  } = useSelector((state) => state.app);
  const filteredResources = useSelector(selectFilteredResources);
  const categoryCounts = useSelector(selectCategoryCounts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  const handleStatusToggle = (id) => dispatch(toggleResourceStatus(id));
  const handleAddResource = (resource) => dispatch(addResource(resource));
  const handleDeleteResource = (id) => dispatch(deleteResource(id));
  const handleResetData = () => dispatch(resetExplorer(getDefaultResources()));

  const handleCategorySelect = (categoryName) => {
    dispatch(setSelectedCategory(categoryName));
    navigate('/dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      {/* Universal Header Navbar */}
      <Navbar
        onNavigate={(page) => {
          navigate(page === 'home' ? '/' : '/dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={setAuthMode}
        authUser={authUser}
        onLogout={() => setAuthUser(null)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* WELCOME LANDING PAGE */}
              <Hero
                onExplore={() => {
                  navigate('/dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              <Features />

              <CategoriesSection
                onSelectCategory={handleCategorySelect}
                categoryCounts={categoryCounts}
              />

              <StatsSection resources={resources} />

              <CtaSection
                onExplore={() => {
                  dispatch(setSelectedCategory('All Resources'));
                  navigate('/dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />

              <Footer
                onSelectCategory={handleCategorySelect}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              {/* SEPARATE CS RESOURCE HUB DASHBOARD PAGE */}
              <Dashboard
                resources={filteredResources}
                selectedCategory={selectedCategory}
                onSelectCategory={(category) => dispatch(setSelectedCategory(category))}
                selectedSemester={selectedSemester}
                onSelectSemester={(semester) => dispatch(setSelectedSemester(semester))}
                selectedTag={selectedTag}
                onSelectTag={(tag) => dispatch(setSelectedTag(tag))}
                searchQuery={searchQuery}
                onSearchChange={(query) => dispatch(setSearchQuery(query))}
                onClearSearch={() => dispatch(setSearchQuery(''))}
                categoryCounts={categoryCounts}
                onStatusToggle={handleStatusToggle}
                onDeleteResource={handleDeleteResource}
                onResetData={handleResetData}
                onNavigateHome={() => {
                  navigate('/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />

              <Footer
                onSelectCategory={handleCategorySelect}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

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
