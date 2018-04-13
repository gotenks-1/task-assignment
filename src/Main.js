import React, { Component } from "react";
import { Route, BrowserRouter,} from "react-router-dom";
import { Switch } from "react-router";
import LoginComponent from "./LoginComponent/LoginComponent";
import { Redirect } from "react-router-dom";
// import LoginComponent from "./LoginComponent/LoginComponent";
// import ThreadComponent from "./ThreadComponent/ThreadComponent";
import EditorComponent from "./EditorComponent/EditorComponent";
import ThreadCollection from "./ThreadCollection/ThreadCollection";
import ThreadViewerComponent from "./ThreadViewerComponent/ThreadViewerComponent";
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
            }
        }

        this.setPreloaderState=this.setPreloaderState.bind(this);
        this.updateUser=this.updateUser.bind(this);
    }

    setPreloaderState=function(curState){
        this.setState({
            preLoaderActive:curState
        });
        console.log('preloader set',curState);
    }

    updateUser=function(user){
        this.setState({
            user:user
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
                                    return (
                                        this.state.user?(
                                            <Redirect to='/'/>
                                        ):(
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
                                        )
                                    );
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
                                <Route path="/Threads/:status" render={(props)=>{
                                    return (
                                        <div className="row">
                                            <div className="col s12 m9">
                                                <div className="content">
                                                    <ThreadCollection {...props}/>
                                                </div>
                                            </div>
                                            <div className="col s3 hide-on-small-only">
                                                <ControlListComponent />
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
                                                    <ThreadViewerComponent {...props}/>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }}/>
                                <Route path="/Editor" render={(props)=>{
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