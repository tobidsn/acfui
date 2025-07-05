"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraAspect169Demo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">16:9 Aspect Ratio</h3>
        <p className="text-sm text-muted-foreground">
          Widescreen format - perfect for cinematic and landscape shots
        </p>
      </div>
      <Camera 
        aspect="16:9" 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("16:9 aspect photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 