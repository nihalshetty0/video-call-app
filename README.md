# Video Call App Template

A production-ready video conferencing template built with React, TypeScript, and 100ms SDK. Implements Google Meet-inspired UX patterns for handling device permissions, network issues, and audio/video setup.

## Live Demo

[https://meet-demo.booleanfields.com](https://meet-demo.booleanfields.com/laf-bixl-dnx)

## Core Features

- Dynamic video tile layouts
- In-built chat
- Audio/video controls with device switching
- Audio level indicators and audio cues for new messages and participants join/leave
- Responsive design with light/dark theme support
- Pre-join device testing and permission handling
- Visual feedback during connection events
- User-friendly error handling

## Tech Stack

- 100ms SDK (@100mslive/react-sdk)
- React + TypeScript
- Vite
- TailwindCSS
- Radix UI + shadcn/ui
- Zustand for state management
- React Query

## Demo Videos

### Audio and Video Permission Flow

https://github.com/user-attachments/assets/13189225-9b88-4d9f-8e18-b36089daa8f9

### Camera and Audio Settings

https://github.com/user-attachments/assets/768a9e84-adae-41cc-8675-fabf9ddf05ec

### Dynamic Tile Layout

https://github.com/user-attachments/assets/c30f052c-857a-451f-9bc2-c2240b7d03c3

### Responsive Design

https://github.com/user-attachments/assets/9c933972-a1dd-4c51-a4e9-f92599a0c957

### Real-time Messaging

https://github.com/user-attachments/assets/9c1d1912-5b8b-4d0a-ade9-e16f934cb0af


| | |
|:---:|:---:|
|<img src="https://github.com/user-attachments/assets/26b97ce5-7118-4fdf-8c61-78c0f3adf3c0" alt="Connection Lost Screen" />|<img src="https://github.com/user-attachments/assets/3a59c9ed-64d8-47bc-849d-0d67f29ee4c1" alt="Camera Permission Screen" />|
|Connection Lost|Camera Permission|
|<img src="https://github.com/user-attachments/assets/49befcd9-6d77-4627-be5a-81549a44562" alt="Loading Screen" />|<img src="https://github.com/user-attachments/assets/f721dfbb-6344-42d0-b361-f2378378088b" alt="Left Meeting Screen" />|
|Loading State|Left Meeting|
|<img src="https://github.com/user-attachments/assets/ed904442-6690-4236-9e00-a14135ec72bb" alt="Permission Error Screen" />|<img src="https://github.com/user-attachments/assets/27d2e79a-e123-40ae-becb-67d8b2469c2c" alt="Meeting Code Screen" />|
|Permission Error|Meeting Code Validation|


<details>
  <summary>View all status screens</summary>

<img src="https://github.com/user-attachments/assets/26b97ce5-7118-4fdf-8c61-78c0f3adf3c0" alt="Loading Screen" />
<img src="https://github.com/user-attachments/assets/3a59c9ed-64d8-47bc-849d-0d67f29ee4c1" alt="Camera Permission Screen" />
<img src="https://github.com/user-attachments/assets/49befcd9-6d77-4627-be5a-81549a445623" alt="Loading Screen" />
<img src="https://github.com/user-attachments/assets/f721dfbb-6344-42d0-b361-f2378378088b" alt="Left Meeting Screen" />
<img src="https://github.com/user-attachments/assets/ed904442-6690-4236-9e00-a14135ec72bb" alt="Permission Error Screen" />
<img src="https://github.com/user-attachments/assets/27d2e79a-e123-40ae-becb-67d8b2469c2c" alt="Meeting Code Screen" />

</details>

## Quick Start

Clone the repository

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Build for production
pnpm run build
```

## Why This Template?

- Built-in UX patterns that address common video call challenges
- Robust device and permission handling
- User-friendly error prevention and recovery
- Built for customization with shadcn/ui components
- Enterprise-grade infrastructure with 100ms SDK

## Contributing

Contributions welcome! Please open an issue or submit a pull request.
