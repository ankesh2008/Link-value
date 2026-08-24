import React, { useState } from 'react';
import './AddResourceModal.css';
import { X, Plus } from 'lucide-react';

const CATEGORIES = ['Core CS', 'AI/ML', 'Web Dev', 'Academics'];
const SEMESTERS = [
  'Semester 1',
  'Semester 2',
  'Semester 3',
  'Semester 4',
  'Semester 5',
  'Semester 6',
  'Semester 7'
];

export default function AddResourceModal({ isOpen, onClose, onAddResource }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Core CS');
  const [semester, setSemester] = useState('Semester 1');
  const [url, setUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState('To Read');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      setError('Please provide both a Title and a URL.');
      return;
    }

    const parsedTags = tagsInput
      .split(/[,#\s]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newResource = {
      id: `res-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Custom computer science study resource.',
      url: url.trim(),
      category,
      semester,
      tags: parsedTags.length > 0 ? parsedTags : ['Study', category],
      status
    };

    onAddResource(newResource);
    setTitle('');
    setDescription('');
    setCategory('Core CS');
    setSemester('Semester 1');
    setUrl('');
    setTagsInput('');
    setStatus('To Read');
    setError('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>+ Add New CS Resource</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="modal-error">{error}</div>}

          <div className="form-group">
            <label>Resource Title *</label>
            <input
              type="text"
              placeholder="e.g. React Official Docs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Resource URL *</label>
            <input
              type="text"
              placeholder="e.g. https://react.dev"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group flex-1">
              <label>Semester</label>
              <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                {SEMESTERS.map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Initial Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="To Read">● To Read</option>
              <option value="In Progress">● In Progress</option>
              <option value="Mastered">● Mastered</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tags (separated by space or comma)</label>
            <input
              type="text"
              placeholder="e.g. React Frontend Hooks"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Short Description</label>
            <textarea
              rows={3}
              placeholder="Brief summary of why this resource is useful..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              <Plus size={16} />
              <span>Save Resource</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
