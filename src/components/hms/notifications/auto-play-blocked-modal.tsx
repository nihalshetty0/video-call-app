import { useAutoplayError } from "@100mslive/react-sdk"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const AutoplayBlockedModal = () => {
  const { error, resetError, unblockAudio } = useAutoplayError()
  return (
    <Dialog
      open={!!error}
      onOpenChange={(value) => {
        if (!value) {
          unblockAudio()
        }
        resetError()
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Permission Error</DialogTitle>
          <DialogDescription>
            The browser wants us to get a confirmation for playing the Audio.
            Please allow audio to proceed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={() => {
              unblockAudio()
              resetError()
            }}
          >
            Allow Audio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AutoplayBlockedModal
