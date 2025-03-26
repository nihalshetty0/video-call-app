import { selectPeers, useHMSStore } from "@100mslive/react-sdk"
import { Icon } from "@iconify/react"
import { CopyIcon } from "@radix-ui/react-icons"
import { ScrollArea } from "@radix-ui/react-scroll-area"

import { copyToClipboard } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const Participants = () => {
  const peers = useHMSStore(selectPeers)

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <AddParticipants />

      <ScrollArea className="mt-5 flex-1 space-y-4 overflow-auto pr-2">
        {peers.map((peer) => (
          <div className="flex items-center gap-3" key={peer.id}>
            <Avatar className="h-8 w-8">
              <AvatarFallback>{peer.name[0] ?? "A"}</AvatarFallback>
            </Avatar>
            <h5 className="text-xs font-semibold">{peer.name}</h5>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

export default Participants

const AddParticipants = () => {
  const inviteLink = window.location.href

  const { toast } = useToast()
  const onCopyToClipboardHandler = () => {
    try {
      copyToClipboard(inviteLink)
      toast({
        title: "Copied to clipboard",
      })
    } catch (error) {
      toast({
        title: (error as Error).message,
      })
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="max-w-min">
          <Icon icon="mdi:user-plus" className="mr-2 h-4 w-4" />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite</DialogTitle>
          <DialogDescription>
            Share the below link with people you want to add.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="link" className="sr-only">
              Link
            </label>
            <Input
              id="link"
              defaultValue={inviteLink}
              readOnly
              className="h-9"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={onCopyToClipboardHandler}
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}
