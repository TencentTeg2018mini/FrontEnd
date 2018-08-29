import React from 'react';
import {render,createPortal} from 'react-dom';
//css
import less from './leftNav.less';
import{Link} from 'react-router-dom';

import CommentWithDialog from 'Components/commentWithDialog/commentWithDialog';
import withDialog from 'Components/withDialog/withDialog';
import ShareWithDialog from 'Components/shareWithDialog/shareWithDialog';
import Like from 'Components/like/like';
import axios from 'axios';
import ProfileWithRouter from "Components/ProfileWithRouter/ProfileWithRouter";
import { withItemFalls,withItemGetter} from 'Components/HOC/HOC';

//TODO: 优化结构
export default class LeftNav extends React.Component
{
    likeBg = [less.like,less.liked]
    constructor(props){
        super(props);
        console.log(this.props.info)
    }

    like=(e)=>{
        this.props.like();
        if(this.state.islike){
            this.setState({
                islike:0
            })
        }else{
            this.setState({
                islike:1
            })
        }
    }
    render(){
        return ( 
            <div 
                className={less.left}
            >
                <div className={less.item}>
                    <ProfileWithRouter uid={this.props.info.uploader_uid} ></ProfileWithRouter>
                </div>
                <div className={less.item}>
                    <Like target={['video',this.props.info.vid]} ></Like>
                </div>
                <div className={less.item}> 
                    <CommentWithDialog info={this.props.info} ><div className={less.comment}></div> </CommentWithDialog>
                </div>
                <div className={less.item}>
                    <ShareWithDialog info={this.props.info}><div className={less.share}></div></ShareWithDialog>
                </div>
                {/* <div className={less.music}></div> */}
            </div>
        )
    }
}        
