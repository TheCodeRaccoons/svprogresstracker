import React from 'react'; 
import Main from './Components/Main/Main'
import './App.css'
import './Components/tabs-css/tabs.css'
import {Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path={`/`} render={ () => < Main />} />
    </div>
  );
}

export default App;
