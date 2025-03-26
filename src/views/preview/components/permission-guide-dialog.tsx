import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useMediaQuery } from "usehooks-ts"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

// Define the interface for the ref methods
export interface PermissionGuideDialogRef {
  openPermissionGuideDialog: () => void
  closePermissionGuideDialog: () => void
}

const PermissionGuideDialog = forwardRef<PermissionGuideDialogRef>(
  ({}, ref) => {
    const [showPermissionGuideDialog, setShowPermissionGuideDialog] =
      useState(false)

    const dialogOpenThrottleTimeoutId = useRef<null | NodeJS.Timeout>(null)

    useImperativeHandle(ref, () => ({
      openPermissionGuideDialog: () => {
        dialogOpenThrottleTimeoutId.current = setTimeout(() => {
          setShowPermissionGuideDialog(true)
        }, 2200)
      },
      closePermissionGuideDialog: () => {
        if (dialogOpenThrottleTimeoutId.current) {
          clearTimeout(dialogOpenThrottleTimeoutId.current)
        }
        dialogOpenThrottleTimeoutId.current = null
        setShowPermissionGuideDialog(false)
      },
    }))

    const isMobile = useMediaQuery("(max-width: 426px)")

    return (
      <Dialog open={showPermissionGuideDialog}>
        <DialogContent
          className="space-y-3 sm:max-w-[525px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogTitle className="text-center">
            <span className="font-normal">Click</span> Allow
          </DialogTitle>
          {!isMobile && (
            <img src="/browser-permission-vector.png" className="mx-auto" />
          )}

          <DialogDescription className="text-center text-xs">
            For the best meeting experience, grant microphone and camera access.
            You can always mute or turn off your camera during the meeting.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    )
  }
)

export default PermissionGuideDialog
