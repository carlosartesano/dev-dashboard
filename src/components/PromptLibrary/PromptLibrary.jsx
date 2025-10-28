import { useState, useMemo, useEffect, useRef } from 'react';
import { Plus, Search, Star } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useDebounce } from '../../hooks/useDebounce';
import { useResize } from '../../hooks/useResize';
import { defaultPrompts } from '../../data/defaultPrompts';
import PromptList from './PromptList';
import PromptModal from './PromptModal';
import Pagination from '../Common/Pagination';
import ResizeHandle from '../Common/ResizeHandle';

const PromptLibrary = () => {
  const [prompts, setPrompts] = useLocalStorage('dev-dashboard-prompts', defaultPrompts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  const containerRef = useRef(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Use resize hook
  const { height, isResizing, handleMouseDown, setHeight } = useResize(
    'dev-dashboard-prompt-height',
    700,  // default height
    400,  // min height
    1000  // max height
  );

  // Get unique categories
  const categories = ['All', ...new Set(prompts.map((p) => p.category))];

  // Filter and sort prompts
  const filteredPrompts = useMemo(() => {
    let filtered = prompts;

    // Search filter
    if (debouncedSearch) {
      const search = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(search) ||
          prompt.tags.some((tag) => tag.toLowerCase().includes(search)) ||
          prompt.category.toLowerCase().includes(search)
      );
    }

    // Category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter((prompt) => prompt.category === categoryFilter);
    }

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter((prompt) => prompt.favorite);
    }

    // Sort
    switch (sortBy) {
      case 'recent':
        return [...filtered].sort((a, b) => {
          const aTime = a.lastUsed || a.createdAt;
          const bTime = b.lastUsed || b.createdAt;
          return bTime - aTime;
        });
      case 'mostUsed':
        return [...filtered].sort((a, b) => b.usageCount - a.usageCount);
      case 'alphabetical':
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [prompts, debouncedSearch, categoryFilter, showFavoritesOnly, sortBy]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, categoryFilter, showFavoritesOnly, sortBy]);

  // Calculate paginated prompts
  const paginatedPrompts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPrompts.slice(startIndex, endIndex);
  }, [filteredPrompts, currentPage, itemsPerPage]);

  // Handle page change and scroll to top
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // CRUD operations
  const handleSavePrompt = (promptData) => {
    if (editingPrompt) {
      // Update existing
      setPrompts(
        prompts.map((p) =>
          p.id === editingPrompt.id
            ? {
                ...p,
                ...promptData,
              }
            : p
        )
      );
    } else {
      // Create new
      const newPrompt = {
        id: Date.now().toString(),
        ...promptData,
        usageCount: 0,
        createdAt: Date.now(),
        lastUsed: null,
      };
      setPrompts([newPrompt, ...prompts]);
    }
    setIsModalOpen(false);
    setEditingPrompt(null);
  };

  const handleEditPrompt = (prompt) => {
    setEditingPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleDeletePrompt = (id) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      setPrompts(prompts.filter((p) => p.id !== id));
    }
  };

  const handleToggleFavorite = (id) => {
    setPrompts(
      prompts.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
  };

  const handleCopyPrompt = (id) => {
    setPrompts(
      prompts.map((p) =>
        p.id === id
          ? {
              ...p,
              usageCount: p.usageCount + 1,
              lastUsed: Date.now(),
            }
          : p
      )
    );
  };

  const handleNewPrompt = () => {
    setEditingPrompt(null);
    setIsModalOpen(true);
  };

  return (
    <div
      className={`card flex flex-col relative ${isResizing ? 'select-none' : ''}`}
      style={{ height: `${height}px` }}
      ref={containerRef}
    >
      {/* Header */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-black dark:text-white text-center">💡 AI Prompt Library</h2>
          <button
            onClick={handleNewPrompt}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Prompt
          </button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black dark:text-white" />
            <input
              type="text"
              className="input w-full pl-10"
              placeholder="Search prompts by title, tags, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category Filter */}
            <select
              className="input"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              className="input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Recent</option>
              <option value="mostUsed">Most Used</option>
              <option value="alphabetical">Alphabetical</option>
            </select>

            {/* Favorites Toggle */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                showFavoritesOnly
                  ? 'border-yellow-400 bg-yellow-400 bg-opacity-20 text-black dark:text-white'
                  : 'border-gray-300 dark:border-border-subtle text-black dark:text-white'
              }`}
            >
              <Star
                className={`w-4 h-4 ${
                  showFavoritesOnly ? 'fill-yellow-400 text-yellow-400' : 'text-black dark:text-white'
                }`}
              />
              <span className="text-sm">
                {showFavoritesOnly ? 'Favorites Only' : 'All Prompts'}
              </span>
            </button>

            {/* Results Count */}
            <span className="text-sm text-black dark:text-white ml-auto">
              {filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'prompts'}
            </span>
          </div>
        </div>
      </div>

      {/* Prompt List - Scrollable */}
      <div className="flex-1 overflow-y-auto mb-4">
        <PromptList
          prompts={paginatedPrompts}
          onEdit={handleEditPrompt}
          onDelete={handleDeletePrompt}
          onToggleFavorite={handleToggleFavorite}
          onCopy={handleCopyPrompt}
        />
      </div>

      {/* Pagination */}
      <div className="flex-shrink-0">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredPrompts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          itemName="prompts"
        />
      </div>

      {/* Modal */}
      <PromptModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPrompt(null);
        }}
        onSave={handleSavePrompt}
        editingPrompt={editingPrompt}
      />

      {/* Resize handle at bottom */}
      <ResizeHandle onMouseDown={handleMouseDown} />
    </div>
  );
};

export default PromptLibrary;
