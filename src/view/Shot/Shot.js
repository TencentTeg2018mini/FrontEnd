import React, { Component } from 'react'
import GoBackWithRouter from 'Components/GoBackWithRouter/GoBackWithRouter'
import less from './Shot.less'
import axios from 'axios'
import withData from 'Components/withData/withData'
import withDialog from 'Components/withDialog/withDialog'
import {Form,Input,Select} from 'Components/Form/Form'

export default class Shot extends Component {
    constructor(props) {
        super(props)
        this.fliterStyle = {
            "none":{},
            "grayscale":{filter:" grayscale(100%)"},
            "sepia":{fliter:"sepia(50%)"}
        }
        this.state = {
            isRecord:0,
            fliter:"none",
            isPreview:0,
            canUpload:0,
            blob:{
                data:null,
                url:null,
                photo:null
            },
            countdown: 15
        }
        this.blobUrl = null;
        this.g_stream = null
        this.g_recorder = null
    }
    componentDidMount = () => {
        this.openCam();
    }
    openCam=()=>{
        let width =window.screen.width;
        let height = window.screen.height
        console.log(window.screen.width)
        let constraints = { 
            audio: false, 
            video:{width:height*1.5,height:width*1.5,facingMode: "environment" },
            frameRate: { ideal: 24, max: 30 } 
        }; 

        let that = this;
        let video = this.video;
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {

            video.srcObject = mediaStream;
            video.onloadedmetadata = function(e) {
                video.play();
            };
            console.log(mediaStream)
            that.g_stream = mediaStream;
        })
        .catch(function(err) { console.log(err.name + ": " + err.message); }); // 总是在最后检查错误
    }
    startRecording=()=>{
        console.log("开始录制")
        this.canvas.width = this.video.videoWidth;
        this.canvas.height =  this.video.videoHeight;

        this.setState({
            isPreview:0
        })
        // 截第一帧的图
        // this.canvas.width = this.video.width;
        // this.canvas.height = this.video.height;
        this.canvas.getContext("2d").drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        var photo =  this.canvas.toDataURL("image/png");

        // 准备录制
        let that = this;
        var chunks = [];
        this.g_recorder = new MediaRecorder(this.g_stream,{mimeType:'video/webm'});
        this.g_recorder.ondataavailable = function(e) {
            chunks.push(e.data);
            that.canvas.getContext("2d").drawImage(that.video, 0, 0, that.canvas.width, that.canvas.height);
        }
        var canvansInt = setInterval(()=>{
            that.setState({
                countdown: that.state.countdown -1
            })
            if( that.state.countdown == 0){
                that.stopRecording()
                this.setState({
                    countdown: 15
                })
            }
        },1000)
        // 停止录制事件

        this.g_recorder.onstop = function(e) {
            var blob = new Blob(chunks, { 'type' : 'video/webm' });
            var audioURL = URL.createObjectURL(blob);
            clearInterval(canvansInt)
            that.setState({
                canUpload:1,
                blob : {
                    data:blob,
                    url:audioURL,
                    photo:photo
                }
            })
            
        }

        // 开始录制
        this.g_recorder.start();
        this.setState({
            isRecord:1
        })
    }
    stopRecording=()=>{
        console.log("停止录制")
        this.g_recorder.stop();
        this.setState({
            isRecord:0,
            isPreview:1
        })
    }
    preview = () =>{
        let video = this.video2;
        let that = this;
        this.setState({
            isPreview:1
        },()=>{
            video.src = this.state.blob.url;
            video.play();
        })
    }

    render() {
        return (
            <div style={{position:"relative",background:"#c1a075"}} className={less.shot} >
                <GoBackWithRouter  style={{position:"absolute"}}></GoBackWithRouter>
                <video 
                    style=
                    {{display:this.state.isPreview
                        ?"none"
                        :"block"
                    }}
                    className={less.video}  
                    poster={this.state.blob.photo}
                    ref={video=>this.video = video}
                ></video>
                <video 
                    style=
                    {{display:this.state.isPreview
                        ?"block"
                        :"none"
                    }}
                    className={less.video}  
                    ref={video=>this.video2 = video}
                    poster={this.state.blob.photo}
                ></video>
                {this.state.isRecord
                    ?<div style={{position:"absolute",left:"50%",marginLeft:"-1.5rem",bottom:"2rem",width:"3rem",height:"3rem",backgroundColor:"white",borderRadius:"50%",boxShadow:"0 0 5px red",textAlign:"center",verticalAlign:"center",lineHeight:"3rem"}} onTouchEnd={this.stopRecording}>{this.state.countdown}</div>
                    :<div style={{position:"absolute",left:"50%",marginLeft:"-1.5rem",bottom:"2rem",width:"3rem",height:"3rem",backgroundColor:"red",borderRadius:"50%",boxShadow:"0 0 5px red"}} onTouchEnd={this.startRecording}></div>
                }
                <canvas style={{visibility:"hidden",zIndex:-10,position:"fixed",top:0}} ref={canvas=>this.canvas = canvas}></canvas>
                <div className={less.preview+" "+less.button} 
                    onTouchEnd={this.preview}
                    style=
                    {{display:this.state.isPreview
                        ?"block"
                        :"none"
                    }}
                >预览</div>
                {/* <Download canUpload={this.state.canUpload} href={this.blobUrl}  ref={link=>{this.link = link} }/> */}
                <UploadWithDialog blob={this.state.blob}>
                    <button className={less.upload+" "+less.button} 
                        style=
                        {{display:this.state.isPreview
                            ?"block"
                            :"none"
                        }}
                    >上传</button>
                </UploadWithDialog>
                {/* <a 
                    style=
                    {{display:this.state.canUpload
                        ?"block"
                        :"none"
                    }}
                    className={less.upload+" "+less.button} 
                    ref={link=>{this.link=link}}  
                    hidden download
                >
                    上传
                </a> */}
            </div>
                
        )
    }
}
class Upload extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
        }
        console.log(this.props)
    }
    componentDidMount = () => {
        console.log(this.list)
        this.list.getData()
    }
    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps)
    }
    upload = (e) =>{
        window.navigator.geolocation.getCurrentPosition((pos)=>{
            let that = this
            var crd = pos.coords;
            let data = {
                title:this.form.state.title,
                longitude:""+crd.longitude,
                latitude:""+crd.latitude,
                tag:this.form.state.tag,
                thumbnail:this.props.blob.photo,
                file:this.props.blob.data
            }
            
            let param = new FormData(); //创建form对象

            param.append('file',this.props.blob.data);
            param.append('title',this.form.state.title);
            param.append("longitude", ""+crd.longitude);
            param.append("latitude", ""+crd.latitude);
            param.append("tag",this.form.state.tag);
            param.append("thumbnail",this.props.blob.photo.split(",")[1] );

            // this.loading.open()
            console.log("Loading")
            this.loading.open(e)
            console.log(data)
            console.log(param)
            axios.post(
                "/api/v1.0/video/",
                param,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((response)=>{
                console.log(response)
                that.props.dialog.close(e)
                that.loading.close(e)
            })
            // this.blob.data
        })
    }
    render() {
        return (
            <Form className={less.form} ref={form=>{this.form = form}} encType="multipart/form-data">
            {form=>(
                <React.Fragment>
                    <Input type="text" placeholder="标题"   name="title" onChange={form.bindData}/>
                    <ListWithTag ref={list=>{this.list = list}} bindData={form.bindData}></ListWithTag>
                    <button className={less.button} onTouchEnd={this.upload}>上传</button>
                    <LoadingWithDialog ref={loading=>{this.loading = loading}}></LoadingWithDialog>
                </React.Fragment>
            )}
            </Form>
        )
    }
}

// const List = ({_data:data,bindData:bindData}) => {
//     return (
//         <Select name="tag" defaultValue="其他" onChange={bindData}>
//         {data.map((value,index)=>{
//             console.log(data)
//             return (
//                 <option key={index} value={value} >{value}</option>
//             )
//         })}
//         </Select>
//     )
// }
// const ListWithTags = withData((props)=>`/api/v1.0/video/tag`)(List)
const List = ({ _data: gists ,bindData: bindData}) => (
    <Select name="tag" defaultValue="其他" onChange={bindData}>
        {gists.map((value,index) => {
            return (
                <option key={index} value={value} >{value}</option>
            )
        })}
    </Select>
)
const withTag = withData((props)=>{
    return `/api/v1.0/video/tag`
})
const ListWithTag = withTag(List);

const UploadWithDialog = withDialog(Upload,{className:less.uploadDialog})

class Loading extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div>
                Loading
            </div>
        )
    }
}
const LoadingWithDialog = withDialog(Loading,{className:less.loading})

class Download extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <a  style=
                {{display:this.props.canUpload
                    ?"block"
                    :"none"
                }}
                className={less.upload+" "+less.button} 
                {...this.props}
                download
            >下载</a>
        )
    }
}
