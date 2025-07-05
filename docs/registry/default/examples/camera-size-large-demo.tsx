"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraSizeLargeDemo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Large Size</h3>
        <p className="text-sm text-muted-foreground">
          Large camera size (384x288px) - great for detailed photo capture
        </p>
      </div>
      <Camera 
        size="lg" 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("Large size photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 