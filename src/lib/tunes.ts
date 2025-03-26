import localPeerJoinTune from "@/assets/tune/local-peer-join.mp3"
import localPeerLeaveTune from "@/assets/tune/local-peer-leave.mp3"
import remotePeerJoinTune from "@/assets/tune/remote-peer-join.mp3"

const localPeerJoinSound = new Audio(localPeerJoinTune)
const remotePeerJoinSound = new Audio(remotePeerJoinTune)
const localPeerLeaveSound = new Audio(localPeerLeaveTune)

export const playLocalPeerJoinTune = () => {
  localPeerJoinSound.play().catch((err) => {
    console.warn("Error playing speaker tune:", err)
  })
}

export const playRemotePeerJoinTune = () => {
  remotePeerJoinSound.play().catch((err) => {
    console.warn("Error playing remote peer join sound:", err)
  })
}

export const playLocalPeerLeaveTune = () => {
  localPeerLeaveSound.play().catch((err) => {
    console.warn("Error playing local peer leave sound:", err)
  })
}
