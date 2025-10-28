import PromptCard from './PromptCard';

const PromptList = ({
  prompts,
  onEdit,
  onDelete,
  onToggleFavorite,
  onCopy,
}) => {
  if (prompts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-black dark:text-white text-lg mb-2">No prompts found</p>
        <p className="text-black dark:text-white text-sm">
          Try adjusting your filters or create a new prompt
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
};

export default PromptList;
