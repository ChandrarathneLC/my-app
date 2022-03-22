import {BrowserRouter as Router,Routes,Route, Link} from 'react-router-dom';
import CardForm from './Components/FirstPage/CardForm';
import Process from './Components/SecondPage/Process';

function App() {
  return (
    <Router>
 
    <Routes>
      <Route exact path = "/" element ={<CardForm/>}/>
      <Route exact path="/process" element={<Process/>}/>
      

    </Routes>
  </Router>
      
  
      
    
  );
}

export default App;
