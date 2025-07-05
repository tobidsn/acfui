"use client"

import { useState } from "react"
import { Camera } from "@/registry/default/ui/camera"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function CameraCustomCaptureDemo() {
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([])

  const onCapture = (imageData: string) => {
    setCapturedPhotos(prev => [...prev, imageData])
  }

  const removePhoto = (index: number) => {
    setCapturedPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const clearAll = () => {
    setCapturedPhotos([])
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        <div className="space-y-6 p-1">
          <div className="flex justify-center">
            <Camera
              onCapture={onCapture}
              onError={(error) => {
                console.error("Camera error:", error)
              }}
              mask="square"
              captureQuality={0.8}
            />
          </div>
          
          {capturedPhotos.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Captured Photos ({capturedPhotos.length})
                </h3>
                <Button onClick={clearAll} variant="outline" size="sm">
                  Clear All
                </Button>
              </div>
              
              <div className="max-h-80 overflow-y-auto rounded-lg border bg-muted/20 p-3">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {capturedPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Captured photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        onClick={() => removePhoto(index)}
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 