"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";

export default function Component() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/images");
        const imageList = await response.json();
        setImages(imageList);
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages([]);
      }
    }
    fetchImages();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 2 : prevIndex));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 2 ? prevIndex + 2 : prevIndex
    );
  };

  const handleSliderChange = (value: number) => {
    const newIndex = Math.floor(value / 2) * 2; // Ensure we always land on an even index
    setCurrentIndex(newIndex);
  };

  const renderPage = (index: number) => {
    if (index >= images.length) return null;
    return (
      <div className="relative w-full h-full">
        <Image
          src={images[index]}
          alt={`Page ${index + 1}`}
          layout="fill"
          objectFit="contain"
          className="rounded-lg shadow-md"
        />
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center p-4 relative">
      {/* Magazine Viewer */}
      <Card className="overflow-hidden relative">
        <CardContent className="relative mx-auto w-[95vw] max-w-[1400px] aspect-[2/1.414]">
          <div className="grid grid-cols-2 w-full h-full bg-gray-100">
            {renderPage(currentIndex)}
            {renderPage(currentIndex + 1)}
          </div>

          {/* Navigation Buttons (overlaying the viewer) */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-black/40 hover:bg-black/60 text-white"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-black/40 hover:bg-black/60 text-white"
            onClick={goToNext}
            disabled={currentIndex >= images.length - 2}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </CardContent>
      </Card>

      {/* Slider for Page Navigation */}
      <div className="w-full max-w-lg mt-4">
        <input
          type="range"
          min="0"
          max={Math.max(images.length - 1, 0)}
          step="2"
          value={currentIndex}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Page Counter */}
      <div className="mt-2 text-sm text-center text-muted-foreground">
        Pages {currentIndex + 1}-{Math.min(currentIndex + 2, images.length)} of {images.length}
      </div>
    </div>
  );
}
