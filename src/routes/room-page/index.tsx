import { ISSUE_URL, ROOM_STATE_TYPE } from "@/constant"

import useSubscribeToHMSEvents from "@/hooks/hms/use-subscribe-to-hms-events"

import { Button } from "@/components/ui/button"

import LeftRoomOnNetworkError from "@/components/room-states/left-room-on-network-error"
import UserLeftRoom from "@/components/room-states/user-left-room"

import Preview from "@/views/preview"
import Room from "@/views/room"

import useRoomPageState from "./room-page-store"

const RoomPage = () => {
  useSubscribeToHMSEvents()

  const { roomState } = useRoomPageState()

  if (roomState === ROOM_STATE_TYPE.PREVIEW) return <Preview />
  else if (roomState === ROOM_STATE_TYPE.CALL) return <Room />
  else if (roomState === ROOM_STATE_TYPE.LEFT_ROOM) return <UserLeftRoom />
  else if (roomState === ROOM_STATE_TYPE.NETWORK_ERROR)
    return <LeftRoomOnNetworkError />
  else return <FallbackErrorState />
}

export default RoomPage

//
const FallbackErrorState = () => (
  <div className="flex h-screen flex-col items-center justify-center">
    <h1 className="mb-3 text-4xl font-bold">Oops! Something went wrong</h1>
    {ISSUE_URL && (
      <>
        <p className="mb-6 text-sm text-gray-500">
          This should not have happened. Please create an issue on GitHub.
        </p>
        <Button onClick={() => window.open(ISSUE_URL, "_blank")}>
          Create an Issue
        </Button>
      </>
    )}
  </div>
)
