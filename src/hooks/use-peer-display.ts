import { useMemo } from "react"
import { LAYOUT_CONSTANTS } from "@/constant"
import {
  selectLocalPeer,
  selectRemotePeers,
  useHMSStore,
} from "@100mslive/react-sdk"

const { MOBILE_BREAKPOINT, MAX_MOBILE_PEERS, MAX_DESKTOP_PEERS } =
  LAYOUT_CONSTANTS

export function usePeerDisplay(containerWidth: number) {
  const localPeer = useHMSStore(selectLocalPeer)
  const remotePeers = useHMSStore(selectRemotePeers)

  const isMobile = containerWidth ? containerWidth < MOBILE_BREAKPOINT : false

  const { hiddenPeers, visiblePeers } = useMemo(() => {
    if (isMobile) {
      return {
        visiblePeers: localPeer
          ? remotePeers.slice(0, MAX_MOBILE_PEERS - 1).concat(localPeer)
          : remotePeers.slice(0, MAX_MOBILE_PEERS - 1),
        hiddenPeers: remotePeers.slice(MAX_MOBILE_PEERS - 2),
      }
    }
    return {
      visiblePeers: localPeer
        ? remotePeers.slice(0, MAX_DESKTOP_PEERS - 1).concat(localPeer)
        : remotePeers.slice(0, MAX_DESKTOP_PEERS - 1),
      hiddenPeers: remotePeers.slice(MAX_DESKTOP_PEERS - 2),
    }
  }, [remotePeers, localPeer, isMobile])

  return {
    visiblePeers,
    hiddenPeers,
    isMobile,
  }
}
