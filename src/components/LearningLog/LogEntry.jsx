import { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Trash2, Lightbulb } from 'lucide-react';

const LogEntry = ({ entry, onEdit, onDelete, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Delete this learning log entry?')) {
      onDelete(entry.id);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="relative flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        {/* Circle/Badge */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
          }}
        >
          {entry.week.replace('Week ', '')}
        </div>

        {/* Vertical Line */}
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-1"
            style={{
              backgroundColor: 'var(--color-dark-border)',
              minHeight: '40px',
            }}
          />
        )}
      </div>

      {/* Entry Card */}
      <div className="flex-1 pb-6">
        <div
          className="card cursor-pointer transition-all duration-200 hover:border-opacity-70"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Collapsed Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base">{entry.week}</h3>
                <span className="text-xs text-black dark:text-white">·</span>
                <span className="text-xs text-black dark:text-white">{entry.date}</span>
              </div>

              {/* Topics Preview */}
              <p className="text-sm text-black dark:text-white mb-2">
                {entry.topics.slice(0, 3).join(', ')}
                {entry.topics.length > 3 && '...'}
              </p>

              {/* Key Takeaway Preview (when collapsed) */}
              {!isExpanded && (
                <p className="text-sm text-black dark:text-white italic line-clamp-2">
                  "{entry.keyTakeaway}"
                </p>
              )}
            </div>

            {/* Expand/Collapse Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 rounded hover:bg-white hover:bg-opacity-10 transition-colors ml-2"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-black dark:text-white" />
              ) : (
                <ChevronDown className="w-5 h-5 text-black dark:text-white" />
              )}
            </button>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div
              className="mt-4 pt-4 border-t"
              style={{ borderColor: 'var(--color-dark-border)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* All Topics */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 text-black dark:text-white">Topics Covered:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {entry.topics.map((topic, index) => (
                    <li key={index} className="text-sm text-black dark:text-white">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Notes */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 text-black dark:text-white">Notes:</h4>
                <p className="text-sm text-black dark:text-white whitespace-pre-wrap leading-relaxed">
                  {entry.notes}
                </p>
              </div>

              {/* Tags */}
              {entry.tags && entry.tags.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-black dark:text-white">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: 'rgba(139, 92, 246, 0.2)',
                          color: '#a78bfa',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Takeaway */}
              <div
                className="p-3 rounded-lg mb-4"
                style={{
                  backgroundColor: 'rgba(251, 191, 36, 0.1)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                }}
              >
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-300 mb-1">
                      Key Takeaway:
                    </h4>
                    <p className="text-sm text-black dark:text-white italic">
                      "{entry.keyTakeaway}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Timestamps and Actions */}
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--color-dark-border)' }}>
                <div className="text-xs text-black dark:text-white">
                  Created: {formatDate(entry.createdAt)}
                  {entry.updatedAt !== entry.createdAt && (
                    <> · Updated: {formatDate(entry.updatedAt)}</>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => onEdit(entry)}
                    className="p-1.5 rounded hover:bg-white hover:bg-opacity-10 transition-colors"
                    aria-label="Edit entry"
                  >
                    <Edit className="w-4 h-4 text-black dark:text-white" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={handleDelete}
                    className="p-1.5 rounded hover:bg-red-500 hover:bg-opacity-20 transition-colors"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogEntry;
