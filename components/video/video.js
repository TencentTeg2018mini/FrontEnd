import React from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom'
//css
import less from './video.less';
import LeftNav from '../nav/leftNav/leftNav'

export default class Video extends React.Component
{

    constructor(props){
        super(props);
    }
    like=()=>{
        // axios.put(
        //     '/api/v1.0/video/like/'+this.props.vid,
        //     {withCredentials:true}
        // ).then(function (response) {
        //     console.log(response);
        // }).catch(function (error) {
        //     console.log(error);
        // })
    }
    render(){
        return (
            <div className={less.videoBox} >
                <LeftNav like={this.like}></LeftNav>
                <video 
                    className={less.video} 
                    type="video/mp4" 
                    preload="auto"
                    loop="loop"
                    height={window.innerHeight}
                >
                    {/* <source src="http://localhost:9090/assert/test3.mov" type="video/mov" /> */}
                    <source src={this.props.src} type="video/mp4" />
                    {/* <source src="http://118.126.104.182:8888/" type="video/mp4" /> */}
                    您的浏览器不支持 video 标签。
                </video>
                <div className={less.info} >
                    <Link to="/user/1"><p>用户一号</p></Link>
                    谢谢你喜欢我的视频
                </div>
            </div>  
        )
    }
}        
