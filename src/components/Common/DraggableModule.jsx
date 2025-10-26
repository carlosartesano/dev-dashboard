import { GripVertical } from 'lucide-react';

const DraggableModule = ({
  children,
  id,
  index,
  isDragging,
  onDragStart,
  onDragOver,
  onDragEnd,
}) => {
  return (
    <div
      draggable="true"
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      className={`relative transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100'
      }`}
      style={{ cursor: isDragging ? 'grabbing' : 'auto' }}
    >
      <div className="group relative">
        {/* Drag handle - shows on hover */}
        <div
          className="absolute -left-3 top-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10 hidden lg:block"
          aria-label="Drag to reorder"
          title="Drag to reorder modules"
        >
          <div
            className="p-1 rounded"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <GripVertical className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Actual module content */}
        {children}
      </div>
    </div>
  );
};

export default DraggableModule;
