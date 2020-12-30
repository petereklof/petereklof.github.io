import React from 'react'

const TodoWidget = (props) => {
    return ( 
        <div className="card">
            
            <div className="card-header">
                <div className="row align-items-center">

                    <div className="col">
                        <h4 className="card-header-title">To do's</h4>
                    </div>
                    <div className="col-auto">
                        <a href="#!" className="small">View all</a>
                    </div>
                </div>
            </div>

            <div className="card-body">

                <div className="row align-items-center">
                    
                    <div className="col-auto">
                        <a href="project-overview.html" className="avatar avatar-4by3">
                            <img src="assets/img/avatars/projects/project-1.jpg" alt="..." className="avatar-img rounded" />
                        </a>
                    </div>
                    
                    <div className="col ml--2">
                        <h4 className="card-title mb-1">
                            <a href="project-overview.html">Homepage Redesign</a>
                        </h4>
                        <p className="card-text small text-muted">
                            <time dateTime="2018-05-24">Updated 5hr ago</time>
                        </p>
                    </div>

                    <div className="col-auto">
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
                    </div>

                </div>

                <hr />

                <div className="row align-items-center">

                    <div className="col-auto">
                        <a href="project-overview.html" className="avatar avatar-4by3">
                            <img src="assets/img/avatars/projects/project-2.jpg" alt="..." className="avatar-img rounded" />
                        </a>
                    </div>

                    <div className="col ml--2">
                        <h4 className="card-title mb-1">
                            <a href="project-overview.html">Travels & Time</a>
                        </h4>
                        <p className="card-text small text-muted">
                            <time dateTime="2018-05-24">Updated 3hr ago</time>
                        </p>
                    </div>

                    <div className="col-auto">
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
                    </div>

                </div>

                <hr />

                <div className="row align-items-center">
                    
                    <div className="col-auto">
                        <a href="project-overview.html" className="avatar avatar-4by3">
                            <img src="assets/img/avatars/projects/project-3.jpg" alt="..." className="avatar-img rounded" />
                        </a>
                    </div>

                    <div className="col ml--2">
                        <h4 className="card-title mb-1">
                            <a href="project-overview.html">Safari Exploration</a>
                        </h4>
                        <p className="card-text small text-muted">
                            <time dateTime="2018-05-24">Updated 10hr ago</time>
                        </p>
                    </div>

                    <div className="col-auto">
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
                    </div>

                </div>

                <hr />

                <div className="row align-items-center">
                    
                    <div className="col-auto">
                        <a href="project-overview.html" className="avatar avatar-4by3">
                            <img src="assets/img/avatars/projects/project-5.jpg" alt="..." className="avatar-img rounded" />
                        </a>
                    </div>

                    <div className="col ml--2">
                        <h4 className="card-title mb-1">
                            <a href="project-overview.html">Personal Site</a>
                        </h4>
                        <p className="card-text small text-muted">
                            <time dateTime="2018-05-24">Updated 4hr ago</time>
                        </p>
                    </div>

                    <div className="col-auto">
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
                    </div>
                    
                </div>

            </div>
        </div>
    );
}
 
export default TodoWidget;