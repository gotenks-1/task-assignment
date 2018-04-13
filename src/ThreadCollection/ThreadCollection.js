import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import ThreadComponent from "../ThreadComponent/ThreadComponent";

export default class ThreadCollection extends Component{
    constructor(props){
        super(props);

        this.dataCount=0;

        this.state={
            threads:[]
        }
    }

    componentDidMount(){
        this.getThreads();
    }

    getThreads(){
        fetch('http://localhost:8000/threads').then((response)=>{
            return response.json();
        }).then((data)=>{
            this.setState({
                threads:data
            });
        });
    }

    render(){
        return(
            <div>
                {
                    this.state.threads.map((item,i)=>{
                        var ClickableThreadComponent=withRouter((history)=>(
                            <ThreadComponent history={this.props.history} match={this.props.match} thread={item} onClick={()=>{history.push("/thread/"+item.id);console.log(history)}}/>
                        ));
                        return <ClickableThreadComponent key={item.id}/>
                    })
                }
            </div>
        );
    }
}