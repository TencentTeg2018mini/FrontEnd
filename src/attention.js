import React from 'react';
import { render } from 'react-dom';

//css
import less from './style/attention.less';
import BottomNav from '../components/nav/bottomNav/bottomNav'

export default class Attention extends React.Component
{
    constructor(props){
        super(props);
    }
    render(){
        return (        
            <div 
                className={less.attention}
            >   
                关注
                <BottomNav history={this.props.history}></BottomNav>
            </div>
        )
    }
}
