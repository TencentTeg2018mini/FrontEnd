import React from 'react';
import { render } from 'react-dom';

//css
import less from './style/message.less';
import BottomNav from '../components/nav/bottomNav/bottomNav'

export default class Message extends React.Component
{
    constructor(props){
        super(props);
    }
    render(){
        return (        
            <div 
                className={less.message}
            >   <div>
                    <div>
                        消息
                    </div>
                    <div>
                        联系人
                    </div>
                </div>
                <div>
                    <div>
                        粉丝
                    </div>
                    <div>
                        赞
                    </div>
                    <div>
                        我的
                    </div>
                    <div>
                        评论
                    </div>
                </div>
                <div>
                    <div>消息一</div>
                    <div>消息二</div>
                </div>
                <BottomNav history={this.props.history}></BottomNav>
            </div>
        )
    }
}
