import React, { Component } from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import { Switch } from "react-router";
// import ThreadComponent from "../ThreadComponent/ThreadComponent";
import EditorComponent from "../EditorComponent/EditorComponent";
import ThreadCollection from "../ThreadCollection/ThreadCollection";
import ThreadViewerComponent from "../ThreadViewerComponent/ThreadViewerComponent";
import ThreadReply from "../ThreadReply/ThreadReply";

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={}
        console.log('on home');
    }

    log(x){
        console.log(x);
    }

    render(){

        var reply=
        {
            user:{
                id:"some id",
                dp:"/react.png"
            },
            time:new Date(new Date().getTime()-Math.floor(Math.random()*1000*60*60*24*10 + 1)),
            content:"some answer <br> posted"
        };

        //var returnComponent=null;
        //switch(this.props.location)

        console.log('home',this.props);
        return(
            <BrowserRouter>
                <div>
                    <div className="row">
                        <div className="col s12 m9">
                            <div className="content">
                            <Switch>
                                <Route path="/Editor" component={ EditorComponent } />
                                <Route exact path="/Threads" component={ ThreadCollection } /> 
                                <Route path="/Thread/:id" render={(props)=> <ThreadViewerComponent {...props}/> } /> 
                                <Route path="/Thread" component={ ThreadViewerComponent } />    
                                <Route path="/Reply" render={(props)=><ThreadReply reply={reply}/>} />
                                <Route path="/" render={(props)=><ThreadReply reply={reply}/>} />    
                            </Switch>
                        </div>
                        </div>
                        <div className="col s3 hide-on-small-only">
                            <ul className="header">
                                <li><Link to="/Thread">Thread Viewer</Link></li>
                                <li><Link to="/Editor">Editor Component</Link></li>
                                <li><Link to="/Threads">Threads</Link></li>
                                <li><Link to="/Reply">Reply</Link></li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </BrowserRouter>
        );
    }
}