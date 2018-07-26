import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
//css
import less from './style/video.less';
import Player from '../components/video/player/player'
import BottomNav from '../components/nav/bottomNav/bottomNav'
import TopNav from '../components/nav/topNav/topNav'
import Video from '../components/video/video'

export default class VideoPage extends React.Component
{
    state={
        videos: [<Video key={0} src ="./assert/test1.mp4" ></Video>]
    }
    pos = { x:0 , y:0}
    onTouchStart = (e)=>{
        this.pos.x = e.touches[0].pageX;
        this.pos.y = e.touches[0].pageY;
    }
    onTouchMove=(e)=>{
        let newPos = e.touches[0];
        if((newPos.pageX - this.pos.x) < -50 ){
            this.props.history.goBack();
        }
    }
    constructor(props){
        super(props);
        this.getVideos();
    }
    render(){
        return (        
            <div className={less.comment} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}>   
                <Player getVideos={this.getVideos}>
                    {this.state.videos}
                </Player>
            </div>
        )
    }
    getVideos=()=>{
        console.log("get");
        let that = this;
        axios.get('http://rap2api.taobao.org/app/mock/22174/commend')
        .then(function (response) {
            let data = response.data.commend;
            let arr = [];
            that.state.videos.map((video,index)=>{
                arr.push(video);
            })
            data.map((video,index)=>{
                let length=arr.length;
                console.log(length);
                arr.push(
                    <Video key={length} src = { video.videosrc} ></Video>
                );
            })
            that.setState({
                videos:arr
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
