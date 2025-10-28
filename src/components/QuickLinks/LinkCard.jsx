import { useState } from 'react';
import { Edit, Trash2, Link as LinkIcon } from 'lucide-react';

const LinkCard = ({ link, onEdit, onDelete, onClick }) => {
  const [imgError, setImgError] = useState(false);

  const handleClick = (e) => {
    // Don't trigger link opening if clicking edit/delete buttons
    if (e.target.closest('button')) return;
    onClick(link.id);
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${link.title}"?`)) {
      onDelete(link.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(link);
  };

  return (
    <div
      className="group relative card cursor-pointer transition-all duration-200 hover:border-opacity-70 flex flex-col items-center justify-center p-4"
      onClick={handleClick}
      style={{
        minHeight: '120px',
        maxHeight: '120px',
      }}
    >
      {/* Delete Button - Top Left */}
      <button
        onClick={handleDelete}
        className="absolute top-2 left-2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:bg-opacity-20 transition-all z-10"
        aria-label="Delete link"
      >
        <Trash2 className="w-3.5 h-3.5 text-red-400" />
      </button>

      {/* Edit Button - Top Right */}
      <button
        onClick={handleEdit}
        className="absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-white hover:bg-opacity-10 transition-all z-10"
        aria-label="Edit link"
      >
        <Edit className="w-3.5 h-3.5 text-black dark:text-white" />
      </button>

      {/* Favicon */}
      <div className="mb-2 flex items-center justify-center">
        {!imgError && link.favicon ? (
          <img
            src={link.favicon}
            alt={link.title}
            className="w-8 h-8"
            onError={() => setImgError(true)}
          />
        ) : (
          <LinkIcon className="w-8 h-8 text-black dark:text-white" />
        )}
      </div>

      {/* Title */}
      <h3
        className="text-sm font-medium text-center line-clamp-2 text-black dark:text-white"
        style={{
          minHeight: '2.5rem',
          maxWidth: '100%',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {link.title}
      </h3>

      {/* Click Counter - Subtle, Bottom */}
      {link.clicks > 0 && (
        <div className="absolute bottom-1 text-xs text-black dark:text-white">
          {link.clicks} {link.clicks === 1 ? 'click' : 'clicks'}
        </div>
      )}
    </div>
  );
};

export default LinkCard;
