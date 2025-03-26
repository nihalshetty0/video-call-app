export interface ErrorWithCode extends Error {
  code?: number
}

export interface TPeerPosition {
  left: number
  top: number
  width: number
  height: number
}

export interface TLayoutConfig {
  rows: number
  cols: number
  tileWidth: number
  tileHeight: number
}

export interface TLayoutDimensions {
  containerWidth: number
  containerHeight: number
  participantCount: number
}
