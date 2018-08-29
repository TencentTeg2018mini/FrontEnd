import React from 'react';
import { render } from 'react-dom';
import{Link} from 'react-router-dom';
import axios from 'axios'
//css
import less from './bottomNav.less';
import  SessionGuardWithDialog from 'Components/SessionGuardWithDialog/SessionGuardWithDialog'
// import  Signin from 'Components/dialog/me/signin';
// import  More from 'Components/dialog/me/more';
// import  Tags from 'Components/dialog/me/tags';
import { withDialog } from 'Components/withDialog/withDialog'
import {Consumer} from '../../../src/index'
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


//TODO: 登录后自动刷新页面与状态
export default class ButtomNav extends React.Component
{
    constructor(props){
        super(props);
        console.log( this.props.history);
        this.me=React.createRef();
    }
    render(){
        return (
            <Consumer>
            {app=>
                <div className={less.bottom + " " + this.props.className} >
                        {/* <Link  to="/"><div>首页</div></Link> */}
                        {app.state.isLogin
                            ?<React.Fragment>
                                {/* FIXME:点击穿透 */}
                                <Link  to="/user/me/attention"><div>关注</div></Link>
                                <Link  to="/shot"><div>+</div></Link>
                                {/* <Link  to="/user/me/message"><div>消息</div></Link> */}
                                <Link  to="/user/me">我</Link>
                            </React.Fragment>
                            :<React.Fragment>
                                <SessionGuardWithDialog >关注</SessionGuardWithDialog>
                                <SessionGuardWithDialog >+ </SessionGuardWithDialog>
                                {/* <SessionGuardWithDialog check={this.check}>消息</SessionGuardWithDialog> */}
                                <SessionGuardWithDialog >我</SessionGuardWithDialog>
                            </React.Fragment>
                        }
                </div>                 
            }  
            </Consumer>
        )
    }
}        
