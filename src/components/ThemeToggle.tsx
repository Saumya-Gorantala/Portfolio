
import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const switchRef = useRef<HTMLButtonElement>(null);

  // Check system preference and localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Get the position of the click for radial reveal
    const rect = switchRef.current?.getBoundingClientRect();
    if (rect) {
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      // Set CSS variables for the radial reveal animation
      document.documentElement.style.setProperty('--reveal-x', `${x}px`);
      document.documentElement.style.setProperty('--reveal-y', `${y}px`);
    }

    // Add transition class to trigger animation
    document.documentElement.classList.add('theme-transition');

    // Toggle theme after a brief delay
    setTimeout(() => {
      if (isDarkMode) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDarkMode(false);
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDarkMode(true);
      }
      
      // Remove transition class after animation completes
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 600);
    }, 300);
  };

  return (
    <button
      ref={switchRef}
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-400"
      style={{
        background: isDarkMode
          ? 'rgba(192, 24, 87, 0.3)'
          : 'rgba(255, 182, 193, 0.2)',
      }}
    >
      <span
        className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-400 flex items-center justify-center"
        style={{
          transform: isDarkMode ? 'translateX(28px)' : 'translateX(2px)',
        }}
      >
        {isDarkMode ? (
          <Moon size={14} className="text-pastel-burgundy" />
        ) : (
          <Sun size={14} className="text-yellow-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
