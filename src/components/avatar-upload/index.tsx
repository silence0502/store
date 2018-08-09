import * as React from 'react';
import './style/index'
import { Button, Upload, Icon, message } from 'antd';

class AvatarUpload extends React.Component {
    constructor(props) {
        super(props)
        let arr = []
        if (this.props.data && this.props.data.name) {
            arr = [{
                uid: this.props.data.name,
                name: this.props.data.name,
                url: global.res_perfix + this.props.data.avatar,
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
        if (!isJPG && !isPNG) {
            message.error('只能上传JPG、PNG格式的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('头像文件大小不能超过2MB!');
        }
        return (isJPG || isPNG) && isLt2M;
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
            this.props.onChange && this.props.onChange('')
        }
        if (info.file.status === 'done') {
            let fileList = info.fileList
            this.setState({
                fileList,
                disabled: info.fileList.length ? true : false
            })
            message.success('文件上传成功');
            this.props.onChange && this.props.onChange(info.file.response.path)
        } else if (info.file.status === 'error') {
            message.error('文件上传失败');
            this.setState({
                disabled: true
            })
        }
    }
    render() {
        let data = {}
        if (this.props.cover) {
            // data = { options: JSON.stringify({ w: this.props.cover[0], h: this.props.cover[1] }) }
            data = { options: JSON.stringify({ w: 60, h: 60 }) }
        }
        let { fileList, disabled } = this.state
        return (
            <div className='avatar-upload'>
                <div className='avatar-upload-btn'>
                    <div>你可以上传JPG、PNG文件</div>
                    <Upload className="avatar-uploader upload-list-inline"
                        name="file"
                        listType='picture'
                        action="/api/upload"
                        data={data}
                        defaultFileList={fileList}
                        beforeUpload={this.beforeUpload} onChange={this.handleChange} >
                        <Button disabled={disabled}>上传文件</Button>
                    </Upload>
                </div>
            </div >
        );
    }
}

export default AvatarUpload;
