const ResizeHandle = ({ onMouseDown }) => {
  return (
    <div
      className="resize-handle absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize group hover:bg-opacity-20 transition-colors flex items-center justify-center z-10"
      onMouseDown={onMouseDown}
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {/* Visual indicator */}
      <div
        className="w-12 h-1 rounded-full transition-colors"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }}
      />

      {/* Tooltip on hover */}
      <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <span
          className="text-xs px-2 py-1 rounded whitespace-nowrap"
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
        >
          Drag to resize
        </span>
      </div>
    </div>
  );
};

export default ResizeHandle;
