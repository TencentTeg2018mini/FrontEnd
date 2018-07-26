import React from 'react';
import { render,createPortal } from 'react-dom';
import less from './dialog.less';
import { setTimeout } from 'timers';
export default class Dialog extends React.Component {

    state={
        show:"none",
        class:less.modalEnter
    }
    constructor(props) {
        super(props);
        const doc = window.document;
        this.node = doc.createElement('div');
        doc.body.appendChild(this.node);
        this.dialog =React.createRef();
    }
    close=()=>{
        console.log("close");
        let that = this;
        setTimeout(()=>{
            that.setState({
                class:less.modalEnter
            }) 
        },0)
        setTimeout(()=>{
            that.setState({
                show:"none",
                class:less.modalEnter
            }) 
        },300)
    }
    open=()=>{
        console.log("open");
        this.setState({
            show:"block",
            class:less.modalEnter
        })
        let that = this;
        setTimeout(()=>{
            that.setState({
                class:less.modalEnter
            })
        },0)
        setTimeout(()=>{
            that.setState({
                class:less.modalExit
            }) 
        },0)
    }
    onModal=(e)=>{
        console.log("onDailog");
        this.close();
        e.preventDefault();
        e.stopPropagation();
    }
    onDialog=(e)=>{
        console.log("onDailog");
        e.preventDefault();
        e.stopPropagation();
    }
    onTouchMove=(e)=>{
        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        return createPortal(
            <div 
                className={less.modal + " " + this.state.class }  
                onTouchEnd={this.onModal}
                onTouchMove={this.onTouchMove}
                ref={this.dialog}
                style={{display:this.state.show}}
            >
                <div 
                    className={less.dialog + " " + this.props.className }
                    onTouchEnd={this.onDialog}
                >
                    {this.props.children}
                </div>
            </div>
            , 
            this.node 
        );
    }
    componentWillUnmount() {
        console.log("move")
        window.document.body.removeChild(this.node);
    }
  }