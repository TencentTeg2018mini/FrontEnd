import React from 'react';
import {render,createPortal} from 'react-dom';
//css
import less from './leftNav.less';
import{Link} from 'react-router-dom';

import Comment from '../../dialog/comment/comment';
import Share from '../../dialog/share/share';

/**
 * 事件：
    * 双击（点赞）
    * 单击（暂停播放）
    * 上滑（瀑布流）
    * 下滑（刷新/回退）
    * 左滑（内容页）
    * 右滑（回退）
 * 按钮：
    * 头像（到内容页（播主））
    * 点赞
    * 评论（弹窗（评论））
    * 分享（弹窗（分享））
    * 原声（到内容页（音乐））
 * 信息
    * 播主信息（到内容页（播主））
    * 信息（显示视频详细信息）
    * 原声信息（到内容页（音乐））
 * 
 */
export default class LeftNav extends React.Component
{
    state={
        islike:0
    }
    likeBg = [less.like,less.liked]
    constructor(props){
        super(props);
    }
    like=(e)=>{
        this.props.like();
        if(this.state.islike){
            this.setState({
                islike:0
            })
        }else{
            this.setState({
                islike:1
            })
        }
    }
    render(){
        return (        
            <div 
                className={less.left}
            >
                <Link to='/user/1' ><div className={less.profile}></div></Link>
                <div onTouchEnd={this.like} className={this.likeBg[this.state.islike]}></div>
                <Comment className={less.comment}> </Comment>
                <Share className={less.share}></Share>
                {/* <div className={less.music}></div> */}
                
            </div>
        )
    }
}        
