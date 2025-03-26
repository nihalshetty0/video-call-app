import * as React from "react"

type MeasureRef = (node: HTMLElement | null) => void
type Dimensions = {
  width: number | null
  height: number | null
}

export function useMeasure(): [MeasureRef, Dimensions] {
  const [dimensions, setDimensions] = React.useState<Dimensions>({
    width: null,
    height: null,
  })

  const previousObserver = React.useRef<null | ResizeObserver>(null)

  const customRef = React.useCallback((node: HTMLElement | null) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect()
      previousObserver.current = null
    }

    if (node?.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } =
            entry.borderBoxSize[0]

          setDimensions({ width, height })
        }
      })

      observer.observe(node)
      previousObserver.current = observer
    }
  }, [])

  return [customRef, dimensions]
}
