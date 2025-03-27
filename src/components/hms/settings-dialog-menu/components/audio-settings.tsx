import { useEffect, useState } from "react"
import speakerTune from "@/assets/tune/test-speaker.mp3"
import {
  DeviceType,
  selectLocalPeer,
  useAVToggle,
  useDevices,
  useHMSStore,
} from "@100mslive/react-sdk"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import AudioLevelView from "@/components/hms/audio-level-view"

const AudioSettings = () => {
  const { isLocalAudioEnabled } = useAVToggle()

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

  const localPeer = useHMSStore(selectLocalPeer)

  return (
    <div className="space-y-4 px-4 sm:p-6">
      <div className="space-y-1">
        <Label>Microphone</Label>
        <div className="wflex-wrap flex items-center justify-between gap-2">
          <Select
            value={
              availableAudioInputList?.length ? selectedAudioInput : undefined
            }
            onValueChange={(value) =>
              updateDevice({
                deviceId: value,
                deviceType: DeviceType.audioInput,
              })
            }
            disabled={!availableAudioInputList?.length}
          >
            <SelectTrigger className="max-w-[220px] min-[400px]:max-w-[260px] [&>span]:inline-block [&>span]:truncate">
              <SelectValue placeholder="Permission needed" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableAudioInputList?.map((availableAudioInput) => (
                  <SelectItem
                    key={availableAudioInput.deviceId}
                    value={availableAudioInput.deviceId}
                  >
                    {availableAudioInput.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {isLocalAudioEnabled ? (
            <AudioLevelView peer={localPeer} className="ml-[18px] border p-1" />
          ) : (
            <p className="block whitespace-nowrap text-xs sm:inline">
              {availableAudioInputList?.length
                ? "Microphone is off"
                : "Microphone is blocked"}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Label>Speaker</Label>
        <div className="flex items-center justify-between gap-2">
          <Select
            value={selectedAudioOutput}
            onValueChange={(value) =>
              updateDevice({
                deviceId: value,
                deviceType: DeviceType.audioOutput,
              })
            }
            disabled={!availableAudioOutputList?.length}
          >
            <SelectTrigger className="max-w-[220px] min-[400px]:max-w-[260px] [&>span]:inline-block [&>span]:truncate">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableAudioOutputList?.map((availableAudioOutput) => (
                  <SelectItem
                    key={availableAudioOutput.deviceId}
                    value={availableAudioOutput.deviceId}
                  >
                    {availableAudioOutput.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <TestSpeakerButton />
        </div>
      </div>
    </div>
  )
}

export default AudioSettings

const speakerTuneAudio = new Audio(speakerTune)

const TestSpeakerButton = () => {
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
    <Button
      onClick={(e) => {
        e.preventDefault()
        playSpeakerTune()
      }}
      disabled={isAudioPlaying}
      variant={"ghost"}
      size={"sm"}
    >
      {!isAudioPlaying ? "Test" : "Playing"}
    </Button>
  )
}
