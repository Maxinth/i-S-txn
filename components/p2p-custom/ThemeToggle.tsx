"use client";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 bg-gray-200 dark:bg-gray-700 rounded flex items-center gap-2"
    >
      {theme === "light" ? <FaToggleOff size={20} /> : <FaToggleOn size={20} />}
      Toggle to {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeToggle;
