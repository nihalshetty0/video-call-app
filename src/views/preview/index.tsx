import { useEffect, useRef } from "react"
import { ErrorWithCode } from "@/types"
import { useHMSActions } from "@100mslive/react-sdk"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { playLocalPeerJoinTune } from "@/lib/tunes"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { AudioControls, VideoControls } from "@/components/hms/av-controls"
import Notifications from "@/components/hms/notifications"
import ErrorLoadingAuthToken from "@/components/room-states/error-loading-auth-token"
import LoadingAuthToken from "@/components/room-states/loading-auth-token"
import RoomCodeInvalid from "@/components/room-states/room-code-invalid"

import CameraPreview from "./components/camera-preview"
import PermissionGuideDialog, {
  PermissionGuideDialogRef,
} from "./components/permission-guide-dialog"
import ThemeToggler from "./components/theme-toggler"

const Preview = () => {
  let { roomId } = useParams()
  const hmsActions = useHMSActions()

  const {
    data: authToken,
    error: errorOnFetchingAuthToken,
    isLoading: isLoadingAuthToken,
  } = useQuery<string, ErrorWithCode>({
    queryKey: ["auth_token"],
    queryFn: () =>
      typeof roomId !== "string"
        ? Promise.reject(new Error("Room Id not found"))
        : hmsActions.getAuthTokenByRoomCode({
            roomCode: roomId,
          }),
    enabled: !!roomId,
    refetchOnWindowFocus: false,
  })

  const postLoadPreview = useMutation({
    mutationFn: () => {
      permissionsGuideDialogRef.current?.openPermissionGuideDialog()

      return hmsActions.preview({
        authToken: authToken,
        settings: {
          isAudioMuted: false,
          isVideoMuted: false,
        },
        rememberDeviceSelection: true, // remember manual device change
      })
    },

    onSettled: () => {
      permissionsGuideDialogRef.current?.closePermissionGuideDialog()
    },
  })

  useEffect(() => {
    if (authToken) postLoadPreview.mutate()
  }, [authToken])

  const joinMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const userName = formData.get("name") as string

      if (!userName) throw new Error("Username is required")
      if (!roomId) throw new Error("Room Id not found")

      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode: roomId,
      })

      await hmsActions.join({ userName, authToken })
      playLocalPeerJoinTune()
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const onJoinHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    joinMutation.mutate(formData)
  }

  const permissionsGuideDialogRef = useRef<null | PermissionGuideDialogRef>(
    null
  )

  if (errorOnFetchingAuthToken?.code === 404) {
    return <RoomCodeInvalid />
  } else if (errorOnFetchingAuthToken) {
    return <ErrorLoadingAuthToken />
  } else if (isLoadingAuthToken) {
    return <LoadingAuthToken />
  }

  return (
    <>
      <ThemeToggler />
      <div className="flex h-screen flex-col items-start justify-center">
        <div className="mx-auto grid w-full gap-4 px-4 md:max-w-[650px]">
          <div className="">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Ready to join?
            </h3>

            <p className="leading-7">
              Setup your audio and video before joining
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <CameraPreview />

            <div className="flex gap-3">
              <AudioControls />
              <VideoControls />
            </div>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <form
              onSubmit={onJoinHandler}
              className="flex w-full flex-col gap-3 md:flex-row"
            >
              <Input
                name="name"
                defaultValue={"Roberto"}
                placeholder="Enter your name"
                inputSize={"lg"}
              />
              <Button
                type="submit"
                disabled={joinMutation.isPending || postLoadPreview.isPending}
                size={"lg"}
              >
                {postLoadPreview.isPending
                  ? "Loading..."
                  : joinMutation.isPending
                    ? "Joining..."
                    : "Join"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <PermissionGuideDialog ref={permissionsGuideDialogRef} />
      <Notifications />
    </>
  )
}

export default Preview
