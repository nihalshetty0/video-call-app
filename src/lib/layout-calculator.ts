import { LAYOUT_CONSTANTS } from "@/constant"
import { TLayoutConfig, TLayoutDimensions, TPeerPosition } from "@/types"

const { SPACING, MIN_TILE_WIDTH, MIN_TILE_HEIGHT, ASPECT_RATIO } =
  LAYOUT_CONSTANTS

export function findOptimalLayout(
  dimensions: TLayoutDimensions
): TLayoutConfig | null {
  const { containerWidth, containerHeight, participantCount } = dimensions

  if (participantCount <= 0 || containerWidth <= 0 || containerHeight <= 0) {
    return null
  }

  let bestLayout = null
  let maxArea = 0

  for (
    let rows = 1;
    rows <= Math.ceil(Math.sqrt(participantCount * ASPECT_RATIO));
    rows++
  ) {
    const layout = calculateLayoutForRows(rows, dimensions)
    if (!layout) continue

    const area = layout.tileWidth * layout.tileHeight
    if (area > maxArea) {
      maxArea = area
      bestLayout = layout
    }
  }

  return bestLayout || calculateSingleColumnLayout(dimensions)
}

function calculateLayoutForRows(
  rows: number,
  { containerWidth, containerHeight, participantCount }: TLayoutDimensions
): TLayoutConfig | null {
  const cols = Math.ceil(participantCount / rows)

  const availableWidth = containerWidth - (cols + 1) * SPACING
  const availableHeight = containerHeight - (rows + 1) * SPACING

  if (availableWidth <= 0 || availableHeight <= 0) return null

  let tileWidth = Math.floor(availableWidth / cols)
  let tileHeight = Math.floor(availableHeight / rows)

  if (tileWidth / tileHeight > ASPECT_RATIO) {
    tileWidth = Math.floor(tileHeight * ASPECT_RATIO)
  } else {
    tileHeight = Math.floor(tileWidth / ASPECT_RATIO)
  }

  if (tileWidth < MIN_TILE_WIDTH || tileHeight < MIN_TILE_HEIGHT) {
    return null
  }

  const totalWidth = cols * tileWidth + (cols - 1) * SPACING
  if (totalWidth > containerWidth) return null

  return { rows, cols, tileWidth, tileHeight }
}

function calculateSingleColumnLayout({
  containerWidth,
  containerHeight,
  participantCount,
}: TLayoutDimensions): TLayoutConfig {
  const totalSpacing = (participantCount - 1) * SPACING
  const availableHeight = containerHeight - totalSpacing
  const heightPerTile = Math.floor(availableHeight / participantCount)

  const tileHeight = Math.max(MIN_TILE_HEIGHT, heightPerTile)
  const tileWidth = Math.min(
    containerWidth - 2 * SPACING,
    Math.floor(tileHeight * ASPECT_RATIO)
  )

  const finalTileHeight = Math.floor(tileWidth / ASPECT_RATIO)

  return {
    rows: participantCount,
    cols: 1,
    tileWidth,
    tileHeight: finalTileHeight,
  }
}

export function calculatePeerPositions(
  layout: TLayoutConfig,
  dimensions: TLayoutDimensions
): TPeerPosition[] {
  const { containerWidth, containerHeight, participantCount } = dimensions
  const { rows, cols, tileWidth, tileHeight } = layout

  const totalGridWidth = cols * tileWidth + (cols - 1) * SPACING
  const totalGridHeight = rows * tileHeight + (rows - 1) * SPACING

  const horizontalOffset = Math.floor((containerWidth - totalGridWidth) / 2)
  const verticalOffset = Math.floor((containerHeight - totalGridHeight) / 2)

  return Array.from({ length: participantCount }, (_, i) => {
    const row = Math.floor(i / cols)
    const col = i % cols
    const isLastRow = row === rows - 1
    const tilesInThisRow = isLastRow
      ? participantCount - (rows - 1) * cols
      : cols

    const rowOffset = isLastRow
      ? ((cols - tilesInThisRow) * (tileWidth + SPACING)) / 2
      : 0

    return {
      left: horizontalOffset + rowOffset + col * (tileWidth + SPACING),
      top: verticalOffset + row * (tileHeight + SPACING),
      width: tileWidth,
      height: tileHeight,
    }
  })
}
