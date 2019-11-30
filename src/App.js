import React from 'react';
import logo from './logo.svg';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './components/userlist';
import Navbar from './components/navbar';
//import BottomNav from './components/bottomnav';
import Profile from './components/profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Navbar />
      <UserList />
      <div style={{flexGrow: 1}}></div>
    </div>
  );
}

export default App;
