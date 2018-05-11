import React, { Component } from "react";
import './NewThreadComponent.css';
import EditorComponent from "../EditorComponent/EditorComponent";

export class NewThreadComopnent extends Component{

    constructor(props){
        super(props);
        
        this.state={};
    }

    handleSubmit(data){
        if((!this.dataSub)||this.dataSub.length<2){
            this.setState({
                msg: "Length of subject cannot be less than 2"
            });
        }
        if(data.length<1){
            this.setState({
                msg: "Missing thread content"
            });
        }else{
            this.setState({
                msg: null
            });
        }
        
        if(typeof this.props.onSubmit==="function"){
            this.props.onSubmit({
                subject: this.dataSub,
                content: data
            });
        }
    }

    render(){

        return(
            <div>
                <div className="row">
                    <h5>
                        Create new thread
                    </h5>
                    <span style={{color:"red"}} >{this.state.msg}</span>
                </div>
                <div>
                    <div className="row form-entry input-field">
                        <label>Subject</label>
                        <input type="text" onChange={(e)=>{this.dataSub=e.nativeEvent.target.value}} />
                    </div>
                </div>
                <div>
                    <EditorComponent onSubmit={this.handleSubmit.bind(this)}/>
                </div>
            </div>
        );
    }

}
