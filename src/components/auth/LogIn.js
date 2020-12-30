import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logIn } from '../../store/actions/authActions'
import { Link, Redirect } from 'react-router-dom'

class LogIn extends Component {
    state = {
        email: '',
        password: '',
        showPassword: false
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.logIn({email: this.state.email, password: this.state.password})
    }
    toggleInput = () => {
        this.setState({ showPassword: !this.state.showPassword })
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

                            <h1 className="display-4 text-center mb-3">Sign in</h1>
                            <p className="text-muted text-center mb-5">Ready to make some pace?</p>

                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" className="form-control" placeholder="name@address.com" id="email" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">

                                    <div className="row">
                                        <div className="col">
                                            <label>Password</label>
                                        </div>
                                        <div className="col-auto">
                                            <Link to="/forgotpassword" className="form-text small text-muted">Forgot password?</Link>
                                        </div>
                                    </div>

                                    <div className="input-group input-group-merge">
                                        <input type={ !this.state.showPassword ? 'password' : 'text' } className="form-control form-control-appended" placeholder="Enter your password" id="password" onChange={this.handleChange} />
                                        <div className="input-group-append" onClick={this.toggleInput}>
                                            <span className="input-group-text">
                                                <i className="fe fe-eye"></i>
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                <div className="form-group">
                                    {authMessage ? <div className={ 'alert alert-' + authType } role="alert">{authMessage.message}</div> : ''}
                                </div>

                                <button className="btn btn-lg btn-block btn-primary mb-3">Sign in</button>

                                <p className="text-center">
                                    <small className="text-muted text-center">Don't have an account yet? <Link to='/signup'>Sign up</Link>.</small>
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
        logIn: (creds) => dispatch(logIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)