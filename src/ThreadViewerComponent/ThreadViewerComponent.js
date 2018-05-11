import React, { Component } from "react";
import ThreadReply from "../ThreadReply/ThreadReply";
import DataSvc from "../dataSvc";
import CircularLoader from "../CircularLoader";
import EditorComponent from "../EditorComponent/EditorComponent";
import "./ThreadViewerComponent.css";

export default class ThreadViewerComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            resolved:false,
            tExist:true,
            thread:{},
            replies:[]
        }
        if(this.props.match.params.id){
            this.getThread(this.props.match.params.id);
        }else{
            this.props.history.push('/');
            console.log('else part');
        }
    }

    getThread(id){
        DataSvc.getThreadById(id).then(result=>{
            if(result.status==="success"){
                this.getReplies(result.thread);
            }else{
                this.setState({
                    tExist:false,
                    resolved:true,
                });
            }    
        });
    }

    getReplies(thread){

        DataSvc.getRepliesByThreadId(thread._id).then(response=>{
            if(response.status==="success"){
                this.setState({
                    thread:thread,
                    replies:response.replies,
                    resolved:true
                });
            }else{
                this.setState({
                    thread:thread,
                    resolved:true
                });
            }
        });

    }

    submitReply(textData,htmlData){
        var rData={};
        rData['user']=this.props.user._id;
        rData['tId']=this.props.match.params.id;
        rData['content']=htmlData;
        console.log(JSON.stringify(rData));


        DataSvc.postReply(rData).then(function(response) {
            
            if(response.success){
                console.log('reply submitted');
            }
        });
        console.log('submiting html data \n',rData);
        this.setState({});
    }

    render(){
        console.log('rendering');
        const threadQuesHolder={
            backgroundColor: '#b0bec5  ',
            padding:"5px",
            marginBottom:"7px",
            borderRadius:"20px"
        }
        console.log('tview',this.props);

        if(!this.state.resolved){
            return(
                <CircularLoader/>
            );
        }

        let editor=this.props.user?(
            <EditorComponent onSubmit={this.submitReply.bind(this)} bText="Submit Reply"/>
        ):(
            <span>
                Login to reply to this Thread...
            </span>
        );

        return(
            <div>
                {
                    this.state.tExist?(
                        <div>
                            <div className="" style={threadQuesHolder} >
                                <div className="row" style={{paddingLeft:"10px"}}>
                                    <h4>{this.state.thread.subject}</h4>
                                    <span>Posted by: {this.state.thread.uId._id} on {new Date(this.state.thread.createdAt).toUTCString().split(' ').splice(1).join(" ")}</span>
                                </div>
                                <div className="row" style={{marginBottom:5+"px",paddingLeft:"10px"}}>
                                    <div dangerouslySetInnerHTML={{__html: this.state.thread.content}} />
                                </div>
                            </div>
                            <div className="">
                                {
                                    this.state.replies.map((rply)=>{
                                        return <div  key={rply._id} style={{marginBottom:5+"px"}}><ThreadReply reply={rply} isQues={false}/></div>
                                    })
                                }
                            </div>
                            <div className="replyEditor">
                                {
                                    editor
                                }
                            </div>
                        </div>
                    ):(
                        <div>
                            Opps! thread does not exists
                        </div>
                    )
                }
                
            </div>
        );
    }
}