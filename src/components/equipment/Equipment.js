import React, { Component } from "react";
import Headline from "../layout/Headline";
import 'babel-polyfill';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Spinner from "../layout/Spinner";
import EquipmentItem from "./EquipmentItem";

class Equipment extends Component {
    state = {
        equipment: false
    }

    componentDidUpdate(prevProps) {
        if (prevProps.equipment !== this.props.equipment) {
            this.setState({equipment: true})
        }
    }  

    render() {

        const equipmentList = this.state.equipment === true ? this.props.equipment.map(item => {
            console.log(this.props.brands)
            console.log(item)
            return (
                <EquipmentItem key={item.id} item={item} />
            )
        }) : <Spinner />

        return (
            <div>
                <Headline preTitle='All your shiny' title='Equipment'>
                    <div className="col-2 text-right">
                        <button className="btn btn-primary d-none d-md-inline-block btn-rounded-circle" onClick={this.handleOpenModal}>+</button>
                    </div>
                </Headline>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">

                            <div className="card" data-toggle="lists" data-lists-values='["name"]'>
                                <div className="card-body">

                                    <ul className="list-group list-group-lg list-group-flush list my--4">
                                        {equipmentList}
                                    </ul>
                                
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        equipment: state.firestore.ordered.equipment,
        brands: state.firestore.ordered.brands
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'equipment' },
        { collection: 'brands' }
    ])
)(Equipment)