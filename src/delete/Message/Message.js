import React from 'react';
import { render } from 'react-dom';
import{Link} from 'react-router-dom';

//css
import less from './message.less';
import BottomNav from 'Components/nav/bottomNav/bottomNav'
import withData from 'Components/withData/withData'
import defaultImg from 'Assert/imgs/defaultImg.png'

//TODO: 优化结构
export default class Message extends React.Component{
    constructor(props){
        super(props);
        this.withItemGetterMessage = withItemGetter(
            Content,
            {url:'/api/v1.0/message/',config:{params:{page:1,type:'recive'}}},
            (data,length)=>{
                return data.data.map((value,index)=>{
                    return <Item key={length+index} info={value}/>
                })
            }
        )
    }
    render(){
        return (        
            <this.withItemGetterMessage/>
        )
    }
}

class Content extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            ItemGetterItems:[]
        }
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
                        <Link to="/uesr/me/contact">
                            <div className={less.friend}>
                                联系人->
                            </div>
                        </Link>
                    </div>
                    <div className={less.nav}>
                        <div>
                            <Link to="/user/me/message/recieve">
                                <img src={defaultImg}/>
                                <p className={less.linkLetter}>粉丝</p>
                            </Link>
                        </div>
                        <div>
                            <Link to="/user/me/message/recieve">
                                <img src={defaultImg}/>
                                <p className={less.linkLetter}>赞</p>
                            </Link>
                        </div>
                        <div>
                            <Link to="/user/me/message/recieve">
                                <img src={defaultImg}/>
                                <p className={less.linkLetter}>我的</p>
                            </Link>
                        </div>
                        <div>
                            <Link to="/user/me/message/recieve">
                                <img src={defaultImg}/>
                                <p className={less.linkLetter}>评论</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={less.messageBox}>
                    {this.state.ItemGetterItems}
                    <div>没有更多了</div>
                </div>
                <BottomNav className={less.bottomNav} history={this.props.history}></BottomNav>
            </div>
        )
    }
}

class Item extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (        
            <div>消息一</div>
        )
    }
}
