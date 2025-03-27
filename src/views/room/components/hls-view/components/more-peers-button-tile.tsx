import { TPeerPosition } from "@/types"
import { HMSPeer } from "@100mslive/react-sdk"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import useDrawerMenuStore from "@/views/room/components/drawer-menu/drawer-menu-store"

export function MorePeersButtonTile({
  position,
  hiddenPeers,
}: {
  position: TPeerPosition
  hiddenPeers: HMSPeer[]
}) {
  const remainingCount = hiddenPeers.length
  const [firstPeer, secondPeer] = hiddenPeers

  const openParticipantsMenu = useDrawerMenuStore(
    (state) => state.openParticipantsMenu
  )

  return (
    <div
      className="absolute cursor-pointer"
      style={position}
      onClick={openParticipantsMenu}
    >
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-md bg-[#444]">
        <div className="flex -space-x-2">
          <Avatar className={"h-12 w-12"}>
            <AvatarFallback className={"text-xl"}>
              {firstPeer?.name?.[0] ?? "A"}
            </AvatarFallback>
          </Avatar>
          <Avatar className={"h-12 w-12"}>
            <AvatarFallback className={"text-xl"}>
              {secondPeer?.name?.[0] ?? "A"}
            </AvatarFallback>
          </Avatar>
        </div>
        <span className="mt-2 text-sm text-white">{remainingCount} others</span>
      </div>
    </div>
  )
}
