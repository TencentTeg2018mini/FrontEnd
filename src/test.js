import React from 'react';
import { render } from 'react-dom';

import less from './style/test.less';
import {Input,Form,BigForm, Select, Image} from '../components/form/form'
// let TestForm = BigForm(Form);
import {Me,Login} from '../components/dialog/me/me';
export default class Test extends React.Component
{
    state={
        src:""
    }
    constructor(props){
        super(props)
        this.form=React.createRef();
    }
    onSubmit=()=>{
        let form = this.form.current;
        let data = new FormData(form);
        console.log(data);
        console.log(form.getValues());
        window.open(url)
    }
    onChange=(e)=>{
        let fileObj = e.nativeEvent.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(fileObj)
        reader.onload = (e)=>{
            let str = e.target.result;
            // let obj = str.split(",");
            // this.props.setFormState(this.props.name,obj[1])
            this.setState({
                src:str
            })
            console.log(this.state.src);
        }
    }
    download=(e)=>{
      let fileObj = e.nativeEvent.target.files[0];
      console.log(fileObj)
      // let reader = new FileReader();
      // reader.readAsDataURL(fileObj)
      // reader.onload = (e)=>{
      //     let str = e.target.result;
      //     let obj = str.split(",");
      //     this.props.setformstate(this.props.name,obj[1])
      // }
    }
    render(){
        return(
            <div>
                <Form ref={this.form}>
                    <div>
                        <Input type="text" name="name" id="name" /><label for="name">name</label>
                    </div>
                    <div >
                        <Input type="text" name="password"/><label>password</label>
                    </div>
                    <div className={less.tag}>
                        <Input type="radio" name="radio" value="1" id="1"/><label for="1">1</label>
                        <Input type="radio" name="radio" value="2" id="2"/><label for="2">2</label>
                    </div>
                    <Input type="date" name="date" />
                    <Input type="file" name="file" accept="video/*"  capture="camcorder"/>
                    
                    <div>
                    <div className={less.tag}>
                        <Input type="checkbox" name="checkbox1" value="ss" id="ss"/><label for="ss">ss</label>
                    </div>
                    <div className={less.tag}>
                        <Input type="checkbox" name="checkbox1" value="dd" id="dd"/><label for="dd">dd</label>
                    </div>
                    <div className={less.tag}>
                        <Input type="checkbox" name="checkbox1" value="ss" id="aa"/><label for="aa">ssaa</label>
                    </div>
                    <div className={less.tag}>
                        <Input type="checkbox" name="checkbox1" value="dd" id="bb"/><label for="bb">bb</label>
                    </div>
                    <div className={less.tag}>
                        <Input type="checkbox" name="checkbox1" value="ss" id="cc"/><label for="cc">cc</label>
                    </div>
                    <div className={less.tag}>
                        <Input type="checkbox" name="checkbox1" value="dd" id="zz"/><label for="zz">zz</label>
                    </div>
                    </div>
                    <input type="file" name="file" accept="video/*" onChange={this.download} capture="camcorder" />
                    <Select  name="select">
                        <option value="123" >123</option>
                        <option value="234">234</option>
                    </Select>
                    {/* <image src={this.state.src}></image>
                    <Input type="file" name="image" onChange={this.onChange}/> */}
                    <Image name="image"/>
                </Form>
                <button onTouchEnd={this.onSubmit}>提交</button>
            </div>
        )
    }
}
