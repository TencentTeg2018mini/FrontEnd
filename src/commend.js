import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
//css
import less from './style/commend.less';
import Player from '../components/video/player/player'
import Video from '../components/video/video'
import BottomNav from '../components/nav/bottomNav/bottomNav'
import TopNav from '../components/nav/topNav/topNav'


export default class Commend extends React.Component
{
    state={
        videos: [<Video key={0} src ="./assert/test1.mp4" ></Video>]
    }
    pos = { x:0 , y:0}
    stop=0;
    onTouchStart = (e)=>{
        this.stop=0;
        this.pos.x = e.touches[0].pageX;
        this.pos.y = e.touches[0].pageY;
    }
    onTouchMove=(e)=>{
        let newPos = e.touches[0];
        if(((newPos.pageX - this.pos.x) < -50)&&this.stop==0){
            this.props.history.push("/user/1");
            this.stop=1;
        }
    }
    constructor(props){
        super(props);
        this.getVideos();
    }
    render(){
        return (        
            <div className={less.comment} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}>   
                <TopNav></TopNav>
                <Player getVideos={this.getVideos}>
                    {this.state.videos}
                </Player>
                <BottomNav history={this.props.history}></BottomNav>
            </div>
        )
    }
    getVideos=()=>{
        console.log("get");
        let that = this;
        try{
            axios.get('/api/v1.0/video')
            // axios.get("http://rap2api.taobao.org/app/mock/22174/commend")
            .then(function (response) {
                console.log(response.data);
                // let data = response.data.commend;
                let data = response.data.data;
                if(response.data.code==0){
                    let arr = [];
                    that.state.videos.map((video,index)=>{
                        arr.push(video);
                    })
                    data.map((video,index)=>{
                        let length=arr.length;
                        arr.push(
                            <Video key={length} src = { "http://47.106.158.125"+video.v_url} ></Video>
                            // <Video key={length} src = { video.videosrc} ></Video>
                        );
                    })
                    that.setState({
                        videos:arr
                    })
                }

            })
            .catch(function (error) {
                console.log(error);
            });
        }catch(e){
            console.log(e);
        }

    }
}
