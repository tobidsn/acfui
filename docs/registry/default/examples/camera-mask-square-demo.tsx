"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraMaskSquareDemo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Square Mask</h3>
        <p className="text-sm text-muted-foreground">
          Perfect for profile photos and square avatars
        </p>
      </div>
      <Camera 
        mask="square" 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("Square mask photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 