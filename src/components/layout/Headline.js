import React from 'react';

const Headline = (props) => {
    return (
        <div className="header">
            <div className="container-fluid">

                <div className="header-body">
                    <div className="row align-items-center">

                        <div className="col ml-md--2">
                            <h6 className="header-pretitle">{props.preTitle}</h6>
                            <h1 className="header-title">{props.title}</h1>
                        </div>

                        {props.children}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Headline