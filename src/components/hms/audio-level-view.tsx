import {
  HMSPeer,
  selectIsPeerAudioEnabled,
  selectPeerAudioByID,
  useHMSStore,
} from "@100mslive/react-sdk"

import { cn } from "@/lib/utils"

const AudioLevelView = ({
  peer,
  className,
}: {
  peer: HMSPeer | undefined
  className?: string
}) => {
  const audioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer?.id))
  const audioLevel = useHMSStore(selectPeerAudioByID(peer?.id))

  if (!audioEnabled || !peer) return null

  const middleBarNormalizedHeight = 14 * (audioLevel / 70)

  const middleBarHeight =
    middleBarNormalizedHeight < 4 ? 4 : middleBarNormalizedHeight

  const sideBarNormalizedHeight = 8 * (audioLevel / 70)

  const sideBarHeight =
    sideBarNormalizedHeight < 4 ? 4 : sideBarNormalizedHeight

  return (
    <div
      className={cn(
        "flex aspect-square items-center justify-center gap-0.5 overflow-hidden rounded-full pl-[1px] pt-[1px]",
        className
      )}
    >
      <div className="flex scale-[.8] items-center justify-center gap-[3px]">
        <div
          className="w-[4.2px] rounded-full bg-primary transition-all"
          style={{ height: sideBarHeight }}
        ></div>
        <div
          className="w-[4.2px] rounded-full bg-primary transition-all"
          style={{
            height: middleBarHeight,
          }}
        ></div>
        <div
          className="w-[4.2px] rounded-full bg-primary transition-all"
          style={{ height: sideBarHeight }}
        ></div>
      </div>
    </div>
  )
}

export default AudioLevelView
