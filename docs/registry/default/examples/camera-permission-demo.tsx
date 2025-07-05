"use client"

import { useState, useEffect } from "react"
import { Camera } from "@/registry/default/ui/camera"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Shield, Camera as CameraIcon, Lock, Eye, CheckCircle, XCircle } from "lucide-react"

export default function CameraPermissionDemo() {
  const [permissionStatus, setPermissionStatus] = useState<"prompt" | "granted" | "denied" | "checking">("checking")
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [cameraStarted, setCameraStarted] = useState(false)

  // Check existing camera permission on component mount
  useEffect(() => {
    checkCameraPermission()
  }, [])

  const checkCameraPermission = async () => {
    try {
      // Method 1: Try navigator.permissions API (more reliable)
      if ('permissions' in navigator) {
        try {
          const result = await navigator.permissions.query({ name: 'camera' as PermissionName })
          console.log('Camera permission via Permissions API:', result.state)
          setPermissionStatus(result.state as "prompt" | "granted" | "denied")
          return
        } catch (permApiError) {
          console.log('Permissions API failed, trying alternative method')
        }
      }

      // Method 2: Try getUserMedia with very short timeout (Safari/Firefox fallback)
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1, height: 1 }, 
          audio: false 
        })
        
        // If we get here, permission is already granted
        stream.getTracks().forEach(track => track.stop()) // Clean up
        setPermissionStatus("granted")
        console.log('Camera permission: granted (via getUserMedia test)')
      } catch (testError: any) {
        if (testError.name === 'NotAllowedError') {
          setPermissionStatus("denied")
        } else {
          setPermissionStatus("prompt")
        }
        console.log('Camera permission: not granted yet')
      }
    } catch (error) {
      console.log('Permission check failed:', error)
      setPermissionStatus("prompt")
    }
  }

  const handleRequestCameraAccess = () => {
    if (permissionStatus === "granted") {
      // Already have permission, start camera directly
      setCameraStarted(true)
    } else {
      // Show custom modal first
      setShowPermissionModal(true)
    }
  }

  const handlePermissionModalConfirm = () => {
    setShowPermissionModal(false)
    // Now trigger the actual camera start which will show native browser prompt
    setCameraStarted(true)
  }

  const handleCameraStart = () => {
    setPermissionStatus("granted")
    setErrorMessage(null)
    console.log("Camera started successfully")
  }

  const handleCameraError = (error: string) => {
    setCameraStarted(false)
    
    if (error.includes("Permission denied") || error.includes("NotAllowedError")) {
      setPermissionStatus("denied")
      setErrorMessage("Camera access denied. Please enable camera permissions in your browser settings.")
    } else if (error.includes("NotFoundError")) {
      setErrorMessage("No camera found. Please connect a camera device.")
    } else {
      setErrorMessage(error)
    }
  }

  const resetCamera = () => {
    setCameraStarted(false)
    setErrorMessage(null)
    checkCameraPermission()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="min-h-[400px] max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        <div className="space-y-6 p-1">
          {/* Permission Status Header */}
          <div className="flex justify-center">
            <Badge 
              variant={
                permissionStatus === "granted" ? "default" : 
                permissionStatus === "denied" ? "destructive" : 
                permissionStatus === "checking" ? "secondary" : "outline"
              }
              className="gap-2 px-3 py-1"
            >
              {permissionStatus === "granted" && <CheckCircle className="size-4" />}
              {permissionStatus === "denied" && <XCircle className="size-4" />}
              {permissionStatus === "checking" && <Shield className="size-4 animate-pulse" />}
              {permissionStatus === "prompt" && <Shield className="size-4" />}
              
              Camera: {
                permissionStatus === "granted" ? "Access Granted" : 
                permissionStatus === "denied" ? "Access Denied" : 
                permissionStatus === "checking" ? "Checking..." : "Permission Required"
              }
            </Badge>
          </div>

          {/* Privacy Information Card */}
          <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="size-5 text-blue-600" />
                <CardTitle className="text-lg">Privacy & Camera Access</CardTitle>
              </div>
              <CardDescription>
                We respect your privacy. Camera access is used only for photo capture and is not recorded or stored.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Lock className="size-3" />
                  Local Processing
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Eye className="size-3" />
                  No Recording
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Shield className="size-3" />
                  Privacy First
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowPrivacyInfo(!showPrivacyInfo)}
              >
                {showPrivacyInfo ? "Hide" : "Show"} Privacy Details
              </Button>
              {showPrivacyInfo && (
                <div className="text-sm text-muted-foreground space-y-2 mt-3 p-3 bg-background/50 rounded-lg max-h-32 overflow-y-auto">
                  <p><strong>What we access:</strong> Your device camera for live preview and photo capture</p>
                  <p><strong>What we don't do:</strong> Record video, store images on servers, or share data</p>
                  <p><strong>Your control:</strong> You can revoke permissions anytime in browser settings</p>
                  <p><strong>Data handling:</strong> All processing happens locally on your device</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Permission Denied Instructions */}
          {permissionStatus === "denied" && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
              <Shield className="size-4" />
              <AlertDescription className="space-y-2">
                <p><strong>Camera access denied</strong></p>
                <p>To enable camera access, please:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                  <li>Click the camera icon in your browser's address bar</li>
                  <li>Select "Allow" for camera access</li>
                  <li>Click "Try Again" below</li>
                </ol>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetCamera}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Error Messages */}
          {errorMessage && (
            <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
              <CameraIcon className="size-4" />
              <AlertDescription className="break-words">{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Camera Component or Start Button */}
          <div className="flex justify-center">
            {cameraStarted ? (
              <div className="space-y-4 w-full max-w-md mx-auto">
                <div className="overflow-hidden rounded-lg flex justify-center">
                  <Camera
                    onStart={handleCameraStart}
                    onError={handleCameraError}
                    onCapture={(imageData) => {
                      console.log("Photo captured with privacy protection:", imageData.slice(0, 50) + "...")
                    }}
                    autoStart={true}
                  />
                </div>
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetCamera}
                  >
                    Stop Camera
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                onClick={handleRequestCameraAccess}
                className="gap-2"
                disabled={permissionStatus === "checking"}
              >
                <CameraIcon className="size-4" />
                {permissionStatus === "checking" ? "Checking Permissions..." : "Start Camera"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Custom Permission Modal */}
      <Dialog open={showPermissionModal} onOpenChange={setShowPermissionModal}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CameraIcon className="size-5" />
              Camera Permission Required
            </DialogTitle>
            <DialogDescription className="space-y-3">
              <p>
                This application needs access to your camera to capture photos. 
                Your browser will ask for permission in the next step.
              </p>
              <div className="bg-muted p-3 rounded-lg space-y-2 max-h-40 overflow-y-auto">
                <p className="font-medium text-sm">What happens next:</p>
                <ol className="list-decimal list-inside text-sm space-y-1 ml-2">
                  <li>Click "Allow Camera Access" below</li>
                  <li>Your browser will show a permission prompt</li>
                  <li>Click "Allow" in the browser prompt</li>
                  <li>Camera will start automatically</li>
                </ol>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="size-4" />
                <span>Your privacy is protected - no data is stored or shared</span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowPermissionModal(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePermissionModalConfirm}
              className="gap-2"
            >
              <CameraIcon className="size-4" />
              Allow Camera Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 