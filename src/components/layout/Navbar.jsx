import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'babel-polyfill';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Avatar from '../auth/Avatar';
import { logOut } from '../../store/actions/authActions';
import Logo from '../../assets/img/logo.svg';
import NavItem from './NavItem';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logOut(e) {
    e.preventDefault();
    const { logOutConnect } = this.props;
    logOutConnect();
  }

  toggleMenu() {
    const { showMenu } = this.state;
    this.setState({ showMenu: !showMenu });
  }

  render() {
    const { profile } = this.props;
    const { showMenu } = this.state;

    return (
      <nav className="navbar u-navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
        <div className="container-fluid">

          <button className="u-navbar-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleMenu}>
            <span className="navbar-toggler-icon" />
          </button>

          <Link className="u-navbar-brand navbar-brand" to="/">
            <img src={Logo} className="navbar-brand-img mx-auto" alt="Pacemakr" />
          </Link>

          <div className="navbar-user d-md-none">
            <div className="dropdown" target="/">

              <a
                href="#!"
                id="sidebarIcon"
                className="dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Avatar profile={profile} size="sm" />
              </a>

              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="sidebarIcon">
                <a href="profile-posts.html" className="dropdown-item">Profile</a>
                <a href="settings.html" className="dropdown-item">Settings</a>
                <hr className="dropdown-divider" />
                <button className="dropdown-item btn" type="button" onClick={this.logOut}>Logout</button>
              </div>

            </div>
          </div>

          <div className={`collapse navbar-collapse u-navlist${showMenu ? ' show' : ''}`} id="sidebarCollapse">

            <ul className="navbar-nav pt-3">
              <NavItem target="/" title="Dashboard" toggleMenu={this.toggleMenu} />
              <NavItem target="/sessions" title="Sessions" icon="zap" toggleMenu={this.toggleMenu} />
              <NavItem target="/tracks" title="Tracks" icon="map-pin" toggleMenu={this.toggleMenu} />
              <NavItem target="/vehicles" title="Vehicles" icon="disc" toggleMenu={this.toggleMenu} />

              <li className="nav-item d-md-none">
                <a className="nav-link" href="#sidebarModalActivity" data-toggle="modal">
                  <span className="fe fe-bell" />
                  {' '}
                  Notifications
                </a>
              </li>
              <li className="nav-item">
                <hr />
                <button type="button" className="nav-link btn" href="#" onClick={this.logOut}>
                  <i className="fe fe-log-out" />
                  Logout
                </button>
              </li>
            </ul>

            <div className="mt-auto" />

            <div className="navbar-user d-none d-md-flex" id="sidebarUser">

              <a href="#sidebarModalActivity" className="navbar-user-link" data-toggle="modal">
                <span className="icon">
                  <i className="fe fe-bell" />
                </span>
              </a>

              <div className="dropup">

                <button
                  type="button"
                  id="sidebarIconCopy"
                  className="dropdown-toggle btn"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Avatar profile={profile} />
                </button>

                <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
                  <a href="profile-posts.html" className="dropdown-item">Profile</a>
                  <a href="settings.html" className="dropdown-item">Settings</a>
                  <hr className="dropdown-divider" />
                  <button className="dropdown-item btn" type="button" onClick={this.logOut}>Logout</button>
                </div>

              </div>

              <a type="button" href="#sidebarModalSearch" className="navbar-user-link" data-toggle="modal">
                <span className="icon">
                  <i className="fe fe-settings" />
                </span>
              </a>

            </div>

          </div>

        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

const mapDispatchToProps = (dispatch) => ({
  logOutConnect: () => dispatch(logOut()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'users' },
  ]),
)(Navbar);
