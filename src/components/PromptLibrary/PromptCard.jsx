import { useState } from 'react';
import { Copy, Edit, Trash2, Star, ChevronDown, ChevronUp } from 'lucide-react';

const categoryColors = {
  Learning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Debug: 'bg-red-500/20 text-red-400 border-red-500/30',
  Review: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Refactor: 'bg-green-500/20 text-green-400 border-green-500/30',
  Architecture: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Performance: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Testing: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  Security: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  Quality: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

const PromptCard = ({ prompt, onEdit, onDelete, onToggleFavorite, onCopy }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.template);
      setShowCopied(true);
      onCopy(prompt.id);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Highlight template variables [LIKE THIS]
  const highlightVariables = (text) => {
    const parts = text.split(/(\[.*?\])/g);
    return parts.map((part, index) => {
      if (part.match(/\[.*?\]/)) {
        return (
          <span
            key={index}
            className="font-bold"
            style={{ color: 'var(--color-primary)' }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const truncatedTemplate = prompt.template.length > 100
    ? prompt.template.substring(0, 100) + '...'
    : prompt.template;

  return (
    <div
      className={`group card transition-all duration-200 ${
        isExpanded ? 'border-primary' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-base text-gray-900 dark:text-text-primary">{prompt.title}</h3>
            <button
              onClick={() => onToggleFavorite(prompt.id)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-4 h-4 ${
                  prompt.favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500 dark:text-text-tertiary'
                }`}
              />
            </button>
          </div>
          <span
            className={`inline-block px-2 py-0.5 rounded text-xs border ${
              categoryColors[prompt.category] || 'bg-gray-500/20 text-gray-400'
            }`}
          >
            {prompt.category}
          </span>
        </div>
      </div>

      {/* Template Preview */}
      <div
        className="mb-3 p-3 rounded text-sm font-mono whitespace-pre-wrap break-words bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-text-secondary"
      >
        {isExpanded
          ? highlightVariables(prompt.template)
          : highlightVariables(truncatedTemplate)}
      </div>

      {/* Expand/Collapse Button */}
      {prompt.template.length > 100 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm mb-3 transition-colors"
          style={{ color: 'var(--color-primary)' }}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show more
            </>
          )}
        </button>
      )}

      {/* Tags */}
      {prompt.tags && prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-text-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-border-subtle">
        <span className="text-xs text-gray-500 dark:text-text-tertiary">
          Used {prompt.usageCount} {prompt.usageCount === 1 ? 'time' : 'times'}
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
            onClick={() => onEdit(prompt)}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Edit prompt"
          >
            <Edit className="w-4 h-4 text-gray-600 dark:text-text-tertiary" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(prompt.id)}
            className="p-1.5 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:bg-opacity-20 transition-all"
            aria-label="Delete prompt"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
