import React from 'react';
import './Features.css';
import { BookOpen, Star, Grid, Users } from 'lucide-react';

export default function Features() {
  return (
    <section className="features" id="explore">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">WHY LINK VALUE</span>
          <h2 className="section-title">
            Everything you need to <span className="gradient-text">master CS</span>
          </h2>
          <p className="section-desc">
            We've hand-picked the finest resources so you can focus on what matters — learning.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card" id="feature-1">
            <div className="feature-icon">
              <BookOpen size={32} />
            </div>
            <h3>Curated Resources</h3>
            <p>Hand-picked courses, docs, and tutorials from top platforms — only the best make it here.</p>
          </div>
          <div className="feature-card" id="feature-2">
            <div className="feature-icon">
              <Star size={32} />
            </div>
            <h3>Progress Tracking</h3>
            <p>Track your learning journey with status labels — To Read, In Progress, and Mastered.</p>
          </div>
          <div className="feature-card" id="feature-3">
            <div className="feature-icon">
              <Grid size={32} />
            </div>
            <h3>Smart Categories</h3>
            <p>Browse by topic — Core CS, AI/ML, Web Dev, Academics — or filter by semester.</p>
          </div>
          <div className="feature-card" id="feature-4">
            <div className="feature-icon">
              <Users size={32} />
            </div>
            <h3>Community Driven</h3>
            <p>Add your own favorite resources and help fellow CS students discover great content.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
