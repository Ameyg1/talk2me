import React from 'react';
import logo from './logo.svg';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './components/userlist';
import Navbar from './components/navbar';
import BottomNav from './components/bottomnav';


function App() {
  return (
    <div className="App">
     <Navbar />
      <UserList />
      <div style={{flexGrow: 1}}></div>
      <BottomNav />
    </div>
  );
}

export default App;
