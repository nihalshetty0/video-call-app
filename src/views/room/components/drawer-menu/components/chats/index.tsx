import { useCallback, useEffect, useRef } from "react"
import {
  selectHMSMessages,
  selectLocalPeerID,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk"
import { Icon } from "@iconify/react"
import dayjs from "dayjs"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const Chats = () => {
  const inputRef = useRef<null | HTMLTextAreaElement>(null)
  const scrollEndRef = useRef<null | HTMLDivElement>(null)

  const allMessages = useHMSStore(selectHMSMessages)

  const localPeerId = useHMSStore(selectLocalPeerID)

  const hmsActions = useHMSActions()

  const { toast } = useToast()

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [allMessages])

  const sendMessageHandler = useCallback(async () => {
    const message = inputRef.current?.value
    if (!message || !message.trim().length) {
      return
    }
    try {
      await hmsActions.sendBroadcastMessage(message)
      if (inputRef.current) inputRef.current.value = ""
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
      })
    }
  }, [hmsActions])

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <ScrollArea className="flex-1 overflow-auto pr-2">
        {allMessages?.map((item, idx) => (
          <div key={item.id} className="pb-1">
            {(idx === 0 ||
              (idx > 0 &&
                (allMessages[idx - 1].sender !== item.sender ||
                  dayjs(item.time).diff(dayjs(allMessages[idx - 1].time)) >
                    60 * 1000))) && (
              <div className="my-1.5 mt-2.5 flex items-center gap-3 px-0.5">
                <h5 className="text-xs font-semibold">
                  {item.sender === localPeerId ? "You" : item.senderName}
                </h5>

                <p className="text-[10px] text-gray-400">
                  {dayjs(item.time).format("h:mm A")}
                </p>
              </div>
            )}

            <p className="whitespace-pre-line rounded-[2px] px-1 py-0.5 text-xs hover:bg-accent">
              {item.message}
            </p>
          </div>
        ))}
        <div ref={scrollEndRef} />
      </ScrollArea>

      <div className="m-0.5 flex items-center rounded-md bg-secondary px-2 py-1 focus-within:ring-1 focus-within:ring-ring">
        <Textarea
          rows={1}
          ref={inputRef}
          className="min-h-[16px] resize-none border border-none px-1 shadow-none focus-visible:ring-0"
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              if (!event.shiftKey) {
                event.preventDefault()
                await sendMessageHandler()
              }
            }
          }}
          autoComplete="off"
          placeholder="Send a message"
          autoFocus
        />
        <Button size={"icon"} variant={"ghost"} onClick={sendMessageHandler}>
          <Icon icon={"bx:send"} className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  )
}

export default Chats
