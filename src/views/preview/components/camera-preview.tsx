import {
  selectIsLocalVideoEnabled,
  selectLocalPeer,
  useHMSStore,
  useVideo,
} from "@100mslive/react-sdk"

import LocalAudioLevelInfo from "./local-audio-level-info"
import MoreOptionsMenu from "./more-options-menu"

const CameraPreview = () => {
  const localPeer = useHMSStore(selectLocalPeer)

  const { videoRef } = useVideo({
    trackId: localPeer?.videoTrack,
  })

  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled)

  return (
    <div className="relative aspect-video w-full rounded">
      <video
        className="absolute aspect-video h-full w-full max-w-full rounded-md bg-secondary"
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ transform: "scaleX(-1)" }}
      />
      {localPeer && !isLocalVideoEnabled && (
        <div className="absolute z-[2] flex h-full w-full items-center justify-center">
          <p className="text-base">Camera is off</p>
        </div>
      )}
      <LocalAudioLevelInfo />
      <MoreOptionsMenu isLocalVideoEnabled={isLocalVideoEnabled} />
    </div>
  )
}

export default CameraPreview
