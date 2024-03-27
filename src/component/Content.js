// Content.js
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Content = () => {
  const { darkMode } = useTheme();

  return (
    <div style={{ backgroundColor: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : '#222' }}>
      <h1>Content Area</h1>
      <p>This is some sample content.</p>
    </div>
  );
};

export default Content;
