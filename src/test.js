
import React, { Children } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom'
import axios from 'axios';
import less from './test.less';
import withData from 'Components/withData/withData'
import withDialog from 'Components/withDialog/withDialog'
import PageTurner from 'Components/PageTurner/PageTurner'
import {Form, ImageToBase64,Input } from 'Components/Form/Form';
import InformWithDialog from 'Components/InformWithDialog/InformWithDialog'


let CACHE = GLOBAL_CACHE.get("TEST_VIDEO_LIST",{
    videoList:[],
    pageIndex:0
})
export class Test extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            page:1
        }
        this.pageTurner = React.createRef();
    }
    getDataBefore = () => {
        this.setState(prev=>({
            page:prev.page-1
        }),()=>{this.list.getData("before")})
    }
    getDataAfter =()=> {
        this.setState(prev=>({
            page:prev.page+1
        }),()=>{this.list.getData("after")})
    }
    
    render(){
        return( 
            <div>
                <Link to="/">Home</Link>
                <div onTouchEnd={this.getDataBefore}>getDataBefore</div>
                <div onTouchEnd={this.getDataAfter}>getDataAfter</div>
                <InformWithDialog>举报</InformWithDialog>
                <PageTurner
                    style={{display:"flex",maxHeight:"400px"}} 
                    // ref={TurnPage=>{this.TurnPage = TurnPage}}
                    ref={this.pageTurner}
                >
                    <ListWithVideo ref={list=>this.list=list} isAutoGet={0} page={this.state.page}></ListWithVideo> 
                </PageTurner>
                <Form>
                {form=>(
                    <React.Fragment>
                        <Input name="test" onChange={form.bindData}/>
                        <ImageToBase64 style={{width:"2rem"}} id="testImage" onChange={form.bindValue}></ImageToBase64>
                        <div onTouchEnd={form.showData}>提交</div>
                    </React.Fragment>
                )}
                </Form>
            </div>
        )
    }
    isMountList = 0
    componentDidMount = () => {
        console.log("Test:componentDidMount")
        this.isMountList =1;
    }
    componentDidUpdate = (prevProps, prevState) => {
        console.log("Test:componentDidUpdate")
        if(this.isMountList){
            this.pageTurner.current.changePageIndex(CACHE.pageIndex)
            this.isMountList = 0
        }
       
    }
    componentWillUnmount = () => {
        console.log("Test:componentWillUnmount")
        CACHE.pageIndex = this.pageTurner.current.pageIndex
    }
    
    
}

export class Item extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <input type="text" name="manss" onChange={this.props.handleChange}/>
            </div>
        )
    }
}

class List extends React.Component{
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        //判断缓存
        console.log("List componentDidMount")
        console.log(CACHE)
        if(CACHE.videoList.length>0){
            //读缓存中的数据生成list
            console.log('有缓存')
            this.props.hoc.addData(CACHE.videoList,"after")
            
        }else{
            //请求数据生成list
            console.log("没缓存")
            this.props.hoc.getData()
        }
    }
    componentWillUnmount = () => {
        //存入缓存
        console.log("List componentWillUnmount")
        console.log(this.props._data)
        CACHE.videoList = this.props._data
        console.log(CACHE)
    }

    render() {
        return (
            <div>
                {this.props._data.map((value,index)=>{
                    return <div style={{border:"1px solid black",boxSizing:"border-box"}} key={index}>{value.title}</div>
                })}
            </div>
        )
    }
}
const withVideo = withData(props=>`/api/v1.0/video/?page=${props.page}`)
const ListWithVideo = withVideo(List)