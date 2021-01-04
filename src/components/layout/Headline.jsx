import React from 'react';

const Headline = ({
  preTitle,
  title,
  children,
}) => (
  <div className="header">
    <div className="container-fluid">

      <div className="header-body">
        <div className="row align-items-center">

          <div className="col ml-md--2">
            <h6 className="header-pretitle">{preTitle}</h6>
            <h1 className="header-title">{title}</h1>
          </div>

          {children}

        </div>
      </div>

    </div>
  </div>
);

export default Headline;
