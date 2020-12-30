import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Avatar from "../auth/Avatar";
import CoverImage from '../../assets/img/dashboard.jpg'
import StatsWidget from "../sessions/StatsWidget";
import TodoWidget from "../todos/TodoWidget";

class Dashboard extends Component {
    render() {
        const { auth } = this.props;
        if (!auth.isLoaded) return false
        if (!auth.uid) return <Redirect to='/login' />
        return (
            <div className="main-content">
                <div className="header">

                    <img src={CoverImage} className="header-img-top" alt="Pacemakr" />

                    <div className="container-fluid">

                        <div className="header-body mt--5 mt-md--6">
                            <div className="row align-items-end">

                                <div className="col-auto">
                                    <Avatar profile={this.props.profile} size="xxl" />
                                </div>

                                <div className="col mb-3 ml--3 ml-md--2">
                                    <h6 className="header-pretitle">Welcome to Pacemakr,</h6>
                                    <h1 className="header-title">{this.props.profile.firstName} {this.props.profile.lastName}</h1>
                                </div>

                            </div>

                            <div className="row align-items-center">
                                <div className="col">

                                    <ul className="nav nav-tabs nav-overflow header-tabs">
                                        <li className="nav-item">
                                            <a href="#" className="nav-link active">Dashboard</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">Profile</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">Nav 3</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">Nav 4</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">Nav 5</a>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-xl-4">

                            <TodoWidget />

                        </div>
                        <div className="col-12 col-xl-8">
                            <StatsWidget />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-xl-7">

                            <div className="card">

                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h4 className="card-header-title">Goals</h4>
                                        </div>
                                        <div className="col-auto">
                                            <a href="#!" className="btn btn-sm btn-white">Export</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive mb-0" data-toggle="lists" data-lists-values='["goal-project", "goal-status", "goal-progress", "goal-date"]'>
                                    <table className="table table-sm table-nowrap card-table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <a href="#" className="text-muted sort" data-sort="goal-project">Goal</a>
                                                </th>
                                                <th>
                                                    <a href="#" className="text-muted sort" data-sort="goal-status">Status</a>
                                                </th>
                                                <th>
                                                    <a href="#" className="text-muted sort" data-sort="goal-progress">Progress</a>
                                                </th>
                                                <th>
                                                    <a href="#" className="text-muted sort" data-sort="goal-date">Due date</a>
                                                </th>
                                                <th className="text-right">Team</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className="list">
                                            <tr>
                                                <td className="goal-project">Update the API</td>
                                                <td className="goal-status"><span className="text-warning">●</span> In progress</td>
                                                <td className="goal-progress">55%</td>
                                                <td className="goal-date">
                                                    <time datetime="2018-10-24">07/24/18</time>
                                                </td>
                                                <td className="text-right">
                                                    <div className="avatar-group">
                                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                                            <img src="assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Ab Hadley">
                                                            <img src="assets/img/avatars/profiles/avatar-2.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Adolfo Hess">
                                                            <img src="assets/img/avatars/profiles/avatar-3.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Daniela Dewitt">
                                                            <img src="assets/img/avatars/profiles/avatar-4.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <div className="dropdown">
                                                        <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-boundary="window">
                                                            <i className="fe fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right">
                                                            <a href="#!" className="dropdown-item">Action</a>
                                                            <a href="#!" className="dropdown-item">Another action</a>
                                                            <a href="#!" className="dropdown-item">Something else here</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="goal-project">Release v1.2-Beta</td>
                                                <td className="goal-status"><span className="text-warning">●</span> In progress</td>
                                                <td className="goal-progress">25%</td>
                                                <td className="goal-date">
                                                    <time datetime="2018-10-24">08/26/18</time>
                                                </td>
                                                <td className="text-right">
                                                    <div className="avatar-group justify-content-end">
                                                        <a href="#!" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                                            <img src="assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                        <a href="#!" className="avatar avatar-xs" data-toggle="tooltip" title="Ab Hadley">
                                                            <img src="assets/img/avatars/profiles/avatar-2.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                        <a href="#!" className="avatar avatar-xs" data-toggle="tooltip" title="Adolfo Hess">
                                                            <img src="assets/img/avatars/profiles/avatar-3.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <div className="dropdown">
                                                        <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-boundary="window">
                                                            <i className="fe fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right">
                                                            <a href="#!" className="dropdown-item">Action</a>
                                                            <a href="#!" className="dropdown-item">Another action</a>
                                                            <a href="#!" className="dropdown-item">Something else here</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="goal-project">GDPR Compliance</td>
                                                <td className="goal-status"><span className="text-success">●</span> Completed</td>
                                                <td className="goal-progress">100%</td>
                                                <td className="goal-date">
                                                    <time datetime="2018-10-24">06/19/18</time>
                                                </td>
                                                <td className="text-right">
                                                    <div className="avatar-group justify-content-end">
                                                        <a href="#!" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                                            <img src="assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                        <a href="#!" className="avatar avatar-xs" data-toggle="tooltip" title="Ab Hadley">
                                                            <img src="assets/img/avatars/profiles/avatar-2.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                        <a href="#!" className="avatar avatar-xs" data-toggle="tooltip" title="Adolfo Hess">
                                                            <img src="assets/img/avatars/profiles/avatar-3.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <div className="dropdown">
                                                        <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-boundary="window">
                                                            <i className="fe fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right">
                                                            <a href="#!" className="dropdown-item">Action</a>
                                                            <a href="#!" className="dropdown-item">Another action</a>
                                                            <a href="#!" className="dropdown-item">Something else here</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="goal-project">v1.2 Documentation</td>
                                                <td className="goal-status"><span className="text-danger">●</span> Cancelled</td>
                                                <td className="goal-progress">0%</td>
                                                <td className="goal-date">
                                                    <time datetime="2018-10-24">06/25/18</time>
                                                </td>
                                                <td className="text-right">
                                                    <div className="avatar-group justify-content-end">
                                                        <a href="#!" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                                            <img src="assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                        <a href="#!" className="avatar avatar-xs" data-toggle="tooltip" title="Ab Hadley">
                                                            <img src="assets/img/avatars/profiles/avatar-2.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <div className="dropdown">
                                                        <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-boundary="window">
                                                            <span className="fe fe-more-vertical"></span>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right">
                                                            <a href="#!" className="dropdown-item">Action</a>
                                                            <a href="#!" className="dropdown-item">Another action</a>
                                                            <a href="#!" className="dropdown-item">Something else here</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="goal-project">Plan design offsite</td>
                                                <td className="goal-status"><span className="text-success">●</span> Completed</td>
                                                <td className="goal-progress">100%</td>
                                                <td className="goal-date">
                                                    <time datetime="2018-10-24">06/30/18</time>
                                                </td>
                                                <td className="text-right">
                                                    <div className="avatar-group justify-content-end">
                                                        <a href="#!" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                                            <img src="assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                        <a href="#!" className="avatar avatar-xs" data-toggle="tooltip" title="Ab Hadley">
                                                            <img src="assets/img/avatars/profiles/avatar-2.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                        <a href="#!" className="avatar avatar-xs" data-toggle="tooltip" title="Adolfo Hess">
                                                            <img src="assets/img/avatars/profiles/avatar-3.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                        <a href="#!" className="avatar avatar-xs" data-toggle="tooltip" title="Daniela Dewitt">
                                                            <img src="assets/img/avatars/profiles/avatar-4.jpg" className="avatar-img rounded-circle" alt="..." />
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <div className="dropdown">
                                                        <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-boundary="window">
                                                            <i className="fe fe-more-vertical"></i>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right">
                                                            <a href="#!" className="dropdown-item">Action</a>
                                                            <a href="#!" className="dropdown-item">Another action</a>
                                                            <a href="#!" className="dropdown-item">Something else here</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-xl-5">


                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-xl-10">

                                            <img src="assets/img/illustrations/happiness.svg" alt="..." className="img-fluid mt--5 mb-4" style={{maxWidth: "272px"}} />
                                            <h2 className="mb-2">We released 2008 new versions of our theme for glory.</h2>
                                            <p className="text-muted">This is a true story and totally not made up. This is going to be better in the long run but for now this is the way it is.</p>
                                            <a href="#!" className="btn btn-primary">Try it for free</a>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
                                                                                                    
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}
                                                                                                    
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
{collection: 'users' }
    ])
)(Dashboard)