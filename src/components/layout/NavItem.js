import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

const NavItem = (props) => {
    return (
        <li className="nav-item">
            <NavLink className="nav-link" to={props.target} role="button" aria-expanded="true" aria-controls="sidebarDashboards" onClick={props.toggleMenu}>
                <i className={'fe fe-' + (props.icon ? props.icon : 'home')}></i> {props.title}
            </NavLink>
            { /* <div className="collapse show" id="sidebarDashboards">
                <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                        <a href="index.html" className="nav-link ">
                            Default
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="dashboard-alt.html" className="nav-link active">
                            Alternative <span className="badge badge-soft-success ml-auto">New</span>
                        </a>
                    </li>
                </ul>
            </div> */}
        </li>
    )
}

export default withRouter(NavItem)