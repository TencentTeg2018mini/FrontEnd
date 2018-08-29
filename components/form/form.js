import React, { Children } from 'react';
import { render } from 'react-dom';

import uploadProfile from 'Assert/imgs/uploadProfile.png'

//TODO: 将this.state.XXX 改为 this.state.data[XXX]
export class Form extends React.Component{
    constructor(props) {
        super(props)
        this.state={

        }
    }
    // 监听onChange
    bindData = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    addData = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        this.setState((prev)=>{
            if(prev[name]!==undefined){
                return {
                    [name] : [...prev[name],val]
                }
            }else{
                return {
                    [name] : [val]
                }
            }
        })

    }
    bindValue = (name,value)=>{
        this.setState({
            [name] : value
        })
    }
    getData=()=>{
        return this.state;
    }
    showData=()=>{
        console.log(this.state)
    }
    render() {
        return (
            <form  {...this.props}>
                {this.props.children(this)}
            </form>
        )
    }
}

export class Input extends React.Component
{
    constructor(props){
        super(props)
    }
    onTouchEnd=(e)=>{
        console.log("onInput");
        e.target.focus();
        
        // this.setState({
        //     focus:1
        // })
        // setTimeout(function(){
        //     document.body.scrollTop = document.body.scrollHeight;
        // },300);
        e.scrollIntoViewIfNeeded();
        e.stopPropagation();
    }
    render(){
        return(
            <input
                {...this.props}
                autocomplete="off"
                onTouchEnd={this.onTouchEnd} 
            />
        )
    }
}
export class Select extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            value:this.props.value==undefined?this.props.defaultValue:this.props.value
        }
    }
    onTouchEnd=(e)=>{
        console.log("Select");
        e.target.focus();
        e.stopPropagation();
    }
    render(){
        return(
            <select       
                onTouchEnd={this.onTouchEnd} 
                {...this.props}
            >
                {this.props.children}
            </select>
        )
    }
}
export class Label extends React.Component
{
    constructor(props){
        super(props)
    }
    onTouchEnd=(e)=>{
        console.log("im label")
        e.stopPropagation();
    }
    render(){
        return(
            <label 
                htmlFor={this.props.htmlFor} 
                className={this.props.className} 
                onTouchEnd={this.onTouchEnd}
            >
                {this.props.children}
            </label>
        )
    }
}
export class ImageToBase64 extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            src:this.props.src
        }
    }
    handleChange=(e)=>{
        console.log("im Image")  
        console.log(e.target.value)
        let url = e.nativeEvent.target.value;
        let fileObj = e.nativeEvent.target.files[0];
        let reader = new FileReader();

        let that = this;
        reader.readAsDataURL(fileObj)
        reader.onload = (e)=>{
            let str = e.target.result;
            that.setState({
                src:str
            })
            that.props.onChange(this.props.name , str.split(",")[1]);
        }
    }
    render(){
        return(
            <div style={{display:"inline-block"}}>
                <Input 
                    name={this.props.name} 
                    id={this.props.id}
                    type="file" 
                    accpet = "image/*" 
                    onChange={this.handleChange} 
                    style={{display:"none"}}
                    // value={this.state.src}
                />
                <Label 
                    htmlFor={this.props.id}
                    className={this.props.className}
                >
                    <img style={this.props.style} src={this.state.src} />
                </Label>
            </div>
        )
    }
}
ImageToBase64.defaultProps={
    id:"imageToBase64_"+Math.random()*100,
    src:uploadProfile,
    name:"imageToBase64_"+Math.random()*100
}
class Camcorder extends React.Component
{
    download=(e)=>{
        let url = this.file.value;
        let fileObj = this.file.files[0];
        let reader = new FileReader();

        reader.readAsDataURL(fileObj)
        reader.onload = (e)=>{
            let str = e.target.result;
            console.log(e)
            // const blob = new Blob([new DataView(reader)], { type: 'video/mp4' })
            const url = URL.createObjectURL(fileObj)
            console.log(url)
            this.link.href = url
            this.link.hidden = false
            // let url = reader.readAsDataURL(reader)
            // this.link.href = url
            // this.link.hidden = false
        }
    }
    render() {
      return (
         <form encType="multipart/form-data">
            <input ref={file=>{this.file=file}} type="file" accept="video/*" capture="camcorder" onChange={this.download}/>
            <a ref={link=>{this.link=link}} hidden download>download</a>
        </form>
      )
    }
}