import React from 'react';
import { render } from 'react-dom';
//css
import less from './topNav.less';
import{Link} from 'react-router-dom';

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
export default class TopNav extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (        
            <div 
                className={less.top}
            >
                <Link to='/'>推荐</Link>|
                <Link to='/citywide'>同城</Link>
            </div>
        )
    }
}        
