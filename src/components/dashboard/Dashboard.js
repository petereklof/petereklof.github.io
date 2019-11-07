import React, { Component } from "react";
import Headline from "../layout/Headline";  

class Dashboard extends Component {
    render() {
        return (
            <div className="main-content">
                <Headline preTitle='Welcome!' title='Dashboard'></Headline>
            </div>
        )
    }
}

export default Dashboard