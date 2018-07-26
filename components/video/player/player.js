import React from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom'
//css
import less from './player.less';
import LeftNav from '../../nav/leftNav/leftNav'
import Video from '../video'
import { setTimeout } from 'timers';
/**
 * 事件：
    * 双击（点赞）
    * 单击（暂停播放）
    * 上滑（瀑布流）
    * 下滑（刷新/回退）
    * 左滑（内容页）
 * 侧边栏
 * 信息
    * 播主信息（到内容页（播主））
    * 信息（显示视频详细信息）
 */
export default class Player extends React.Component
{
    pos = {x:0,y:0}
    scorllTop = 0;
    dataIndex = 0;
    onTouchStart = (e)=>{
        this.scorllTop = this.videoGroup.current.scrollTop;
        this.pos.x = e.touches[0].pageX;
        this.pos.y = e.touches[0].pageY;
    }
    onTouchMove=(e)=>{
        let newPos = e.touches[0];//新鼠标位置
        let nowScrollTop = this.videoGroup.current.scrollTop;//新的滚动条位置
        this.videoGroup.current.scrollTo(0,nowScrollTop-(newPos.pageY - this.pos.y))//移动滚动条
        this.pos.y = newPos.pageY;//重置鼠标位置
    }
    onTouchEnd=(e)=>{
        let nowScrollTop = this.videoGroup.current.scrollTop;
        let dist = window.innerHeight/3;
        // console.log( this.videoGroup);

        if(nowScrollTop<this.scorllTop){
            //当鼠标和内容下移，滑动条上移
            if(nowScrollTop<this.scorllTop-dist){
                this.videoGroup.current.childNodes[this.dataIndex].childNodes[1].pause();
                this.dataIndex= Math.max( 0,this.dataIndex-1);
                this.videoGroup.current.childNodes[this.dataIndex].childNodes[1].play();
                this.shiftVideo(-1);
            }else{
                this.shiftVideo(1);
            }
        }else if(nowScrollTop>this.scorllTop){
            //当鼠标和内容上移，滑动条下移
            let maxLength = this.props.children.length;
            if(nowScrollTop>this.scorllTop+dist){
                this.videoGroup.current.childNodes[this.dataIndex].childNodes[1].pause();
                this.dataIndex= Math.min( maxLength-1 ,this.dataIndex+1);
                this.videoGroup.current.childNodes[this.dataIndex].childNodes[1].play();
                this.shiftVideo(1);
            }else{
                this.shiftVideo(-1);
            }
            if(this.dataIndex+1== maxLength){
                console.log("正在读取");
                this.props.getVideos();
            }
        }else{
            if(e.nativeEvent.target.nodeName == "VIDEO"){
                if(e.target.paused){
                    e.target.play();
                }else{
                    e.target.pause();
                }
            }
        }

    }

    shiftVideo(direct){
        let fun = (i  = window.innerHeight/12 ,s = window.innerHeight/120 ,p = 0,directs=direct)=>{
            if(this.videoGroup.current==null){
                return
            }
            let nowScrollTop = this.videoGroup.current.scrollTop;
            let objScrollTop = window.innerHeight*this.dataIndex
            p =  Math.round (7.5625 * i * i/window.innerHeight);
            let newScrollTop = nowScrollTop - p;
            i = i- s;
            if(directs==1){
                this.videoGroup.current.scrollTo(0,Math.min(nowScrollTop +p, objScrollTop))
                if( Math.min(nowScrollTop +p, objScrollTop) == objScrollTop){
                    setTimeout( this.videoGroup.current.scrollTo(0,objScrollTop),0);
                }else{
                    int = setTimeout (fun,16)
                }
            }else if(directs==-1){
                this.videoGroup.current.scrollTo(0,Math.max(newScrollTop, objScrollTop))
                if( Math.max(newScrollTop, objScrollTop) == objScrollTop){
                    setTimeout( this.videoGroup.current.scrollTo(0,objScrollTop),0);
                }else{
                    int = setTimeout(fun,16)
                }
            }
        }
        let int = setTimeout (fun,16);
    }
    constructor(props){
        super(props);
        this.videoGroup = React.createRef();
    }
    render(){
        return (        
            <div 
                className={less.player}
                ref={this.videoGroup}
                onTouchStart = {this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onTouchEnd = {this.onTouchEnd}
            >
                {this.props.children}
                <div className={less.load}>
                    正在加载
                </div>
            </div>
        )
    }
    componentDidMount(){
        let isWifi = true;
        if(isWifi){
            this.videoGroup.current.childNodes[0].childNodes[1].play();
        }
    }
}        
