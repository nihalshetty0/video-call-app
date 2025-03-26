import { useEffect } from "react"
import { ROOM_STATE_TYPE } from "@/constant"
import useRoomPageState from "@/routes/room-page/room-page-store"
import { HMSNotificationTypes, useHMSNotifications } from "@100mslive/react-sdk"

const useSubscribeToHMSEvents = () => {
  const errorNotification = useHMSNotifications(HMSNotificationTypes.ERROR)

  const { setRoomState } = useRoomPageState()

  useEffect(() => {
    if (
      errorNotification &&
      errorNotification.type === HMSNotificationTypes.ERROR
    ) {
      //
      if (errorNotification.data.isTerminal) {
        setRoomState(ROOM_STATE_TYPE.NETWORK_ERROR)
      }
    }
  }, [errorNotification])

  return null
}

export default useSubscribeToHMSEvents
