"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraMaskCardDemo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Card Mask</h3>
        <p className="text-sm text-muted-foreground">
          Great for ID cards, licenses, and document photography
        </p>
      </div>
      <Camera 
        mask="card" 
        autoStart={false}
        onCapture={(imageData) => {
          console.log("Card mask photo captured:", imageData.slice(0, 50) + "...")
        }}
      />
    </div>
  )
} 