import React, { Component } from 'react'
import './assets/css/theme.css'
import { Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Sessions from './components/sessions/Sessions'
import Equipment from './components/equipment/Equipment'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Signup from './components/auth/Signup'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {1 === 2 ? <Navbar/> : ''}
          
          <Route exact path="/" component={Dashboard} />
          <Route path="/sessions" component={Sessions} />
          <Route path="/equipment" component={Equipment} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={Signup} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
