
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Toggle
      aria-label="Toggle theme"
      className="rounded-full border border-gray-200 dark:border-gray-800 w-9 h-9 p-0 flex items-center justify-center"
      pressed={theme === "dark"}
      onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Toggle>
  );
}
