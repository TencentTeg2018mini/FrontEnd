import React from 'react';
import { render } from 'react-dom';

import Concern from 'Components/concern/concern'
import withData from 'Components/withData/withData'

export default class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.Content = withItemGetter(
            Content,
            {
                url:'/api/v1.0/relation/',
                config:{
                    params:{
                        page:1,
                        type:"master"
                    }
                }
            },
            (data,length)=>{
                return data.data.map((value,index)=>{
                    return <Item key={length+index} info={value}></Item>
                })
            }
        )
    }
    render() {
        return (
            <div>
                {/* TODO: 回退 */}
                <div>回退</div>
                {/* TODO: 完成搜索组件 */}
                <div>搜索</div>
                <this.Content></this.Content>
            </div>
        )
    }
}

class Item extends  React.Component {
    constructor(props){
        super(props);
        //TODO: 做输入检测
    }
  render() {
    return (
        <div>
            {/* TODO: 完成有新作提醒 */}
            <img src={window.localhost+ this.props.info.photo_url}/>
            {this.props.info.nickname}
            <Concern uid={this.props.info.uid} type={"button"}></Concern>
        </div>
    )
  }
}