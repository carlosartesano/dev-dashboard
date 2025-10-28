import { useState, useMemo, useEffect, useRef } from 'react';
import { Plus, Search } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useDebounce } from '../../hooks/useDebounce';
import { defaultLearningLogs } from '../../data/defaultLearningLogs';
import LogEntry from './LogEntry';
import LogModal from './LogModal';
import Pagination from '../Common/Pagination';

const LearningLog = () => {
  const [logs, setLogs] = useLocalStorage('dev-dashboard-learning-log', defaultLearningLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  const containerRef = useRef(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filter and sort logs
  const filteredLogs = useMemo(() => {
    let filtered = logs;

    // Search filter
    if (debouncedSearch) {
      const search = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (log) =>
          log.week.toLowerCase().includes(search) ||
          log.topics.some((topic) => topic.toLowerCase().includes(search)) ||
          log.tags.some((tag) => tag.toLowerCase().includes(search)) ||
          log.notes.toLowerCase().includes(search) ||
          log.keyTakeaway.toLowerCase().includes(search)
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        return [...filtered].sort((a, b) => b.createdAt - a.createdAt);
      case 'oldest':
        return [...filtered].sort((a, b) => a.createdAt - b.createdAt);
      case 'week':
        return [...filtered].sort((a, b) => {
          // Extract week number from "Week X" format
          const weekA = parseInt(a.week.replace(/\D/g, '')) || 0;
          const weekB = parseInt(b.week.replace(/\D/g, '')) || 0;
          return weekB - weekA;
        });
      default:
        return filtered;
    }
  }, [logs, debouncedSearch, sortBy]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, sortBy]);

  // Calculate paginated logs
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredLogs.slice(startIndex, endIndex);
  }, [filteredLogs, currentPage, itemsPerPage]);

  // Handle page change and scroll to top
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSaveLog = (logData) => {
    if (editingLog) {
      // Update existing
      setLogs(
        logs.map((log) =>
          log.id === editingLog.id
            ? {
                ...log,
                ...logData,
                updatedAt: Date.now(),
              }
            : log
        )
      );
    } else {
      // Create new
      const newLog = {
        id: Date.now().toString(),
        ...logData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setLogs([newLog, ...logs]);
    }
    setIsModalOpen(false);
    setEditingLog(null);
  };

  const handleEditLog = (log) => {
    setEditingLog(log);
    setIsModalOpen(true);
  };

  const handleDeleteLog = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  const handleNewLog = () => {
    setEditingLog(null);
    setIsModalOpen(true);
  };

  return (
    <div className="card h-[500px] flex flex-col" ref={containerRef}>
      {/* Header */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-black dark:text-white">📚 Learning Log</h2>
          <button
            onClick={handleNewLog}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Entry
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
              placeholder="Search by week, topics, tags, or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort and Count */}
          <div className="flex flex-wrap gap-3 items-center">
            <select
              className="input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="week">By Week Number</option>
            </select>

            <span className="text-sm text-black dark:text-white ml-auto">
              {filteredLogs.length} {filteredLogs.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline - Scrollable */}
      {filteredLogs.length > 0 ? (
        <>
          <div className="flex-1 overflow-y-auto mb-4">
            <div className="space-y-0">
              {paginatedLogs.map((log, index) => (
                <LogEntry
                  key={log.id}
                  entry={log}
                  onEdit={handleEditLog}
                  onDelete={handleDeleteLog}
                  isLast={index === paginatedLogs.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex-shrink-0">
            <Pagination
              currentPage={currentPage}
              totalItems={filteredLogs.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              itemName="entries"
            />
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-12 text-black dark:text-white">
          <p className="text-sm mb-2">
            {searchTerm ? 'No entries found matching your search.' : 'No learning log entries yet.'}
          </p>
          <p className="text-xs">
            {searchTerm ? 'Try a different search term.' : 'Start documenting your learning journey!'}
          </p>
        </div>
      )}

      {/* Modal */}
      <LogModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLog(null);
        }}
        onSave={handleSaveLog}
        editingLog={editingLog}
      />
    </div>
  );
};

export default LearningLog;
