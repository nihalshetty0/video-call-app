import { useEffect, useRef, useState } from "react"

const useConditionalDebounce = <T>(
  value: T,
  delay: number,
  condition: (prev: T | undefined, current: T) => boolean
): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const prevValueRef = useRef<T | undefined>(value) // Initialize with the initial value

  useEffect(() => {
    const shouldDebounce = condition(prevValueRef.current, value)

    if (shouldDebounce) {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    } else {
      setDebouncedValue(value)
    }

    prevValueRef.current = value
  }, [value, delay, condition])

  return debouncedValue
}

export default useConditionalDebounce
