import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const NavItem = ({
  target,
  toggleMenu,
  icon,
  title,
}) => (

  <li className="nav-item">
    <NavLink className="nav-link" to={target} role="button" aria-expanded="true" aria-controls="sidebarDashboards" onClick={toggleMenu}>
      <i className={`fe fe-${icon != null ? icon : 'home'}`} />
      {' '}
      {title}
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
    </div> */ }
  </li>
);

export default withRouter(NavItem);
