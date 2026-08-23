import React from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';

export default function ResourceCard({ resource, onDelete }) {
  
  const targetUrl = resource.url.startsWith('http')
    ? resource.url
    : `https://${resource.url}`;

  return (
    <article className="resource-card">
      <div className="card-header">
        <span className="category-badge">{resource.category}</span>
        <button
          className="delete-btn"
          onClick={() => onDelete(resource.id)}
          title="Delete resource"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <h3 className="card-title">{resource.title}</h3>
      <p className="card-description">{resource.description}</p>

      <div className="card-footer">
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="open-resource-btn"
        >
          <span>Open Resource</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}
