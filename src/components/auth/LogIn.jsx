import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logIn } from '../../store/actions/authActions';

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showPassword: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { logInConnect } = this.props;
    logInConnect({ email, password });
  }

  toggleInput() {
    const { showPassword } = this.state;

    this.setState({ showPassword: !showPassword });
  }

  render() {
    const { authMessage, authType, auth } = this.props;
    const { showPassword } = this.state;
    if (!auth.isLoaded) return false;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="d-flex align-items-center bg-auth border-top border-top-2 border-primary">
        <div className="container-fluid px-0">
          <div className="row align-items-center justify-content-center mx-n2">
            <div className="col-11 col-md-5 col-lg-6 col-xl-4 px-lg-6 my-5">

              <h1 className="display-4 text-center mb-3">Sign in</h1>
              <p className="text-muted text-center mb-5">Ready to make some pace?</p>

              <form onSubmit={this.handleSubmit}>

                <div className="form-group">
                  <div className="row">
                    <label htmlFor="email" className="col col-12">
                      Email Address
                      <input type="email" className="form-control" placeholder="name@address.com" id="email" onChange={this.handleChange} />
                    </label>
                  </div>
                </div>

                <div className="form-group">

                  <div className="row">
                    <label htmlFor="password" className="col col-12">
                      Password
                      <div className="input-group input-group-merge">
                        <input type={!showPassword ? 'password' : 'text'} className="form-control form-control-appended" placeholder="Enter your password" id="password" onChange={this.handleChange} />
                        <button type="button" className="input-group-append btn u-show-password" onClick={this.toggleInput}>
                          <span className="input-group-text">
                            <i className="fe fe-eye" />
                          </span>
                        </button>
                      </div>
                    </label>
                    <div className="col-auto">
                      <Link to="/forgotpassword" className="form-text small text-muted">Forgot password?</Link>
                    </div>
                  </div>

                </div>

                <div className="form-group">
                  {authMessage ? <div className={`alert alert-${authType}`} role="alert">{authMessage.message}</div> : ''}
                </div>

                <input type="submit" className="btn btn-lg btn-block btn-primary mb-3" value="Sign in" />

                <p className="text-center">
                  <small className="text-muted text-center">
                    Don&apos;t have an account yet?
                    <Link to="/signup">Sign up</Link>
                    .
                  </small>
                </p>

              </form>

            </div>

            <div className="col-12 col-md-7 col-lg-6 col-xl-8 d-none d-lg-block">
              <div className="bg-cover vh-100 mt--1 mr--3 u-cover" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  authMessage: state.auth.authMessage,
  authType: state.auth.authType,
});

const mapDispatchToProps = (dispatch) => ({
  logInConnect: (creds) => dispatch(logIn(creds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
