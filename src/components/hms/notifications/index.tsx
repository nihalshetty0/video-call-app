import AutoplayBlockedModal from "./auto-play-blocked-modal"
import ChatNotifications from "./chat-notifications"
import PeerEvents from "./peer-events"
import PermissionError from "./permission-error"
import ReconnectNotifications from "./reconnect-notifications"

const Notifications = () => {
  return (
    <>
      <PermissionError />
      <AutoplayBlockedModal />
      <ReconnectNotifications />
      <PeerEvents />
      <ChatNotifications />
    </>
  )
}

export default Notifications
