import React, { Component } from "react";
import './EditorComponent.css';
import * as Fa from "react-icons/lib/fa";
import { MdUndo, MdRedo, MdInsertLink } from "react-icons/lib/md";
import { GoLink } from "react-icons/lib/go";
import * as Prism from "prismjs";

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

    performAction(eventArgs){
        console.log(eventArgs.nativeEvent);
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
        console.log(value);
        var status=this.document.execCommand(commandExec,true,value);
        if(!status){
            console.log(this.document);
            console.log(this.rtEditor.contentWindow.getSelection().toString());
            console.log(this.document.createRange().cloneContents());
        }
        console.log(status);
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
                                <select value="javascript">
                                    <option value="javascript">Js</option>
                                    <option value="markup">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="typescript">TS</option>
                                </select>
                            </div>
                            <div className="tooltip">
                                <button className="editor-btn" data-command="createLink" onClick={this.insertCode.bind(this)}><Fa.FaCode/></button>
                                <span className="tooltiptext">Code</span>
                            </div>
                            
                        </div>
                    </div>
                    <div className="__frame">
                        <iframe ref={this.setEditorRef}></iframe>
                    </div>
                    
                </div>   
                <select value="javascript">
                                    <option value="javascript">Js</option>
                                    <option value="markup">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="typescript">TS</option>
                                </select>
            </div>
        );
    }
}