import { useState, useEffect } from 'react';

export function useDragAndDrop(initialOrder) {
  // Load saved order from localStorage or use default
  const [moduleOrder, setModuleOrder] = useState(() => {
    const saved = localStorage.getItem('dev-dashboard-module-order');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all initial modules are present
        const missingModules = initialOrder.filter(m => !parsed.includes(m));
        const validModules = parsed.filter(m => initialOrder.includes(m));
        return [...validModules, ...missingModules];
      } catch {
        return initialOrder;
      }
    }
    return initialOrder;
  });

  const [draggedItem, setDraggedItem] = useState(null);

  // Save to localStorage whenever order changes
  useEffect(() => {
    localStorage.setItem('dev-dashboard-module-order', JSON.stringify(moduleOrder));
  }, [moduleOrder]);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (draggedItem === null || draggedItem === index) return;

    const newOrder = [...moduleOrder];
    const draggedElement = newOrder[draggedItem];
    newOrder.splice(draggedItem, 1);
    newOrder.splice(index, 0, draggedElement);

    setModuleOrder(newOrder);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const resetOrder = () => {
    setModuleOrder(initialOrder);
  };

  return {
    moduleOrder,
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    resetOrder,
  };
}
