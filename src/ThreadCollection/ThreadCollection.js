import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import ThreadComponent from "../ThreadComponent/ThreadComponent";
import DataSvc from "../dataSvc";

export default class ThreadCollection extends Component{
    constructor(props){
        super(props);

        this.dataCount=0;

        this.state={
            threads:[]
        }

        console.log('thread collection');
    }

    componentDidMount(){
        if(this.props.status){
            this.getThreadsByStatus(this.props.status);
        }else{
            this.getThreads();
        }
    }

    getThreads(){

        DataSvc.getThreads().then(result=>{
            if(result.status==="success"){
                this.setState({
                    threads:result.threads
                });
            }else{
                //some work
            }    
        });

    }

    getThreadsByStatus(status){
        if(!status){
            this.getThreads();
            return;
        }

        DataSvc.getThreadsByStatus(status).then(result=>{
            if(result.status==="success"){
                this.setState({
                    threads:result.threads
                });
            }else{
                //some work
            }    
        });

    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        console.log(this.props);
        if(this.props.status!==nextProps.status){
            this.getThreadsByStatus(nextProps.status);
        }
        console.log('will receive these props');
    } 

    componentWillUpdate(nextProps){
        // if(nextProps.status){
        //     this.getThreadsByStatus(nextProps.status);
        // }else{
        //     this.getThreads();
        // }
    }
    

    render(){
        console.log('status in render ',this.props.status);
        return(
            this.state.threads.length>0?(
                <div>
                    {
                        this.state.threads.map((item,i)=>{
                            var ClickableThreadComponent=withRouter((history)=>(
                                <ThreadComponent history={this.props.history} match={this.props.match} thread={item} onClick={()=>{history.push("/thread/"+item.id);console.log(history)}}/>
                            ));
                            return <ClickableThreadComponent key={item._id}/>
                        })
                    }
                </div>
            ):(
                <div>
                    No threads found
                </div>
            )
            
        );
    }
}