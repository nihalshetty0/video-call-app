import ReactDOM from "react-dom/client"

import "./index.css"

import React from "react"
import { HMSRoomProvider } from "@100mslive/react-sdk"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import ErrorPage from "@/routes/error-page"
import Home from "@/routes/home-page"
import NotFound from "@/routes/not-found"
import RoomPage from "@/routes/room-page"

import { Toaster } from "@/components/ui/toaster.tsx"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"

import { ThemeProvider } from "@/components/theme-provider.tsx"

const router = createBrowserRouter([
  {
    path: "/:roomId",
    element: <RoomPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="meet-theme">
      <QueryClientProvider client={queryClient}>
        <HMSRoomProvider>
          <TooltipProvider>
            <RouterProvider router={router} />
            <Toaster />
          </TooltipProvider>
        </HMSRoomProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
)
