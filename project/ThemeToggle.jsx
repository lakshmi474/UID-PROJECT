import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-bs-theme', saved);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-bs-theme', next);
  };

  return (
    <button className="btn btn-outline-dark" onClick={toggle} title="Toggle theme">
      {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}
