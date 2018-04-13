import React, { Component } from "react";
import './LoginComponent.css';

export default class LoginComponent extends Component{
    constructor(props){
        super(props);
        this.state={
           isLoginFailed:false,
           errorMsg:"Wrong email or pass",
           header:"Login"
        }
        console.log('state',this.state);
        this.handleFormSubmit=this.formSubmit.bind(this);
        this.handleKeyDownSubmit=this.keyDownSubmit.bind(this);
    }

    formSubmit(e){
        var user={};
        user.id=this.formLogin[0].value;
        user.pass=this.formLogin[1].value;
        user.isAdmin=this.formLogin[2].checked;
        if(!user.id||!user.pass){
            this.setState({
                isLoginFailed:true,
                errorMsg:"Username and Password are required"
            });
            return;
        }else{
            this.setState({
                isLoginFailed:false,
                errorMsg:""
            });
        }
        var err;
        if(this.props.onSubmit){
            err=this.props.onSubmit(user);
        }
        if(err){
            this.setState({
                isLoginFailed:true,
                errorMsg:err
            });
        }
    }

    keyDownSubmit(e){
        if(e.nativeEvent.code==="Enter"){
            this.formSubmit();
        }
    }


    render(){
        console.log('login props',this.props);
        var isLoginFailed=this.props.loginFailed?this.props.loginFailed:this.state.isLoginFailed,
            errorMsg=this.props.errorMsg?this.props.errorMsg:this.state.errorMsg,
            header=this.props.header?this.props.header:this.state.header;
        return(
            <div className="login-form">
                <form ref={(el)=>this.formLogin=el} onKeyDown={this.handleKeyDownSubmit}>
                    <div className="row form-header">
                        <div className="center">
                            <h4>{header}</h4>
                        </div>
                    </div>
                    <div className="row form-body">
                        <div className="row form-entry input-field">
                            <label>Username</label>
                            <input type="text"/>
                        </div>
                        <div className="row form-entry input-field">
                            <label>Password</label>
                            <input type="password"/>
                        </div>
                        {
                            (isLoginFailed)?
                            <div className="row">
                                <div className="right red-text">{errorMsg}</div>
                            </div>:null
                        }
                        <div className="row">
                        <button className="btn waves-effect waves-light right" type="button" onClick={this.handleFormSubmit} name="action">Submit
                            <i className="material-icons right">send</i>
                        </button>
                        </div>
                    </div>
                    
                </form>
            </div>
        );
    }
}