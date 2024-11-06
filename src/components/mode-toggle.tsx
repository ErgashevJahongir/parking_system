import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
      variant="outline"
      size="icon"
    >
      <Sun className="w-5 h-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute w-5 h-5 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
