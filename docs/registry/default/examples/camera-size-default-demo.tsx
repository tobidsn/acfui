"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraSizeDefaultDemo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Default Size</h3>
        <p className="text-sm text-muted-foreground">
          Standard camera size (320x240px) - perfect for most use cases
        </p>
      </div>
      <Camera 
        size="md" 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("Default size photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 