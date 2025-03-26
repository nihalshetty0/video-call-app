import { useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import SettingsDialogMenu from "@/components/hms/settings-dialog-menu"

interface MoreOptionsMenuProps {
  isLocalVideoEnabled: boolean
}

const MoreOptionsMenu = ({ isLocalVideoEnabled }: MoreOptionsMenuProps) => {
  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "absolute right-0 top-0 z-[3] mr-1 mt-2 rounded-full px-2 py-0",
                  {
                    "text-background": isLocalVideoEnabled,
                    "text-primary": !isLocalVideoEnabled,
                  }
                )}
              >
                <span className="sr-only">Open menu</span>
                <Icon className="size-5" icon={"tabler:dots-vertical"} />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>More options</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="min-w-[210px]">
          <DropdownMenuItem onClick={() => setIsSettingDialogOpen(true)}>
            <Icon className="mr-2 h-4 w-4" icon={"tabler:settings"} />
            Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SettingsDialogMenu
        open={isSettingDialogOpen}
        onOpenChange={setIsSettingDialogOpen}
      />
    </>
  )
}

export default MoreOptionsMenu
