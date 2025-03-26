import { useEffect, useState } from "react"
import { HMSNotificationTypes, useHMSNotifications } from "@100mslive/react-sdk"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const AV_ERROR_CODES = [3000, 3001, 3002, 3003, 3004, 3005, 3009, 3010, 3011]

const PermissionError = () => {
  const notification = useHMSNotifications(HMSNotificationTypes.ERROR)
  const [deviceType, setDeviceType] = useState("")
  const [isSystemError, setIsSystemError] = useState(false)
  const [isDeviceInUseErrorByOtherApp, setIsDeviceInUseErrorByOtherApp] =
    useState(false)
  const [isCaptureDeviceNotAvailable, setIsCaptureDeviceNotAvailable] =
    useState(false)

  useEffect(() => {
    if (!notification || !AV_ERROR_CODES.includes(notification.data.code)) {
      return
    }

    const errorMessage = notification.data?.message
    const hasAudio = errorMessage.includes("audio")
    const hasVideo = errorMessage.includes("video")
    const hasScreen = errorMessage.includes("screen")

    if (hasAudio && hasVideo) {
      setDeviceType("Camera and Microphone")
    } else if (hasAudio) {
      setDeviceType("Microphone")
    } else if (hasVideo) {
      setDeviceType("Camera")
    } else if (hasScreen) {
      setDeviceType("Screen")
      return
    }

    setIsSystemError(notification.data.code === 3011)
    setIsDeviceInUseErrorByOtherApp(notification.data.code === 3003)
    setIsCaptureDeviceNotAvailable(notification.data.code === 3002)
  }, [notification])

  if (!deviceType) return null

  return (
    <Dialog
      open
      onOpenChange={(value) => {
        if (!value) {
          setDeviceType("")
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isCaptureDeviceNotAvailable
              ? `${deviceType} Not Found`
              : isSystemError
                ? `${deviceType} Permission Required`
                : isDeviceInUseErrorByOtherApp
                  ? `${deviceType} In Use`
                  : `${deviceType} Access Blocked`}
          </DialogTitle>
          <DialogDescription>
            {isCaptureDeviceNotAvailable
              ? `Please check if the ${deviceType} is properly connected to your device and refresh the page.`
              : isSystemError
                ? `Enable permissions for ${deviceType} from system settings`
                : isDeviceInUseErrorByOtherApp
                  ? `Please close the other apps that might be using ${deviceType} and refresh the page.`
                  : `Click on padlock icon to allow access in your browser's address bar.`}
          </DialogDescription>
        </DialogHeader>
        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}

export default PermissionError
