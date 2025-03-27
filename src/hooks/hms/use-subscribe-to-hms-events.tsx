import { useEffect } from "react"
import { ROOM_STATE_TYPE } from "@/constant"
import {
  HMSNotificationTypes,
  selectIsConnectedToRoom,
  useHMSNotifications,
  useHMSStore,
} from "@100mslive/react-sdk"

import useRoomPageState from "@/routes/room-page/room-page-store"

const useSubscribeToHMSEvents = () => {
  const errorNotification = useHMSNotifications(HMSNotificationTypes.ERROR)

  const isConnectedToRoom = useHMSStore(selectIsConnectedToRoom)

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

  useEffect(() => {
    if (isConnectedToRoom) {
      setRoomState(ROOM_STATE_TYPE.CALL)
    }
  }, [isConnectedToRoom])

  return null
}

export default useSubscribeToHMSEvents
