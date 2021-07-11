import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Avatar from '../auth/Avatar';
import CoverImage from '../../assets/img/dashboard.jpg';

export const Dashboard = ({ auth, profile }) => {
  if (!auth.isLoaded) return false;
  if (!auth.uid) return <Redirect to="/login" />;

  return (
    <div className="main-content">
      <div className="header">

        <img src={CoverImage} className="header-img-top" alt="Pacemakr" />

        <div className="container-fluid">

          <div className="header-body mt--5 mt-md--6">
            <div className="row align-items-end">

              <div className="col-auto">
                <Avatar profile={profile} size="xxl" />
              </div>

              <div className="col mb-3 ml--3 ml-md--2">
                <h6 className="header-pretitle">Welcome to Pacemakr,</h6>
                <h1 className="header-title">
                  {profile.firstName}
                  {' '}
                  {profile.lastName}
                </h1>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users' },
  ]),
)(Dashboard);
