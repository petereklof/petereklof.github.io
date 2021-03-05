import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteTrack } from '../../store/actions/trackActions';

class TrackItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showDropdown: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleToggleDropdown = this.handleToggleDropdown.bind(this);
    this.handleDeleteTrack = this.handleDeleteTrack.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleToggleDropdown() {
    const { showDropdown } = this.state;

    this.setState({ showDropdown: !showDropdown });
  }

  handleDeleteTrack() {
    const { deleteTrackConnect, item } = this.props;
    const { id } = item;
    deleteTrackConnect(id);
  }

  render() {
    const { item, admin } = this.props;
    const { showModal, showDropdown } = this.state;

    const ddClasses = classNames({
      'dropdown-menu dropdown-menu-right': true,
      show: showDropdown,
    });

    const editRemove = admin ? (
      <div>
        <button className="dropdown-item" type="button" onClick={ this.handleOpenModal }>Edit track</button>
        <button className="dropdown-item" type="button" onClick={this.handleDeleteTrack}>Remove track</button>
      </div>
    ) : '';

    const icon = admin ? (
      <i className="fe fe-unlock text-success mr-2" />
    ) : (
      <i className="fe fe-lock text-muted mr-2" />
    );

    return (
      <li className="list-group-item">
        <div className="row align-items-center">

          <div className="col ml-n2">

            <h4 className="mb-1 name">
              <Link to={`/tracks/${item.id}`}>
                {icon}
                {'\u00A0'}
                {item.name}
                {'\u00A0'}
                {item.model}
              </Link>
            </h4>

          </div>
          <div className="col-auto">

            <div className="dropdown">
              <button type="button" className="btn dropdown-ellipses dropdown-toggle" onClick={this.handleToggleDropdown} aria-haspopup="true" aria-expanded="false">
                <i className="fe fe-more-vertical" />
              </button>
              <div className={ddClasses}>
                <Link to={`/tracks/${item.id}`} className="dropdown-item">View track</Link>
                {editRemove}
              </div>
            </div>

          </div>
        </div>

        <ReactModal
          isOpen={showModal}
          contentLabel="Show session"
          className="modal"
          overlayClassName="modal-backdrop"
          closeTimeoutMS={300}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick
          ariaHideApp={false}
        >
          fasfsd
        </ReactModal>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteTrackConnect: (track) => dispatch(deleteTrack(track)),
});

export default connect(null, mapDispatchToProps)(TrackItem);
