import './App.css';
import DataTable from './student/Students';
import DefaulAppBar from './utils/Navbar';

function App() {
  return (    
      <div className="App">
        <DefaulAppBar/>
        <DataTable/>
      </div>
  );
}

export default App;
