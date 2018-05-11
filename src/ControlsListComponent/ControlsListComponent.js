import React, { Component } from "react";
import {Link} from "react-router-dom";

export default class ControlListComponent extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <ul className="header">
                    <li><Link to="/NewThread">Create New Thread</Link></li>
                    <li><Link to="/Threads/status/open">Open threads</Link></li>
                    <li><Link to="/Threads/status/closed">Closed threads</Link></li>
                    <li><Link to="/Threads/user/current">My threads</Link></li>
                    <li><Link to="/Threads">All Threads</Link></li>
                </ul>
            </div>
        );
    }
}