import { useState, useEffect, useCallback, useRef } from 'react';

export function useResize(storageKey, defaultHeight = 600, minHeight = 400, maxHeight = 1000) {
  // Load saved height from localStorage
  const [height, setHeight] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? parseInt(saved) : defaultHeight;
  });

  const [isResizing, setIsResizing] = useState(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  // Save height to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(storageKey, height.toString());
  }, [height, storageKey]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
    startY.current = e.clientY;
    startHeight.current = height;
  }, [height]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      const deltaY = e.clientY - startY.current;
      const newHeight = Math.min(
        Math.max(startHeight.current + deltaY, minHeight),
        maxHeight
      );
      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Prevent text selection while resizing
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ns-resize';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isResizing, minHeight, maxHeight]);

  return {
    height,
    isResizing,
    handleMouseDown,
    setHeight
  };
}
