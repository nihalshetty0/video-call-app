import { LAYOUT_CONSTANTS } from "@/constant"
import { TPeerPosition } from "@/types"
import { HMSPeer, selectPeers, useHMSStore } from "@100mslive/react-sdk"
import { useDebounce } from "@uidotdev/usehooks"

import { cn } from "@/lib/utils"
import { useMeasure } from "@/hooks/use-measure"
import { usePeerDisplay } from "@/hooks/use-peer-display"
import { useVideoLayout } from "@/hooks/use-video-layout"
import PeerTile from "@/components/hms/peer-tile"

import useDrawerMenuStore from "../drawer-menu/drawer-menu-store"
import { MorePeersButtonTile } from "./components/more-peers-button-tile"

export default function HLSView({ className }: { className?: string }) {
  //
  const [containerRef, { width: containerWidth, height: containerHeight }] =
    useMeasure()

  const { visiblePeers, hiddenPeers, isMobile } = usePeerDisplay(
    containerWidth ?? 0
  )

  const visiblePeerCount = visiblePeers.length

  const debouncedWidth = useDebounce(containerWidth, 200)
  const debouncedHeight = useDebounce(containerHeight, 200)

  const positions = useVideoLayout(
    debouncedWidth ?? 0,
    debouncedHeight ?? 0,
    visiblePeerCount
  )

  const isDrawerMenuOpen = useDrawerMenuStore(
    (state) => state.openDrawerMenuFor
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        "invisible relative my-2 md:mx-2",
        {
          "min-[450px]:visible": isDrawerMenuOpen,
          "min-[100px]:visible": !isDrawerMenuOpen,
        },
        className
      )}
    >
      {visiblePeers.map((peer, index) => (
        <PeerTileWrapper
          key={peer.id}
          peer={peer}
          position={positions[index]}
          index={index}
          hiddenPeers={hiddenPeers}
          isMobile={isMobile}
        />
      ))}
    </div>
  )
}

function PeerTileWrapper({
  peer,
  position,
  index,
  hiddenPeers,
  isMobile,
}: {
  peer: HMSPeer
  position: TPeerPosition
  index: number
  hiddenPeers: HMSPeer[]
  isMobile: boolean
}) {
  const { MAX_MOBILE_PEERS, MAX_DESKTOP_PEERS } = LAYOUT_CONSTANTS

  const peers = useHMSStore(selectPeers)
  const peerCount = peers.length

  // Mobile: Show "more" button on (MAX_MOBILE_PEERS -1)th tile when > MAX_MOBILE_PEERS peers
  const showMorePeersButtonOnMobile =
    isMobile && index === MAX_MOBILE_PEERS - 2 && peerCount > MAX_MOBILE_PEERS

  // Desktop: Show "more" button on (MAX_DESKTOP_PEERS -1)th tile when > MAX_DESKTOP_PEERS peers
  const showMorePeersButtonOnDesktop =
    !isMobile &&
    index === MAX_DESKTOP_PEERS - 2 &&
    peerCount > MAX_DESKTOP_PEERS

  if (showMorePeersButtonOnMobile)
    return <MorePeersButtonTile position={position} hiddenPeers={hiddenPeers} />

  if (showMorePeersButtonOnDesktop)
    return <MorePeersButtonTile position={position} hiddenPeers={hiddenPeers} />

  return (
    <PeerTile
      key={peer.id}
      peer={peer}
      className="absolute max-h-full w-full transition-[top,left,right,bottom,width,height,background] duration-300"
      style={position}
    />
  )
}
