"use client"

import { useRef } from "react"
import { Camera, type CameraRef } from "@/registry/default/ui/camera"
import { Button } from "@/components/ui/button"

export default function CameraManualControlDemo() {
  const cameraRef = useRef<CameraRef>(null)

  const startCamera = () => {
    cameraRef.current?.startCamera()
  }

  const stopCamera = () => {
    cameraRef.current?.stopCamera()
  }

  const toggleCamera = () => {
    cameraRef.current?.toggleCamera()
  }

  const capturePhoto = () => {
    const imageData = cameraRef.current?.capturePhoto()
    if (imageData) {
      console.log("Photo captured manually:", imageData.slice(0, 50) + "...")
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="space-y-4">
        <div className="flex justify-center">
          <Camera
            ref={cameraRef}
            autoStart={false}
            showControls={false}
            onCapture={(imageData) => {
              console.log("Photo captured:", imageData.slice(0, 50) + "...")
            }}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={startCamera} variant="outline" size="sm">
            Start Camera
          </Button>
          <Button onClick={stopCamera} variant="outline" size="sm">
            Stop Camera
          </Button>
          <Button onClick={toggleCamera} variant="outline" size="sm">
            Toggle Camera
          </Button>
          <Button onClick={capturePhoto} size="sm">
            Capture Photo
          </Button>
        </div>
      </div>
    </div>
  )
} 