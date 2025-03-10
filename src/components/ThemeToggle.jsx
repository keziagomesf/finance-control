import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
    const storedTheme = localStorage.getItem("theme");
    const [darkMode, setDarkMode] = useState(storedTheme ? storedTheme === "dark" : false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light"); 
        }
    }, [darkMode]);

    return (
        <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full transition duration-300"
        >
            {darkMode ? <FaMoon size={24} color="white" /> : <FaSun size={24} color="black" />}
        </button>
    );
};

export default ThemeToggle;
