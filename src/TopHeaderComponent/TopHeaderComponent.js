import React, { Component } from "react";

import { Link } from "react-router-dom";


export default class TopHeaderComponent extends Component{

    constructor(props){
        super(props);

        this.state={
            user:{
                id:"",
                dp:"react.png"
            }
        }
    }

    render(){

        var loginLink=this.props.user&&this.props.user.id?(
            <div style={{display:"flex"}}>
                <Link to="#" onClick={()=>alert('hello '+this.props.user.id)}>
                    {this.props.user.id}
                </Link>
                <Link to="##" onClick={()=>{this.props.updateUserFun(null);alert('Logout success')}}>
                    {"Logout"}
                </Link>
            </div>
        ):
        (<Link to="/login">Login</Link>);


        return(
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper  grey darken-3">
                    <Link to="#" className="brand-logo left" style={{paddingLeft:"10px"}}>Forum Name</Link>
                    <ul id="nav-mobile hide-on-small-only" className="right">
                        <li><Link to="/editor">Home</Link></li>
                        <li><Link to="">Components</Link></li>
                        <li>{loginLink}</li>
                    </ul>
                    </div>
                </nav>
            </div>
        );
    }
}