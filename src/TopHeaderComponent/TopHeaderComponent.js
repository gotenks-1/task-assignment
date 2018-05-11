import React, { Component } from "react";
import "./TopHeaderComponent.css";
import { Link } from "react-router-dom";
import * as Fa from "react-icons/lib/fa";
import ControlListComponent from "../ControlsListComponent/ControlsListComponent";


export default class TopHeaderComponent extends Component{

    constructor(props){
        super(props);

        this.state={
            user:{
                id:"",
                dp:"react.png"
            },
        }
        this.displayOptions=false;
    }
  
    componentDidMount(){
        this.optionsRef.addEventListener("click",(e)=>{     
            console.log('clicked',e);
            setTimeout(()=>{
                this.toggleDisplay();
            },0);
        },false);

        this.optionsRef.addEventListener("blur",(e)=>{
            console.log('flost',e);
            if(e.relatedTarget&&(this.optionsRef.contains(e.relatedTarget)||e.relatedTarget==this._clickTarget)){
                return;
            }
            console.log("blur",e,this.optionsRef,this._clickTarget);
            this.toggleDisplay();
        },false);
    }

    toggleDisplay(){
        this.displayOptions=!this.displayOptions;
        var style=this.optionsRef.style;
        if(this.displayOptions){
                style.zIndex=9999;
                style.backgroundColor="white";
                style.position="absolute";
                style.top="100%";
                style.right="0%";
                style.display="block";
        }else{
            style.display="none";
            console.log('hiding');
        }
    }

    showOptions(event){
        this.toggleDisplay();
        this._clickTarget=event.target;
        while(this._clickTarget.tagName!="A"){
            this._clickTarget=this._clickTarget.parentNode;
        }
            if(this.optionsRef){
                this.optionsRef.focus();
            }
    }

    render(){

        var loginLink=this.props.user&&this.props.user._id?(
            <div style={{display:"flex"}}>
                <Link to="#" onClick={()=>alert('hello '+this.props.user._id)}>
                    {this.props.user._id}
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
                    <Link to="/Threads" className="brand-logo left" style={{paddingLeft:"10px"}}>Forum Name</Link>
                    <ul className="nav-mobile right">
                        <li className="hide-on-small-only"><Link to="/">Home</Link></li>
                        <li className="hide-on-small-only"><Link to="">Components</Link></li>
                        <li>{loginLink}</li>
                        <li className="hide-on-med-and-up"><a tabIndex="0" onClick={this.showOptions.bind(this)}><Fa.FaEllipsisV/></a></li>
                    </ul>
                    </div>
                </nav>
                
                        <div ref={el=>this.optionsRef=el} tabIndex="0" className="options">
                            <ControlListComponent/>
                        </div>
                
            </div>
        );
    }
}