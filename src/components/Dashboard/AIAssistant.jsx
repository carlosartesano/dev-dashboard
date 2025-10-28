import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Settings, X, Plus } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AIAssistant = () => {
  const [conversations, setConversations] = useLocalStorage('dev-dashboard-ai-conversations', []);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('demo');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const providers = {
    demo: {
      name: 'AI Assistant',
      icon: '🤖',
      color: '#818cf8',
      description: 'Interactive chat interface - Click external links for real AI'
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: Date.now()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const response = getDemoResponse(inputMessage.trim());

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };

      setMessages([...newMessages, aiMessage]);
      
      // Save conversation if it's new
      if (!currentConversation) {
        const conversation = {
          id: Date.now().toString(),
          title: userMessage.content.substring(0, 50) + (userMessage.content.length > 50 ? '...' : ''),
          provider: selectedProvider,
          messages: [...newMessages, aiMessage],
          timestamp: Date.now()
        };
        setCurrentConversation(conversation);
    setConversations([conversation, ...conversations]);
      } else {
        // Update existing conversation
        const updatedConversation = {
          ...currentConversation,
          messages: [...newMessages, aiMessage]
        };
        setCurrentConversation(updatedConversation);
        setConversations(conversations.map(conv => 
          conv.id === currentConversation.id ? updatedConversation : conv
        ));
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDemoResponse = (userMessage) => {
    const responses = [
      `I understand you're asking about "${userMessage}". This is a demo response - for real AI assistance, use the external links below!`,
      `That's an interesting question about "${userMessage}". While I can't provide real answers here, the external AI services below can help!`,
      `Great question! For "${userMessage}", you'd get a real AI response from Claude or ChatGPT. This is just a simulation.`,
      `I see you're interested in "${userMessage}". Check out the AI services below for genuine AI assistance!`,
      `Regarding "${userMessage}" - this is a demo response. Use the external links for real AI capabilities.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const startNewConversation = () => {
    setCurrentConversation(null);
    setMessages([]);
  };

  const loadConversation = (conversation) => {
    setCurrentConversation(conversation);
    setMessages(conversation.messages);
    setSelectedProvider(conversation.provider);
  };

  const deleteConversation = (id) => {
    setConversations(conversations.filter(conv => conv.id !== id));
    if (currentConversation?.id === id) {
      startNewConversation();
    }
  };

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

  const openClaude = () => {
    window.open('https://claude.ai', '_blank', 'noopener,noreferrer');
  };

  const openChatGPT = () => {
    window.open('https://chat.openai.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="card h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-black dark:text-white text-center">🤖 AI Assistant</h2>
          <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-black dark:text-white transition-colors hover:text-black dark:hover:text-white"
          >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={startNewConversation}
              className="text-sm text-black dark:text-white transition-colors hover:text-black dark:hover:text-white"
            >
              <Plus className="w-4 h-4" />
          </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🤖</div>
              <div className="text-sm text-black dark:text-white mb-2">
                Start a conversation with AI Assistant
              </div>
              <div className="text-xs text-black dark:text-white opacity-60">
                Interactive demo - Use external links for real AI
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gray-200 dark:bg-gray-700">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-60 mt-1">
                      {formatRelativeTime(message.timestamp)}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm bg-blue-500 text-white">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gray-200 dark:bg-gray-700">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
                      <span className="text-sm text-black dark:text-white">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Message AI Assistant..."
              className="flex-1 input"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="btn-primary px-4 py-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* External AI Services */}
      <div className="px-6 py-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="text-xs text-black dark:text-white mb-3 text-center">
          For real AI assistance:
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={openClaude}
            className="flex items-center justify-center gap-2 p-3 border rounded-lg transition-all hover:scale-[1.02] text-sm"
            style={{
              backgroundColor: 'rgba(147, 51, 234, 0.1)',
              borderColor: 'rgba(147, 51, 234, 0.3)'
            }}
          >
            <span className="text-lg">✨</span>
            <span className="text-black dark:text-white">Claude AI</span>
          </button>
          <button
            onClick={openChatGPT}
            className="flex items-center justify-center gap-2 p-3 border rounded-lg transition-all hover:scale-[1.02] text-sm"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderColor: 'rgba(16, 185, 129, 0.3)'
            }}
          >
            <span className="text-lg">💬</span>
            <span className="text-black dark:text-white">ChatGPT</span>
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md rounded-lg p-6 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black dark:text-white">AI Assistant</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Interactive Demo
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  This is a demo chat interface. For real AI capabilities, use the Claude AI or ChatGPT buttons below.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                  External AI Services
                </h4>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  Click the buttons below to open real AI services in new tabs for actual AI assistance.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn-primary flex-1"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;