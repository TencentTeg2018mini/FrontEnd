import React from 'react';
import { render } from 'react-dom';
import{Link} from 'react-router-dom';

//css
import less from './message.less';
import BottomNav from 'Components/nav/bottomNav/bottomNav'
import withData from 'Components/withData/withData'
import defaultImg from 'Assert/imgs/defaultImg.png'
import GoBackWithRouter from 'Components/GoBackWithRouter/GoBackWithRouter'
import Concern from 'Components/concern/concern'
import ChatButton from 'Components/ChatButton/ChatButton'
//TODO: 优化结构
export default class Message extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (        
            <div 
                className={less.message}
            >   
                <div className={less.header}>
                    <div className={less.title}>
                        <div className={less.titleName}>
                            消息
                        </div>
                        <GoBackWithRouter className={less.return}></GoBackWithRouter>
                    </div>
                </div>
                <div className={less.messageBox}>
                    
                    <UserItem info={userinfo}></UserItem>
                    {/* <div className={less.item}>没有更多了</div> */}
                </div>
                <BottomNav className={less.bottomNav} history={this.props.history}></BottomNav>
            </div>
        )
    }
}

class UserItem extends  React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div style={{display:"flex",flexFlow:"row nowrap",alignItems:"center",margin:"1rem 0.5rem 1rem 0rem"}}>
                <Link to={"/user/"+this.props.info.uid} style={{color:"white",flex:"0 0 30%"}}>
                    <img src={window.localhost+this.props.info.photo_url} style={{width:"2rem",height:"2rem"}}/>
                </Link>
                <Link to={"/user/"+this.props.info.uid} style={{color:"white",flex:"0 0 50%",textAlign:"left"}}>
                    {this.props.info.nickname}
                </Link>
                {/* <div style={{flex:"0 0 40%"}}>聊天</div> */}
                <ChatButton uid={this.props.info.uid} style={{flex:"0 0 20%"}}></ChatButton>
            </div>
        )
    }
}

var userinfo = {
    "status": 0,
    "province": "保密",
    "account": "qqqqqq12",
    "tel": "保密",
    "uid": -6070221056220097789,
    "city": "保密",
    "country": "中国",
    "age": 18,
    "video_num": 0,
    "sex": "保密",
    "brief_introduction": "",
    "fans": 0,
    "video_like_num": 0,
    "birth": null,
    "follow": 0,
    "password": "",
    "nickname": "qqqqqq12",
    "register_date": "2018-07-21 18:18:02",
    "photo_url": "/data/minitrill/user/photo/default/default.jpg"
}