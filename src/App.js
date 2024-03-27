import Table from '../src/component/Table';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
function App() {
  return (
    <ThemeProvider>
      <div >
        <Table />
      </div>
    </ThemeProvider>

  );
}

export default App;
