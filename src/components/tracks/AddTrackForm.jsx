import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTrack } from '../../store/actions/trackActions';

class AddTrackForm extends Component {
  constructor(props) {
    super(props);

    const { user } = this.props;

    this.state = { user };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createTrackConnect } = this.props;
    const form = e.target;

    this.setState({
      trackName: form.querySelector('#track').value,
    }, () => {
      createTrackConnect(this.state);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Create track</h2>
        <hr />

        <div className="form-row">
          <div className="form-group col-12 mx-auto mb-0">

            <input type="text" id="track" className="form-control form-control-rounded py-3 px-4 mb-4" placeholder="Track name" />

          </div>
        </div>

        <hr />

        <button type="submit" className="btn btn-primary col-12 mt-4">Save</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createTrackConnect: (track) => dispatch(createTrack(track)),
});

export default connect(null, mapDispatchToProps)(AddTrackForm);
