import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
//css
import less from './group.less';

export default class Group extends React.Component
{

    divStyle = {
        width:100/this.props.npr+"%",
        padding:this.props.padding/2
    }
    constructor(props){
        super(props);
    }
    getVideoPath(){

        let json = {
            0:{
                img:"http://localhost:9090/assert/test2.mp4",
                src:"http://localhost:9090/assert/test2.mp4"
            },
            1:{
                img:"http://localhost:9090/assert/test2.mp4",
                src:"http://localhost:9090/assert/test1.mp4"
            },
            2:{
                img:"http://localhost:9090/assert/test2.mp4",
                src:"http://localhost:9090/assert/test3.mp4"
            },
            3:{
                img:"http://localhost:9090/assert/test2.mp4",
                src:"http://localhost:9090/assert/test3.mp4"
            },
            4:{
                img:"http://localhost:9090/assert/test2.mp4",
                src:"http://localhost:9090/assert/test2.mp4"
            },
            5:{
                img:"http://localhost:9090/assert/test2.mp4",
                src:"http://localhost:9090/assert/test1.mp4"
            },
            6:{
                img:"http://localhost:9090/assert/test2.mp4",
                src:"http://localhost:9090/assert/test3.mp4"
            },
            7:{
                img:"http://localhost:9090/assert/test2.mp4",
                src:"http://localhost:9090/assert/test3.mp4"
            },
            8:{
                img:"http://localhost:9090/assert/test2.mp4",
                src:"http://localhost:9090/assert/test2.mp4"
            }
        }
        let arr = [];
        for(let video in json){
            arr.push(
                <Link key={video} to="/user/1/video/1" style={this.divStyle}>
                    <video 
                        className={less.video} 
                        type="video/mp4" 
                        preload="auto"
                        loop="loop"
                    >
                        <source src={json[video].src} type="video/mp4" />
                    </video>
                </Link>
            )
        }

        return arr
    }
    render(){
        return (        
            <div 
                className={less.videogroup}
                style={{padding:this.props.padding/2}}
            >   
              {this.getVideoPath()}
            </div>
        )
    }
}
