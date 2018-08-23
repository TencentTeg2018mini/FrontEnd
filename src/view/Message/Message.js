import React from 'react';
import { render } from 'react-dom';
import{Link} from 'react-router-dom';

//css
import less from './message.less';
import BottomNav from 'Components/nav/bottomNav/bottomNav'
import withData from 'Components/withData/withData'
import defaultImg from 'Assert/imgs/defaultImg.png'
import GoBackWithRouter from 'Components/GoBackWithRouter/GoBackWithRouter'
import UserItem from 'Components/UserItem/UserItem'

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
                    <div className={less.item}>没有更多了</div>
                    <UserItem ></UserItem>
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
