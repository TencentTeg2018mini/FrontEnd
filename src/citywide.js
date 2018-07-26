import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
//css
import less from './style/citywide.less';

import BottomNav from '../components/nav/bottomNav/bottomNav'
import TopNav from '../components/nav/topNav/topNav'
import Group from '../components/video/group/group'

export default class Citywide extends React.Component
{
    state={
        address:"定位中"
    }
    constructor(props){
        super(props);
        window.navigator.geolocation.getCurrentPosition((pos)=>{
            let that = this
            var crd = pos.coords;
            axios.get('https://apis.map.qq.com/ws/geocoder/v1/?location='+crd.latitude+','+crd.longitude+'&key=75BBZ-66QKX-EHO4H-7Z3UU-TGOI3-PGBKZ&get_poi=1')
            .then(function (response) {
              that.setState({
                address:response.data.result.address_component.city
              })
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      
    }
    handleClick=()=>{
        // console.log();
    }
    render(){
        return (
            <div 
                className={less.citywide}
            > 
                <div className={less.top}><TopNav></TopNav></div>
                <div className={less.position}><input readonly="readonly" value={this.state.address}></input></div>
                <div className={less.group}><Group npr="2" padding="2"></Group></div>
                <BottomNav></BottomNav>
            </div>
        )
    }
}
