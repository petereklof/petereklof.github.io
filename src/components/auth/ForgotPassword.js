import React, { Component } from 'react'
import { forgotPassword } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

class ForgotPassword extends Component {
    state = {
        email: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.forgotPassword(this.state);
    }

    render() {
        const { authMessage, authType, auth } = this.props;
        if (!auth.isLoaded) return false
        if (auth.uid) return <Redirect to='/' />
        return (
            <div className="d-flex align-items-center bg-auth border-top border-top-2 border-primary">
                <div className="container-fluid px-0">
                    <div className="row align-items-center justify-content-center mx-n2">
                        <div className="col-11 col-md-5 col-lg-6 col-xl-4 px-lg-6 my-5">

                            <h1 className="display-4 text-center mb-3">Forgot password</h1>
                            <p className="text-muted text-center mb-5">Enter your email to get a password reset link.</p>

                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" className="form-control" placeholder="name@address.com" id="email" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    {authMessage ? <div className={'alert alert-' + authType} role="alert">{authMessage}</div> : ''}
                                </div>

                                <button className="btn btn-lg btn-block btn-primary mb-3">Reset password</button>

                                <p className="text-center">
                                    <small className="text-muted text-center">Remember your password? <Link to="/login">Sign in</Link>.</small>
                                </p>

                            </form>

                        </div>

                        <div className="col-12 col-md-7 col-lg-6 col-xl-8 d-none d-lg-block">
                            <div className="bg-cover vh-100 mt--1 mr--3 u-cover"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authMessage: state.auth.authMessage,
        authType: state.auth.authType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (creds) => dispatch(forgotPassword(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)