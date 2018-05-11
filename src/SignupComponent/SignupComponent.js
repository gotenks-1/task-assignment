import React, { Component } from "react";
import {Link} from "react-router-dom";
import './SignupComponent.css';

export default class SignupComponent extends Component{
    constructor(props){
        super(props);
        this.state={
           isSignupFailed:false,
           errorMsg:"Wrong email or pass",
           header:"SignUp"
        }
        this.handleFormSubmit=this.formSubmit.bind(this);
        this.handleKeyDownSubmit=this.keyDownSubmit.bind(this);
    }

    validEmail(email){
        var regex=/^[\w][\w\.+-]*[\w]@[\w][\w-]*[\w](\.\w{2,}){1,3}$/i;
        return regex.test(email);        
    }

    formSubmit(e){
        var user={};
        user.id=this.formSignup[0].value;
        user.email=this.formSignup[1].value;
        user.pass=this.formSignup[2].value;
        user.cPass=this.formSignup[3].value;
        if(!user.id||!user.pass||!user.pass||!user.cPass){
            this.setState({
                isSignupFailed:true,
                errorMsg:"All fields are mandatory"
            });
            return;
        }else if(!this.validEmail(user.email)){
            this.setState({
                isSignupFailed:true,
                errorMsg:"Invalid Email"
            });
            return;
        }else if(user.pass!==user.cPass){
            this.setState({
                isSignupFailed:true,
                errorMsg:"Pass and confirm pass don't match"
            });
            return;
        }else{
            this.setState({
                isSignupFailed:false,
                errorMsg:null
            });
        }
        var err;
        if(this.props.onSubmit){
            err=this.props.onSubmit(user);
        }
        if(err){
            this.setState({
                isSignupFailed:true,
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
        console.log('signup props',this.props);
        var isSignupFailed=this.props.isSignupFailed?this.props.isSignupFailed:this.state.isSignupFailed,
            errorMsg=this.props.errorMsg?this.props.errorMsg:this.state.errorMsg,
            header=this.props.header?this.props.header:this.state.header;
        return(
            <div className="login-form">
                <form ref={(el)=>this.formSignup=el} onKeyDown={this.handleKeyDownSubmit}>
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
                            <label>Email</label>
                            <input type="text"/>
                        </div>
                        <div className="row form-entry input-field">
                            <label>Password</label>
                            <input type="password"/>
                        </div>
                        <div className="row form-entry input-field">
                            <label>Confirm pass</label>
                            <input type="password"/>
                        </div>
                        {
                            (isSignupFailed)?
                            <div className="row">
                                <div className="right red-text">{errorMsg}</div>
                            </div>:null
                        }
                        <div className="row">
                        <button className="btn waves-effect waves-light right" type="button" onClick={this.handleFormSubmit} name="action">Submit
                            <i className="material-icons right">send</i>
                        </button>
                        </div>
                        <div className="row right">
                            <Link to="/Login"><span  style={{}}>Already have an account? Login here</span></Link>
                        </div>
                    </div>
                    
                </form>
            </div>
        );
    }
}