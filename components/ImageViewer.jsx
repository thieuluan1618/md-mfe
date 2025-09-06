"use client";

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

const ImageViewer = ({ images, currentIndex, onClose, onIndexChange }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset zoom and position when image changes
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
    setIsLoading(true);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          previousImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
        case '0':
          resetZoom();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextImage = () => {
    if (onIndexChange) {
      onIndexChange((currentIndex + 1) % images.length);
    }
  };

  const previousImage = () => {
    if (onIndexChange) {
      onIndexChange((currentIndex - 1 + images.length) % images.length);
    }
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev * 1.5, 5));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev / 1.5, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 text-white">
          <span className="text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-white text-sm min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={rotate}
            className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            title="Rotate"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={resetZoom}
            className="px-3 py-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors text-xs"
            title="Reset (0)"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={previousImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
            title="Previous (←)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
            title="Next (→)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Image Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className={`max-w-full max-h-full object-contain transition-all duration-300 ease-out ${
            isDragging ? 'cursor-grabbing' : zoom > 1 ? 'cursor-grab' : 'cursor-auto'
          }`}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center center'
          }}
          onLoad={handleImageLoad}
          draggable={false}
        />
      </div>

      {/* Bottom Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-4 py-2 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onIndexChange && onIndexChange(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Backdrop Click to Close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />

      {/* Help Text */}
      <div className="absolute bottom-4 left-4 text-white/70 text-xs space-y-1">
        <div>← → Navigate • +/- Zoom • 0 Reset • Esc Close</div>
        <div>Scroll to zoom • Drag to pan when zoomed</div>
      </div>
    </div>
  );
};

export default ImageViewer;