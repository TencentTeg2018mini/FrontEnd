import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
//css
import less from './Citywide.less';

import BottomNav from 'Components/Nav/BottomNav/BottomNav'
import TopNav from 'Components/Nav/TopNav/TopNav'
// import Group from 'Components/video/group/group'
import Map from 'Components/Map/Map'

import withData from 'Components/withData/withData'
import ScrollingArea from 'Components/ScrollingArea/ScrollingArea'
import ThumbVideo from 'Components/ThumbVideo/ThumbVideo'


//FIXME: 新增的数据需要缓存
let CACHE = GLOBAL_CACHE.get("CITYWIDE",{
    videoList:[],
    point:{
        lat:null,
        lng:null
    }
})
let VIDEO_CACHE = GLOBAL_CACHE.get("VIDEOPAGE",{
    videoList:[],
    pageIndex:1,
})
export default class Citywide extends React.Component
{
    constructor(props){
        super(props);
        console.log("——————————————————")
        console.log("欢迎来到Citywide页") 
        this.state={
            address:"定位中",
            height:50,

            latitude:null,
            longitude:null,
            level:8,
            page:1
        }
        this.MapPositionY = 0;
    }
    
    onTouchStart = (e) => {
        this.MapPositionY = e.touches[0].pageY
    }
    moveValve = (e) => {
        //TODO: 不智能，需修改
        //TODO: 在一个16*9的视频上下，添加类似电影胶卷的图样
        let dis =100*(e.touches[0].pageY - this.MapPositionY)/document.body.clientHeight
        console.log(document.body.clientHeight)
        this.MapPositionY = e.touches[0].pageY
        this.setState((prev)=>{return {
            height: Math.min( Math.max(0,prev.height+dis) ,95 )
        }})
    }

    handlePositionChange=(map)=>{
        // 当移动位置时，从第一页开始重新获取
        console.log("当移动位置时，map数据为")
        console.log(map)

        this.setState({
            page:1,
            latitude: ""+map.point.lat,
            longitude: ""+map.point.lng
        },()=>
        {
            console.log(this.state)
            this.getNewVideo("fresh")
        })
    }

    getNewVideo = (direct = "after") => {
        let that = this;

        this.MapWithVideo.getData(direct,(data)=>
        {//地图获取数据
            if(data.data.length==0)
            {//新获取的数据为0，则不变page
                console.log("page不变："+ that.state.page)
            }else
            {//新获取的数据不为0，则变化page用作下一页
                that.setState(prev=>{return {
                    page:prev.page+1
                }})
            }
        });
        this.ListWithVideo.getData(direct,(data)=>
        {//列表获取数据
            if(data.data.length==0)
            {//新获取的数据为0，则不变page
                console.log("page不变"+ that.state.page)
            }else
            {//新获取的数据不为0，则变化page用作下一页,并给VIDEO页缓存数据
                that.setState(prev=>{return {
                    page:prev.page+1
                }})
                VIDEO_CACHE.videoList = data;
                console.log("缓存为")
                console.log(VIDEO_CACHE)
                console.log("——————————————")
            }
        });

    }

    render(){
        let that = this
        return (
            <div 
                className={less.citywide}
            > 
                <div className={less.top}><TopNav></TopNav></div>
                
                <div className={less.group} style={{height:this.state.height+'%'}}>
                    {/* <Group npr="2" padding="2"></Group> */}

                    <ScrollingArea style={{height:"100%",color:"white"}} onButtomStop={this.getNewVideo} onNoScrollBar={this.getNewVideo}>
                        <ListWithVideo 
                            ref={ListWithVideo=>{this.ListWithVideo=ListWithVideo}}
                            page={this.state.page} 
                            longitude={this.state.longitude} 
                            latitude={this.state.latitude} 
                            level={this.state.level}
                        />
                    </ScrollingArea>
                </div>
                <div className={less.map} style={{height:(100-this.state.height)+'%'}}>
                    <div className={less.valve} onTouchStart={this.onTouchStart} onTouchMove={this.moveValve}>
                    <b>地图</b>
                    {/* <div className={less.position}>
                        <input readOnly="readonly" value={this.state.address}></input>
                    </div> */}
                    </div> 
                    <MapWithVideo 
                        ref={MapWithVideo=>{this.MapWithVideo = MapWithVideo}}
                        page={this.state.page} 
                        longitude={this.state.longitude} 
                        latitude={this.state.latitude} 
                        level={this.state.level}
                        history={this.props.history}
                        onPositionChange={this.handlePositionChange}
                    />
                </div>
                {/* <BottomNav></BottomNav> */}
            </div>
        )
    }
    componentDidMount = () => {
        console.log('CITYWIDE第一次渲染完成')
        let that = this
        
        //判断缓存
        if(CACHE.videoList.length>0||CACHE.point.lat!=null)
        {//若有缓存
            console.log('CITYWIDE有缓存,缓存如下')
            console.log(CACHE)
            console.log("——————————————————————")
            this.setState({
                longitude:CACHE.point.lng,
                latitude:CACHE.point.lat
            })
            this.ListWithVideo.addData(CACHE.videoList)
            this.MapWithVideo.addData(CACHE.videoList)
        }
        else
        {//若无缓存
            console.log("CITYWIDE 没缓存")
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                that.setState({
                    longitude:""+r.point.lng,
                    latitude:""+r.point.lat
                },()=>{
                    that.getNewVideo()
                })
            })
        }
    }
    componentWillUnmount = () => {
        // 离开页面时缓存数据
        CACHE.videoList = this.ListWithVideo.state._data;
        CACHE.pageIndex = this.state.page;
        CACHE.point={
            lat:this.state.latitude,
            lng:this.state.longitude
        }
        console.log("CITYWIDE 离开时的缓存如下")
        console.log(this.state)
        console.log(CACHE)
        console.log("————————————————————————")
    }
}

class List extends React.Component{
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        //判断缓存
        let that = this;
        console.log("List componentDidMount")
        console.log(CACHE)
        if(CACHE.videoList.length>0){
            console.log(CACHE.videoList)
            //读缓存中的数据生成list
            console.log('"List有缓存')
            this.props.hoc.addData(CACHE.videoList,"after",()=>{
                VIDEO_CACHE.videoList = CACHE.videoList
            })
        }else{
            //请求数据生成list
            console.log("List没缓存")
            this.props.hoc.getData("after",()=>{
                VIDEO_CACHE.videoList = that.props._data
            })
        }
    }
    componentWillUnmount = () => {
        //存入缓存
        console.log("List componentWillUnmount")
        console.log(this.props._data)

        CACHE.videoList = this.props._data
        VIDEO_CACHE.videoList = this.props._data
        console.log(CACHE)
    }

    render() {
        return (
            <div style={{display:"flex",flexFlow:"row wrap"}}>
                {this.props._data.map((gist,index) => {
                    return (
                        <ThumbVideo npr={2} key={index} info={gist} index={index}/>
                    )
                })}
            </div>
        )
    }
}
// const List = ({ _data: gists }) => (
//     <div>
//         {gists.map((gist,index) => {
//             return (
//                 <ThumbVideo npr={2} key={index} info={gist} index={index}/>
//             )
//         })}
//     </div>
// )
const withVideo = withData((props)=>`/api/v1.0/neighbour/video?page=${props.page}&longitude=${props.longitude}&latitude=${props.latitude}&level=${props.level}`)
const withVideo2 = withData((props)=>`/api/v1.0/neighbour/video?page=${props.page}&longitude=${props.longitude}&latitude=${props.latitude}&level=${props.level}`)
const MapWithVideo =  withVideo2(Map);
const ListWithVideo = withVideo(List);



