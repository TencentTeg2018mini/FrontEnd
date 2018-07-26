import React from 'react';
import { render} from 'react-dom';

//css
import less from './share.less';
import Dialog from '../dialog.js';

export default class Share extends React.Component
{

    constructor(props){
        super(props);
        this.dialog = React.createRef()
    }
    onTouchEnd=(e)=>{
        // e.preventDefault();
        // e.stopPropagation();
        this.dialog.current.open()
    }
    copy=(e)=>{
        // document.execCommand("Copy")
        // var input = document.createElement("INPUT")
        // input.value = "textss"; // 修改文本框的内容
        // console.log(input.select()); // 选中文本
        // console.log(input.value);
        e.nativeEvent.target.value=window.location.href;
        console.log(e.nativeEvent.target.select())

        let isCopy = document.execCommand("copy");
        if(isCopy){
            console.log("yes");
            e.nativeEvent.target.value="复制成功"
        }
    }
    render(){
        return (
            <div 
                className={this.props.className}
                onTouchEnd = {this.onTouchEnd}
            >   
                <Dialog className={less.dialog} ref={ this.dialog }>
                    <input onTouchEnd={this.copy} value="点我复制链接，快分享给你的好友吧"></input>
                </Dialog>
            </div>
        )
    }
}
