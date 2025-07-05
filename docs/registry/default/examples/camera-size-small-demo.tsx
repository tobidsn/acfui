"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraSizeSmallDemo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Small Size</h3>
        <p className="text-sm text-muted-foreground">
          Compact camera size (256x192px) - ideal for thumbnails and tight spaces
        </p>
      </div>
      <Camera 
        size="sm" 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("Small size photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 