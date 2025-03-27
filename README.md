# Video Call App Template

This template is a production-ready foundation focused on handling the most critical and error-prone aspects of video conferencing apps. Heavily inspired by Google Meet's battle-tested UX patterns, this template pays special attention to common failure points like device permissions, network issues, and audio/video setup.

## Why This Template?

- **Battle-Tested UX Patterns**: Implements Google Meet-inspired solutions for common video call frustrations
- **Foolproof Device Handling**:
  - Guided permission flows that actually make sense to users
  - Clear troubleshooting steps when things go wrong
  - Intuitive device testing and switching
- **User-First Error Prevention**:
  - Pre-join device testing to catch issues early
  - Clear visual feedback for network and permission states
  - Helpful recovery flows when permissions are denied
- **Built for Customization**:
  - Built using shadcn/ui components for easy customization
  - Modular architecture that can be extended for any use case whether you're building a telemedicine app, virtual classroom, or remote workspace

Built on top of the reliable 100ms SDK, this template combines enterprise-grade infrastructure with carefully crafted user experiences to handle the trickiest parts of video conferencing apps.

## Key Features

- **Video/Audio Controls**: Ready-to-use controls for managing video and audio.
  - Robust permission handling with visual guides
  - Pre-join audio/video device testing
  - Seamless device switching
  - Audio level indicators
- **Chat System**: Integrated chat functionality.
- **Device Settings**: Customizable device settings.
- **Theme Switching**: Supports light and dark themes.
- **Responsive Design**: Fully responsive for all devices.
- **Dynamic Tile Layout**: Automatically adjusts participant tiles for optimal viewing, similar to Google Meet.
- **Audio Cues**: Provides audio notifications for new messages and participant entry/exit, enhancing user awareness like Google Meet.
- **Status & Error Handling**:
  - Transparent network status indicators
  - Visual feedback during connection events
  - Graceful error handling with user-friendly messages

![image](https://github.com/user-attachments/assets/e7a819a4-a667-45e0-8158-0830f4b56cf4)

# Demo Videos

### 🎥 Audio and Video Permission Flow

https://github.com/user-attachments/assets/13189225-9b88-4d9f-8e18-b36089daa8f9

### 🎥 Camera and Audio Settings

https://github.com/user-attachments/assets/768a9e84-adae-41cc-8675-fabf9ddf05ec

### 🎥 Dynamic Tile Layout

https://github.com/user-attachments/assets/c30f052c-857a-451f-9bc2-c2240b7d03c3

### 🎥 Responsive Design

https://github.com/user-attachments/assets/9c933972-a1dd-4c51-a4e9-f92599a0c957

### 🎥 Real-time Messaging

https://github.com/user-attachments/assets/9c1d1912-5b8b-4d0a-ade9-e16f934cb0af

## Tech Stack

- **100ms SDK**: Built on top of 100ms's robust SDK (@100mslive/react-sdk), providing enterprise-grade video infrastructure
- **React + TypeScript**: Leveraging the power of React and TypeScript for a robust development experience.
- **Vite**: Fast development with Vite.
- **TailwindCSS**: Modern styling with TailwindCSS.
- **Radix UI + shadcn/ui**: Combines Radix UI's accessible primitives with shadcn/ui's beautiful, customizable components for a polished user interface.

## Developer-Friendly

- **Clean Code Organization**: Well-structured and easy to navigate.
- **Type Safety**: Ensures type safety with TypeScript.
- **Component-Based Architecture**: Modular and reusable components.
- **State Management**: Well-structured state management using zustand.

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/nihalshetty0/video-call-app.git
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Run the Development Server**:

   ```bash
   pnpm run dev
   ```

4. **Build for Production**:
   ```bash
   pnpm run build
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
