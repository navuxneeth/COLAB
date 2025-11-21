import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="h-7 px-2 rounded-md bg-muted/50 hover:bg-muted/70 transition-colors flex items-center gap-1.5"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Sun className={`w-3.5 h-3.5 transition-opacity ${theme === "light" ? "opacity-100" : "opacity-40"}`} />
      <div className="w-6 h-3 rounded-full bg-background relative">
        <div 
          className={`absolute top-0.5 w-2 h-2 rounded-full bg-primary transition-all duration-200 ${
            theme === "light" ? "left-0.5" : "left-3.5"
          }`}
        />
      </div>
      <Moon className={`w-3.5 h-3.5 transition-opacity ${theme === "dark" ? "opacity-100" : "opacity-40"}`} />
    </button>
  );
};
