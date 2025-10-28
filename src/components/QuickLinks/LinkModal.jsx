import { useState, useEffect } from 'react';
import { X, Link as LinkIcon } from 'lucide-react';

const categories = ['Docs', 'Tools', 'Social', 'Other'];

const LinkModal = ({ isOpen, onClose, onSave, editingLink }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'Other',
  });

  const [errors, setErrors] = useState({});
  const [faviconUrl, setFaviconUrl] = useState('');
  const [faviconError, setFaviconError] = useState(false);

  useEffect(() => {
    if (editingLink) {
      setFormData({
        title: editingLink.title,
        url: editingLink.url,
        category: editingLink.category || 'Other',
      });
      setFaviconUrl(editingLink.favicon || '');
      setFaviconError(false);
    } else {
      setFormData({
        title: '',
        url: '',
        category: 'Other',
      });
      setFaviconUrl('');
      setFaviconError(false);
    }
    setErrors({});
  }, [editingLink, isOpen]);

  // Auto-generate favicon URL when URL changes
  useEffect(() => {
    if (formData.url) {
      try {
        const url = new URL(formData.url.startsWith('http') ? formData.url : `https://${formData.url}`);
        const domain = url.hostname;
        setFaviconUrl(`https://www.google.com/s2/favicons?domain=${domain}&sz=32`);
        setFaviconError(false);
      } catch {
        setFaviconUrl('');
        setFaviconError(true);
      }
    } else {
      setFaviconUrl('');
      setFaviconError(false);
    }
  }, [formData.url]);

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 30) {
      newErrors.title = 'Title must be 30 characters or less';
    }

    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else {
      try {
        // Add https:// if not present
        const urlToValidate = formData.url.startsWith('http')
          ? formData.url
          : `https://${formData.url}`;
        new URL(urlToValidate);
      } catch {
        newErrors.url = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Ensure URL has protocol
    let finalUrl = formData.url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = `https://${finalUrl}`;
    }

    const linkData = {
      title: formData.title.trim(),
      url: finalUrl,
      category: formData.category,
      favicon: faviconUrl,
    };

    onSave(linkData);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={handleKeyDown}
    >
      <div
        className="card w-full max-w-lg"
        style={{
          backgroundColor: 'var(--color-dark-card)',
          border: '1px solid var(--color-dark-border)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {editingLink ? 'Edit Link' : 'Add New Link'}
          </h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-white hover:bg-opacity-10">
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
              placeholder="GitHub, Claude AI, etc."
              maxLength={30}
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
            <p className="text-xs text-black dark:text-white mt-1">
              {formData.title.length}/30 characters
            </p>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium mb-2">
              URL <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="input w-full font-mono text-sm"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://example.com or example.com"
            />
            {errors.url && <p className="text-red-400 text-sm mt-1">{errors.url}</p>}
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

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium mb-2">Preview</label>
            <div
              className="p-4 rounded-lg border flex flex-col items-center justify-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderColor: 'var(--color-dark-border)',
                minHeight: '120px',
              }}
            >
              {formData.title || formData.url ? (
                <>
                  {/* Favicon */}
                  <div className="mb-2">
                    {faviconUrl && !faviconError ? (
                      <img
                        src={faviconUrl}
                        alt="Favicon preview"
                        className="w-8 h-8"
                        onError={() => setFaviconError(true)}
                      />
                    ) : (
                      <LinkIcon className="w-8 h-8 text-black dark:text-white" />
                    )}
                  </div>
                  {/* Title */}
                  <h3 className="text-sm font-medium text-center line-clamp-2 text-black dark:text-white">
                    {formData.title || 'Link Title'}
                  </h3>
                </>
              ) : (
                <div className="text-sm text-black dark:text-white italic">
                  Preview will appear here...
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
              {editingLink ? 'Save Changes' : 'Add Link'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border flex-1"
              style={{ borderColor: 'var(--color-dark-border)' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkModal;
