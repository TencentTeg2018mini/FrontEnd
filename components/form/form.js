import React, { Children } from 'react';
import { render } from 'react-dom';


export class Form extends React.Component
{
    ergodicChild=(chidren,obj)=>{
        return React.Children.map(chidren,(child,i)=>{
            if(typeof child == "object"){
                if(child.props.children!=undefined&&child.type.name!="Select"){
                    child = React.cloneElement(child, {setformstate:this.setFormState},this.ergodicChild(child.props.children,obj))
                }
                if(child.type.name=="Input"||child.type.name=="Select"||child.type.name=="Image"){
                    console.log("sd"+child.type.name);
                    child = React.cloneElement(child, {setformstate:this.setFormState})
                    if(child.props.type=="checkbox"){
                        obj[child.props.name] = []
                    }else{
                        obj[child.props.name] = ""
                    }
                }
            }
            return child
        })
    }
    componentWillReceiveProps=(props)=>{
        let obj = {};
        this.state={
            values:obj,
            children:this.ergodicChild(props.children,obj)
        }
    }
    constructor (props) {
        super(props)
        let obj = {};
        this.state={
            values:obj,
            children:this.ergodicChild(this.props.children,obj)
        }

    }
    setFormState=(name,val,checkboxName=0)=>{
        let tmp = this.state.values
        if(checkboxName){
            if(val){
                tmp[name].push(checkboxName)
            }else{
                tmp[name].remove(checkboxName)
            }
        }else{
            tmp[name] = val
        }
        this.setState({
            values:tmp
        })
    }
    getValues=()=>{
        return this.state.values;
    }
    render(){
        return(
            <form {...this.props} encType={this.props.enctype} className={this.props.className}>
                {this.state.children}
            </form>
        )
    }
}
export class Input extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            value:this.props.value==undefined?"":this.props.value
        }
        // console.log(this.props.children);
    }
    onTouchEnd=(e)=>{
        console.log("onInput");
        e.target.focus();
        e.stopPropagation();
    }
    onChange=(e)=>{
        console.log("im Input")  
        if(this.props.type=="checkbox"){
            this.props.setformstate(this.props.name,e.target.checked,this.props.value)
        }else{
            this.setState({
                value:e.target.value
            })
            this.props.setformstate(this.props.name,e.target.value)
            if(this.props.type=="file"){
                let fileObj = e.nativeEvent.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(fileObj)
                reader.onload = (e)=>{
                    let str = e.target.result;
                    let obj = str.split(",");
                    this.props.setformstate(this.props.name,obj[1])
                }
            }
        }
        if(typeof this.props.handleChange=="function"){
            this.props.handleChange(e);
        }
    }
    render(){
        return(
            <input 
                {...this.props}
                className={this.props.className}
                accept={this.props.accept}
                type={this.props.type} 
                name={this.props.name} 
                accept={this.props.accept} 
                placeholder={this.props.placeholder} 
                onTouchEnd={this.onTouchEnd} 
                onChange={this.onChange} 
                value = {this.state.value}
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
        this.props.setformstate(this.props.name,this.props.defaultValue)
    }
    onTouchEnd=(e)=>{
        console.log("Select");
        e.target.focus();
        e.stopPropagation();
    }
    onChange=(e)=>{
        this.setState({
            value:e.target.value
        })
        this.props.setformstate(this.props.name,e.target.value)
    }
    render(){
        return(
            <select                 
                name={this.props.name}
                size={this.props.size}
                className={this.props.className}
                onTouchEnd={this.onTouchEnd} 
                onChange={this.onChange} 
                value={this.state.value}
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
            <label {...this.props} className={this.props.className} onTouchEnd={this.onTouchEnd}>{this.props.children}</label>
        )
    }
}
export class Image extends React.Component
{
    // "../assert/imgs/profile.png"
    constructor(props){
        super(props)
        this.state={
            src:this.props.src
        }
    }
    onTouchEnd=(e)=>{
        console.log("im Image")
        e.stopPropagation();
    }
    onChange=(e)=>{
        console.log("im Image")  
        let url = e.nativeEvent.target.value;
        let fileObj = e.nativeEvent.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(fileObj)
        reader.onload = (e)=>{
            let str = e.target.result;
            this.setState({
                src:str
            })
        }
    }
    render(){
        return(
            <div style={{display:"inline-block"}}>
                <Input {...this.props} name={this.props.name} id="image" type="file" accpet = "image/*" handleChange={this.onChange} setformstate={this.props.setformstate} style={{display:"none"}}/>
                <Label for="image" className={this.props.className} ><img src={this.state.src} ></img></Label>
            </div>
        )
    }
}