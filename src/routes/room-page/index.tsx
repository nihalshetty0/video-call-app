import { ROOM_STATE_TYPE } from "@/constant"
import Preview from "@/views/preview"
import Room from "@/views/room"
import { selectIsConnectedToRoom, useHMSStore } from "@100mslive/react-sdk"

import useSubscribeToHMSEvents from "@/hooks/hms/use-subscribe-to-hms-events"
import Notifications from "@/components/hms/notifications"
import LeftRoomOnNetworkError from "@/components/room-states/left-room-on-network-error"
import UserLeftRoom from "@/components/room-states/user-left-room"

import useRoomPageState from "./room-page-store"

const RoomPage = () => {
  const isConnected = useHMSStore(selectIsConnectedToRoom)

  useSubscribeToHMSEvents()

  const { roomState } = useRoomPageState()

  if (roomState === ROOM_STATE_TYPE.LEFT_ROOM) return <UserLeftRoom />
  if (roomState === ROOM_STATE_TYPE.NETWORK_ERROR)
    return <LeftRoomOnNetworkError />

  return (
    <>
      {!isConnected ? <Preview /> : <Room />}
      <Notifications />
    </>
  )
}

export default RoomPage
