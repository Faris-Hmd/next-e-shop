/** @format */
/** @format */
import { createContext, useState } from "react";
export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [darkMode, setDarkMode] = useState(0);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
