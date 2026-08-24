import React from 'react';
import './ResourceCard.css';
import { ExternalLink, Trash2 } from 'lucide-react';

export default function ResourceCard({
  resource,
  onStatusToggle,
  onTagClick,
  onDelete
}) {
  const getHostname = (url) => {
    try {
      const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Web Dev':
        return '#00e5ff';
      case 'AI/ML':
        return '#a855f7';
      case 'Core CS':
        return '#10b981';
      case 'Academics':
        return '#f59e0b';
      default:
        return '#00e5ff';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Mastered':
        return 'status-mastered';
      case 'In Progress':
        return 'status-inprogress';
      default:
        return 'status-toread';
    }
  };

  const targetUrl = resource.url.startsWith('http')
    ? resource.url
    : `https://${resource.url}`;

  const categoryColor = getCategoryColor(resource.category);

  return (
    <article className="resource-card">
      {/* Top Category Accent Line */}
      <div
        className="card-accent-line"
        style={{ backgroundColor: categoryColor }}
      ></div>

      <div className="card-top">
        <div className="card-breadcrumb">
          <span className="card-category" style={{ color: categoryColor }}>
            {resource.category}
          </span>
          <span className="breadcrumb-separator">·</span>
          <span className="card-semester">{resource.semester}</span>
        </div>

        <button
          className={`status-pill ${getStatusClass(resource.status)}`}
          onClick={() => onStatusToggle(resource.id)}
          title="Click to cycle status"
        >
          <span className="pill-dot"></span>
          <span>{resource.status}</span>
        </button>
      </div>

      <h3 className="card-title">{resource.title}</h3>
      <p className="card-desc">{resource.description}</p>

      {resource.tags && resource.tags.length > 0 && (
        <div className="card-tags">
          {resource.tags.map((tag) => (
            <button
              key={tag}
              className="tag-pill"
              onClick={() => onTagClick(tag)}
              title={`Filter by #${tag}`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      <div className="card-footer">
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="visit-btn"
        >
          <span>Launch Resource</span>
          <ExternalLink size={13} className="visit-icon" />
          <span className="domain-label">{getHostname(resource.url)}</span>
        </a>

        <button
          className="delete-card-btn"
          onClick={() => onDelete(resource.id)}
          title="Delete resource"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </article>
  );
}
