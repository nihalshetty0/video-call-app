import {
  DeviceType,
  selectIsLocalVideoEnabled,
  selectLocalPeer,
  useDevices,
  useHMSStore,
  useVideo,
} from "@100mslive/react-sdk"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const VideoSettings = () => {
  const {
    allDevices: { videoInput: availableVideoInputList },
    selectedDeviceIDs: { videoInput: selectedVideoInput },
    updateDevice,
  } = useDevices()

  return (
    <div className="space-y-4 px-4 sm:p-6">
      <CameraPreviewSample />

      <div className="space-y-1">
        <Label>Camera</Label>
        <div className="">
          <Select
            value={
              availableVideoInputList?.length ? selectedVideoInput : undefined
            }
            onValueChange={(value) =>
              updateDevice({
                deviceId: value,
                deviceType: DeviceType.videoInput,
              })
            }
            disabled={!availableVideoInputList?.length}
          >
            <SelectTrigger className="w-[260px] [&>span]:inline-block [&>span]:truncate">
              <SelectValue placeholder="Permission needed" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableVideoInputList?.map((availableVideoInput) => (
                  <SelectItem
                    key={availableVideoInput.deviceId}
                    value={availableVideoInput.deviceId}
                  >
                    {availableVideoInput.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default VideoSettings

const CameraPreviewSample = () => {
  const localPeer = useHMSStore(selectLocalPeer)
  const { videoRef } = useVideo({
    trackId: localPeer?.videoTrack,
  })

  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled)

  return (
    <div className="relative aspect-video w-full">
      <video
        className="absolute aspect-video h-full w-full max-w-full rounded-md bg-secondary"
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ transform: "scaleX(-1)" }}
      />
      {localPeer && !isLocalVideoEnabled && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Camera is off
        </p>
      )}
    </div>
  )
}
