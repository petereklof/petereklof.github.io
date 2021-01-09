import React from 'react';

const QuickStatCard = ({ children }) => (

  <div className="col-12 col-lg-6 col-xl">
    <div className="card">
      <div className="card-body">
        <div className="row align-items-center">

          {children}

        </div>
      </div>
    </div>
  </div>
);

export default QuickStatCard;
