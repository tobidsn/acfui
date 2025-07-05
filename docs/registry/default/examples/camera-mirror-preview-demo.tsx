"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraMirrorPreviewDemo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Mirror Preview Only</h3>
        <p className="text-sm text-muted-foreground">
          Mirror preview but capture normal image - best user experience
        </p>
      </div>
      <Camera 
        mirror="preview" 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("Mirror preview photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 