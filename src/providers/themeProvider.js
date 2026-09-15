import { createContext, useState } from "react";

export const ThemeContext = createContext()

export default function ThemeProvider({children}){
    
    const [mode, setMode] = useState(
        localStorage.getItem("theme") || "light"
    );

    function changeTheme(newMode) {
        setMode(newMode);
        localStorage.setItem("theme", newMode);
    }

    return (
        <ThemeContext.Provider value={{ mode, setMode: changeTheme }}>
            <div className={mode === "dark" ? "darkMode" : ""}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
