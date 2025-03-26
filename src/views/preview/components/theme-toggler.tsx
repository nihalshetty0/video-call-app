import { Icon } from "@iconify/react/dist/iconify.js"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed right-4 top-4 z-50"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Icon
        className="h-5 w-5"
        icon={theme === "light" ? "tabler:sun" : "tabler:moon"}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggler
