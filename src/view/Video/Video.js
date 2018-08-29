import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
//css
import less from './Video.less';
// import Player from 'Components//video/player/player'
import Video from 'Components/video/video'
import BottomNav from 'Components/nav/bottomNav/bottomNav'
import TopNav from 'Components/nav/topNav/topNav'
// import {withData,TurnPageWhenTouchMove} from 'Components/HOC/HOC'
import withData from 'Components/withData/withData'
import PageTurner from 'Components/PageTurner/PageTurner'
import GoBackWithRouter from 'Components/GoBackWithRouter/GoBackWithRouter'

let CACHE = GLOBAL_CACHE.get("VIDEOPAGE",{
    videoList:[],
    pageIndex:0,
})

//TODO: 优化结构
export default class VideoPage extends React.Component
{
    constructor(props){
        super(props);
        this.pos = { x:0 , y:0}
        this.stop=0;
        this.state={
            page:1
        }
        this.video=[]


    }
    onTouchStart = (e)=>{
        this.stop=0;
        this.pos.x = e.touches[0].pageX;
        this.pos.y = e.touches[0].pageY;
    }
    onTouchMove=(e)=>{
        clg("move")
        let newPos = e.touches[0];
        if(((newPos.pageX - this.pos.x) < -50)&&this.stop==0){
            console.log("移动")
            this.props.history.goBack();
            this.stop=1;
        }
    }
    onBack=()=>{
        this.props.history.goBack();
    }
    // getNewVideoAfter = () => {
    //     console.log("读取往后");
    //     this.setState(prev=>{return {
    //         page:prev.page+1
    //     }},()=>{this.ListWithVideo.getData()})
    // }
    // getNewVideoBefore = (e) => {
    //     console.log("读取往前");
    //     this.setState(prev=>{return {
    //         page:1
    //     }},()=>{this.ListWithVideo.getData("before")})
    // }
    handleScrollDownStop = (e) => {
        console.log(this.TurnPage.pageIndex)
        console.log(this.video[this.TurnPage.pageIndex])
        this.video[this.TurnPage.pageIndex].moveAway();
    }
    handleScrollUpStop = (e) => {
        console.log(this.TurnPage.pageIndex)
        console.log(this.video[this.TurnPage.pageIndex])
        this.video[this.TurnPage.pageIndex].moveAway();
    }
    
    handleNoMove = (e) => {
        // let video = this.video[this.TurnPage.state.pageIndex].video;
        console.log(this.TurnPage.pageIndex)
        console.log(this.video)
        let video = this.video[this.TurnPage.pageIndex].video;
        if( video.paused){
            video.play();
        }else{
            video.pause();
        }
    }
    render(){
        return (        
            <div className={less.comment} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}>   
                {/* <TopNav></TopNav> */}
                <GoBackWithRouter></GoBackWithRouter>
                {/* <div onTouchEnd={this.onBack} style={{position:"absolute",top:20,left:20,zIndex:200,color:"white"}}>back</div> */}
                <PageTurner 
                    style={{display:"flex",maxHeight:"100%"}} 
                    ref={TurnPage=>{this.TurnPage = TurnPage}}
                    onBottomStop={this.getNewVideoAfter}
                    onTopStop={this.getNewVideoBefore}
                    onNoMove = {this.handleNoMove}
                    onDownStop={this.handleScrollDownStop}
                    onUpStop={this.handleScrollUpStop}
                >
                     {/* <Video key={index} info={value} src={value.videosrc}></Video> */}
                    <ListWithVideo 
                        page={this.state.page} 
                        vid={this.props.match.params.vid} 
                        uid={this.props.match.params.uid} 
                        ref={(ListWithVideo)=>{this.ListWithVideo = ListWithVideo}}
                        _videoPage={this}
                        style={{width:"100%"}}
                    />
                </PageTurner>
                {/* <BottomNav history={this.props.history}></BottomNav> */}
            </div>
        )
    }

    isMountList = 0
    componentDidMount = () => {
        console.log("Test:componentDidMount")
        this.isMountList =1;
    }
    componentDidUpdate = (prevProps, prevState) => {
        console.log("Test:componentDidUpdate")
        if(this.isMountList){
            console.log(this.props.match.params.key)
            this.TurnPage.changePageIndex(this.props.match.params.key)
            this.isMountList = 0
        }
    }
}



class List extends React.Component{
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        //判断缓存
        console.log("VideoList 初次渲染完成")

        if(CACHE.videoList.length>0)
        {// 有缓存
            console.log(CACHE)
            //读缓存中的数据生成list
            console.log('"List有缓存')
            this.props.hoc.addData(CACHE.videoList,"after")
            
        }
        else
        {// 无缓存
            //请求数据生成list
            console.log("List没缓存")
            this.props.hoc.getData()
        }
    }
    render() {
        return (
            <div style={{width:"100%"}}>
                {this.props._data.map((value,index) => {
                    return (
                        <Video 
                            key={index} 
                            info={value} 
                            src={value.videosrc}
                            ref={(video)=>{this.props._videoPage.video[index] =video}}
                        ></Video>
                    )
                })}
            </div>
        )
    }
}
const withVideo = withData((props)=>`/api/v1.0/video/${props.vid}?page=${props.page}&uid=${props.uid}`)
const ListWithVideo = withVideo(List);
