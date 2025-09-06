import React from 'react'; 
import Main from './Components/Main/Main'
import './App.css'
import './Components/tabs-css/tabs.css'
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
