import React, { Component } from "react";
import "./ThreadReply.css";

export default class ThreadReply extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state={
            reply:
                {
                    user:{
                        id:"some id",
                        dp:"/react.png",
                        type:"admin"
                    },
                    time:new Date(new Date().getTime()-Math.floor(Math.random()*1000*60*60*24*10 + 1)),
                    content:"some answer <br> posted"
                },
            isQues:true,
            flipAdmin:this.props.flipAdmin===undefined?true:Boolean(this.props.flipAdmin),
            showDp:this.props.showDp!==undefined?Boolean(this.props.flipAdmin):true
            
        }

    }

    render(){

        const imgHolderStyle={
            paddingTop:10+"px",
            paddingBottom:10+"px", 
            minWidth:50+"px",
            height:100+"%"
        }
        
        const imgHolderStyleFull={
            paddingTop:10+"px",
            paddingBottom:10+"px", 
            minWidth:50+"px",
            height:100+"%",
            backgroundColor:"#e0e0e0  ",
            border:"1px solid",
            borderColor:"rgb(158,158,158)",
            borderTopRightRadius:20+"px",
            borderTopLeftRadius:20+"px",
            boxShadow:"3px 3px 3px grey"
            
        }

        const replyHolderStyle={
            padding:"10px 10px 10px 10px",
            // paddingBottom:10+"px",
            borderRadiusTop: 20+"px",
            borderBottomRightRadius:20+"px",
            borderBottomLeftRadius:20+"px",
            backgroundColor:"#eeeeee   ",
            border:"1px solid",
            borderColor:"rgb(158,158,158)",
            boxShadow:"3px 3px 3px grey"
        }

        const controllerHolderStyle={
            
        }

        return(
            <div className="t-reply">
                <div style={controllerHolderStyle}>
                    {
                        !(this.state.flipAdmin&&this.props.reply.uId.type==="admin")?
                        (
                            <div className="row" style={{marginBottom:0+"px"}}>
                                <div className="col s12 hide-on-large-only" style={imgHolderStyleFull}>
                               
                                <div>
                                    <img alt={this.props.reply.uId._id} src={this.props.reply.uId.dp?this.props.reply.uId.dp:'/react.png'} style={{width:50+"px"}} className="responsive-img"/><br/>
                                    <span>{this.props.reply.uId._id}</span>
                                </div>
                                </div>
                                <div className="col s12 m1 hide-on-med-and-down" style={imgHolderStyle}>
                                
                                <center>
                                    <img alt={this.props.reply.uId._id} src={this.props.reply.uId.dp?this.props.reply.uId.dp:'/react.png'} style={{width:50+"px"}} className="responsive-img"/><br/>
                                    <span>{this.props.reply.uId._id}</span>
                                </center>
                                </div>
                                <div className="col s12 m12 l11" style={replyHolderStyle}>
                                        <span>{this.props.isQues?"Posted : ":"Replied : "}{new Date(this.props.reply.createdAt).toUTCString().split(' ').splice(1).join(" ")}</span><br/><br/>
                                        <div dangerouslySetInnerHTML={{__html: this.props.reply.content}} />
                                   
                                </div>
                            </div>
                        ):
                        (
                            <div className="row" style={{marginBottom:0+"px"}}>
                                <div className="col s12 hide-on-large-only" style={imgHolderStyleFull}>
                                <div className="right">
                                    <img alt={this.props.reply.uId._id} src={this.props.reply.uId.dp?this.props.reply.uId.dp:'/react.png'} style={{width:50+"px"}} className="responsive-img"/><br/>
                                    <span>{this.props.reply.uId._id}</span>
                                </div>
                                </div>
                                <div className="col s12 m12 l11" style={replyHolderStyle}>
                                        <span>{this.props.isQues?"Posted : ":"Replied : "}{new Date(this.props.reply.createdAt).toUTCString().split(' ').splice(1).join(" ")}</span><br/><br/>
                                        <div dangerouslySetInnerHTML={{__html: this.props.reply.content}} />
                                </div>
                                <div className="col s12 m1 hide-on-med-and-down" style={imgHolderStyle}>
                                <center>
                                    <img alt={this.props.reply.uId._id} src={this.props.reply.uId.dp?this.props.reply.uId.dp:'/react.png'} style={{width:50+"px"}} className="responsive-img"/><br/>
                                    <span>{this.props.reply.uId._id}</span>
                                </center>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}