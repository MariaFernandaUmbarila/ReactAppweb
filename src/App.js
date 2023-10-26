import './App.css';
import DataTable from './student/ListStudents';
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
