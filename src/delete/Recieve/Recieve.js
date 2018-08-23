import React from 'react';
import { render } from 'react-dom';

//css
import less from './recieve.less';
import BottomNav from 'Components/nav/bottomNav/bottomNav'

//TODO: 优化结构
export default class Recieve extends React.Component{
    constructor(props){
        super(props);
        this.withItemGetterRecieve = withItemGetter(
            Content,
            {url:'/api/v1.0/relation/',config:{params:{page:1,type:'fan'}}},
            (data,length)=>{
                return data.data.map((value,index)=>{
                    return <Item key={length+index} info={value}/>
                })
            }
        )
    }
    render(){
        return (        
            <this.withItemGetterRecieve/>
        )
    }
}
class Content extends React.Component
{
    constructor(props){
        super(props);
        this.state ={
            ItemGetterItems:[]
        }
    }
    render(){
        return (        
            <div 
                className={less.attention}
            >   
                <div className={less.header}> 粉丝 </div>
                <div className={less.content}>
                    {this.state.ItemGetterItems}
                </div>
            </div>
        )
    }
}
class Item extends React.Component
{
    constructor(props){
        super(props);
        let state ={
            "status": 0,
            "province": "保密",
            "account": "保密",
            "tel": "保密",
            "uid": "保密",
            "city": "保密",
            "country": "保密",
            "age":"保密",
            "video_num": 0,
            "sex": "保密",
            "brief_introduction": "",
            "fans": 0,
            "video_like_num": 0,
            "birth": "保密",
            "follow": 0,
            "password": "保密",
            "nickname": "保密",
            "register_date": "保密",
            "photo_url": "保密"//TODO: 默认头像
        }
    }
    render(){
        return (        
            <div 
                className={less.attention}
            >   
                test111
            </div>
        )
    }
}