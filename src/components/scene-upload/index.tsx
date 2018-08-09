import * as React from 'react';
import { Upload, Icon, Button, message } from 'antd';

import './style/index'

class SceneUpload extends React.Component {
    constructor(props) {
        super(props)
        let arr = []
        if (this.props.data && this.props.data.resource) {
            arr = [{
                uid: this.props.data.title,
                name: this.props.data.title,
                url: global.res_perfix + this.props.data.resource.url,
            }]
        }
        this.state = {
            fileList: arr,
            disabled: arr.length ? true : false
        }
    }
    beforeUpload = (file) => {
        const isJPG = (file.type === 'image/jpg' || file.type === 'image/jpeg');
        const isPNG = file.type === 'image/png';
        const isMp4 = file.type === 'video/mp4';
        if (!isJPG && !isPNG && !isMp4) {
            message.error('只能上传JPG、PNG、MP4格式的文件!');
        }
        return (isJPG || isPNG || isMp4);
    }
    handleChange = (info) => {
        this.setState({
            disabled: info.file.status == 'uploading' ? true : false
        })
        if (info.file.status !== 'uploading') {
            let fileList = info.fileList
            this.setState({
                fileList,
                disabled: info.fileList.length ? true : false
            })
            this.props.onChange && this.props.onChange('', '')
        }
        if (info.file.status === 'done') {
            let fileList = info.fileList
            this.setState({
                fileList,
                disabled: info.fileList.length ? true : false
            })
            message.success('文件上传成功');

            let type = info.file.type ? info.file.type.split('/')[1] : ''
            let w = '', h = ''
            if (type == 'jpeg' || type == 'jpg' || type == 'png') {
                let self = this
                var reader = new FileReader;
                reader.onload = function (evt) {
                    var image = new Image();
                    image.onload = function () {
                        w = this.width;
                        h = this.height;
                        self.props.onChange && self.props.onChange(type, info.file.response.path, w, h)
                    };
                    image.src = evt.target.result;
                };
                reader.readAsDataURL(info.file.originFileObj);
            } else {
                this.props.onChange && this.props.onChange(type, info.file.response.path, w, h)
            }
        } else if (info.file.status === 'error') {
            message.error('文件上传失败');
            this.setState({
                disabled: true
            })
        }
    }
    render() {
        let { fileList, disabled } = this.state
        return (
            <div className='avatar-upload'>
                <div className='avatar-upload-btn'>
                    <div>你可以上传JPG、PNG或者MP4文件</div>
                    <Upload className="avatar-uploader upload-list-inline"
                        name="file"
                        listType='picture'
                        action="/api/upload"
                        defaultFileList={fileList}
                        beforeUpload={this.beforeUpload} onChange={this.handleChange} >
                        <Button disabled={disabled}>上传文件</Button>
                    </Upload>
                </div>
            </div >
        );
    }
}

export default SceneUpload;
