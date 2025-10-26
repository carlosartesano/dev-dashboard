import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { defaultLinks } from '../../data/defaultLinks';
import LinkCard from './LinkCard';
import LinkModal from './LinkModal';

const QuickLinks = () => {
  const [links, setLinks] = useLocalStorage('dev-dashboard-quick-links', defaultLinks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);

  // Show max 9 links
  const displayedLinks = links.slice(0, 9);

  const handleSaveLink = (linkData) => {
    if (editingLink) {
      // Update existing link
      setLinks(
        links.map((link) =>
          link.id === editingLink.id
            ? {
                ...link,
                ...linkData,
              }
            : link
        )
      );
    } else {
      // Create new link
      const newLink = {
        id: Date.now().toString(),
        ...linkData,
        clicks: 0,
        createdAt: Date.now(),
      };
      setLinks([newLink, ...links]);
    }
    setIsModalOpen(false);
    setEditingLink(null);
  };

  const handleEditLink = (link) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };

  const handleDeleteLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleLinkClick = (id) => {
    // Increment click counter
    setLinks(
      links.map((link) =>
        link.id === id
          ? {
              ...link,
              clicks: link.clicks + 1,
            }
          : link
      )
    );
  };

  const handleNewLink = () => {
    setEditingLink(null);
    setIsModalOpen(true);
  };

  return (
    <div className="card h-[400px] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">🔗 Quick Links</h2>
          <button
            onClick={handleNewLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-all hover:bg-white hover:bg-opacity-10"
            style={{ borderColor: 'var(--color-dark-border)' }}
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Links Grid - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {displayedLinks.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {displayedLinks.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              onEdit={handleEditLink}
              onDelete={handleDeleteLink}
              onClick={handleLinkClick}
            />
          ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm mb-2">No links yet.</p>
            <p className="text-xs">Add your favorite development resources!</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <LinkModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLink(null);
        }}
        onSave={handleSaveLink}
        editingLink={editingLink}
      />
    </div>
  );
};

export default QuickLinks;
