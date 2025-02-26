import * as React from "react";

import { cn } from "../lib/utils";

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("relative w-full overflow-hidden", className)}
    ref={ref}
    {...props}
  />
));
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "relative flex snap-x snap-mandatory overflow-auto scroll-smooth",
      className,
    )}
    ref={ref}
    {...props}
  />
));
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={cn("snap-start shrink-0", className)} ref={ref} {...props} />
));
CarouselItem.displayName = "CarouselItem";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    className={cn(
      "absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/20 hover:bg-white/50 text-white p-1",
      className,
    )}
    ref={ref}
    {...props}
  >
    Next
  </button>
));
CarouselNext.displayName = "CarouselNext";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    className={cn(
      "absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/20 hover:bg-white/50 text-white p-1",
      className,
    )}
    ref={ref}
    {...props}
  >
    Previous
  </button>
));
CarouselPrevious.displayName = "CarouselPrevious";

function useCarousel() {
  return {};
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
};
