import Notifications from "@/components/hms/notifications"

import DrawerMenu from "./components/drawer-menu"
import Footer from "./components/footer"
import HLSView from "./components/hls-view"

const Room = () => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <HLSView className="flex-1" />
        <DrawerMenu />
      </div>
      <Footer />
      <Notifications />
    </div>
  )
}

export default Room
