// ToggleThemeButton.js
import { Switch } from '@material-ui/core';
import { useTheme } from '../contexts/ThemeContext';
import React from 'react';


const ToggleThemeButton = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <Switch
      checked={darkMode} // Set the checked state based on the darkMode value
      onChange={toggleTheme} // Call the handleModeChange function when the switch is toggled
      color="default"
      name="darkModeSwitch"
      inputProps={{ 'aria-label': 'toggle dark mode' }}
    />
  );
};

export default ToggleThemeButton;
