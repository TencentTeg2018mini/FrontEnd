import React from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router-dom'
import axios from 'axios'
//css
import less from './Attention.less';
//Components
import BottomNav from 'Components/nav/bottomNav/bottomNav'
import Concern from 'Components/concern/concern'
import withData from 'Components/withData/withData'
import ScrollingArea from 'Components/ScrollingArea/ScrollingArea'
import GoBackWithRouter from 'Components/GoBackWithRouter/GoBackWithRouter'
import { setTimeout } from 'timers';

//TODO: 完成关注页
let CACHE = GLOBAL_CACHE.get("ATTENTION",{
    page:1,
    list:[]
})
export default class Attention extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            page:1,
            hasMore:1
        }
    }
    //TODO: 做一个优化
    componentDidMount = () => {
        console.log(this.ListWithMaster)
        if(CACHE.list.length == 0){
            console.log("ATTENTION 没缓存")
            this.getData(this.getData)

        }else{
            console.log("ATTENTION 有缓存")
            this.ListWithMaster.addData(CACHE.list)
            this.setState({
                page:CACHE.page
            })
        }
    }
    componentWillUnmount=()=>{
        CACHE.page = this.state.page
        CACHE.list = this.ListWithMaster.state._data
    }
    getData = (func) => {
        let that = this;
        this.ListWithMaster.getData("after",(data)=>{
            if(data.data.length<=4){
                console.log("page不变")
                return 0;
            }else{
                that.setState(prev=>{return {
                    page:prev.page+1
                }},func)
                return 1;
            }
        })
    }
    render(){
        return (        
            <div 
                className={less.attention}
            >   
                
                <div className={less.title}>
                    <b>关注</b>
                    <GoBackWithRouter className={less.return}></GoBackWithRouter>
                </div>
                <ScrollingArea 
                    style={{height:"75%",marginTop:"5%"}}
                    onCantScroll = {this.getData}
                    onButtomStop = {this.getData}
                >
                    <ListWithMaster 
                        ref={list => {this.ListWithMaster = list}} 
                        page={this.state.page}
                    />
                    <div style={{fontSize:"0.7rem",color:"#F4F4F4",lineHeight:"1rem"}}>暂无哦</div>
                </ScrollingArea>
                <BottomNav className={less.bottomNav} history={this.props.history}></BottomNav>
            </div>
        )
    }
}

//ListWithMaster
class Item extends  React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div style={{display:"flex",flexFlow:"row nowrap",alignItems:"center",margin:"1rem 0.5rem 1rem 0rem"}}>
                <Link to={"/user/"+this.props.info.uid} style={{color:"white",flex:"0 0 20%"}}>
                    <img src={window.localhost+this.props.info.photo_url} style={{width:"2rem",height:"2rem"}}/>
                </Link>
                <Link to={"/user/"+this.props.info.uid} style={{color:"white",flex:"0 0 40%",textAlign:"left"}}>
                    {this.props.info.nickname}
                </Link>
                <Concern isConcern={1} uid={this.props.info.uid} type={"button"} style={{flex:"0 0 40%"}}></Concern>
            </div>
        )
    }
}
const List = ({_data:datas})=>(
    <div>
        {datas.map((value,index)=>{
            return(
                <Item key={index} info={value}></Item>
            )
        })}
    </div>
)
const withMaster = withData(props=>`/api/v1.0/relation/?page=${props.page}&type=master`)
const ListWithMaster = withMaster(List)