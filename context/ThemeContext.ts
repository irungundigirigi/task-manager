import { createContext } from "react";

export type themeContextType = "light" | "dark";
const ThemeContext = createContext<themeContextType>("light");
export default ThemeContext;
