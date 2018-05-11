import React, { Component } from "react";
import { Route, BrowserRouter,} from "react-router-dom";
import { Switch } from "react-router";
import LoginComponent from "./LoginComponent/LoginComponent";
import SignupComponent from "./SignupComponent/SignupComponent";
import { Redirect } from "react-router-dom";
// import LoginComponent from "./LoginComponent/LoginComponent";
// import ThreadComponent from "./ThreadComponent/ThreadComponent";
import EditorComponent from "./EditorComponent/EditorComponent";
import ThreadCollection from "./ThreadCollection/ThreadCollection";
import ThreadViewerComponent from "./ThreadViewerComponent/ThreadViewerComponent";
import NewThreadComponent, { NewThreadComopnent } from "./NewThreadComponent/NewThreadComponent";
// import ThreadReply from "./ThreadReply/ThreadReply";
import TopHeaderComponent from "./TopHeaderComponent/TopHeaderComponent";
import ControlListComponent from "./ControlsListComponent/ControlsListComponent";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DataSvc from "./dataSvc";

export default class Main extends Component{
    constructor(props){
        super(props);

        this.state={
            preLoaderActive:false,
            user:null,
            loginComponentData:{
                loginFailed:false,
                errorMsg:null,
                header:"Login",
            },
            signupComponentData:{
                sigupFailed:false,
                errorMsg:null,
                header:"SignUp"
            }
        }

        this.setPreloaderState=this.setPreloaderState.bind(this);
        this.updateUser=this.updateUser.bind(this);
    }

    componentDidMount(){
        var userData=DataSvc.getUserData();
        if(userData){
            this.tryLogin(userData);
        }
    }

    setPreloaderState=function(curState){
        this.setState({
            preLoaderActive:curState
        });
        console.log('preloader set',curState);
    }

    updateUser=function(user){
        if(!user){
            this.loggedIn=false;
            DataSvc.removeUserData();
        }
        this.setState({
            user:user
        });
        console.log(this);
    }

    submitNewThread(data){
        console.log("submitting ....",data);
        DataSvc.postThread({
            user:this.state.user,
            content:data.content,
            subject:data.subject,
            status:"open"
        }).then(data=>{
            console.log('created thread',data);
        });
    }

    tryLogin(inputData){
        console.log('try');
        this.setPreloaderState(true);
        
        DataSvc.tryUserLoginByIdPass(inputData.id,inputData.pass).then((data)=>{
            if(data.status==="success"){
                this.updateUser(data.uData);

            }else{
                this.setState({
                    loginComponentData:{
                        loginFailed:true,
                        errorMsg:data.error,
                        header:this.state.loginComponentData.header
                    }
                });
                console.log(this.state);
            }
            this.setPreloaderState(false);
        });
    }

    trySignup(inputData){
        console.log('sign up data ',inputData);
        this.setPreloaderState(true);
        DataSvc.signUp(inputData).then((data)=>{
            if(data.status==="success"){
                this.updateUser(data.uData);
            }else{
                this.setState({
                    signupComponentData:{
                        signupFailed:true,
                        errorMsg:data.error,
                        header:this.state.signupComponentData.header
                    }
                });
                console.log(this.state);
            }
            this.setPreloaderState(false);
        });
    }


    render(){

    var preloader=this.state.preLoaderActive?(
        
            <div style={{
                width:100+"%",
                position:"fixed",
                top:0+"px",
                zIndex:999
            }}>
                <div className="progress grey darken-3" style={{margin:0+'px'}}>
                    <div className="indeterminate grey lighten-2"></div>
                </div>
            </div>
        ):null;

        console.log('user in main',this.state);

        return( 
            <BrowserRouter>
                <div>
                    <div className="row cyan">
                        <TopHeaderComponent user={this.state.user} updateUserFun={this.updateUser}/>
                    </div>
                    {preloader}
                    <div className="row">
                        <div className="">
                            <div className="content">
                            {/* <Route exact path="/" component={Home}/> */}
                            <Switch>
                                <Route path="/Login" render={(props)=>{
                                    if(this.state.user&&!this.loggedIn){
                                        this.loggedIn=true;  
                                        props.history.goBack();
                                        return null;
                                    }else if(this.state.user){
                                        return <Redirect to='/'/>;
                                    }else{
                                        return (
                                            <div className="row">
                                                <center>
                                                <div className="col s12 m6 l4 offset-m3 offset-l4">
                                                    <LoginComponent loginFailed={this.state.loginComponentData.loginFailed}
                                                                    errorMsg={this.state.loginComponentData.errorMsg}
                                                                    header={this.state.loginComponentData.header}
                                                                    onSubmit={this.tryLogin.bind(this)}/>
                                                </div>
                                                </center>
                                            </div>
                                        );
                                    }
                                }}/>
                                <Route path="/SignUp" render={(props)=>{
                                    if(this.state.user&&!this.loggedIn){
                                        this.loggedIn=true;  
                                        props.history.goBack();
                                        return null;
                                    }else if(this.state.user){
                                        return <Redirect to='/'/>;
                                    }else{
                                        console.log('before signup main state',this.state);
                                        return (
                                            <div className="row">
                                                <center>
                                                <div className="col s12 m6 l4 offset-m3 offset-l4">
                                                    <SignupComponent isSignupFailed={this.state.signupComponentData.signupFailed}
                                                                    errorMsg={this.state.signupComponentData.errorMsg}
                                                                    header={this.state.signupComponentData.header}
                                                                    onSubmit={this.trySignup.bind(this)}/>
                                                </div>
                                                </center>
                                            </div>
                                        );
                                    }
                                }}/>
                                <Route exact path="/Threads" render={(props)=>{
                                    return (
                                        <div className="row">
                                            <div className="col s12 m9">
                                                <div className="content">
                                                    <ThreadCollection />
                                                </div>
                                            </div>
                                            <div className="col s3 hide-on-small-only">
                                                <ControlListComponent />
                                            </div>
                                        </div>
                                    );
                                }}/>
                                <Route exact path="/Threads/status/:status" render={(props)=>{
                                    return (
                                        <div className="row">
                                            <div className="col s12 m9">
                                                <div className="content">
                                                    <ThreadCollection status={props.match.params.status} {...props}/>
                                                </div>
                                            </div>
                                            <div className="col s3 hide-on-small-only">
                                                <ControlListComponent />
                                            </div>
                                        </div>
                                    );
                                }}/>
                                <Route exact path="/Threads/user/current" render={(props)=>{
                                    var userThreads;
                                    if(!(this.state.user)){
                                        userThreads="Login to view your threads";
                                    }else{
                                        userThreads=<ThreadCollection status={this.state.user._id} {...props}/>
                                    }
                                    return (
                                        <div className="row">
                                        <div className="col s12 m9">
                                            <div className="content">
                                                {userThreads}
                                            </div>
                                        </div>
                                        <div className="col s3 hide-on-small-only">
                                            <ControlListComponent/>
                                        </div>
                                    </div>
                                    );
                                }}/>
                                <Route path="/Thread/:id" render={(props)=>{
                                    window.scrollTo(0,0);
                                    return (
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="content">
                                                    <ThreadViewerComponent {...props} user={this.state.user}/>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }}/>
                                {/* <Route path="/Editor" render={(props)=>{
                                    return (
                                        <div className="row">
                                            <div className="col s12 m9">
                                                <div className="content">
                                                    <EditorComponent />
                                                </div>
                                            </div>
                                            <div className="col s3 hide-on-small-only">
                                                <ControlListComponent />
                                            </div>
                                        </div>
                                    );
                                }}/> */}
                                <Route path="/NewThread" render={(props)=>{
                                    var newThread;
                                    if(!(this.state.user)){
                                        newThread="Login to create new thread";
                                    }else{
                                        newThread=<NewThreadComopnent onSubmit={this.submitNewThread.bind(this)} user={this.state.user}/>
                                    }
                                    return (
                                        <div className="row">
                                        <div className="col s12 m9">
                                            <div className="content">
                                                {newThread}
                                            </div>
                                        </div>
                                        <div className="col s3 hide-on-small-only">
                                            <ControlListComponent/>
                                        </div>
                                    </div>
                                    );
                                }}/>
                                <Route exact path="/" render={(props)=>{
                                    return (
                                        <div className="row">
                                            <div className="col s12 m9">
                                                <div className="content">
                                                    This is home page
                                                </div>
                                            </div>
                                            <div className="col s3 hide-on-small-only">
                                                <ControlListComponent/>
                                            </div>
                                        </div>
                                    );
                                }}/>
                                <Route path="" render={(props)=>{
                                    return (
                                        <div className="row">
                                            <div className="col s12 m9">
                                                <div className="content">
                                                    Resource not found
                                                </div>
                                            </div>
                                            <div className="col s3 hide-on-small-only">
                                                <ControlListComponent/>
                                            </div>
                                        </div>
                                    );
                                }}/>
                                
                            </Switch>
                        </div>
                        </div>
                    </div>
                    
                </div>
            </BrowserRouter>
        );
    }
}