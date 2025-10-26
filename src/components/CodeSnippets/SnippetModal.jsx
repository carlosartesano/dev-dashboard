import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

const languages = ['javascript', 'jsx', 'css', 'html', 'python', 'typescript'];
const difficulties = ['beginner', 'intermediate', 'advanced'];

const SnippetModal = ({ isOpen, onClose, onSave, editingSnippet }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: 'javascript',
    code: '',
    tags: '',
    difficulty: 'beginner',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingSnippet) {
      setFormData({
        title: editingSnippet.title,
        description: editingSnippet.description,
        language: editingSnippet.language,
        code: editingSnippet.code,
        tags: editingSnippet.tags.join(', '),
        difficulty: editingSnippet.difficulty,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        language: 'javascript',
        code: '',
        tags: '',
        difficulty: 'beginner',
      });
    }
    setErrors({});
  }, [editingSnippet, isOpen]);

  // Highlight code preview when code or language changes
  useEffect(() => {
    if (formData.code) {
      Prism.highlightAll();
    }
  }, [formData.code, formData.language]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.code.trim()) newErrors.code = 'Code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const snippetData = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    onSave(snippetData);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="card w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: 'var(--color-dark-card)',
          border: '1px solid var(--color-dark-border)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {editingSnippet ? 'Edit Snippet' : 'New Snippet'}
          </h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-white hover:bg-opacity-10">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="input w-full"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              className="input w-full"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                className="input w-full"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <select
                className="input w-full"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Code <span className="text-red-400">*</span>
              </label>
              <textarea
                className="input w-full font-mono text-sm"
                rows="14"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', resize: 'vertical' }}
                placeholder="Enter your code here..."
              />
              {errors.code && <p className="text-red-400 text-sm mt-1">{errors.code}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Live Preview</label>
              <div
                className="rounded overflow-hidden"
                style={{
                  backgroundColor: '#2d2d2d',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  minHeight: '350px',
                }}
              >
                {formData.code ? (
                  <pre className="!m-0 !p-4 text-sm overflow-x-auto h-full">
                    <code className={`language-${formData.language}`}>{formData.code}</code>
                  </pre>
                ) : (
                  <div className="p-4 text-sm text-gray-500 italic">
                    Code preview will appear here...
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input
              type="text"
              className="input w-full"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="react, hooks, state (comma-separated)"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
              {editingSnippet ? 'Save Changes' : 'Create Snippet'}
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

export default SnippetModal;
