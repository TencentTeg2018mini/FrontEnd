import React from 'react';
import { render } from 'react-dom';
import{Link} from 'react-router-dom';
import axios from 'axios'
//css
import less from './bottomNav.less';
import Me from '../../dialog/me/me';
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

// axios.defaults.withCredentials=true;
export default class ButtomNav extends React.Component
{
    constructor(props){
        super(props);
        console.log( this.props.history);
        this.me=React.createRef();
    }

    toMe=(e)=>{
        e.stopPropagation();
        e.preventDefault();
        let myHeaders =  new Headers();
        let that = this;
        axios.get('/api/v1.0/session',{withCredentials:true})
        .then(function(response) {
            console.log(response);
            if(response.data.code==0){
                console.log("yes");
                that.props.history.push("/user/me");
            }else{
                // that.setState({
                //     showMe:"block"
                // })
                that.me.current.onOpen();
            }
        }).catch(function (error) {
            console.log(error);
        });
        console.log( this.props.history);
    }
    render(){
        return (        
            <div 
                className={less.bottom}
            >
                <Link  to="/"><div>首页</div></Link>
                <Link  to="/user/me/attention"><div>关注</div></Link>
                <Link  to="/"><div>+</div></Link>
                <Link  to="/user/me/message"><div>消息</div></Link>
                {/* <Link  to="/user/me"><div>我</div></Link> */}
                <a onTouchEnd={this.toMe}><Me history={this.props.history} ref={this.me}>我</Me></a>
            </div>
        )
    }
}        
