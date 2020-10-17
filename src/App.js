import React from 'react';
import Landing from "./Pages/Landing"
import Sidebar from "./Pages/Sidebar/Sidebar"
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Landing/>
    </div>
  );
}

export default App;
