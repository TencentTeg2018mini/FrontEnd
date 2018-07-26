import React from 'react';
import { render} from 'react-dom';

//css
import less from './comment.less';
import Dialog from '../dialog.js';
import { Input } from '../../form/form';

export default class Comment extends React.Component
{
    state={
        num:0,
        items:null
    }
    constructor(props){
        super(props);
        this.dialog = React.createRef();
        // this.getComment();
        console.log(this.state.items);
    }
    onTouchEnd=(e)=>{
        this.dialog.current.open()
        this.setState({
            num:12,
            items:[
                <CommentItem key="1" content="评论A" likeNum="1"/>,
                <CommentItem key="2" content="评论B" likeNum="2"/>,
                <CommentItem key="3" content="评论A" likeNum="3"/>,
                <CommentItem key="4" content="评论B" likeNum="4"/>,
                <CommentItem key="5" content="评论A" likeNum="5"/>,
                <CommentItem key="6" content="评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B评论B" likeNum="6"/>,
            ]
        },()=>{
            console.log(this.state)
        })
    }
    getComment=()=>{
        //取评论数
        //取评论数组
        console.log("this");
        this.setState({
            num:12,
            items:[
                <CommentItem key="1" content="评论A" likeNum="1"/>,
                <CommentItem key="2" content="评论B" likeNum="2"/>
            ]
        },()=>{
            console.log(this.state)
        })
    }
    close=()=>{
        this.dialog.current.close()
    }
    render(){
        return (
            <div 
                className={this.props.className}
                onTouchEnd = {this.onTouchEnd}
            >   
                <Dialog ref={this.dialog} className={less.dialog}>
                    <div>
                        {this.state.num}评论<span  onTouchEnd = {this.close}>X</span>
                    </div>
                    <div>
                        {this.state.items}
                    </div>
                    <div>
                        <Input type="text" placeholder="来评论一下"/>
                        <button>发送</button>
                    </div>
                </Dialog>
            </div>
        )
    }
}
class CommentItem extends React.Component
{
    render(){
        return(
            <div className={less.commentItem}>
                <div className={less.profile}>
                    <img src="test"/>
                </div>
                <div className={less.itemContent}>
                    <div>昵称</div>
                    <div>{this.props.content}</div>
                    <div>时间</div>
                </div>
                <div className={less.like}>
                    点赞
                    {this.props.likeNum}
                </div>
            </div>
        )
    }
}