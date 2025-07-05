"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraMaskRoundDemo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Round Mask</h3>
        <p className="text-sm text-muted-foreground">
          Ideal for circular profile pictures and user avatars
        </p>
      </div>
      <Camera 
        mask="round" 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("Round mask photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 