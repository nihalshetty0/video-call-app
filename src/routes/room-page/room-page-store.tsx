import { ROOM_STATE_TYPE } from "@/constant"
import { create } from "zustand"

interface TRoomPageState {
  roomState: string
  setRoomState: (state: string) => void
}

const useRoomPageState = create<TRoomPageState>((set) => ({
  roomState: ROOM_STATE_TYPE.VALID,
  setRoomState: (state: string) => set({ roomState: state }),
}))

export default useRoomPageState
