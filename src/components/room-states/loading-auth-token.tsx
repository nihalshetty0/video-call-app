import { Icon } from "@iconify/react"

const LoadingAuthToken = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center border">
      <div className="flex flex-col items-center gap-6">
        <Icon
          icon="mingcute:loading-fill"
          className="h-16 w-16 animate-spin duration-700"
        />

        <div className="space-y-1 text-center">
          <h3 className="text-2xl font-semibold tracking-tight">
            Getting ready...
          </h3>
          <p>You'll be able to join in just a moment</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingAuthToken
