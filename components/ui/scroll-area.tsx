import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"

import { cn } from "@/lib/utils"

interface ScrollAreaProps extends ScrollAreaPrimitive.Root.Props {
  viewportRef?: React.Ref<HTMLDivElement>
}

function ScrollArea({
  className,
  children,
  viewportRef,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        ref={viewportRef}
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
      <ScrollAreaPrimitive.Scrollbar
        data-slot="scroll-area-scrollbar"
        data-orientation={orientation}
        orientation={orientation}
        className={cn(
          "flex touch-none p-1.5 transition-colors select-none bg-white/[0.08] border-l border-white/10 data-horizontal:h-4 data-horizontal:flex-col data-vertical:h-full data-vertical:w-12",
          className
        )}
        {...props}
      >
        <ScrollAreaPrimitive.Thumb
          data-slot="scroll-area-thumb"
          className="relative flex-1 rounded-sm bg-primary/60 hover:bg-primary/80 active:bg-primary transition-all cursor-pointer"
        />
      </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
