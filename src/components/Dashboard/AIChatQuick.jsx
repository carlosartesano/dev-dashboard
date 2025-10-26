import { useState } from 'react';
import { ExternalLink, MessageSquare, Sparkles } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AIChatQuick = () => {
  const [aiChats, setAiChats] = useLocalStorage('dev-dashboard-ai-chats', []);

  const openClaude = () => {
    window.open('https://claude.ai', '_blank', 'noopener,noreferrer');
  };

  const openChatGPT = () => {
    window.open('https://chat.openai.com', '_blank', 'noopener,noreferrer');
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

  // Get platform emoji
  const getPlatformIcon = (platform) => {
    return platform === 'claude' ? '🟣' : '🟢';
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Small subtle header */}
      <div className="text-xs font-medium uppercase tracking-wide mb-4 text-center" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
        🤖 AI Assistant
      </div>

      {/* AI Chat Buttons */}
      <div className="space-y-2.5 mb-5">
        <button
          onClick={openClaude}
          className="w-full group flex items-center justify-between px-4 py-3 rounded-lg border transition-all hover:scale-[1.02]"
          style={{
            borderColor: 'rgba(147, 51, 234, 0.3)',
            backgroundColor: 'rgba(147, 51, 234, 0.08)',
          }}
        >
          <span className="flex items-center gap-2.5">
            <div
              className="p-1.5 rounded-md"
              style={{ backgroundColor: 'rgba(147, 51, 234, 0.2)' }}
            >
              <MessageSquare className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <span className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
              Chat with Claude
            </span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-primary)' }} />
        </button>

        <button
          onClick={openChatGPT}
          className="w-full group flex items-center justify-between px-4 py-3 rounded-lg border transition-all hover:scale-[1.02]"
          style={{
            borderColor: 'rgba(16, 163, 127, 0.3)',
            backgroundColor: 'rgba(16, 163, 127, 0.08)',
          }}
        >
          <span className="flex items-center gap-2.5">
            <div
              className="p-1.5 rounded-md"
              style={{ backgroundColor: 'rgba(16, 163, 127, 0.2)' }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: '#10a37f' }} />
            </div>
            <span className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
              Chat with ChatGPT
            </span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: '#10a37f' }} />
        </button>
      </div>

      {/* Recent Topics */}
      <div className="flex-1 overflow-y-auto">
        <div className="text-[10px] uppercase tracking-wider font-medium mb-2.5" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Recent Topics
        </div>

        {aiChats.length > 0 ? (
          <div className="space-y-2">
            {aiChats.slice(0, 3).map((chat) => (
              <div
                key={chat.id}
                className="p-2.5 rounded-md border"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'rgba(255, 255, 255, 0.06)'
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-xs mt-0.5">{getPlatformIcon(chat.platform)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs truncate" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                      {chat.topic}
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255, 255, 255, 0.35)' }}>
                      {formatRelativeTime(chat.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-6 px-3 rounded-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              color: 'rgba(255, 255, 255, 0.4)'
            }}
          >
            <div className="text-2xl mb-2">💬</div>
            <div className="text-xs leading-relaxed">
              No conversations yet
              <br />
              <span className="text-[10px]">Start chatting with AI!</span>
            </div>
          </div>
        )}
      </div>

      {/* Tip Section */}
      <div
        className="mt-4 p-3 rounded-lg text-xs border"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(255, 255, 255, 0.03)'
        }}
      >
        <div className="flex items-start gap-2">
          <span className="text-sm">💡</span>
          <div>
            <div className="font-medium mb-0.5" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Pro Tip
            </div>
            <div className="text-[11px] leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Check Prompt Library for better AI conversations
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatQuick;
