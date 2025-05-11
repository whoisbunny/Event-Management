
import { Moon, Sun } from "lucide-react";
import  { useEffect, useState } from "react";

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
      const storedTheme = localStorage.getItem("theme") as "light" | "dark";
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
      }
    }, []);
  
    const toggleTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    };
  return (
    <>
      {" "}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        aria-label="Toggle Dark Mode"
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-gray-800" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-400" />
        )}
      </button>
    </>
  );
};

export default ThemeSwitcher;
