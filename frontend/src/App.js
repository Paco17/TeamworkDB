import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {About} from './components/About';
import {Users} from './components/Users';
import {Navbar} from './components/Navbar';

//Switch -> Encargado de elegir que ruta sera la encargada a renderizar dependiendo la URL visitemos

function App() {
  return(
    <Router>
      <Navbar/>
        <div>
          <Routes> 
            <Route exact path="/" element={<Users/>}/>
            <Route exact path="/about" element={<About/>}/>
          </Routes>
        </div>
    </Router>
  
  );
}

export default App;
