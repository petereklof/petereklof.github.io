import React, { Component } from 'react';
import './assets/css/theme.css';
import { Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import Sessions from './components/sessions/Sessions'
import Equipment from './components/equipment/Equipment'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <div className="main-content">
            <Route exact path="/" component={Dashboard} />
            <Route path="/sessions" component={Sessions} />
            <Route path="/equipment" component={Equipment} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
