import React, { Component } from 'react'
import { connect } from 'react-redux'
import './assets/css/theme.css'
import { Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Sessions from './components/sessions/Sessions'
import SessionDetails from './components/sessions/SessionDetails'
import Tracks from './components/tracks/Tracks'
import TrackDetails from './components/tracks/TrackDetails'
import Vehicles from './components/vehicles/Vehicles'
import VehicleDetails from './components/vehicles/VehicleDetails'
import LogIn from './components/auth/LogIn'
import SignUp from './components/auth/SignUp'
import ForgotPassword from './components/auth/ForgotPassword'

class App extends Component {
  render() {
    const { auth } = this.props
    return (
      <BrowserRouter>
        <div className="App">
          {auth.isLoaded && auth.uid ? <Navbar/> : ''}

          <Route exact path="/" component={Dashboard} />
          <Route exact path="/sessions" component={Sessions} />
          <Route path='/sessions/:id' component={SessionDetails} />
          <Route exact path="/tracks" component={Tracks} />
          <Route path="/tracks/:id" component={TrackDetails} />
          <Route exact path="/vehicles" component={Vehicles} />
          <Route path="/vehicles/:id" component={VehicleDetails} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
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
