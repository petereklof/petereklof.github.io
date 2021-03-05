import React from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Headline from '../layout/Headline';
import Spinner from '../layout/Spinner';
import QuickStatCard from '../layout/QuickStatCard';

const VehicleDetails = (props) => {
  const { auth, vehicle } = props;

  if (!auth.isLoaded) return false;
  if (!auth.uid) return <Redirect to="/login" />;

  if (vehicle) {
    const heading = `${vehicle.brand} ${vehicle.model}`;

    return (
      <div className="main-content">
        <Headline preTitle="Your precious" title={heading} />

        <div className="container-fluid">

          {/* Quick stat cards */}
          <div className="row">

            <QuickStatCard>
              <div className="col">
                <h6 className="text-uppercase text-muted mb-2">Brand</h6>
                <span className="h2 mb-0">
                  {vehicle.brand}
                </span>
              </div>
              <div className="col-auto">
                <span className="h2 fe fe-clipboard text-muted mb-0" />
              </div>
            </QuickStatCard>

            <QuickStatCard>
              <div className="col">
                <h6 className="text-uppercase text-muted mb-2">Model</h6>
                <span className="h2 mb-0">
                  {vehicle.model}
                </span>
              </div>
              <div className="col-auto">
                <span className="h2 fe fe-award text-muted mb-0" />
              </div>
            </QuickStatCard>

          </div>
          {/* End Quick stat cards */}

        </div>
      </div>
    );
  }
  return (
    <div className="main-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const { vehicles } = state.firestore.data;
  const vehicle = vehicles ? vehicles[id] : null;
  return {
    auth: state.firebase.auth,
    vehicle,
  };
};

export default compose(
  firestoreConnect([
    { collection: 'vehicles' },
  ]),
  connect((mapStateToProps)),
)(VehicleDetails);
