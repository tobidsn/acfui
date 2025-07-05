"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraMirrorFalseDemo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">No Mirror</h3>
        <p className="text-sm text-muted-foreground">
          Default behavior - no mirroring in preview or capture
        </p>
      </div>
      <Camera 
        mirror={false} 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("No mirror photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 