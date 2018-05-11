import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ThreadComponent.css";
//import "react-router";

export default class ThreadComponent extends Component{
    constructor(props){
        super(props);

        this.state={
            thread:{    
                id:101,
                subject:"sample thread",
                user:{
                    id:"gotenks",
                    dp:"/react.png"
                },
                time:new Date(),
                replyCount:4,
                lastReply:{
                    time:new Date(new Date().getTime()-Math.floor(Math.random()*1000*60*60*24*10 + 1)),
                    user:{
                        id:"last_user",
                        dp:"/react.png"
                    }
                }
            }
        }
    }

    render(){
        return(
            <div className="thread" style={{cursor:"pointer"}}>
                <div className="row" style={{padding:10+'px', margin:0+"px"}}>
                    <div className="col s2 m1">
                        <div className="row">
                            <img alt={this.props.thread.uId._id} src={this.props.thread.uId.dp?this.props.thread.uId.dp:"/react.png"} style={{maxHeight:60+'px',minHeight:43+'px',minWidth:43+'px'}} className="circle responsive-img"/>
                        </div>
                    </div>

                    <div className="col s10 m7 l7">
                        <div className="row" style={{marginBottom:0+'px'}}>
                                <div className="col">
                                    <h4 style={{marginTop:0+'px'}}><Link to={"/thread/"+this.props.thread._id}>{this.props.thread.subject}</Link></h4>
                                </div>
                            </div>
                        <div className="row">
                            <div className="col">
                                <span>Posted on {new Date(this.props.thread.createdAt).toUTCString().split(' ').splice(1).join(" ")} </span><br/>
                                <span>By {this.props.thread.uId._id}</span>
                            </div>
                        </div>
                        </div>
                    <div className="col m1 l2 hide-on-small-only">
                        <div className="row">
                            <span>{this.props.thread.replies.length}</span>
                        </div>
                    </div>
                    <div className="col m3 l2 hide-on-small-only">
                        <div className="row" style={{marginBottom:0+'px'}}>
                            <div className="col right" style={{padding:0+'px'}}>
                                <span>{new Date(this.props.thread.lastReply?this.props.thread.lastReply.createdAt:this.props.thread.createdAt).toUTCString().split(" ").splice(1,3).join(" ")}</span>
                            </div>
                        </div>
                            <div className="row" style={{marginBottom:0+'px'}}>
                            <div className="col right" style={{padding:0+'px'}}>
                                <span>{new Date(this.props.thread.lastReply?this.props.thread.lastReply.createdAt:this.props.thread.createdAt).toUTCString().split(" ").splice(4).join(" ")}</span>
                            </div>
                        </div>
                        <div className="row" style={{margin:0+'px'}}>
                            <div className="col right s5" style={{padding:0+'px'}}>
                                <img alt={this.props.thread.lastReply?this.props.thread.lastReply.uId._id:this.props.thread.uId._id} src={this.props.thread.lastReply?(this.props.thread.lastReply.uId.dp?this.props.thread.lastReply.uId.dp:'/react.png'):(this.props.thread.uId.dp?this.props.thread.uId.dp:"/react.png")} style={{maxHeight:50+'px'}} className="right circle responsive-img"/>
                            </div>
                        </div>
                        <div className="row" style={{marginBottom:0+'px'}}>
                            <div className="col right" style={{padding:0+'px'}}>
                                <span>{this.props.thread.lastReply?this.props.thread.lastReply.uId._id:this.props.thread.uId._id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}