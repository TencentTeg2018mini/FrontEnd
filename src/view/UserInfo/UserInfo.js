import React from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom'

//css
import less from './UserInfo.less';
import axios from 'axios';
import BottomNav from 'Components/Nav/BottomNav/BottomNav'
import TopNav from 'Components/Nav/TopNav/TopNav'
// import Group from 'Components/video/group/group'
import Concern from 'Components/Concern/Concern'
import defaultImg from 'Assert/imgs/defaultImg.png'
import withData from 'Components/withData/withData'
import {Consumer} from 'Src/index'
import ThumbVideo from 'Components/ThumbVideo/ThumbVideo'
import ScrollingArea from 'Components/ScrollingArea/ScrollingArea'
import GoBackWithRouter from 'Components/GoBackWithRouter/GoBackWithRouter'
import InformWithDialog from 'Components/InformWithDialog/InformWithDialog'
import ChatImg from 'Assert/imgs/chat.png'

//TODO: 高阶组件控制滑动
//TODO: 固钉
//TODO: 关注组件

let CACHE = null;
let VIDEO_CACHE = GLOBAL_CACHE.get("VIDEOPAGE",{
    videoList:[],
    pageIndex:1,
})

export default class UserInfo extends React.Component
{   
    pos = {
        x:0,
        y:0
    }
    newPos = {};
    onTouchStart = (e)=>{
        this.pos.x = e.touches[0].pageX;
        this.pos.y = e.touches[0].pageY;
    }
    onTouchMove=(e)=>{
        this.newPos = e.touches[0];
    }
    onTouchEnd=(e)=>{

        if((this.newPos.pageX - this.pos.x) > 50 ){
            this.props.history.goBack();
        }
    }
    constructor(props){
        super(props);
        CACHE = GLOBAL_CACHE.get("USERINFO_"+this.props.match.params.uid,{
            videoList:[],
            user:{},
        })

        if(Object.keys(CACHE.user).length === 0){
            console.log("没有user")
            let that = this;
            console.log(GLOBAL_CACHE)
            console.log(GLOBAL_CACHE.SESSION)
            if(this.props.match.params.uid == "me"||this.props.match.params.uid==GLOBAL_CACHE.SESSION.uid){
                console.log("自己")
                this.state={
                    user:{
                        status: 0, 
                        province: "", 
                        account: "", 
                        tel: "", 
                        uid: GLOBAL_CACHE.SESSION.uid, 
                        city: "", 
                        country: "", 
                        age: 15, 
                        video_num: 0, 
                        sex: "\u4fdd\u5bc6", 
                        brief_introduction: "", 
                        fans: 0, 
                        video_like_num: 0, 
                        birth: "2018-07-20", 
                        follow: 16, 
                        password: "", 
                        nickname: "", 
                        register_date: "2018-07-23 22:25:48", 
                        photo_url: ""
                    },
                    isMe:true,
                    page:1
                }
                axios.get(
                    ' /api/v1.0/account',
                ).then(function (response) {
                    console.log(response.data.data);
                    let data = response.data.data;
                    if(response.data.code==0){
                        if(data!=null){
                            // let state = Object.assign({},that.state.user,data)
                            that.setState({
                                user:data,
                            })
                        }
                    }
                }).catch(function (error) {
                    // console.log(error);
                })
            }else{
                //TODO: 获取某个用户的信息
                console.log("别人")
                this.state={
                    user:{
                        status: 0, 
                        province: "", 
                        account: "", 
                        tel: "", 
                        uid: this.props.match.params.uid, 
                        city: "", 
                        country: "", 
                        age: 15, 
                        video_num: 0, 
                        sex: "\u4fdd\u5bc6", 
                        brief_introduction: "", 
                        fans: 0, 
                        video_like_num: 0, 
                        birth: "2018-07-20", 
                        follow: 16, 
                        password: "", 
                        nickname: "", 
                        register_date: "2018-07-23 22:25:48", 
                        photo_url: ""
                    },
                    isMe:false,
                    page:1
                }
                axios.get(
                    '/api/v1.0/user/'+this.props.match.params.uid
                ).then((response)=> {
                    console.log(response.data.data);
                    let data = response.data.data;
                    if(response.data.code==0){
                        console.log("用户")
                        // if(data!=null){
                            // let state = Object.assign({},that.state.user,data)
                            // console.log(state)
                        console.log(data)
                        that.setState({
                            user:data
                        })
                        // }
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }   
        }else{
            console.log("有user")
            console.log(GLOBAL_CACHE.SESSION)
            if(this.props.match.params.uid == "me"||this.props.match.params.uid==GLOBAL_CACHE.SESSION.uid){
                this.state={
                    user:CACHE.user,
                    isMe:true,
                    page:1
                }
            }else{
                this.state={
                    user:CACHE.user,
                    isMe:false,
                    page:1
                }
            }
        }


    }
    onQuit=(app,e)=>{
        e.preventDefault();
        e.stopPropagation();
        axios.delete(
            ' /api/v1.0/session'
        ).then(function (response) {
            app.setState({isLogin:false})
            GLOBAL_CACHE.SESSION = {
                account:"",
                uid:"",
                nickname:""
            }
            delete GLOBAL_CACHE.USERINFO_me
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
        this.props.history.push("/");
    }
    getData=()=>{
        this.list.getData("after",(data)=>{
            if(data.data.length<=4){
                console.log("page不变")
            }else{
                this.setState(prev=>{return {
                    page:prev.page+1
                }})
            }
        })
    }
    render(){
        return (
            <Consumer>
                {app=>{
                return (
                <div 
                    className={less.userInfo}
                    onTouchStart = {this.onTouchStart}
                    onTouchMove={this.onTouchMove}
                    onTouchEnd={this.onTouchEnd}
                >
                    <div className={less.title}>
                        <GoBackWithRouter className={less.return}></GoBackWithRouter>
                        <div style={{display:"flex",flexFlow:"column nowrap",margin:"auto",textAlign:"center"}}>
                            <b>{this.state.user.nickname}</b>
                            <small>mini号:{this.state.user.account}</small>
                        </div>
                        {!this.state.isMe&&<InformWithDialog><div className={less.button+" "+less.inform}>···</div></InformWithDialog>}
                    </div>
                    <div 
                        className={less.info}
                    >
                        <div className={less.person}>
                            {/* 头像 */}
                            <div className={less.profile}>
                                <img src={this.state.user.photo_url==""?defaultImg:window.localhost+this.state.user.photo_url}/>
                            </div>
                            {/* 按钮 */}
                            {
                                this.state.isMe
                                    ?<div className={less.buttonGroup}>
                                        <button className={less.button} onTouchEndCapture={(e)=>{this.onQuit(app,e)}}>退出</button>
                                        <Link to="/chat"><span className={less.chat}><img src={ChatImg}/></span></Link>
                                     </div>
                                    :<div className={less.buttonGroup}>
                                        <Concern className={less.button} uid={this.state.user.uid} type={"button"}></Concern>
                                        <Link to={"/chat/"+this.state.user.uid}><span className={less.chat}><img src={ChatImg}/></span></Link>
                                    </div>
                            }
                         
                        </div>
                        <div className={less.autograph}>{this.state.user.brief_introduction}</div>
                        <div className={less.label}>
                            <span>性别:{this.state.user.sex}</span>
                            <span>年龄:{this.state.user.age}</span> 
                            <span>城市:{this.state.user.city}</span>
                        </div>
                    </div>
                    <div className={less.video}>
                        <div className={less.tag}>
                            <b>作品</b>
                        </div>
                        <div className={less.group}>
                            {/*TODO: 获取某个用户的视频库 */}
                            {/* <Group npr={3} padding={1} src=""></Group> */}
                        <ScrollingArea style={{height:"100%"}}>
                            <ListWithVideo 
                                ref={list=>{this.list=list}}
                                page={this.state.page} 
                                uid={this.state.user.uid}
                            />
                        </ScrollingArea>
                        </div>
                    </div>
                </div>)}}
            </Consumer>
        )
    }
    componentWillUnmount = () => {
        CACHE.user = this.state.user
        VIDEO_CACHE.pageIndex = this.state.page
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
            this.props.hoc.addData(CACHE.videoList,"after")
            VIDEO_CACHE.videoList = CACHE.videoList
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
        console.log(VIDEO_CACHE)
    }

    render() {
        return (
            <div style={{display:"flex",flexFlow:"row wrap"}}>
                {this.props._data.map((gist,index) => {
                    return (
                        <ThumbVideo npr={3} key={index} info={gist} index={index}/>
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
//                 <ThumbVideo npr={3} key={index} info={gist}/>
//             )
//         })}
//     </div>
// )
const withVideo = withData((props)=>{   
    return (`/api/v1.0/video/?page=${props.page}&uid=${props.uid}`)})
const ListWithVideo = withVideo(List);
