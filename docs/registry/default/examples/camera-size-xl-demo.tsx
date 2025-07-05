"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraSizeXlDemo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Extra Large Size</h3>
        <p className="text-sm text-muted-foreground">
          Extra large camera size (448x320px) - perfect for high-quality captures
        </p>
      </div>
      <Camera 
        size="xl" 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("XL size photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 