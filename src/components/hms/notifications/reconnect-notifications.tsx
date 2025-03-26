import { useEffect, useState } from "react"
import { HMSNotificationTypes, useHMSNotifications } from "@100mslive/react-sdk"
import { Icon } from "@iconify/react"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const notificationTypes = [
  HMSNotificationTypes.RECONNECTED,
  HMSNotificationTypes.RECONNECTING,
  HMSNotificationTypes.ERROR,
]

const ReconnectNotifications = () => {
  const notification = useHMSNotifications(notificationTypes)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (
      notification?.type === HMSNotificationTypes.ERROR &&
      notification?.data?.isTerminal
    ) {
      setOpen(false)
    } else if (notification?.type === HMSNotificationTypes.RECONNECTED) {
      setOpen(false)
    } else if (notification?.type === HMSNotificationTypes.RECONNECTING) {
      setOpen(true)
    }
  }, [notification])

  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        style={{
          width: "fit-content",
          maxWidth: "80%",
          padding: "16px 20px",
          position: "relative",
          top: "unset",
          bottom: "58px",
          transform: "translate(-50%, -100%)",
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Icon icon={"line-md:loading-twotone-loop"} />
            Reconnecting
          </AlertDialogTitle>
          <AlertDialogDescription>
            You lost your network connection. Trying to reconnect.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ReconnectNotifications
