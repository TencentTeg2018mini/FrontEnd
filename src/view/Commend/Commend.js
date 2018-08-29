import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
//css
import less from './commend.less';
// import Player from 'Components/Video/player/player'
import withData from 'Components/withData/withData'
import PageTurner from 'Components/PageTurner/PageTurner'
import Video from 'Components/Video/Video'
import BottomNav from 'Components/Nav/BottomNav/BottomNav'
import TopNav from 'Components/Nav/TopNav/TopNav'


// TODO:  封装
let CACHE = GLOBAL_CACHE.get("COMMEND",{
    videoList:[],
    pageIndex:0
})
//TODO: 优化结构
export default class Commend extends React.Component
{
    constructor(props){
        super(props);
        this.pos = { x:0 , y:0}
        this.stop=0;
        this.state={
            page:1
        }

        this.video=[]
        this.ListWithVideo = withVideo(List);
        console.log("myState")
        

    }
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
    getNewVideoAfter = () => {
        console.log("读取往后");
        this.setState(prev=>{return {
            page:prev.page+1
        }},()=>{this.ListWithVideoRef.getData()})
    }
    getNewVideoBefore = (e) => {
        console.log("读取往前");
        this.setState(prev=>{return {
            page:1
        }},()=>{this.ListWithVideoRef.getData("before")})
    }
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
                <TopNav></TopNav>
                {/* <this.withPageTurning_withItemFalls_withItemGetter_Player/> */}
                {/* 这里this.TurnPage提供第几页，，给list传commend自身，绑定list中的item到video数组，以turnPage实现暂停播放 */}
                <PageTurner 
                    style={{display:"flex",maxHeight:"100%"}} 
                    ref={TurnPage=>{this.TurnPage = TurnPage}}

                    onNoMove = {this.handleNoMove}
                    onBottomStop={this.getNewVideoAfter}
                    onTopStop={this.getNewVideoBefore}
                    onDownStop={this.handleScrollDownStop}
                    onUpStop={this.handleScrollUpStop}
                >
                
                    <this.ListWithVideo 
                        page={this.state.page} 
                        ref={(ListWithVideo)=>{this.ListWithVideoRef = ListWithVideo}} 
                        _commend={this}
                    /> 
                
                </PageTurner>
                <BottomNav history={this.props.history}></BottomNav>
            </div>
        )
    }
    //TODO: 需要封装
    isMountList = 0
    componentDidMount = () => {
        console.log("Test:componentDidMount")
        this.isMountList =1;
    }
    componentDidUpdate = (prevProps, prevState) => {
        console.log("Test:componentDidUpdate")
        if(this.isMountList){
            this.TurnPage.changePageIndex(CACHE.pageIndex)
            this.isMountList = 0
        }
       
    }
    componentWillUnmount = () => {
        console.log("Test:componentWillUnmount")
        CACHE.pageIndex = this.TurnPage.pageIndex
    }
    
}
// 若有缓存则从缓存中取、若没有则刷新
// const List = ({ _data: gists ,_commend:commend }) => (
//     <div style={{width:"100%"}}>
//         {gists.map((value,index) => {
//             return (
//                 <Video key={index} info={value} src={value.videosrc} ref={(video)=>{commend.video[index]=video}}></Video>
//             )
//         })}
//         <div style={{color:"white",textAlign:"center",margin:"0 auto",padding:"10vh 0 20vh 0"}}>正在加载哦</div>
//     </div>
// )

//TODO: 需要封装
class List extends React.Component{
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        //判断缓存
        console.log("List componentDidMount")
        // console.log(CACHE)
        if(CACHE.videoList.length>0){
            //读缓存中的数据生成list
            console.log('有缓存')
            this.props.hoc.addData(CACHE.videoList,"after")
            
        }else{
            //请求数据生成list
            console.log("没缓存")
            this.props.hoc.getData()
        }
    }
    componentWillUnmount = () => {
        //存入缓存
        console.log("List componentWillUnmount")
        CACHE.videoList = this.props._data
        console.log(CACHE)
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
                            ref={(video)=>{this.props._commend.video[index]=video}}
                        ></Video>
                    )
                })}
                <div style={{color:"white",textAlign:"center",margin:"0 auto",padding:"10vh 0 20vh 0"}}>正在加载哦</div>
            </div>
        )
    }
}
List.defaultProps={
    _data:[],
    _commend:null,
}
// /api/v1.0/video/recommend
// const withVideo = withData((props)=>`/api/v1.0/video/?page=${props.page}`)
const withVideo = withData((props)=>`/api/v1.0/video/recommend`)