import { Button } from "@/components/ui/button"

const RoomCodeInvalid = () => {
  return (
    <div className="container flex h-screen w-full justify-center">
      <div className="flex max-w-lg flex-col items-center gap-6 pt-20">
        <h4 className="text-center text-3xl font-semibold tracking-tight">
          Check your meeting code
        </h4>
        <p>Make sure you entered the correct meeting code in the URL</p>
        <div className="flex items-center gap-5">
          <p>Retry?</p>
          <Button onClick={() => window.location.reload()}>Refresh page</Button>
        </div>
      </div>
    </div>
  )
}

export default RoomCodeInvalid
