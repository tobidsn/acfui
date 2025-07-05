"use client"

import React, { useState } from "react"
import { Camera } from "@/registry/default/ui/camera"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CameraExample() {
  const [capturedData, setCapturedData] = useState<{
    type: "base64" | "file"
    data: string | File
    preview?: string
  } | null>(null)

  const onCaptureBase64 = (imageData: string | File) => {
    if (typeof imageData === "string") {
      setCapturedData({
        type: "base64",
        data: imageData,
        preview: imageData
      })
    }
  }

  const onCaptureFile = (imageData: string | File) => {
    if (imageData instanceof File) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedData({
          type: "file",
          data: imageData,
          preview: e.target?.result as string
        })
      }
      reader.readAsDataURL(imageData)
    }
  }

  const clearCapture = () => {
    setCapturedData(null)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Base64 Example */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Base64 Output
              <Badge variant="secondary">String</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Camera
              size="sm"
              aspect="4:3"
              outputFormat="base64"
              onCapture={onCaptureBase64}
              captureFormat="image/jpeg"
              captureQuality={0.8}
            />
          </CardContent>
        </Card>

        {/* File Example */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              File Output
              <Badge variant="secondary">File Object</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Camera
              size="sm"
              aspect="4:3"
              outputFormat="file"
              onCapture={onCaptureFile}
              captureFormat="image/png"
              captureQuality={0.9}
            />
          </CardContent>
        </Card>
      </div>

      {/* Captured Data Display */}
      {capturedData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Captured Data</span>
              <Button variant="outline" size="sm" onClick={clearCapture}>
                Clear
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={capturedData.type === "base64" ? "default" : "secondary"}>
                {capturedData.type.toUpperCase()}
              </Badge>
              {capturedData.type === "file" && capturedData.data instanceof File && (
                <div className="text-sm text-muted-foreground">
                  {capturedData.data.name} • {Math.round(capturedData.data.size / 1024)}KB
                </div>
              )}
            </div>
            
            {capturedData.preview && (
              <div className="space-y-2">
                <img
                  src={capturedData.preview}
                  alt="Captured"
                  className="max-w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}

            {/* Example Values */}
            <div className="space-y-2">
              <h4 className="font-semibold">Example Values:</h4>
              <div className="bg-muted p-4 rounded-lg text-sm font-mono">
                {capturedData.type === "base64" ? (
                  <div>
                    <div className="text-muted-foreground">Base64 String:</div>
                    <div className="break-all">
                      {typeof capturedData.data === "string" 
                        ? `${capturedData.data.substring(0, 50)}...` 
                        : ""}
                    </div>
                    <div className="text-muted-foreground mt-2">Length:</div>
                    <div>
                      {typeof capturedData.data === "string" 
                        ? capturedData.data.length.toLocaleString() 
                        : 0} characters
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-muted-foreground">File Object:</div>
                    <div>Name: {capturedData.data instanceof File ? capturedData.data.name : ""}</div>
                    <div>Size: {capturedData.data instanceof File ? capturedData.data.size : 0} bytes</div>
                    <div>Type: {capturedData.data instanceof File ? capturedData.data.type : ""}</div>
                    <div>Last Modified: {capturedData.data instanceof File ? new Date(capturedData.data.lastModified).toISOString() : ""}</div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Usage Examples:

// Example 1: Base64 String Output
/*
const CameraBase64Example = () => {
  const onCapture = (imageData: string | File) => {
    console.log("Base64 data:", imageData)
    // Example value: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD..."
  }

  return (
    <Camera
      outputFormat="base64"
      captureFormat="image/jpeg"
      captureQuality={0.8}
      onCapture={onCapture}
    />
  )
}
*/

// Example 2: File Object Output
/*
const CameraFileExample = () => {
  const onCapture = (imageData: string | File) => {
    if (imageData instanceof File) {
      console.log("File object:", imageData)
      // Example values:
      // imageData.name: "photo-1703847234567.png"
      // imageData.size: 245760 (bytes)
      // imageData.type: "image/png"
      // imageData.lastModified: 1703847234567

      // Convert to base64 if needed
      const reader = new FileReader()
      reader.onload = (e) => {
        console.log("File as base64:", e.target?.result)
      }
      reader.readAsDataURL(imageData)
    }
  }

  return (
    <Camera
      outputFormat="file"
      captureFormat="image/png"
      captureQuality={0.9}
      onCapture={onCapture}
    />
  )
}
*/

// Example 3: Upload File to Server
/*
const CameraUploadExample = () => {
  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        console.log('File uploaded successfully')
      }
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  const onCapture = (imageData: string | File) => {
    if (imageData instanceof File) {
      uploadFile(imageData)
    }
  }

  return (
    <Camera
      outputFormat="file"
      onCapture={onCapture}
    />
  )
}
*/ 