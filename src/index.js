import React from 'react';
import { render } from 'react-dom';
import {  BrowserRouter,HashRouter, Route,Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition ,ReactCSSTransitionGroup} from "react-transition-group";
import axios from 'axios'
//css
import less from './index.less'
//self
import Commend from './view/Commend/Commend'
import UserInfo from './view/UserInfo/UserInfo'
import Citywide from './view/Citywide/Citywide'
import Attention from './view/Attention/Attention'
import Message from './view/Message/Message'
import Chat from './view/Chat/Chat'
import Video from './view/Video/Video'
import Shot from './view/Shot/Shot'
// import Recieve from './view/Recieve/Recieve'
// import Contact from './view/Contact/Contact'
import {Test} from './Test'

// window.localhost = 'http://47.106.158.125'
window.localhost = 'https://192.168.155.1'
// window.videoLocalhost = 'http://10.121.129.146:8081/'
// window.videoLocalhost = 'http://192.168.155.1:9091/'
//TODO: 添加拍摄页

// let CACHE = GLOBAL_CACHE.get("SESSION",{
//     account:"",
//     uid:"",
//     nickname:""
// })

GLOBAL_CACHE.SESSION = {
        account:"",
        uid:"",
        nickname:""
}
//一定是驼峰命名
export const  { Provider, Consumer } = React.createContext("global");
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isLogin:false,
            myId:0
        }

    }
    componentDidMount=()=>{
        let that = this;
        axios.get('/api/v1.0/session')
        .then(function(response) {
            console.log(response);
            if(response.data.code==0){
                console.log("yes");
                that.setState({
                    isLogin:true,
                    myId:response.data.data.id
                })
                GLOBAL_CACHE.SESSION = {
                    account:response.data.data.account,
                    uid:response.data.data.id,
                    nickname:response.data.data.nickname
                }
                console.log(GLOBAL_CACHE)
            }else{
                that.setState({
                    isLogin:false
                })
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    render() {
        return (
            <Provider value={this}>
                <BrowserRouter className={less.index}>
                    <Route
                        render={({ location }) => (
                            <TransitionGroup>
                                <CSSTransition
                                    key={location.pathname}
                                    // key={location.key}
                                    classNames="fade"
                                    timeout={1000}
                                >   
                                    <Switch location={location}>
                                        <Route exact path='/' component={Commend}/>

                                        {/* <Route exact path='/user/me' component={UserInfo}/> */}
                                        <Route exact path='/citywide' component={Citywide}/>

                                        <Route exact path="/user/:uid" component={UserInfo}/>
                                        <Route exact path='/user/:uid/video/:vid/key/:key' component={Video}/>
                                        <Route exact path='/user/me/attention' component={Attention}/>{/*me*/}
                                        {/* <Route exact path='/user/me/message' component={Message}/> */}
                                        {/* <Route exact path='/user/me/message/recieve' component={Recieve}/> */}
                                        {/* <Route exact path='/uesr/me/contact' component={Contact}/> */}
                                        <Route exact path='/chat/:uid' component={Chat} />
                                        <Route exact path='/chat' component={Message} />
                                        <Route exact path='/test' component={Test}/>

                                        <Route exact path='/shot' component={Shot}/>
                                        <Route render={() => <div>Not Found</div>} />
                                    </Switch>
                                </CSSTransition>
                            </TransitionGroup>
                        )}
                    />
                </BrowserRouter>
            </Provider>
        )
    }
}
 
render(
    <App/>
    ,
    document.getElementById('app')
);