import { create } from "zustand"

interface TDrawerMenuState {
  openDrawerMenuFor: null | string
  unreadMessages: number
  toggleChatMenu: () => void
  toggleParticipantsMenu: () => void
  closeDrawerMenu: () => void
  openParticipantsMenu: () => void
  incrementUnreadMessages: () => void
  resetUnreadMessages: () => void
}

const useDrawerMenuStore = create<TDrawerMenuState>((set) => ({
  openDrawerMenuFor: null,
  unreadMessages: 0,
  toggleChatMenu: () =>
    set((state) =>
      state.openDrawerMenuFor !== "chat"
        ? { openDrawerMenuFor: "chat", unreadMessages: 0 }
        : { openDrawerMenuFor: null }
    ),
  toggleParticipantsMenu: () =>
    set((state) =>
      state.openDrawerMenuFor !== "participants"
        ? { openDrawerMenuFor: "participants" }
        : { openDrawerMenuFor: null }
    ),
  openParticipantsMenu: () => set({ openDrawerMenuFor: "participants" }),
  closeDrawerMenu: () => set({ openDrawerMenuFor: null }),
  incrementUnreadMessages: () =>
    set((state) => ({ unreadMessages: state.unreadMessages + 1 })),
  resetUnreadMessages: () => set({ unreadMessages: 0 }),
}))

export default useDrawerMenuStore
