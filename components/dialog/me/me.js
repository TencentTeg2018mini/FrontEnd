import React from 'react';
import { render } from 'react-dom';

//css
import less from './me.less';
import Dialog from '../dialog'
import PropTypes from 'prop-types';
import { setTimeout } from 'timers';
import axios from 'axios';
import {Input,Form,BigForm, Select,Label,Image} from '../../form/form';


export default class Me extends React.Component
{
    state = {
        form:<Login onClose={this.onClose} toSignin={this.toSignin}/>
    }
    onOpen=()=>{
        this.dialog.current.open();
        this.setState({
            form:<Login onClose={this.onClose} toSignin={this.toSignin}/>
        })
    }
    onClose=()=>{
        this.dialog.current.close();
    }
    toSignin=()=>{
        this.setState({
            form:<Signin onClose={this.onClose} toMore={this.toMore}/>
        })
    }
    toMore=(data)=>{
        this.setState({
            form:<More onClose={this.onClose} toTags={this.toTags} data={data}/>
        })
    }
    toTags=()=>{
        this.setState({
            form:<Tags onClose={this.onClose}/>
        })
    }
    constructor(props){
        super(props);
        this.dialog = React.createRef();
        // this.toMore = this.toMore.bind(this);
    }
    componentWillMount(){
        this.setState({
            form:<Login history={this.props.history} onClose={this.onClose} toSignin={this.toSignin}/>
        })
    }

    render(){
        return (        
            <div 
                className={less.me}
            >   
                <div >{this.props.children}</div>
                <Dialog className={less.dialog} ref={this.dialog}>
                    {this.state.form}
                </Dialog>
            </div>
        )
    }
}

export class Login extends React.Component
{
    constructor(props){
        super(props);
        this.login = React.createRef();
    }
    onTouchEnd=()=>{
        console.log(this.login.state);
    }
    onLogin=()=>{
        let data = this.login.current.getValues();
        console.log(data);
        let that = this;
        console.log(hex_md5(data.password));
        axios.post(
            ' /api/v1.0/session',
            data,
            {   
                withCredentials:true
            }
        ).then(function (response) {
            console.log(response);
            if(response.data.code==0){
                that.props.onClose();
            }else{
                alert(response.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log('data of form:',this.props.form.getFieldsValue());
    }
    render(){
        return (      
            <div className={less.login}>
                <div className={less.close} onTouchEnd = {this.props.onClose} >
                    x
                </div>
                <Form ref={this.login} className={less.form}>
                    <p>登录</p>
                    <Input type="text" placeholder="用戶名" name="account"/>
                    <Input type="password" placeholder="密码"   name="password"/>
                    <div className={less.buttonGroup}>
                        <div className={less.button} onTouchEnd={this.onLogin}>登录</div>
                        <div className={less.button} onTouchEnd={this.props.toSignin} >注册</div>
                    </div>
                </Form>
            </div>  
        )
    }
}

export class Signin extends React.Component
{
    constructor(props){
        super(props);
        this.signin = React.createRef();
    }
    onSubmit=()=>{
        let data = this.signin.current.getValues();
        console.log(data);
        // let reg = RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{4,16}$/)
        // for(let field  in data){
        //     console.log(data[field]);
        //     if(!reg.test(data[field])){
        //         alert(field+"数字与字母组合，4-16位不含敏感字符");
        //         return;
        //     }
        // }
        this.props.toMore(data);
    }
    render(){
        return (    
            <div >
                <div className={less.close} onTouchEnd = {this.props.onClose} >
                    X
                </div>
                <Form ref={this.signin} className={less.form}>
                    <p>注册</p>
                    <Input type="text" placeholder="用戶名" name="account" />
                    <Input type="text" placeholder="密码"   name="password"/>
                    <Input type="text" placeholder="昵称"   name="nickname"/>
                    <div className={less.buttonGroup}>
                        <div className={less.button} onTouchEnd={ this.onSubmit}>注册</div>
                    </div>
                </Form>

            </div>    
        )
    }
}


export class More extends React.Component
{
    constructor(props){
        super(props);
        this.open = React.createRef();
        this.more = React.createRef();
    }
    onSubmit=(e)=>{
        let signdata = this.props.data
        // this.props.toTags()
        let data = this.more.current.getValues();
        console.log(signdata);
        console.log(data);
        data=Object.assign(signdata,data);
        console.log(data);

        let that = this;
        axios.post(
            '/api/v1.0/account',
            data,
            {   
                withCredentials:true
            }
        ).then(function (response) {
            console.log(response);
            if(response.data.code==0){
            }else{
                alert(response.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        this.props.toTags();
    }
    onClose=()=>{
        let signdata = this.props.data
        // this.props.toTags()
        let data = this.more.current.getValues();
        console.log(signdata);
        console.log(data);
        data=Object.assign(signdata,data);
        console.log(data);

        let that = this;
        axios.post(
            '/api/v1.0/account',
            data,
            {   
                withCredentials:true
            }
        ).then(function (response) {
            console.log(response);
            if(response.data.code==0){
                this.props.toTags(data);
            }else{
                alert(response.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        this.props.onClose();
    }
    render(){
        return (        
            <div>
                <div className={less.close} onTouchEnd = {this.onClose} >
                    跳过
                </div>

                <Form ref={this.more} className={less.form}>
                    <div>详细资料</div>
                    <Image name="portrait" src="../assert/imgs/profile.png"/>
                    <div className={less.checkBox}>
                        <Input type="radio" name="sex" value="0" id="男"/><Label for="男">男 </Label>
                        <Input type="radio" name="sex" value="1" id="女"/><Label for="女">女  </Label>
                    </div>
                    <Input type="text" name="age"       placeholder="年龄"/>
                    <Input type="date" name="birth"     placeholder="生日"/>
                    <Input type="text" name="tel"       placeholder="電話"/>

                    <Select  name="country" defaultValue="china">
                        <option value="中国" >中国</option>
                        <option value="法国">法国</option>
                    </Select>
                    <Select  name="province" defaultValue="east">
                        <option value="华东" >华东</option>
                        <option value="华南">华南</option>
                    </Select>
                    <Select  name="city" defaultValue="chongqin">
                        <option value="重庆" >重庆</option>
                        <option value="深圳">深圳</option>
                    </Select>

                    {/* <Input type="text" name="country"   placeholder="国籍"/>
                    <Input type="text" name="province"  placeholder="省份"/>
                    <Input type="text" name="city"      placeholder="城市"/> */}

                    <Input type="text" name="brief_introduction"placeholder="自我简介"/>

                    
                    <div className={less.buttonGroup}>
                        <div className={less.button} onTouchEnd={this.onSubmit}>提交</div>
                    </div>
                </Form>

            </div>

        )
    }
}

export class Tags extends React.Component
{
    state={
        tags:[]
    }
    constructor(props){
        super(props);
        this.form = React.createRef();

        let that = this;
        axios.get(
            '/api/v1.0/video/tag',
            {   
                withCredentials:true
            }
        ).then(function (response) {
            console.log(response);
            if(response.data.code==0){
                console.log(response.data.data);
                let tags = []
                tags = response.data.data.map((tag,i)=>{
                    console.log(tag);
                    return( <div key={i} className={less.tag}><Input key={i} className={less.checkbox} type="checkbox" name="tags" value={tag} id={tag}/><Label className={less.label} for={tag}> {tag}</Label></div> ) 
                })
                console.log(tags);
                that.setState({
                    tags:tags
                })

            }else{
                console(response.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    onSubmit=()=>{
        let data = this.form.current.getValues();

        let that = this;
        axios.post(
            '/api/v1.0/video/favoritetag',
            data,
            {   
                withCredentials:true
            }
        ).then(function (response) {
            console.log(response);
            if(response.data.code==0){
                that.props.onClose();
            }else{
                console(response.data.message)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log(data);
    }
    render(){
        return (        
            <div>
                <div className={less.close} onTouchEnd = {this.props.onClose} >
                    跳过
                </div>
                <Form ref={this.form} className={less.form}>
                    <div className={less.tagGroup}>
                        {this.state.tags}
                    </div>
 
                    <div className={less.buttonGroup}>
                        <div className={less.button} onTouchEnd={this.onSubmit}>提交</div>
                    </div>
                </Form>

            </div>

        )
    }
}

