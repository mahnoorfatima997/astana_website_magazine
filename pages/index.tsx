"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";

const images = [];

if (typeof window !== "undefined") {
  const context = require.context(
    "../public/assets",
    false,
    /\.(png|jpe?g|gif)$/i,
  );
  images.push(...context.keys().map(context));
}

export default function Component() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <div className="relative h-full flex-1">
        <Image
          src={images[index]}
          alt={`Page ${index + 1}`}
          fill
          className="object-contain"
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-[95vw] mx-auto space-y-4 p-2">
      <div className="relative">
        <Card className="overflow-hidden">
          <CardContent className="relative p-0 h-[90vh] flex">
            {renderPage(currentIndex)}
            {renderPage(currentIndex + 1)}
          </CardContent>
        </Card>

        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="relative left-4 h-16 w-16 rounded-full bg-background/50 hover:bg-background/70"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative right-4 h-16 w-16 rounded-full bg-background/50 hover:bg-background/70"
            onClick={goToNext}
            disabled={currentIndex >= images.length - 2}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </div>

      <div className="mt-2 text-sm text-center text-muted-foreground">
        Pages {currentIndex + 1}-{Math.min(currentIndex + 2, images.length)} of{" "}
        {images.length}
      </div>
    </div>
  );
}
