import { useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import { DialogTitle } from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import AudioSettings from "./components/audio-settings"
import VideoSettings from "./components/video-settings"

const settingGroups = [
  {
    name: "Audio",
    icon: "solar:speaker-outline",
  },
  {
    name: "Video",
    icon: "fluent:video-person-28-regular",
  },
]

const SettingsDialogMenu = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-full max-w-[700px] p-0 sm:max-h-[550px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DesktopView />
        <MobileView />

        <DialogClose className="hidden sm:block" />
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialogMenu

const DesktopView = () => {
  const [activeSettingGroup, setActiveSettingGroup] = useState(
    settingGroups[0].name
  )
  return (
    <div className="hidden sm:flex">
      <div className="basis-[240px] px-4 py-6">
        <h3 className="mb-4 text-start text-2xl font-semibold tracking-tight">
          Settings
        </h3>

        <div className="block space-y-1">
          {settingGroups.map((settingGroup) => (
            <Button
              key={settingGroup.name}
              variant={
                activeSettingGroup === settingGroup.name ? "secondary" : "ghost"
              }
              className="w-full justify-start"
              onClick={() => setActiveSettingGroup(settingGroup.name)}
            >
              <Icon icon={settingGroup.icon} className="mr-2 h-4 w-4" />
              <span className="inline-block">{settingGroup.name}</span>
            </Button>
          ))}
        </div>

        <div className="hidden space-y-1">
          {settingGroups.map((settingGroup) => (
            <Tooltip key={settingGroup.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant={
                    activeSettingGroup === settingGroup.name
                      ? "secondary"
                      : "ghost"
                  }
                  className="h-9 w-9 px-2"
                >
                  <Icon icon={settingGroup.icon} className="h-4 w-4" />
                  <span className="sr-only">{settingGroup.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {settingGroup.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="mt-12 flex-1">
        {activeSettingGroup === "Audio" && <AudioSettings />}
        {activeSettingGroup === "Video" && <VideoSettings />}
      </div>
    </div>
  )
}

const MobileView = () => {
  const [activeSettingGroup, setActiveSettingGroup] = useState<null | string>(
    null
  )

  return (
    <div className="block p-3 sm:hidden">
      <div className="flex items-center justify-between">
        <Button
          size={"icon"}
          variant={"link"}
          onClick={() => setActiveSettingGroup(null)}
          className={cn({
            invisible: !activeSettingGroup,
          })}
        >
          <Icon icon="tabler:chevron-left" className="h-4 w-4" />
        </Button>

        <h5 className="text-center">{activeSettingGroup ?? "Settings"}</h5>

        <DialogClose className="static" />
      </div>

      <div className="mt-4"></div>

      {activeSettingGroup === null && (
        <div className={"flex flex-col gap-2"}>
          <p className="pl-4 text-xs font-semibold text-gray-500">
            Device preference
          </p>
          {settingGroups.map((settingGroup) => (
            <Button
              key={settingGroup.name}
              variant={"ghost"}
              className="justify-start"
              onClick={() => setActiveSettingGroup(settingGroup.name)}
            >
              {settingGroup.name}

              <Icon
                icon={"tabler:chevron-right"}
                className="ml-auto text-gray-500"
              />
            </Button>
          ))}
          <p className="mt-4 pl-4 text-xs text-gray-500">
            Device preference will be saved on this device only
          </p>
        </div>
      )}

      {activeSettingGroup === "Audio" && <AudioSettings />}
      {activeSettingGroup === "Video" && <VideoSettings />}
    </div>
  )
}
