import React, { useState } from 'react';
import { X, HelpCircle, ExternalLink, Search } from 'lucide-react';
import { askDoubtZeroKey, searchStackOverflowDoubt } from '../utils/api';

export default function AskDoubtModal({ isOpen, onClose }) {
  const [doubtInput, setDoubtInput] = useState('');
  const [result, setResult] = useState(null);
  const [soResult, setSoResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleResolveDoubt = async (e) => {
    e.preventDefault();
    if (!doubtInput.trim()) {
      setError('Please type a CS doubt or concept (e.g. Recursion, React, Binary Search).');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);
    setSoResult(null);

    try {
      // 1. Fetch Concept Summary (Free Wikipedia API, 0 Keys)
      const conceptData = await askDoubtZeroKey(doubtInput);
      setResult(conceptData);

      // 2. Fetch StackOverflow Doubt Links (Free StackExchange API, 0 Keys)
      try {
        const stackData = await searchStackOverflowDoubt(doubtInput);
        setSoResult(stackData);
      } catch {
        // Optional fallback
      }
    } catch (err) {
      setError(err.message || 'Could not find explanation. Try another CS concept.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <HelpCircle size={18} />
            <h2>Free CS Doubt Solver</h2>
          </div>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleResolveDoubt} className="modal-form">
          <div className="form-group">
            <label>Ask Any CS Concept or Doubt (100% Free, Zero Key Needed):</label>
            <div className="doubt-input-row">
              <input
                type="text"
                placeholder="e.g. Binary Search, React, SQL, Operating System..."
                value={doubtInput}
                onChange={(e) => setDoubtInput(e.target.value)}
                autoFocus
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                <Search size={14} />
                <span>{loading ? 'Searching...' : 'Resolve'}</span>
              </button>
            </div>
          </div>

          {error && <div className="error-banner">{error}</div>}

          {/* Results Area */}
          {result && (
            <div className="doubt-result-box">
              <h3 className="result-title">{result.title}</h3>
              <p className="result-summary">{result.summary}</p>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="result-link"
              >
                <span>Read Full Wikipedia Concept</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}

          {soResult && (
            <div className="so-result-box">
              <span className="so-tag">StackOverflow Community Answer:</span>
              <a
                href={soResult.link}
                target="_blank"
                rel="noopener noreferrer"
                className="so-link"
              >
                <span>{soResult.title}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
