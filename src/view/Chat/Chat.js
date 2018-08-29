import React from 'react';
import {Link} from 'react-router-dom'

import less from './chat.less'
import ChatInput from 'Components/ChatInput/ChatInput'
import ScrollingArea from 'Components/ScrollingArea/ScrollingArea'
import GoBackWithRouter from 'Components/GoBackWithRouter/GoBackWithRouter'
import ProfileWithRouter from 'Components/ProfileWithRouter/ProfileWithRouter'
import Boy from 'Assert/imgs/boy.png'
import Girl from 'Assert/imgs/girl.png'
import axios from 'axios'
export default class Chat extends React.Component
{
    constructor(props) {
        super(props)
    
        this.state = {
            user:{

            },
            history:[
            ]
        }
    }
    submit = (form) =>{
        // localStorage.setItem(`myCat`, `Tom`);
        // 本地缓存
        let that = this;
        let history = this.state.history;
        let message = form.form.state.data;
        history.push({profile:Boy,uid:"-5148816425020941034",message:message})
        this.setState({
            history:history
        })
        form.setState({
            value:""
        })
        that.scroll.container.scrollTo(0,9999)
        axios.post(
            "/api/v1.0/conversation",
            {message:message}
        ).then((response)=>{
            console.log(response.data.data) 

            let history = this.state.history;
            let message = response.data.data;
            history.push({profile:Boy,uid:"6441801459221662990",message:message})
            this.setState({
                history:history
            },()=>{
                console.log(that.scroll.container.scrollTo(0,9999)) 
            })
        })
    }
    render() {
        return (
            <div className={less.chat}>
                <div className={less.header}>
                    <GoBackWithRouter style={{left:0}}></GoBackWithRouter>
                    聊天
                </div>
                <div className={less.content}>
                    <ScrollingArea ref={scroll=>{this.scroll = scroll}} style={{height:"100%"}}>
                        {this.state.history.map((value,index)=>{
                            return (
                                <Item profile={value.profile} key={index} uid={value.uid} message={value.message}></Item>
                            )
                        })}
                    </ScrollingArea>
                </div>
                <div className={less.input}>
                    <ChatInput onInputEnd={this.submit}></ChatInput>
                </div>
            </div>
        )
    }
}
/**
 * @param uid
 * @param content
 * @class Item
 * @extends {React.Component}
 */
class Item extends React.Component
{
    constructor(props) {
      super(props)
      
      this.state = {
         
      }
    }
    render() {
      return (
        <div>
            {/* {GLOBAL_CACHE.SESSION.uid==this.props.uid */}
            {this.props.uid == "-5148816425020941034"
                ?<div className={less.chatItem + " " +less.self}>
                    <ProfileWithRouter uid={this.props.uid} photo={this.props.profile}></ProfileWithRouter>
                    <div className={less.chatContent}>{this.props.message}</div>
                </div>
                :<div className={less.chatItem + " " +less.other}>
                    <ProfileWithRouter uid={this.props.uid} photo={this.props.profile}></ProfileWithRouter>
                    <div className={less.chatContent}>{this.props.message}</div>
                </div>
            }
        </div>
      )
    }
    
}