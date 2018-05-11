import React, { Component } from "react";
import './EditorComponent.css';
import * as Fa from "react-icons/lib/fa";
import { MdUndo, MdRedo, MdInsertLink } from "react-icons/lib/md";
import { GoLink } from "react-icons/lib/go";
import * as Prism from "prismjs";

function parentNodes(node){
    var nodes=[node];
    while(node.parentNode){
        node=node.parentNode;
        nodes.unshift(node);
    }
    return nodes;
}

var getChildIndex = function(child){
    var parent = child.parentNode;
    var children = parent.children;
    var i = children.length - 1;
    for (; i >= 0; i--){
        if (child == children[i]){
            break;
        }
    }
    return i;
};

function getCommonAncestors(node1,node2){
    var parents1=parentNodes(node1);
    var parents2=parentNodes(node2);

    if(parents1[0]!=parents2[0]) throw new Error("No common ancestor");

    for(var i=0;i<parents1.length;i++){
        if(parents1[i]!=parents2[i]){
            return [parents1[i-1],parents1[i],parents2[i]];
        }
    }
}

export default class EditorComponent extends Component{
    constructor(props){
        super(props);

        this.state={
            msg:"Reply"
        }
        this.doAction=this.performAction.bind(this);
        this.setEditorRef=editor=>{
            if(!editor){
                return;
            }
            this.rtEditor=editor;
            this.document=this.rtEditor.contentDocument;
            this.document.designMode="ON";
            this.document.activeElement.spellcheck=false;
            console.log(this.rtEditor);
        };


    }

    createManualLink(selection,link){
        console.log('creating link manualy, selection received :- ',selection);
        var startNode=selection.baseNode;
        var endNode=selection.focusNode;
        var startOffset=selection.baseOffset;
        var endOffset=selection.focusOffset;

        if(startNode==endNode){
            console.log('happy ending');
            var nodeToEdit=startNode;
            if(!startNode.innerHTML){
                nodeToEdit=startNode.parentNode;
            }
            var startIndex=startOffset<endOffset?startOffset:endOffset;
            var endIndex=startOffset<endOffset?endOffset:startOffset;
            if(startIndex==endIndex){
                return;
            }
            var inner=nodeToEdit.innerHTML;
            nodeToEdit.innerHTML=inner.substr(0,startIndex)+"<a href='"+link+"'>"+inner.substr(startIndex,endIndex-startIndex)+"</a>"+inner.substr(endIndex);
            return;
        }

        var parents=getCommonAncestors(startNode,endNode);
        console.log(parents[0].children);
        var startPIndex=getChildIndex(parents[1]);
        var endPIndex=getChildIndex(parents[2]);

        var start=startPIndex<endPIndex?startPIndex:endPIndex;
        var end=startPIndex<endPIndex?endPIndex:startPIndex;

        for(var i=start+1;i<end;i++){
            parents[0].children[i].innerHTML="<a href='"+link+"'>"+parents[0].children[i].innerHTML+"</a>";
        }
        var startHtml=startNode.parentNode.innerHTML;
        var endHtml=endNode.parentNode.innerHTML;
        if(start==startPIndex){
            
            startNode.parentNode.innerHTML=startHtml.substr(0,startOffset)+"<a href='"+link+"'>"+startHtml.substr(startOffset)+"</a>";
           
            endNode.parentNode.innerHTML="<a href='"+link+"'>"+endHtml.substr(0,endOffset)+"</a>"+endHtml.substr(endOffset);
        }else{
            startNode.parentNode.innerHTML="<a href='"+link+"'>"+startHtml.substr(0,startOffset)+"</a>"+startHtml.substr(startOffset);
           
            endNode.parentNode.innerHTML=endHtml.substr(0,endOffset)+"<a href='"+link+"'>"+endHtml.substr(endOffset)+"</a>";
        }
        
        selection.empty();
    }

    performAction(eventArgs){
        var target=eventArgs.target;
        while(target.tagName!="BUTTON"){
            target=target.parentNode;
        }
        var commandExec=target.dataset.command;
        var value=null;
        if(commandExec==="createLink"){
            value=this.rtEditor.contentWindow.getSelection().toString();
            if(!value.startsWith('http')){
                value='http://'+value;
            }
        }
        if(commandExec==="createLink"){
            this.createManualLink(this.rtEditor.contentWindow.getSelection(),value);
            return;
        }
        var status=this.document.execCommand(commandExec,true,value);
        if(!status){
            console.log(this.document);
            console.log(this.rtEditor.contentWindow.getSelection().toString());
            console.log(this.document.createRange().cloneContents());
        }
        if(!status&&commandExec==="createLink"){
            this.createManualLink(this.rtEditor.contentWindow.getSelection(),value);
        }

    }

    initModal(){
        window.$(document).ready(function(){
            window.$('.modal').modal();
          });
          return null;
    }

    handleSaveFile(e){
        if(e.nativeEvent.target.files[0]){
            this.saveFile=e.nativeEvent.target.files[0].name;
        }
        console.log(e.nativeEvent);
    }

    insertImage(){
        if(this.saveFile){
            var status=this.document.execCommand('insertImage',false,this.saveFile);
            console.log(this.saveFile);
            console.log('status',status);
        }
    }

    insertCode(){
        this.document.head.innerHTML="<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/prism/1.13.0/themes/prism.css'/>"
        var code=this.rtEditor.contentWindow.getSelection().toString();
        var html=Prism.highlight(code,Prism.languages.js,'javascript');
        html="<pre class='language-javascript'><code class='language-javascript'>"+html+"</code></pre>";
        this.document.execCommand('insertHTML',false,html);
        console.log(Prism);
        // console.log('css',PCSS);
        console.log(this.document.head.innerHTML);
    }

    submitData(){
        var htmlData=this.document.body.innerHTML;
        var textData=this.document.body.innerHTML;
        if(typeof this.props.onSubmit==='function'){
            this.props.onSubmit(htmlData,textData);
        }
    }

    render(){
        return(
            <div>
                <div className="editorComp">
                    <div className="__toolbar">
                        <div className="editor-btn-group">
                            <div className="tooltip">
                                <button className="editor-btn" data-command="bold" onClick={this.doAction}><Fa.FaBold/></button>
                                <span className="tooltiptext">Bold</span>
                            </div>
                            <div className="tooltip">
                                <button className="editor-btn" data-command="italic" onClick={this.doAction}><Fa.FaItalic/></button>
                                <span className="tooltiptext">Italic</span>
                            </div>
                            <div className="tooltip">
                                <button className="editor-btn" data-command="underline" onClick={this.doAction}><Fa.FaUnderline/></button>
                                <span className="tooltiptext">Underline</span>
                            </div>
                            
                        </div>
                        <div className="editor-btn-group">
                            <div className="tooltip">
                                <button className="editor-btn" data-command="undo" onClick={this.doAction}><MdUndo/></button>
                                <span className="tooltiptext">Undo</span>
                            </div>
                            <div className="tooltip">
                                <button className="editor-btn" data-command="redo" onClick={this.doAction}><MdRedo/></button>
                                <span className="tooltiptext">Redo</span>
                            </div>
                            
                        </div>
                        <div className="editor-btn-group">
                            <div className="tooltip">
                                <button className="editor-btn" data-command="insertOrderedList" onClick={this.doAction}><Fa.FaListOl/></button>
                                <span className="tooltiptext">OL</span>
                            </div>
                            <div className="tooltip">
                                <button className="editor-btn" data-command="insertUnorderedList" onClick={this.doAction}><Fa.FaListUl/></button>
                                <span className="tooltiptext">UL</span>
                            </div>
                            <div className="tooltip">
                                <button className="editor-btn" data-command="outdent" onClick={this.doAction}><Fa.FaDedent/></button>
                                <span className="tooltiptext">Outdent</span>
                            </div>
                            <div className="tooltip">
                                <button className="editor-btn" data-command="indent" onClick={this.doAction}><Fa.FaIndent/></button>
                                <span className="tooltiptext">Indent</span>
                            </div>
                            
                        </div>
                        <div className="editor-btn-group">
                            <div className="tooltip">
                                <button className="editor-btn" data-command="createLink" onClick={this.doAction}><GoLink/></button>
                                <span className="tooltiptext">Link</span>
                            </div>
                            
                        </div>
                        <div className="editor-btn-group">
                            <div className="tooltip">
                                <button data-target="modal1" className="modal-trigger editor-btn"><Fa.FaFileImageO/></button>
                                    <div id="modal1" className="modal">
                                        <div className="modal-content">
                                            <div className="row">
                                                <input type="file" onChange={this.handleSaveFile.bind(this)}/>
                                            </div>
                                            <div className="row">
                                                <button className="btn" onClick={this.insertImage.bind(this)}>Ok</button>
                                            </div>
                                        </div>
                                    </div>
                                <span className="tooltiptext">Image</span>
                                {
                                   this.initModal()
                                }
                            </div>
                            
                        </div>
                        <div className="editor-btn-group">
                            <div>
                                {/* <select value="javascript">
                                    <option value="javascript" read-only>Js</option>
                                    <option value="markup" read-only>HTML</option>
                                    <option value="css" read-only>CSS</option>
                                    <option value="typescript" read-only>TS</option>
                                </select> */}
                            </div>
                            <div className="tooltip">
                                <button className="editor-btn" onClick={this.insertCode.bind(this)}><Fa.FaCode/></button>
                                <span className="tooltiptext">Code</span>
                            </div>
                            
                        </div>
                    </div>
                    <div className="__frame">
                        <iframe ref={this.setEditorRef}></iframe>
                    </div>
                    <div className="editorFooter">
                        <button className="btn" onClick={this.submitData.bind(this)}>{this.props.bText?this.props.bText:"Submit"}</button>
                    </div>
                </div>   
                {/* <select value="javascript">
                                    <option value="javascript">Js</option>
                                    <option value="markup">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="typescript">TS</option>
                                </select> */}
            </div>
        );
    }
}