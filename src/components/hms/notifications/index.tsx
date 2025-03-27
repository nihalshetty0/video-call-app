import { ROOM_STATE_TYPE } from "@/constant"

import useRoomPageState from "@/routes/room-page/room-page-store"

import AutoplayBlockedModal from "./auto-play-blocked-modal"
import ChatNotifications from "./chat-notifications"
import PeerEvents from "./peer-events"
import PermissionError from "./permission-error"
import ReconnectNotifications from "./reconnect-notifications"

const Notifications = () => {
  const { roomState } = useRoomPageState()

  return (
    <>
      <PermissionError />
      <AutoplayBlockedModal />
      {roomState === ROOM_STATE_TYPE.CALL && (
        <>
          <ReconnectNotifications />
          <PeerEvents />
          <ChatNotifications />
        </>
      )}
    </>
  )
}

export default Notifications
