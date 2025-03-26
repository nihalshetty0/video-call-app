import { Button } from "@/components/ui/button"

const UserLeftRoom = () => (
  <div className="flex h-screen w-full justify-center">
    <div className="flex flex-col items-center gap-6 pt-20">
      <h4 className="text-3xl font-semibold tracking-tight">
        You left the meeting
      </h4>
      <div className="flex items-center gap-5">
        <p>Left by mistake?</p>
        <Button onClick={() => window.location.reload()}>Rejoin</Button>
      </div>
    </div>
  </div>
)

export default UserLeftRoom
