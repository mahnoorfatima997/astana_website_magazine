"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";

export default function Component() {
  const [files, setFiles] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 2 : prevIndex));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < files.length - 2 ? prevIndex + 2 : prevIndex,
    );
  };

  const renderPage = (index: number) => {
    if (index >= files.length) return null;

    return (
      <div className="relative h-full flex-1">
        <Image
          src={URL.createObjectURL(files[index]) || "/placeholder.svg"}
          alt={`Page ${index + 1}`}
          fill
          className="object-contain"
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-[95vw] mx-auto space-y-4 p-2">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/25"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop files here, or click to select files"}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Supports: PNG, JPG, JPEG
        </p>
      </div>

      {files.length > 0 && (
        <div className="relative">
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
                disabled={currentIndex >= files.length - 2}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </div>

          <div className="mt-2 text-sm text-center text-muted-foreground">
            Pages {currentIndex + 1}-{Math.min(currentIndex + 2, files.length)}{" "}
            of {files.length}
          </div>
        </div>
      )}
    </div>
  );
}
