import {
  HMSPeer,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  selectVideoTrackByPeerID,
  useHMSStore,
  useVideo,
} from "@100mslive/react-sdk"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import AudioLevelView from "./audio-level-view"

const PeerTile = ({
  peer,
  className,
  style,
}: {
  peer: HMSPeer
  className?: string
  style?: React.CSSProperties
}) => {
  return (
    <div
      className={cn("relative aspect-video rounded", className ?? "")}
      style={style}
    >
      <PeerVideo peer={peer} />
      <PeerInfo peer={peer} />
      <AudioMediaInfo peer={peer} />
    </div>
  )
}

export default PeerTile

export const PeerInfo = ({ peer }: { peer: HMSPeer }) => {
  return (
    <p className="absolute bottom-0 left-0 z-[5] mx-2 my-1.5 max-w-[50%] overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-background px-2 py-0.5 text-xs opacity-90">
      {peer?.isLocal ? "You" : peer?.name}
    </p>
  )
}

const AudioMediaInfo = ({ peer }: { peer: HMSPeer }) => {
  const isPeerAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer?.id))

  return (
    <div className="absolute right-0 top-0 z-30 m-2 flex h-6 w-6 items-center justify-center rounded-full bg-background">
      {isPeerAudioEnabled ? (
        <AudioLevelView peer={peer} />
      ) : (
        <Icon icon="lucide:mic-off" className="h-3.5 w-3.5" />
      )}
    </div>
  )
}

function PeerVideo({ peer }: { peer: HMSPeer }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  })

  const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer?.id))
  const isTrackDegraded = videoTrack?.degraded
  const isPeerVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer?.id))

  return (
    <div className="relative h-full w-full">
      {(!isPeerVideoEnabled || isTrackDegraded) && (
        <NoVideoPlaceHolder peer={peer} />
      )}
      <video
        ref={videoRef}
        className={`absolute aspect-video w-full rounded-md bg-secondary ${
          isPeerVideoEnabled && !isTrackDegraded ? "z-[3]" : "z-[1]"
        }`}
        style={{
          transform: "scaleX(-1)",
          height: `calc(100%)`,
        }}
        autoPlay
        muted
        playsInline
      />
    </div>
  )
}

export const NoVideoPlaceHolder = ({ peer }: { peer: HMSPeer }) => {
  return (
    <div className="absolute z-[2] aspect-video max-h-full w-full rounded-md object-contain">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-accent-foreground text-xl text-accent">
            {peer.name[0] ?? "A"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
