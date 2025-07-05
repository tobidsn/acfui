"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Camera as CameraIcon,
  CameraOff,
  Download,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const cameraVariants = cva("relative overflow-hidden bg-black rounded-lg", {
  variants: {
    size: {
      sm: "w-64 h-48",
      md: "w-80 h-60",
      lg: "w-96 h-72",
      xl: "w-[28rem] h-80",
      full: "w-full h-full",
    },
    aspect: {
      "4:3": "aspect-[4/3]",
      "16:9": "aspect-video",
      "1:1": "aspect-square",
    },
  },
  defaultVariants: {
    size: "md",
    aspect: "4:3",
  },
})

const maskVariants = cva("absolute inset-0 pointer-events-none z-10", {
  variants: {
    mask: {
      none: "",
      square:
        "bg-gradient-to-r from-black/60 via-transparent to-black/60 before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/60 before:via-transparent before:to-black/60 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-48 after:h-48 after:border-2 after:border-white/80 after:border-dashed after:rounded-lg",
      round:
        "bg-gradient-to-r from-black/60 via-transparent to-black/60 before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/60 before:via-transparent before:to-black/60 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-48 after:h-48 after:border-2 after:border-white/80 after:border-dashed after:rounded-full",
      card: "bg-gradient-to-r from-black/60 via-transparent to-black/60 before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/60 before:via-transparent before:to-black/60 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-56 after:h-36 after:border-2 after:border-white/80 after:border-dashed after:rounded-2xl",
    },
  },
  defaultVariants: {
    mask: "none",
  },
})

export interface CameraProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onError">,
    VariantProps<typeof cameraVariants> {
  // Core callbacks
  onCapture?: (imageData: string | File) => void
  onError?: (error: string) => void
  onStart?: () => void

  // Behavior props
  autoStart?: boolean
  showControls?: boolean
  allowDownload?: boolean
  silent?: boolean

  // Visual props
  mirror?: boolean | "preview"
  mask?: "none" | "square" | "round" | "card"

  // Technical props
  captureFormat?: "image/jpeg" | "image/png" | "image/webp"
  captureQuality?: number
  outputFormat?: "base64" | "file"
}

export interface CameraRef {
  startCamera: () => Promise<void>
  stopCamera: () => void
  toggleCamera: () => Promise<void>
  capturePhoto: () => string | File | null
  isActive: boolean
  currentFacingMode: "user" | "environment"
  isSilent: boolean
}

const Camera = React.forwardRef<CameraRef, CameraProps>(
  (
    {
      className,
      size,
      aspect,
      onCapture,
      onError,
      onStart,
      autoStart = true,
      showControls = true,
      allowDownload = true,
      silent = false,
      mirror = false,
      mask = "none",
      captureFormat = "image/jpeg",
      captureQuality = 0.9,
      outputFormat = "base64",
      ...props
    },
    ref
  ) => {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const streamRef = React.useRef<MediaStream | null>(null)

    const [isActive, setIsActive] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [facingMode, setFacingMode] = React.useState<"user" | "environment">(
      "environment"
    )
    const [capturedImage, setCapturedImage] = React.useState<string | null>(
      null
    )
    const [permissionState, setPermissionState] = React.useState<
      "granted" | "denied" | "prompt"
    >("prompt")
    const [isSilent, setIsSilent] = React.useState(silent)

    const startCamera = React.useCallback(async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Stop existing stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
        }

        const constraints: MediaStreamConstraints = {
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        streamRef.current = stream

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          
          // Properly handle the play() Promise to avoid interruption errors
          try {
            const playPromise = videoRef.current.play()
            if (playPromise !== undefined) {
              await playPromise
            }
          } catch (playError) {
            console.warn("Video play was interrupted:", playError)
            // Don't throw here as the stream is still valid
          }
        }

        setIsActive(true)
        setPermissionState("granted")
        onStart?.()
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to access camera"
        setError(errorMessage)
        setPermissionState("denied")
        onError?.(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }, [facingMode, onError, onStart])

    const stopCamera = React.useCallback(() => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
      
      // Also pause the video element to prevent play() interruption
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.srcObject = null
      }
      
      setIsActive(false)
    }, [])

    const toggleCamera = React.useCallback(async () => {
      const newFacingMode = facingMode === "user" ? "environment" : "user"
      setFacingMode(newFacingMode)

      if (isActive) {
        // Properly stop current camera before starting new one
        stopCamera()
        // Small delay to ensure cleanup is complete
        await new Promise(resolve => setTimeout(resolve, 100))
        await startCamera()
      }
    }, [facingMode, isActive, startCamera, stopCamera])

    const playShutterSound = React.useCallback(() => {
      if (!isSilent) {
        // Create a simple click sound
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = 800
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1
        )

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      }
    }, [isSilent])

    const capturePhoto = React.useCallback(() => {
      if (!videoRef.current || !canvasRef.current || !isActive) {
        return null
      }

      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context) return null

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Handle mirroring
      const shouldMirror =
        mirror === true || (mirror === "preview" && facingMode === "user")
      if (shouldMirror && mirror !== "preview") {
        context.scale(-1, 1)
        context.drawImage(video, -canvas.width, 0)
        context.scale(-1, 1)
      } else {
        context.drawImage(video, 0, 0)
      }

      // Play shutter sound
      playShutterSound()

      let result: string | File

      if (outputFormat === "file") {
        // Convert canvas to blob and create File object
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `photo-${Date.now()}.${captureFormat.split("/")[1]}`, {
              type: captureFormat,
            })
            setCapturedImage(URL.createObjectURL(blob))
            onCapture?.(file)
          }
        }, captureFormat, captureQuality)
        return null // File creation is async
      } else {
        // Return base64 string
        const imageData = canvas.toDataURL(captureFormat, captureQuality)
        result = imageData
        setCapturedImage(imageData)
        onCapture?.(result)
        return result
      }
    }, [
      isActive,
      onCapture,
      captureFormat,
      captureQuality,
      mirror,
      facingMode,
      playShutterSound,
      outputFormat,
    ])

    const downloadImage = React.useCallback(() => {
      if (!capturedImage) return

      const link = document.createElement("a")
      link.download = `photo-${Date.now()}.${captureFormat.split("/")[1]}`
      link.href = capturedImage
      link.click()
    }, [capturedImage, captureFormat])

    const clearCapturedImage = React.useCallback(() => {
      setCapturedImage(null)
    }, [])

    const toggleSilent = React.useCallback(() => {
      setIsSilent((prev) => !prev)
    }, [])

    // Auto-start camera on mount
    React.useEffect(() => {
      if (autoStart) {
        startCamera()
      }

      return () => {
        // Ensure proper cleanup to prevent play() interruption errors
        if (videoRef.current) {
          videoRef.current.pause()
          videoRef.current.srcObject = null
        }
        stopCamera()
      }
    }, [autoStart, startCamera, stopCamera])

    // Expose methods via ref
    React.useImperativeHandle(
      ref,
      () => ({
        startCamera,
        stopCamera,
        toggleCamera,
        capturePhoto,
        isActive,
        currentFacingMode: facingMode,
        isSilent,
      }),
      [
        startCamera,
        stopCamera,
        toggleCamera,
        capturePhoto,
        isActive,
        facingMode,
        isSilent,
      ]
    )

    const getVideoStyle = () => {
      const shouldMirror =
        mirror === true || (mirror === "preview" && facingMode === "user")
      return {
        transform: shouldMirror ? "scaleX(-1)" : "none",
      }
    }

    const renderContent = () => {
      if (capturedImage) {
        return (
          <div className="relative h-full w-full">
            <img
              src={capturedImage}
              alt="Captured"
              className="h-full w-full object-cover"
            />
            {showControls && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-2">
                {allowDownload && (
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={downloadImage}
                    className="bg-black/80 text-white hover:bg-black/90"
                  >
                    <Download className="size-4" />
                  </Button>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={clearCapturedImage}
                  className="bg-black/80 text-white hover:bg-black/90"
                >
                  <X className="size-4" />
                </Button>
              </div>
            )}
          </div>
        )
      }

      if (error) {
        return (
          <div className="bg-muted text-muted-foreground flex h-full flex-col items-center justify-center">
            <CameraOff className="mb-4 size-12" />
            <p className="px-4 text-center text-sm">{error}</p>
            {permissionState === "denied" && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={startCamera}
              >
                Try Again
              </Button>
            )}
          </div>
        )
      }

      if (isLoading) {
        return (
          <div className="bg-muted flex h-full items-center justify-center">
            <div className="flex flex-col items-center">
              <CameraIcon className="text-muted-foreground mb-2 size-12 animate-pulse" />
              <p className="text-muted-foreground text-sm">
                Starting camera...
              </p>
            </div>
          </div>
        )
      }

      if (!isActive) {
        return (
          <div className="bg-muted text-muted-foreground flex h-full flex-col items-center justify-center">
            <CameraIcon className="mb-4 size-12" />
            <p className="mb-4 text-sm">Camera not active</p>
            <Button onClick={startCamera} size="sm">
              Start Camera
            </Button>
          </div>
        )
      }

      return null
    }

    return (
      <div
        className={cn(cameraVariants({ size, aspect, className }))}
        {...props}
      >
        <video
          ref={videoRef}
          className={cn(
            "h-full w-full object-cover",
            (!isActive || error || capturedImage) && "hidden"
          )}
          style={getVideoStyle()}
          muted
          playsInline
        />

        <canvas ref={canvasRef} className="hidden" />

        {/* Mask overlay */}
        {mask !== "none" && isActive && !error && !capturedImage && (
          <div className={maskVariants({ mask })} />
        )}

        {renderContent()}

        {showControls && isActive && !error && !capturedImage && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
            <Button
              size="icon"
              variant="default"
              onClick={capturePhoto}
              className="size-12 bg-white text-black hover:bg-white/90"
              title="Capture Photo"
            >
              <CameraIcon className="size-6" />
            </Button>
          </div>
        )}

        {showControls && isActive && !error && !capturedImage && (
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={toggleCamera}
              className="bg-black/80 text-white hover:bg-black/90"
              title="Toggle Camera"
            >
              <RotateCcw className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={toggleSilent}
              className="bg-black/80 text-white hover:bg-black/90"
              title={isSilent ? "Enable Sound" : "Disable Sound"}
            >
              {isSilent ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={stopCamera}
              className="bg-black/80 text-white hover:bg-black/90"
              title="Stop Camera"
            >
              <CameraOff className="size-4" />
            </Button>
          </div>
        )}
      </div>
    )
  }
)
Camera.displayName = "Camera"

export {
  Camera,
  cameraVariants,
} 