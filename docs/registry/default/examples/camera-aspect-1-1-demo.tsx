"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraAspect11Demo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">1:1 Aspect Ratio</h3>
        <p className="text-sm text-muted-foreground">
          Square format - ideal for profile photos and social media
        </p>
      </div>
      <Camera 
        aspect="1:1" 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("1:1 aspect photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 