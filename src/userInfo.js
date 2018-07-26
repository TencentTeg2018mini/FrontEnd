import React from 'react';
import { render } from 'react-dom';


//css
import less from './style/userInfo.less';
import axios from 'axios';
import BottomNav from '../components/nav/bottomNav/bottomNav'
import TopNav from '../components/nav/topNav/topNav'
import Group from '../components/video/group/group'

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
        this.state={
            user:{
                photo_url:"",
                nickname:"",
                account:"",
                brief_introduction:"",
                sex:"",
                age:"",
                city:""
            },
        }
        let that = this;
        console.log(this.props.match.params.uid);
        if(this.props.match.params.uid=="me"){
            axios.get(
                ' /api/v1.0/account',
                {withCredentials:true}
            ).then(function (response) {
                console.log(response.data.data);
                let data = response.data.data;
                if(response.data.code==0){
                    if(data!=null){
                        that.setState({
                            user:data
                        })
                    }
                }
            }).catch(function (error) {
                // console.log(error);
            })
        }else{

        }

    }
    onQuit=()=>{
        axios.delete(
            ' /api/v1.0/session',
            {withCredentials:true}
        ).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
        this.props.history.goBack();
    }
    user=()=>{
        if(this.props.match.params.uid=="me"){ 
            return (
                <div className={less.button}>
                    <button>关注</button>
                    <button onTouchEnd={this.onQuit}>退出</button>
                </div>
            )
        }else{
            return (
                <div className={less.button}>
                    <button>关注</button>
                </div>
            )
        }
    }
    render(){
        return (
            <div 
                className={less.userInfo}
                onTouchStart = {this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd}
            >
                <div 
                    className={less.info}
                >
                    <div className={less.person}>
                        <div className={less.profile}>
                            <img src={"http://47.106.158.125"+this.state.user.photo_url}/>
                        </div>
                        {this.user()}
                    </div>
                    <div>{this.state.user.nickname}</div>
                    <div>mini号:{this.state.user.account}</div>
                    <div>------------------------------</div>
                    <div>签名:{this.state.user.brief_introduction}</div>
                    <div>
                        <span>地理位置:定位中</span> 
                        <span>性别:{this.state.user.sex==""?"保密":this.state.user.sex}</span>
                        <span>年龄:{this.state.user.age}</span> 
                        <span>城市:{this.state.user.city}</span>
                    </div>
                    <div>获赞</div>
                </div>
                <div className={less.video}>
                    <div className={less.tag}>
                       <div>喜欢 23</div>|
                       <div>作品 12</div>
                    </div>
                    <div className={less.group}>
                        <Group npr={3} padding={1} src=""></Group>
                    </div>
                </div>
            </div>
        )
    }

}
