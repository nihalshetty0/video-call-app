import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log(import.meta.env.VITE_DEMO_ROOM_ID)
    if (import.meta.env.VITE_DEMO_ROOM_ID) {
      navigate(`/${import.meta.env.VITE_DEMO_ROOM_ID}`)
    }
  }, [navigate])

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        Add a <code className="rounded-md bg-muted px-1">/roomId</code> to the
        URL to join a meeting
      </h1>
    </div>
  )
}

export default Home
