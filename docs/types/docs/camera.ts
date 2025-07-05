import type { CompositionProps, EmptyProps } from "@/types";

export interface CameraProps extends EmptyProps<"div">, CompositionProps {
  /**
   * Callback called when a photo is captured.
   * The imageData parameter contains the captured image as a base64 data URL.
   *
   * ```ts
   * const onCapture = (imageData: string) => {
   *   console.log('Photo captured:', imageData)
   *   // Save image or display it
   * }
   * ```
   */
  onCapture?: (imageData: string) => void;

  /**
   * Callback called when a camera error occurs.
   * This includes permission denied, camera not found, etc.
   *
   * ```ts
   * const onError = (error: string) => {
   *   console.error('Camera error:', error)
   *   // Show user-friendly error message
   * }
   * ```
   */
  onError?: (error: string) => void;

  /**
   * Callback called when the camera starts successfully.
   *
   * ```ts
   * const onStart = () => {
   *   console.log('Camera started')
   *   // Camera is now active
   * }
   * ```
   */
  onStart?: () => void;

  /**
   * Whether to automatically start the camera when the component mounts.
   *
   * ```ts
   * // Auto-start camera
   * <Camera autoStart />
   *
   * // Don't auto-start (manual control)
   * <Camera autoStart={false} />
   * ```
   *
   * @default true
   */
  autoStart?: boolean;

  /**
   * Whether to show the camera controls (capture button, toggle camera, etc.).
   *
   * ```ts
   * // Show controls
   * <Camera showControls />
   *
   * // Hide controls for custom UI
   * <Camera showControls={false} />
   * ```
   *
   * @default true
   */
  showControls?: boolean;

  /**
   * Whether to allow downloading captured photos.
   *
   * ```ts
   * // Allow downloads
   * <Camera allowDownload />
   *
   * // Disable downloads
   * <Camera allowDownload={false} />
   * ```
   *
   * @default true
   */
  allowDownload?: boolean;

  /**
   * Whether to disable the camera shutter sound.
   *
   * ```ts
   * // Silent mode
   * <Camera silent />
   *
   * // With shutter sound
   * <Camera silent={false} />
   * ```
   *
   * @default false
   */
  silent?: boolean;

  /**
   * Mirror mode for the camera preview and/or captured image.
   *
   * - `false`: No mirroring
   * - `true`: Mirror both preview and captured image
   * - `"preview"`: Mirror preview only, captured image remains normal
   *
   * ```ts
   * // No mirroring
   * <Camera mirror={false} />
   *
   * // Mirror everything
   * <Camera mirror={true} />
   *
   * // Mirror preview only
   * <Camera mirror="preview" />
   * ```
   *
   * @default false
   */
  mirror?: boolean | "preview";

  /**
   * Overlay mask for guided photo composition.
   *
   * - `none`: No overlay mask
   * - `square`: Square overlay for profile photos
   * - `round`: Circular overlay for avatars
   * - `card`: Rounded rectangle overlay for ID cards
   *
   * ```ts
   * // No mask
   * <Camera mask="none" />
   *
   * // Square mask for profile photos
   * <Camera mask="square" />
   *
   * // Round mask for avatars
   * <Camera mask="round" />
   *
   * // Card mask for ID documents
   * <Camera mask="card" />
   * ```
   *
   * @default "none"
   */
  mask?: "none" | "square" | "round" | "card";

  /**
   * The format for captured images.
   *
   * ```ts
   * // JPEG format (smaller file size)
   * <Camera captureFormat="image/jpeg" />
   *
   * // PNG format (higher quality)
   * <Camera captureFormat="image/png" />
   *
   * // WebP format (modern browsers)
   * <Camera captureFormat="image/webp" />
   * ```
   *
   * @default "image/jpeg"
   */
  captureFormat?: "image/jpeg" | "image/png" | "image/webp";

  /**
   * The quality of captured images (0-1).
   * Only applies to JPEG and WebP formats.
   *
   * ```ts
   * // High quality
   * <Camera captureQuality={1.0} />
   *
   * // Balanced quality/size
   * <Camera captureQuality={0.9} />
   *
   * // Lower quality for smaller files
   * <Camera captureQuality={0.7} />
   * ```
   *
   * @default 0.9
   */
  captureQuality?: number;

  /**
   * Size variant of the camera component.
   *
   * ```ts
   * // Small camera
   * <Camera size="sm" />
   *
   * // Medium camera (default)
   * <Camera size="md" />
   *
   * // Large camera
   * <Camera size="lg" />
   *
   * // Extra large camera
   * <Camera size="xl" />
   *
   * // Full size (fills container)
   * <Camera size="full" />
   * ```
   *
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl" | "full";

  /**
   * Aspect ratio of the camera component.
   *
   * ```ts
   * // 4:3 aspect ratio (traditional)
   * <Camera aspect="4:3" />
   *
   * // 16:9 aspect ratio (widescreen)
   * <Camera aspect="16:9" />
   *
   * // 1:1 aspect ratio (square)
   * <Camera aspect="1:1" />
   * ```
   *
   * @default "4:3"
   */
  aspect?: "4:3" | "16:9" | "1:1";
}

export interface CameraRef {
  /**
   * Start the camera.
   * Returns a promise that resolves when the camera is started.
   */
  startCamera: () => Promise<void>;

  /**
   * Stop the camera and release resources.
   */
  stopCamera: () => void;

  /**
   * Toggle between front and back camera.
   * Returns a promise that resolves when the camera is switched.
   */
  toggleCamera: () => Promise<void>;

  /**
   * Capture a photo and return the image data.
   * Returns null if the camera is not active.
   */
  capturePhoto: () => string | null;

  /**
   * Whether the camera is currently active.
   */
  isActive: boolean;

  /**
   * The current camera facing mode.
   */
  currentFacingMode: "user" | "environment";

  /**
   * Whether silent mode is enabled.
   */
  isSilent: boolean;
} 