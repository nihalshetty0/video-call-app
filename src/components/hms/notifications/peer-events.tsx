import { useEffect } from "react"
import {
  HMSNotificationTypes,
  selectIsConnectedToRoom,
  useHMSNotifications,
  useHMSStore,
} from "@100mslive/react-sdk"

import { playRemotePeerJoinTune } from "@/lib/tunes"

const PeerEvents = () => {
  // Create audio element for the join sound
  // Listen for peer updates
  const notification = useHMSNotifications()

  const isLocalPeerJoined = useHMSStore(selectIsConnectedToRoom)

  useEffect(() => {
    if (
      isLocalPeerJoined &&
      notification?.type === HMSNotificationTypes.PEER_JOINED
    ) {
      // Play sound when a new peer joins
      playRemotePeerJoinTune()
    }
  }, [notification, isLocalPeerJoined])

  return null // This component doesn't render anything
}

export default PeerEvents
