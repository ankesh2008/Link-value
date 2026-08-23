import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const CATEGORIES = ['Core CS', 'Web Dev', 'AI & ML', 'Academics'];

export default function AddResourceModal({ isOpen, onClose, onAddResource }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Core CS');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      setError('Please provide a Title and a URL.');
      return;
    }

    const newResource = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category: category,
      url: url.trim()
    };

    onAddResource(newResource);
    setTitle('');
    setDescription('');
    setCategory('Core CS');
    setUrl('');
    setError('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Resource</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="error-banner">{error}</div>}

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              placeholder="e.g. React Documentation"
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

          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Short Description</label>
            <textarea
              rows={3}
              placeholder="Brief description of the study link..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              <Plus size={16} />
              <span>Save Resource</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
