import { useState, useRef, useCallback, MouseEvent, WheelEvent } from "react";

export function useCanvasPan() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.button === 0) {
        e.preventDefault();
        setIsDragging(true);
        dragStartRef.current = {
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        };
      }
    },
    [offset],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isDragging) {
        setOffset({
          x: e.clientX - dragStartRef.current.x,
          y: e.clientY - dragStartRef.current.y,
        });
      }
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: WheelEvent<HTMLDivElement>) => {
    // Zoom com Ctrl/Cmd + scroll
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
      const delta = -e.deltaY * 0.01;
      setZoom((prev) => Math.min(Math.max(0.1, prev + delta), 4));
    } else {
      // Pan apenas com scroll vertical/horizontal, mas só dentro do canvas
      // Não previne navegação do browser
      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);

      // Só previne scroll horizontal (que causaria navegação)
      if (isHorizontalScroll) {
        e.preventDefault();
        e.stopPropagation();
      }

      setOffset((prev) => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      }));
    }
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.1, 4));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.1, 0.1));
  }, []);

  const resetPosition = useCallback(() => {
    setOffset({ x: 0, y: 50 });
  }, []);

  const fitToView = useCallback((canvasWidth: number, canvasHeight: number) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      const padding = 100;
      const availableWidth = containerWidth - padding;
      const availableHeight = containerHeight - padding;

      const scaleX = availableWidth / canvasWidth;
      const scaleY = availableHeight / canvasHeight;

      const newZoom = Math.min(scaleX, scaleY, 1);
      setZoom(newZoom);
      setOffset({ x: 0, y: 50 });
    }
  }, []);

  return {
    offset,
    zoom,
    isDragging,
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleWheel,
    resetZoom,
    zoomIn,
    zoomOut,
    resetPosition,
    fitToView,
  };
}
