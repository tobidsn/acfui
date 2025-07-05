"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraMirrorTrueDemo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Mirror All</h3>
        <p className="text-sm text-muted-foreground">
          Mirror both preview and captured image - useful for selfies
        </p>
      </div>
      <Camera 
        mirror={true} 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("Mirror all photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 