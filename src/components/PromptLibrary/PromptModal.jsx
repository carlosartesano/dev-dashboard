import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const categories = [
  'Learning',
  'Debug',
  'Review',
  'Refactor',
  'Architecture',
  'Performance',
  'Testing',
  'Security',
  'Quality',
];

const PromptModal = ({ isOpen, onClose, onSave, editingPrompt }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Learning',
    template: '',
    tags: '',
    favorite: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingPrompt) {
      setFormData({
        title: editingPrompt.title,
        category: editingPrompt.category,
        template: editingPrompt.template,
        tags: editingPrompt.tags.join(', '),
        favorite: editingPrompt.favorite,
      });
    } else {
      setFormData({
        title: '',
        category: 'Learning',
        template: '',
        tags: '',
        favorite: false,
      });
    }
    setErrors({});
  }, [editingPrompt, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.template.trim()) {
      newErrors.template = 'Template is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const promptData = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    onSave(promptData);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Highlight variables in preview
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(4px)' }}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div
        className="card w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: 'var(--color-dark-card)',
          border: '1px solid var(--color-dark-border)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {editingPrompt ? 'Edit Prompt' : 'New Prompt'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="input w-full"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Debug Helper"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              className="input w-full"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Template */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Template <span className="text-red-400">*</span>
            </label>
            <textarea
              className="input w-full font-mono text-sm"
              rows="10"
              value={formData.template}
              onChange={(e) => setFormData({ ...formData, template: e.target.value })}
              placeholder="Enter your prompt template. Use [BRACKETS] for variables that users should replace."
            />
            {errors.template && (
              <p className="text-red-400 text-sm mt-1">{errors.template}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Use [BRACKETS] for variables. Example: [PASTE CODE HERE]
            </p>
          </div>

          {/* Preview */}
          {formData.template && (
            <div>
              <label className="block text-sm font-medium mb-2">Preview</label>
              <div
                className="p-3 rounded text-sm font-mono whitespace-pre-wrap break-words"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {highlightVariables(formData.template)}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input
              type="text"
              className="input w-full"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="debugging, error-handling, intermediate (comma-separated)"
            />
            <p className="text-gray-500 text-xs mt-1">
              Separate tags with commas
            </p>
          </div>

          {/* Favorite */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="favorite"
              checked={formData.favorite}
              onChange={(e) => setFormData({ ...formData, favorite: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="favorite" className="text-sm cursor-pointer">
              Mark as favorite
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
              {editingPrompt ? 'Save Changes' : 'Create Prompt'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border transition-colors flex-1"
              style={{
                borderColor: 'var(--color-dark-border)',
                backgroundColor: 'transparent',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptModal;
