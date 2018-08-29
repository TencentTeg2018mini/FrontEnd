import React from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom'
//css
import less from './video.less';
import LeftNav from '../nav/leftNav/leftNav'
import axios from 'axios'
import { setTimeout } from 'timers';


//TODO: 完善
export default class Video extends React.Component
{
    constructor(props){
        super(props);
        this.scrollTop=0;
        this.info = {
            currentTime : 0 
        }
        this.pageHeight = 0;
        console.log(this.props)
    }
    moveAway=()=>{
        this.video.pause();
        this.info.currentTime = this.video.currentTime
        setTimeout(()=>{
            this.video.setAttribute("src",window.localhost+this.props.info.v_url)
            // this.video.setAttribute("src",window.videoLocalhost+this.props.info.vid+".mp4")
        },500)
    }
    render(){
        return (
            <div className={less.videoBox} onScroll={this.onScroll}>
                <LeftNav info={this.props.info}></LeftNav>
                <video 
                    ref={(video)=>{this.video=video}}
                    onTouchStart={this.onTouchStart}
                    onTouchEnd={this.onTouchEnd}
                    className={less.video} 

                    loop="loop"
                    type="video/mp4" 
                    preload="none"
                    poster={window.localhost+this.props.info.v_photo_url}
                    src={window.localhost+this.props.info.v_url}
                    // src={window.videoLocalhost+this.props.info.vid+".mp4"}
                >
                    您的浏览器不支持 video 标签。
                </video>
                <div className={less.info} >
                    <p><Link to={"/user/"+this.props.info.uploader_uid}>{this.props.info.uploader_nickname}</Link></p>
                    <small>{this.props.info.title}</small>
                </div>
            </div>  
        )
    }
}        
Video.defaultProps = {
    info:{
        like:"",
        comment:"",
        flag:"",
        note:"",
        share:"",
        status:"",
        tag:"",
        tag1_id:"",
        tag2_id:"",
        tag3_id:"",
        title:"",
        upload_time:"",
        uploader_nickname:"",
        uploader_uid:"",
        v_photo_url:"",
        v_url :"",
        vid:"",
        view:""
    }
};