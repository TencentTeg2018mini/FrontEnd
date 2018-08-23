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
    user:{},
})
let VIDEO_CACHE = GLOBAL_CACHE.get("VIDEOPAGE",{
    videoList:[],
    pageIndex:1,
    videoIndex:1//播放第几个视频
})
export default class Citywide extends React.Component
{
    constructor(props){
        super(props);

        this.state={
            address:"定位中",
            height:50,

            latitude:"22.5379439",
            longitude:"113.9353733",
            level:8,
            page:1
        }
        this.MapPositionY = 0;
    }
    componentDidMount = () => {
        window.navigator.geolocation.getCurrentPosition((pos)=>{
            let that = this
            var crd = pos.coords;
            console.log(crd)
            this.setState({
                longitude:""+crd.longitude,
                latitude:""+crd.latitude
            },()=>{
                that.getNewVideo()
            })
            // axios.get('https://apis.map.qq.com/ws/geocoder/v1/?location='+crd.latitude+','+crd.longitude+'&key=75BBZ-66QKX-EHO4H-7Z3UU-TGOI3-PGBKZ&get_poi=1')
            // .then(function (response) {
            //     that.setState({
            //         address:response.data.result.address_component.city
            //     })
            // })
            // .catch(function (error) {
            //   console.log(error);
            // });
        })

    }
    onTouchStart = (e) => {
        this.MapPositionY = e.touches[0].pageY
    }
    handlePositionChange=(map)=>{
        console.log(map)
        this.setState({
            page:1,
            latitude: ""+map.point.lat,
            longitude: ""+map.point.lng
        },()=>{this.getNewVideo()})
    }
    onTouchMove = (e) => {
        //TODO: 不智能，需修改
        //TODO: 在一个16*9的视频上下，添加类似电影胶卷的图样
        let dis =100*(e.touches[0].pageY - this.MapPositionY)/document.body.clientHeight
        console.log(document.body.clientHeight)
        this.MapPositionY = e.touches[0].pageY
        this.setState((prev)=>{return {
            height: Math.min( Math.max(0,prev.height+dis) ,95 )
        }})
    }
    getNewVideo = (func) => {
        let that = this;
        this.MapWithVideo.getData("fresh",(data)=>{
            if(data.data.length<=4){
                console.log("page不变")
            }else{
                that.setState(prev=>{return {
                    page:prev.page+1
                }})
            }
        });
        this.ListWithVideo.getData("fresh",(data)=>{
            if(data.data.length<=4){
                console.log("page不变")
            }else{
                that.setState(prev=>{return {
                    page:prev.page+1
                }})
            }
            console.log("look me")
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
                    <div className={less.valve} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}>
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
    componentWillUnmount = () => {
        // CACHE.user = this.state.user
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
            <div>
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



