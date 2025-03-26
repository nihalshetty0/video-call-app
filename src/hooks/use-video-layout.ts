import { useMemo } from "react"
import { TPeerPosition } from "@/types"

import {
  calculatePeerPositions,
  findOptimalLayout,
} from "@/lib/layout-calculator"

export function useVideoLayout(
  width: number,
  height: number,
  participantCount: number
): TPeerPosition[] {
  return useMemo(() => {
    const layout = findOptimalLayout({
      containerWidth: width ?? 0,
      containerHeight: height ?? 0,
      participantCount,
    })

    if (!layout) return []

    return calculatePeerPositions(layout, {
      containerWidth: width ?? 0,
      containerHeight: height ?? 0,
      participantCount,
    })
  }, [width, height, participantCount])
}
