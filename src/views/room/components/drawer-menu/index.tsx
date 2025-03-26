import React, { useCallback } from "react"
import { Cross2Icon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import useConditionalDebounce from "@/hooks/use-conditional-debounce"

import Chats from "./components/chats"
import Participants from "./components/participants"
import useDrawerMenuStore from "./drawer-menu-store"

const DRAWER_WIDTH = "380px"

const DrawerMenu = () => {
  const openDrawerMenuFor = useDrawerMenuStore(
    (state) => state.openDrawerMenuFor
  )

  // this is to prevent flickering of drawer's content when it is opened and closed
  const condition = useCallback(
    (prev: string | null | undefined, current: string | null) =>
      !!prev && current === null,
    []
  )

  const debouncedOpenDrawerMenuFor = useConditionalDebounce<string | null>(
    openDrawerMenuFor,
    300,
    condition
  )

  return (
    <div
      className={cn(
        "relative z-30 basis-0 overflow-hidden transition-all duration-300",
        {
          "basis-[var(--drawer-width)]": !!openDrawerMenuFor,
        }
      )}
      style={
        {
          "--drawer-width": DRAWER_WIDTH,
        } as React.CSSProperties
      }
    >
      <div
        className={cn("h-full min-w-[var(--drawer-width)] px-3 py-2")}
        style={
          {
            "--drawer-width": DRAWER_WIDTH,
          } as React.CSSProperties
        }
      >
        <div className="flex h-full flex-col rounded-md border bg-background px-4 py-3">
          <DrawerHeader
            debouncedOpenDrawerMenuFor={debouncedOpenDrawerMenuFor}
          />
          {debouncedOpenDrawerMenuFor === "chat" && <Chats />}
          {debouncedOpenDrawerMenuFor === "participants" && <Participants />}
        </div>
      </div>
    </div>
  )
}

export default DrawerMenu

const DrawerHeader = ({
  debouncedOpenDrawerMenuFor,
}: {
  debouncedOpenDrawerMenuFor: string | null
}) => {
  const { closeDrawerMenu } = useDrawerMenuStore((state) => state)

  const drawerTitle =
    debouncedOpenDrawerMenuFor === "chat" ? "Chat" : "Participants"

  return (
    <div className="flex items-center justify-between pb-3">
      <p className="text-base font-medium">{drawerTitle}</p>
      <button
        onClick={() => closeDrawerMenu()}
        className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}
