import { useState, useEffect } from 'react';
import { Copy, Edit, Trash2 } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

const difficultyColors = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const SnippetCard = ({ snippet, onEdit, onDelete, onCopy }) => {
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [snippet.code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setShowCopied(true);
      onCopy(snippet.id);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="group card hover:border-opacity-50 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-base mb-2">{snippet.title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-block px-2 py-0.5 rounded text-xs border ${
                difficultyColors[snippet.difficulty] || 'bg-gray-500/20 text-gray-400'
              }`}
            >
              {snippet.difficulty}
            </span>
            <span className="inline-block px-2 py-0.5 rounded text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {snippet.language}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {snippet.description && (
        <p className="text-sm text-gray-400 mb-3">{snippet.description}</p>
      )}

      {/* Code Block with Syntax Highlighting */}
      <div
        className="mb-3 rounded overflow-hidden max-h-64 overflow-y-auto"
        style={{
          backgroundColor: '#2d2d2d',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <pre className="!m-0 !p-4 text-sm overflow-x-auto">
          <code className={`language-${snippet.language}`}>
            {snippet.code}
          </code>
        </pre>
      </div>

      {/* Tags */}
      {snippet.tags && snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {snippet.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#9ca3af',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
        <span className="text-xs text-gray-500">
          Copied {snippet.copiedCount} {snippet.copiedCount === 1 ? 'time' : 'times'}
        </span>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5"
          >
            {showCopied ? (
              <>
                <span>✓</span>
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(snippet)}
            className="p-1.5 rounded hover:bg-white hover:bg-opacity-10 transition-colors"
            aria-label="Edit snippet"
          >
            <Edit className="w-4 h-4 text-gray-400" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(snippet.id)}
            className="p-1.5 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:bg-opacity-20 transition-all"
            aria-label="Delete snippet"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
