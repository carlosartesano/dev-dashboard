import { useState, useMemo, useEffect, useRef } from 'react';
import { Plus, Search } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useDebounce } from '../../hooks/useDebounce';
import { useResize } from '../../hooks/useResize';
import { defaultSnippets } from '../../data/defaultSnippets';
import SnippetList from './SnippetList';
import SnippetModal from './SnippetModal';
import Pagination from '../Common/Pagination';
import ResizeHandle from '../Common/ResizeHandle';

const CodeSnippets = () => {
  const [snippets, setSnippets] = useLocalStorage('dev-dashboard-snippets', defaultSnippets);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  const containerRef = useRef(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Use resize hook with different storage key
  const { height, isResizing, handleMouseDown, setHeight } = useResize(
    'dev-dashboard-snippet-height',
    500,  // default height
    400,  // min height
    1000  // max height
  );

  const languages = ['All', ...new Set(snippets.map((s) => s.language))];
  const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];

  const filteredSnippets = useMemo(() => {
    let filtered = snippets;

    if (debouncedSearch) {
      const search = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (snippet) =>
          snippet.title.toLowerCase().includes(search) ||
          snippet.description.toLowerCase().includes(search) ||
          snippet.tags.some((tag) => tag.toLowerCase().includes(search)) ||
          snippet.language.toLowerCase().includes(search)
      );
    }

    if (languageFilter !== 'All') {
      filtered = filtered.filter((snippet) => snippet.language === languageFilter);
    }

    if (difficultyFilter !== 'All') {
      filtered = filtered.filter((snippet) => snippet.difficulty === difficultyFilter);
    }

    switch (sortBy) {
      case 'recent':
        return [...filtered].sort((a, b) => b.createdAt - a.createdAt);
      case 'mostCopied':
        return [...filtered].sort((a, b) => b.copiedCount - a.copiedCount);
      case 'alphabetical':
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [snippets, debouncedSearch, languageFilter, difficultyFilter, sortBy]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, languageFilter, difficultyFilter, sortBy]);

  // Calculate paginated snippets
  const paginatedSnippets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSnippets.slice(startIndex, endIndex);
  }, [filteredSnippets, currentPage, itemsPerPage]);

  // Handle page change and scroll to top
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSaveSnippet = (snippetData) => {
    if (editingSnippet) {
      setSnippets(
        snippets.map((s) =>
          s.id === editingSnippet.id
            ? {
                ...s,
                ...snippetData,
              }
            : s
        )
      );
    } else {
      const newSnippet = {
        id: Date.now().toString(),
        ...snippetData,
        copiedCount: 0,
        createdAt: Date.now(),
      };
      setSnippets([newSnippet, ...snippets]);
    }
    setIsModalOpen(false);
    setEditingSnippet(null);
  };

  const handleEditSnippet = (snippet) => {
    setEditingSnippet(snippet);
    setIsModalOpen(true);
  };

  const handleDeleteSnippet = (id) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      setSnippets(snippets.filter((s) => s.id !== id));
    }
  };

  const handleCopySnippet = (id) => {
    setSnippets(
      snippets.map((s) =>
        s.id === id
          ? {
              ...s,
              copiedCount: s.copiedCount + 1,
            }
          : s
      )
    );
  };

  return (
    <div
      className={`card flex flex-col relative ${isResizing ? 'select-none' : ''}`}
      style={{ height: `${height}px` }}
      ref={containerRef}
    >
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">📦 Code Snippets</h2>
          <button
            onClick={() => {
              setEditingSnippet(null);
              setIsModalOpen(true);
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Snippet
          </button>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-text-tertiary" />
            <input
              type="text"
              className="input w-full pl-10"
              placeholder="Search snippets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <select
              className="input"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang === 'All' ? 'All Languages' : lang}
                </option>
              ))}
            </select>

            <select
              className="input"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff === 'All' ? 'All Levels' : diff}
                </option>
              ))}
            </select>

            <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Recent</option>
              <option value="mostCopied">Most Copied</option>
              <option value="alphabetical">Alphabetical</option>
            </select>

            <span className="text-sm text-gray-600 dark:text-text-tertiary ml-auto">
              {filteredSnippets.length} {filteredSnippets.length === 1 ? 'snippet' : 'snippets'}
            </span>
          </div>
        </div>
      </div>

      {/* Snippet List - Scrollable */}
      <div className="flex-1 overflow-y-auto mb-4">
        <SnippetList
          snippets={paginatedSnippets}
          onEdit={handleEditSnippet}
          onDelete={handleDeleteSnippet}
          onCopy={handleCopySnippet}
        />
      </div>

      {/* Pagination */}
      <div className="flex-shrink-0">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredSnippets.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          itemName="snippets"
        />
      </div>

      <SnippetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSnippet(null);
        }}
        onSave={handleSaveSnippet}
        editingSnippet={editingSnippet}
      />

      {/* Resize handle at bottom */}
      <ResizeHandle onMouseDown={handleMouseDown} />
    </div>
  );
};

export default CodeSnippets;
