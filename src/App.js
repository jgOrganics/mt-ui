import Table from '../src/component/Table';
import './App.css';
import Content from './component/Content';
import ToggleThemeButton from './component/Toggle';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
function App() {

  // const { darkMode } = useTheme();

  return (
    // <ThemeProvider>
    //   {/* <div className="App" > */}
    //     {/* <Table /> */}
    //     <div style={{ backgroundColor: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : '#222' }}>
    //       <h1>Content Area</h1>
    //       <p>This is some sample content.</p>
    //       <ToggleThemeButton />
    //     </div>
    //   {/* </div> */}
    // </ThemeProvider>
    <ThemeProvider>
    <div >
      {/* <ToggleThemeButton /> */}
      {/* <Content /> */}
        <Table />
    </div>
  </ThemeProvider>
  
    );
}

export default App;
