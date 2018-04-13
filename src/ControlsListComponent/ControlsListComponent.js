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
                    <li><Link to="/Threads/open">Open thread</Link></li>
                    <li><Link to="/Threads/closed">Closed thread</Link></li>
                    <li><Link to="/Editor">Editor Component</Link></li>
                    <li><Link to="/Threads">Threads</Link></li>
                    <li><Link to="/Reply">Reply</Link></li>
                </ul>
            </div>
        );
    }
}