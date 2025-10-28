import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

const LogModal = ({ isOpen, onClose, onSave, editingLog }) => {
  const [formData, setFormData] = useState({
    week: '',
    date: '',
    topics: [],
    notes: '',
    tags: [],
    keyTakeaway: '',
  });

  const [topicInput, setTopicInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingLog) {
      setFormData({
        week: editingLog.week,
        date: editingLog.date,
        topics: editingLog.topics,
        notes: editingLog.notes,
        tags: editingLog.tags,
        keyTakeaway: editingLog.keyTakeaway,
      });
    } else {
      setFormData({
        week: '',
        date: '',
        topics: [],
        notes: '',
        tags: [],
        keyTakeaway: '',
      });
    }
    setTopicInput('');
    setTagInput('');
    setErrors({});
  }, [editingLog, isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!formData.week.trim()) {
      newErrors.week = 'Week/Title is required';
    }

    if (formData.topics.length === 0) {
      newErrors.topics = 'At least one topic is required';
    }

    if (!formData.notes.trim()) {
      newErrors.notes = 'Notes are required';
    } else if (formData.notes.trim().length < 20) {
      newErrors.notes = 'Notes must be at least 20 characters';
    }

    if (!formData.keyTakeaway.trim()) {
      newErrors.keyTakeaway = 'Key takeaway is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const logData = {
      week: formData.week.trim(),
      date: formData.date.trim() || new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      topics: formData.topics,
      notes: formData.notes.trim(),
      tags: formData.tags,
      keyTakeaway: formData.keyTakeaway.trim(),
    };

    onSave(logData);
  };

  const addTopic = () => {
    if (topicInput.trim() && !formData.topics.includes(topicInput.trim())) {
      setFormData({
        ...formData,
        topics: [...formData.topics, topicInput.trim()],
      });
      setTopicInput('');
    }
  };

  const removeTopic = (index) => {
    setFormData({
      ...formData,
      topics: formData.topics.filter((_, i) => i !== index),
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
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
            {editingLog ? 'Edit Learning Log Entry' : 'New Learning Log Entry'}
          </h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-white hover:bg-opacity-10">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Week/Title and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Week/Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className="input w-full"
                value={formData.week}
                onChange={(e) => setFormData({ ...formData, week: e.target.value })}
                placeholder="Week 1, React Deep Dive, etc."
              />
              {errors.week && <p className="text-red-400 text-sm mt-1">{errors.week}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="text"
                className="input w-full"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="Week of Nov 19, 2025"
              />
            </div>
          </div>

          {/* Topics */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Topics <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="input flex-1"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, addTopic)}
                placeholder="Enter a topic and press Enter"
              />
              <button
                type="button"
                onClick={addTopic}
                className="px-4 py-2 rounded-lg border transition-all hover:bg-white hover:bg-opacity-10"
                style={{ borderColor: 'var(--color-dark-border)' }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Topics List */}
            {formData.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg border text-sm flex items-center gap-2"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'var(--color-dark-border)',
                    }}
                  >
                    {topic}
                    <button
                      type="button"
                      onClick={() => removeTopic(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            {errors.topics && <p className="text-red-400 text-sm mt-1">{errors.topics}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Notes <span className="text-red-400">*</span>
            </label>
            <textarea
              className="input w-full font-sans text-sm"
              rows="8"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Detailed notes about what you learned this week..."
              style={{ resize: 'vertical' }}
            />
            {errors.notes && <p className="text-red-400 text-sm mt-1">{errors.notes}</p>}
            <p className="text-xs text-black dark:text-white mt-1">
              {formData.notes.length} characters (minimum 20)
            </p>
          </div>

          {/* Key Takeaway */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Key Takeaway <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="input w-full"
              value={formData.keyTakeaway}
              onChange={(e) => setFormData({ ...formData, keyTakeaway: e.target.value })}
              placeholder="One sentence summarizing the most important lesson"
            />
            {errors.keyTakeaway && (
              <p className="text-red-400 text-sm mt-1">{errors.keyTakeaway}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags (optional)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="input flex-1"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, addTag)}
                placeholder="Enter a tag and press Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 rounded-lg border transition-all hover:bg-white hover:bg-opacity-10"
                style={{ borderColor: 'var(--color-dark-border)' }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Tags List */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
                    style={{
                      backgroundColor: 'rgba(139, 92, 246, 0.2)',
                      color: '#a78bfa',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="hover:text-purple-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
              {editingLog ? 'Save Changes' : 'Add Entry'}
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

export default LogModal;
