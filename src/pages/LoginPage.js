import React, { Component } from "react";
import LoginComponent from "../LoginComponent/LoginComponent";
import { Redirect } from "react-router-dom";
import DataSvc from "../dataSvc";

export default class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoginFailed:false,
            errorMsg:null,
            header:props.header?props.header:"Login"
        }

    }

    async tryLogin(inputData){
        console.log(inputData);
        this.props.setPreloaderFun(true);
        
        DataSvc.tryUserLoginByIdPass(inputData.id,inputData.pass).then((data)=>{
            if(data.status==="success"){
                this.props.updateUserFun(data.uData);
            }else{
                this.setState({
                    isLoginFailed:true,
                    errorMsg:data.error
                });
                console.log(this.state);
            }
            this.props.setPreloaderFun(false);
        });
    }

    render(){
        return(
            this.props.user?(
                <Redirect to='/'/>
            ):(
                <div className="row">
                    <center>
                    <div className="col s12 m6 l4 offset-m3 offset-l4">
                        <LoginComponent loginFailed={this.state.isLoginFailed}
                                        errorMsg={this.state.errorMsg}
                                        header={this.state.header}
                                        onSubmit={this.tryLogin.bind(this)}/>
                    </div>
                    </center>
                </div>
            )
        );
    }
}