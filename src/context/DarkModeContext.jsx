import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        window.matchMedia("prefers-color-scheme: dark").matches,
        "isDarkMode"
    );
    const toggle = () => {
        setIsDarkMode((p) => !p);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggle }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;
