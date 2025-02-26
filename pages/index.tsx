"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";


export default function Component() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // This assumes your images are in the public/assets directory
    const imageList = [
      "/assets/Astana Issue 02 Final (1)-compressed-001.png",
      "/assets/Astana Issue 02 Final (1)-compressed-003.png",
      "/assets/Astana Issue 02 Final (1)-compressed-004.png",
      "/assets/Astana Issue 02 Final (1)-compressed-005.png",
      "/assets/Astana Issue 02 Final (1)-compressed-006.png"
    ];
    setImages(imageList);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 2 : prevIndex));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 2 ? prevIndex + 2 : prevIndex,
    );
  };

  const renderPage = (index: number) => {
    if (index >= images.length) return null;

    return (
      <div className="relative h-full w-1/2" style={{ position: "relative" }}>
        <Image
          src={images[index]}
          alt={`Page ${index + 1}`}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        <Card className="overflow-hidden">
          <CardContent className="relative p-4 h-[70vh] flex">
            {renderPage(currentIndex)}
            {renderPage(currentIndex + 1)}
          </CardContent>
        </Card>

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            variant="ghost"
            className="h-10 w-10 rounded-full bg-white/70 hover:bg-white/90"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            className="h-10 w-10 rounded-full bg-white/70 hover:bg-white/90"
            onClick={goToNext}
            disabled={currentIndex >= images.length - 2}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        Pages {currentIndex + 1}-{Math.min(currentIndex + 2, images.length)} of{" "}
        {images.length}
      </div>
    </div>
  );
}