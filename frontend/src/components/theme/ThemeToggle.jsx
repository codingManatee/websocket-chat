import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Retrieve theme from localStorage and return the state
    const theme = localStorage.getItem("theme");
    return theme === "dark" ? true : false;
  });

  useEffect(() => {
    // Apply the dark class to the root of the document
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);

    // Apply the background image based on the theme
    if (darkMode) {
      root.style.setProperty("--bg-image", "url(/dark.png)");
    } else {
      root.style.setProperty("--bg-image", "url(/bg.png)");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  return (
    <div className="hidden sm:flex fixed top-0 right-0 p-4 ">
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2 dark:text-gray-200">
          {darkMode ? "Dark Mode" : "Light Mode"}
        </span>
        <button
          onClick={toggleTheme}
          className={`w-14 h-8 flex items-center rounded-full p-1 ${
            darkMode ? "bg-gray-800" : "bg-gray-200"
          }`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
              darkMode ? "translate-x-6" : ""
            }`}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;
