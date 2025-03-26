import { useEffect } from "react"
import {
  HMSNotificationTypes,
  selectLocalPeerID,
  useHMSNotifications,
  useHMSStore,
} from "@100mslive/react-sdk"

import useDrawerMenuStore from "@/views/room/components/drawer-menu/drawer-menu-store"
import { useToast } from "@/components/ui/use-toast"

const ChatNotifications = () => {
  const notification = useHMSNotifications(HMSNotificationTypes.NEW_MESSAGE)
  const localPeerId = useHMSStore(selectLocalPeerID)
  const { toast } = useToast()
  const { incrementUnreadMessages, openDrawerMenuFor } = useDrawerMenuStore()

  useEffect(() => {
    if (notification?.type === HMSNotificationTypes.NEW_MESSAGE) {
      const message = notification.data
      if (message.sender !== localPeerId) {
        if (openDrawerMenuFor !== "chat") {
          toast({
            title: message.senderName,
            description: message.message,
          })
          incrementUnreadMessages()
        }
      }
    }
  }, [notification])

  return null
}

export default ChatNotifications
