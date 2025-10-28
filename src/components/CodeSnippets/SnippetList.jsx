import SnippetCard from './SnippetCard';

const SnippetList = ({ snippets, onEdit, onDelete, onCopy }) => {
  if (snippets.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-black dark:text-white text-lg mb-2">No snippets found</p>
        <p className="text-black dark:text-white text-sm">
          Try adjusting your filters or create a new snippet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {snippets.map((snippet) => (
        <SnippetCard
          key={snippet.id}
          snippet={snippet}
          onEdit={onEdit}
          onDelete={onDelete}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
};

export default SnippetList;
