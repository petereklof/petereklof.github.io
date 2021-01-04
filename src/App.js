import React, { Component } from 'react'
import { connect } from 'react-redux'
import './assets/css/theme.css'
import { Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Sessions from './components/sessions/Sessions'
import Vehicles from './components/vehicles/Vehicles'
import LogIn from './components/auth/LogIn'
import Signup from './components/auth/Signup'
import ForgotPassword from './components/auth/ForgotPassword'

class App extends Component {
  render() {
    const { auth } = this.props
    return (
      <BrowserRouter>
        <div className="App">
          {auth.isLoaded && auth.uid ? <Navbar/> : ''}

          <Route exact path="/" component={Dashboard} />
          <Route path="/sessions" component={Sessions} />
          <Route path="/vehicles" component={Vehicles} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgotpassword" component={ForgotPassword} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(App)
