"use client"

import { Camera } from "@/registry/default/ui/camera"

export default function CameraDemo() {
  return (
    <div className="flex justify-center">
      <Camera
        autoStart={false}
        onCapture={(imageData) => {
          console.log("Photo captured:", imageData.slice(0, 50) + "...")
        }}
        onError={(error) => {
          console.error("Camera error:", error)
        }}
        onStart={() => {
          console.log("Camera started")
        }}
      />
    </div>
  )
} 