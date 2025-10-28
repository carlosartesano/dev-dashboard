import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Trash2, Save } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useDebounce } from '../../hooks/useDebounce';

// Helper function to format relative time
const formatRelativeTime = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString();
};

// Helper function to truncate text
const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const QuickNotes = () => {
  const [notesData, setNotesData] = useLocalStorage('dev-dashboard-notes', {
    currentNote: '',
    recentNotes: []
  });

  const [currentNote, setCurrentNote] = useState(notesData.currentNote || '');
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(Date.now());

  const debouncedNote = useDebounce(currentNote, 500);
  const textareaRef = useRef(null);

  // Auto-save current note to localStorage
  useEffect(() => {
    if (debouncedNote !== notesData.currentNote) {
      setIsSaving(true);
      setNotesData({
        ...notesData,
        currentNote: debouncedNote
      });
      setLastSaved(Date.now());
      setTimeout(() => setIsSaving(false), 300);
    }
  }, [debouncedNote]);

  // Save current note to recent notes
  const saveToRecent = () => {
    if (!currentNote.trim()) return;

    const newNote = {
      id: Date.now().toString(),
      content: currentNote,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updatedRecentNotes = [newNote, ...notesData.recentNotes].slice(0, 10);

    setNotesData({
      currentNote: '',
      recentNotes: updatedRecentNotes
    });

    setCurrentNote('');
    setLastSaved(Date.now());
  };

  // Load a recent note into the textarea
  const loadNote = (note) => {
    setCurrentNote(note.content);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Delete a recent note
  const deleteNote = (id) => {
    const updatedRecentNotes = notesData.recentNotes.filter(note => note.id !== id);
    setNotesData({
      ...notesData,
      recentNotes: updatedRecentNotes
    });
  };

  const displayedNotes = showAllNotes
    ? notesData.recentNotes
    : notesData.recentNotes.slice(0, 5);

  return (
    <div className="card h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0">
        <h2 className="text-xl font-bold text-black dark:text-white mb-4">📝 Quick Notes</h2>

        {/* Textarea */}
        <div className="mb-3">
        <label htmlFor="quick-notes-textarea" className="sr-only">
          Quick notes
        </label>
        <textarea
          id="quick-notes-textarea"
          ref={textareaRef}
          className="input w-full font-mono text-sm resize-y"
          rows="6"
          placeholder="Quick thoughts, reminders, brain dumps..."
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          style={{
            minHeight: '120px',
            maxHeight: '400px'
          }}
        />
      </div>

      {/* Status and Save Button */}
      <div className="flex items-center justify-between mb-4">
        {/* Save Status */}
        <div className="text-xs text-black dark:text-white">
          {isSaving ? (
            <span className="flex items-center gap-1">
              💾 <span className="animate-pulse">Saving...</span>
            </span>
          ) : currentNote === notesData.currentNote ? (
            <span className="flex items-center gap-1">
              ✓ Saved {formatRelativeTime(lastSaved)}
            </span>
          ) : (
            <span>Typing...</span>
          )}
        </div>

        {/* Save to Recent Button */}
        <button
          onClick={saveToRecent}
          disabled={!currentNote.trim()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-border-subtle text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/10 text-black dark:text-white"
          aria-label="Save to recent notes"
        >
          <Save className="w-3.5 h-3.5" />
          Save to Recent
        </button>
        </div>
      </div>

      {/* Recent Notes Section - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {notesData.recentNotes.length > 0 && (
          <div className="border-t border-gray-200 dark:border-border-subtle pt-4">
            {/* Collapsible Header */}
            <button
            onClick={() => setShowAllNotes(!showAllNotes)}
            className="flex items-center justify-between w-full mb-3 text-sm font-medium text-black dark:text-white hover:text-black dark:hover:text-white transition-colors"
          >
            <span>
              Recent Notes ({notesData.recentNotes.length})
            </span>
            {showAllNotes ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Notes List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {displayedNotes.map((note) => (
              <div
                key={note.id}
                className="group p-3 rounded-lg border border-gray-200 dark:border-border-subtle bg-gray-50 dark:bg-white/5 transition-all cursor-pointer hover:border-gray-300 dark:hover:border-border-default"
                onClick={() => loadNote(note)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-black dark:text-white truncate mb-1">
                      {truncateText(note.content)}
                    </p>
                    <p className="text-xs text-black dark:text-white">
                      {formatRelativeTime(note.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500 hover:bg-opacity-20 transition-all"
                    aria-label="Delete note"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less */}
          {notesData.recentNotes.length > 5 && (
            <button
              onClick={() => setShowAllNotes(!showAllNotes)}
              className="w-full mt-2 text-xs text-black dark:text-white hover:text-black dark:hover:text-white transition-colors"
            >
              {showAllNotes ? 'Show Less' : `Show All (${notesData.recentNotes.length})`}
            </button>
          )}
          </div>
        )}

        {/* Empty State */}
        {notesData.recentNotes.length === 0 && (
          <div className="text-center py-6 text-sm text-black dark:text-white">
            No recent notes yet. Start typing above!
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickNotes;
