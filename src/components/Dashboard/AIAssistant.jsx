import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AIAssistant = () => {
  const [conversations, setConversations] = useLocalStorage('dev-dashboard-ai-conversations', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newConversation, setNewConversation] = useState({
    title: '',
    platform: 'claude',
    notes: ''
  });

  const openClaude = () => {
    window.open('https://claude.ai', '_blank', 'noopener,noreferrer');
  };

  const openChatGPT = () => {
    window.open('https://chat.openai.com', '_blank', 'noopener,noreferrer');
  };

  const handleLogConversation = () => {
    if (!newConversation.title.trim()) return;

    const conversation = {
      id: Date.now().toString(),
      title: newConversation.title,
      platform: newConversation.platform,
      timestamp: Date.now(),
      notes: newConversation.notes
    };

    setConversations([conversation, ...conversations]);
    setNewConversation({ title: '', platform: 'claude', notes: '' });
    setIsModalOpen(false);
  };

  const deleteConversation = (id) => {
    setConversations(conversations.filter(conv => conv.id !== id));
  };

  const clearAllConversations = () => {
    if (window.confirm('Clear all conversation history?')) {
      setConversations([]);
    }
  };

  // Format relative time
  const formatRelativeTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;

    return new Date(timestamp).toLocaleDateString();
  };

  const getPlatformIcon = (platform) => {
    return platform === 'claude' ? '✨' : '💬';
  };

  const getPlatformColor = (platform) => {
    return platform === 'claude' ? 'var(--color-primary)' : '#10b981';
  };

  const scrollToPrompts = () => {
    const promptsSection = document.querySelector('[data-module="prompts"]');
    if (promptsSection) {
      promptsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="card h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-black dark:text-white">🤖 AI Assistant</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-black dark:text-white transition-colors hover:text-black dark:hover:text-white"
          >
            + Log Conversation
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">

        {/* Quick access buttons - horizontal layout */}
        <div className="grid grid-cols-2 gap-4 mb-6">

          {/* Claude button */}
          <button
            onClick={openClaude}
            className="flex flex-col items-center justify-center p-6 border rounded-xl transition-all hover:scale-[1.02]"
            style={{
              backgroundColor: 'rgba(147, 51, 234, 0.1)',
              borderColor: 'rgba(147, 51, 234, 0.3)'
            }}
          >
            <div className="text-3xl mb-3">✨</div>
            <div className="font-semibold text-lg mb-1 text-black dark:text-white">Claude AI</div>
            <div className="text-xs text-black dark:text-white">
              Open in new tab
            </div>
          </button>

          {/* ChatGPT button */}
          <button
            onClick={openChatGPT}
            className="flex flex-col items-center justify-center p-6 border rounded-xl transition-all hover:scale-[1.02]"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderColor: 'rgba(16, 185, 129, 0.3)'
            }}
          >
            <div className="text-3xl mb-3">💬</div>
            <div className="font-semibold text-lg mb-1 text-black dark:text-white">ChatGPT</div>
            <div className="text-xs text-black dark:text-white">
              Open in new tab
            </div>
          </button>

        </div>

        {/* Recent conversations */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-black dark:text-white">
              Recent Conversations
            </h3>
            {conversations.length > 0 && (
              <button
                onClick={clearAllConversations}
                className="text-xs text-black dark:text-white transition-colors hover:text-red-500 dark:hover:text-red-400"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Conversation list */}
          {conversations.length > 0 ? (
            <div className="space-y-2">
              {conversations.slice(0, 10).map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-start gap-3 p-3 border rounded-lg transition-colors cursor-pointer group"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    style={{
                      backgroundColor: conv.platform === 'claude'
                        ? 'rgba(147, 51, 234, 0.2)'
                        : 'rgba(16, 185, 129, 0.2)'
                    }}
                  >
                    {getPlatformIcon(conv.platform)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium mb-1 truncate text-black dark:text-white">
                      {conv.title}
                    </div>
                    <div className="text-xs text-black dark:text-white">
                      {formatRelativeTime(conv.timestamp)} · {conv.platform === 'claude' ? 'Claude' : 'ChatGPT'}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 transition-opacity hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="text-center py-8 text-sm text-black dark:text-white"
            >
              No recent conversations yet
            </div>
          )}
        </div>

        {/* Helpful tip linking to Prompts */}
        <div
          className="border rounded-lg p-4"
          style={{
            backgroundColor: 'rgba(147, 51, 234, 0.05)',
            borderColor: 'rgba(147, 51, 234, 0.2)'
          }}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <div className="text-sm font-medium mb-1 text-black dark:text-white">Pro Tip</div>
              <div className="text-xs text-black dark:text-white">
                Check your{' '}
                <button
                  onClick={scrollToPrompts}
                  className="hover:underline"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Prompt Library
                </button>{' '}
                for pre-written prompts that get better results!
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal for logging conversations */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className="w-full max-w-md rounded-lg p-6"
            style={{ backgroundColor: 'var(--color-bg)' }}
          >
            <h3 className="text-lg font-semibold mb-4">Log AI Conversation</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-black dark:text-white">
                  Conversation Title
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="e.g., Debug React useEffect hook"
                  value={newConversation.title}
                  onChange={(e) => setNewConversation({ ...newConversation, title: e.target.value })}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-black dark:text-white">
                  Platform
                </label>
                <select
                  className="input w-full"
                  value={newConversation.platform}
                  onChange={(e) => setNewConversation({ ...newConversation, platform: e.target.value })}
                >
                  <option value="claude">Claude AI</option>
                  <option value="chatgpt">ChatGPT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2 text-black dark:text-white">
                  Notes (Optional)
                </label>
                <textarea
                  className="input w-full"
                  placeholder="Any helpful notes about this conversation..."
                  rows="3"
                  value={newConversation.notes}
                  onChange={(e) => setNewConversation({ ...newConversation, notes: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleLogConversation}
                className="btn-primary flex-1"
                disabled={!newConversation.title.trim()}
              >
                Log Conversation
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setNewConversation({ title: '', platform: 'claude', notes: '' });
                }}
                className="px-4 py-2 border rounded-lg transition-colors hover:bg-white hover:bg-opacity-5"
                style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
