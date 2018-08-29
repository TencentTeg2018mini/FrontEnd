import React from 'react';
import { render } from 'react-dom';
//css
import less from './topNav.less';
import{Link} from 'react-router-dom';


//TODO: 更改
export default class TopNav extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (        
            <div 
                className={less.top}
            >
                <Link to='/'>推荐</Link>|
                <Link to='/citywide'>周围</Link>
            </div>
        )
    }
}        
