"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraAspect43Demo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">4:3 Aspect Ratio</h3>
        <p className="text-sm text-muted-foreground">
          Traditional camera aspect ratio - ideal for standard photography
        </p>
      </div>
      <Camera 
        aspect="4:3" 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("4:3 aspect photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 