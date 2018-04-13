import React, { Component } from "react";
import ThreadReply from "../ThreadReply/ThreadReply";
import DataSvc from "../dataSvc";
import CircularLoader from "../CircularLoader";

export default class ThreadViewerComponent extends Component{
    constructor(props){
        super(props);
        console.log('line7 tview',props);
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
            console.log();
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

        DataSvc.getRepliesByThreadId(thread.id).then(response=>{
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


        fetch('http://localhost:8000/replies?tid='+thread.id).then((response)=>{
            return response.json();
        }).then((data)=>{
            this.setState({
                thread:thread,
                replies:data,
                resolved:true
            });
        });
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

        return(
            <div>
                {
                    this.state.tExist?(
                        <div>
                            <div className="" style={threadQuesHolder} >
                                <div className="row" style={{paddingLeft:"10px"}}>
                                    <h4>{this.state.thread.subject}</h4>
                                    <span>Posted by: {this.state.thread.user.id} on {new Date(this.state.thread.time).toUTCString().split(' ').splice(1).join(" ")}</span>
                                </div>
                                <div className="row" style={{marginBottom:5+"px",paddingLeft:"10px"}}>
                                    <div dangerouslySetInnerHTML={{__html: this.state.thread.content}} />
                                </div>
                            </div>
                            <div className="">
                                {
                                    this.state.replies.map((item)=>{
                                        return <div  key={item.id} style={{marginBottom:5+"px"}}><ThreadReply reply={item} isQues={false}/></div>
                                    })
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