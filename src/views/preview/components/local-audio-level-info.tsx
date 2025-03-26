import {
  selectIsLocalAudioEnabled,
  selectLocalPeer,
  useHMSStore,
} from "@100mslive/react-sdk"

import AudioLevelView from "@/components/hms/audio-level-view"

const LocalAudioLevelInfo = () => {
  const localPeer = useHMSStore(selectLocalPeer)
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled)

  if (!isLocalAudioEnabled || !localPeer) return null

  return (
    <div className="absolute bottom-0 left-0 z-30 m-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
      <AudioLevelView peer={localPeer} />
    </div>
  )
}

export default LocalAudioLevelInfo
