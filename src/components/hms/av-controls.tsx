import { useEffect, useState } from "react"
import speakerTune from "@/assets/tune/test-speaker.mp3"
import {
  DeviceType,
  selectLocalPeer,
  selectPeerAudioByID,
  useAVToggle,
  useDevices,
  useHMSStore,
} from "@100mslive/react-sdk"
import { Icon } from "@iconify/react"
import { ChevronDownIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const AVControls = () => {
  return (
    <div className="flex">
      <AudioControls />
      <VideoControls />
    </div>
  )
}

export default AVControls

export const AudioControls = () => {
  const { isLocalAudioEnabled, toggleAudio } = useAVToggle()

  const {
    allDevices: {
      audioInput: availableAudioInputList,
      audioOutput: availableAudioOutputList,
    },
    selectedDeviceIDs: {
      audioInput: selectedAudioInput,
      audioOutput: selectedAudioOutput,
    },
    updateDevice,
  } = useDevices()

  return (
    <div className="flex items-center gap-[1px] rounded-md bg-secondary">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            className="px-3 shadow-none sm:rounded-r-none"
            onClick={toggleAudio}
          >
            <span className="sr-only">
              {isLocalAudioEnabled
                ? "Turn off microphone"
                : "Turn on microphone"}
            </span>
            <Icon
              className="h-4 w-4"
              icon={isLocalAudioEnabled ? "lucide:mic" : "lucide:mic-off"}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isLocalAudioEnabled ? "Turn off microphone" : "Turn on microphone"}
          </p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="hidden rounded-l-none pl-1 pr-2 shadow-none sm:block [&>svg]:data-[state=open]:rotate-180"
                >
                  <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                  <span className="sr-only">Microphone settings</span>
                </Button>
              </DropdownMenuTrigger>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Microphone settings</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          align="center"
          side="top"
          forceMount
          className="min-w-60"
        >
          <DropdownMenuLabel>Microphone</DropdownMenuLabel>

          {availableAudioInputList?.length === 0 && (
            <DropdownMenuItem disabled>Mic not found</DropdownMenuItem>
          )}

          {availableAudioInputList?.map((availableAudioInput) => (
            <DropdownMenuCheckboxItem
              key={availableAudioInput.deviceId}
              checked={availableAudioInput.deviceId === selectedAudioInput}
              onClick={() =>
                updateDevice({
                  deviceId: availableAudioInput.deviceId,
                  deviceType: DeviceType.audioInput,
                })
              }
            >
              {availableAudioInput.label}
            </DropdownMenuCheckboxItem>
          ))}

          {availableAudioInputList && availableAudioInputList?.length > 0 && (
            <MicLevelIndicator />
          )}

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Speaker</DropdownMenuLabel>

          {availableAudioOutputList?.length === 0 && (
            <DropdownMenuCheckboxItem checked disabled>
              Default Speaker
            </DropdownMenuCheckboxItem>
          )}
          {availableAudioOutputList?.map((availableAudioOutput) => (
            <DropdownMenuCheckboxItem
              key={availableAudioOutput.deviceId}
              checked={availableAudioOutput.deviceId === selectedAudioOutput}
              onClick={() =>
                updateDevice({
                  deviceId: availableAudioOutput.deviceId,
                  deviceType: DeviceType.audioOutput,
                })
              }
            >
              {availableAudioOutput.label}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />

          <DropdownMenuItemToTestSpeaker />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const MicLevelIndicator = () => {
  const localPeer = useHMSStore(selectLocalPeer)

  const { isLocalAudioEnabled } = useAVToggle()

  const audioLevel = useHMSStore(selectPeerAudioByID(localPeer?.id))

  if (!isLocalAudioEnabled || !localPeer)
    return (
      <DropdownMenuItem disabled className="flex gap-2 py-3">
        <Icon icon={"lucide:mic-off"} className="h-4 w-4" />
        Turn on your mic to test it
      </DropdownMenuItem>
    )

  return (
    <DropdownMenuItem disabled className="flex gap-2 py-3">
      <Icon icon={"lucide:mic"} className="h-4 w-4" />
      <Progress value={audioLevel} className="h-1" />
    </DropdownMenuItem>
  )
}

const speakerTuneAudio = new Audio(speakerTune)

const DropdownMenuItemToTestSpeaker = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  useEffect(() => {
    speakerTuneAudio.onplaying = () => {
      setIsAudioPlaying(true)
    }
    speakerTuneAudio.onended = () => {
      setIsAudioPlaying(false)
    }

    return () => {
      setIsAudioPlaying(false)
    }
  }, [])

  const playSpeakerTune = () => {
    speakerTuneAudio.play().catch((err) => {
      console.warn("Error playing speaker tune:", err)
    })
  }

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.preventDefault()
        playSpeakerTune()
      }}
      disabled={isAudioPlaying}
    >
      <Icon className="mr-2 h-4 w-4" icon={"fluent:speaker-2-24-regular"} />
      {!isAudioPlaying ? "Test Speakers" : "Playing..."}
    </DropdownMenuItem>
  )
}

export const VideoControls = () => {
  const { isLocalVideoEnabled, toggleVideo } = useAVToggle()

  const {
    allDevices: { videoInput: availableVideoInputList },
    selectedDeviceIDs: { videoInput: selectedVideoInput },
    updateDevice,
  } = useDevices()

  return (
    <div className="flex items-center gap-[1px] rounded-md bg-secondary">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            className="px-3 shadow-none sm:rounded-r-none"
            onClick={toggleVideo}
          >
            <span className="sr-only">
              {isLocalVideoEnabled ? "Turn off camera" : "Turn on camera"}
            </span>
            <Icon
              className="h-4 w-4"
              icon={isLocalVideoEnabled ? "lucide:video" : "lucide:video-off"}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isLocalVideoEnabled ? "Turn off camera" : "Turn on camera"}</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="hidden rounded-l-none px-2 pl-1 pr-2 shadow-none sm:block [&>svg]:data-[state=open]:rotate-180"
                >
                  <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                  <span className="sr-only">Camera settings</span>
                </Button>
              </DropdownMenuTrigger>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Camera settings</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          align="center"
          side="top"
          forceMount
          className="min-w-60"
        >
          <DropdownMenuLabel>Camera</DropdownMenuLabel>

          {availableVideoInputList?.length === 0 && (
            <DropdownMenuItem disabled> Camera not found</DropdownMenuItem>
          )}

          {availableVideoInputList?.map((availableVideoInput) => (
            <DropdownMenuCheckboxItem
              key={availableVideoInput.deviceId}
              checked={availableVideoInput.deviceId === selectedVideoInput}
              onClick={() =>
                updateDevice({
                  deviceId: availableVideoInput.deviceId,
                  deviceType: DeviceType.videoInput,
                })
              }
            >
              {availableVideoInput.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
