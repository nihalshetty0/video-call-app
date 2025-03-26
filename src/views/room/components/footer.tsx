import { Dispatch, SetStateAction, useState } from "react"
import { ROOM_STATE_TYPE } from "@/constant"
import { useHMSActions } from "@100mslive/react-sdk"
import { Icon } from "@iconify/react"

import useRoomPageState from "@/routes/room-page/room-page-store"

import { playLocalPeerLeaveTune } from "@/lib/tunes"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { AudioControls, VideoControls } from "@/components/hms/av-controls"
import SettingsDialogMenu from "@/components/hms/settings-dialog-menu"
import { useTheme } from "@/components/theme-provider"

import useDrawerMenuStore from "./drawer-menu/drawer-menu-store"

function Footer() {
  return (
    <div className="grid grid-cols-6 border-t px-2">
      <div className="col-span-1 flex items-center justify-start py-2">
        <ThemeToggler />
      </div>
      <MainControls />
      <DrawerControls />
    </div>
  )
}

export default Footer

const MainControls = () => {
  const hmsActions = useHMSActions()

  const { setRoomState } = useRoomPageState()
  const onLeaveRoomHandler = async () => {
    await hmsActions.leave()
    setRoomState(ROOM_STATE_TYPE.LEFT_ROOM)
    playLocalPeerLeaveTune()
  }

  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState(false)

  return (
    <div className="col-span-4 flex justify-center gap-2 py-2">
      <AudioControls />
      <VideoControls />
      <MenuButtonForMobileScreen
        setIsSettingDialogOpen={setIsSettingDialogOpen}
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"secondary"}
            onClick={() => setIsSettingDialogOpen(true)}
            className="hidden sm:block"
          >
            <Icon icon="tabler:settings" className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
      <SettingsDialogMenu
        open={isSettingDialogOpen}
        onOpenChange={setIsSettingDialogOpen}
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"destructive"} onClick={onLeaveRoomHandler}>
            <Icon icon="fluent:call-end-16-regular" className="h-4 w-4" />
            <span className="sr-only">Leave call</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Leave call</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

const DrawerControls = () => {
  const {
    openDrawerMenuFor,
    toggleChatMenu,
    toggleParticipantsMenu,
    unreadMessages,
  } = useDrawerMenuStore()
  const { dismiss } = useToast()

  const handleChatToggle = () => {
    dismiss()
    toggleChatMenu()
  }

  return (
    <div className="col-span-1 hidden justify-end gap-2 py-2 sm:flex">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"ghost"} onClick={toggleParticipantsMenu}>
            <Icon
              icon={
                openDrawerMenuFor === "participants"
                  ? `mdi:person`
                  : "mdi:person-outline"
              }
              className="h-4 w-4"
            />
            <span className="sr-only">Participants</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Participants</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <Button variant={"ghost"} onClick={handleChatToggle}>
              <Icon
                icon={
                  openDrawerMenuFor === "chat" ? `bxs:message` : "bx:message"
                }
                className="h-4 w-4"
              />
              <span className="sr-only">Chat</span>
            </Button>
            {unreadMessages > 0 && (
              <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {unreadMessages}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chat</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

const MenuButtonForMobileScreen = ({
  setIsSettingDialogOpen,
}: {
  setIsSettingDialogOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { toggleChatMenu, toggleParticipantsMenu } = useDrawerMenuStore()
  const [open, setOpen] = useState(false)
  const { dismiss } = useToast()

  return (
    <Drawer modal={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon" className="sm:hidden">
          <Icon icon="lucide:more-vertical" className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-4 p-4">
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-2"
            onClick={() => {
              dismiss()
              toggleParticipantsMenu()
              setOpen(false)
            }}
          >
            <Icon icon="mdi:person-outline" className="h-4 w-4" />
            <span>Participants</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center justify-start gap-2"
            onClick={() => {
              dismiss()
              toggleChatMenu()
              setOpen(false)
            }}
          >
            <Icon icon="bx:message" className="h-4 w-4" />
            <span>Chat</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center justify-start gap-2"
            onClick={() => {
              dismiss()
              setOpen(false)
              setIsSettingDialogOpen(true)
            }}
          >
            <Icon icon="tabler:settings" className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Icon
            className="h-4 w-4"
            icon={theme === "light" ? "tabler:sun" : "tabler:moon"}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle theme</p>
      </TooltipContent>
    </Tooltip>
  )
}
