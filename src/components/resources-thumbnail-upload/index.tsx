import * as React from 'react';
import { Button, Icon, Upload, message } from 'antd';

import './style/index'

class ResourcesThumbnailUpload extends React.Component<any, any> {
    constructor(props) {
        super(props)
        let arr = []
        if (this.props.url && this.props.data.name) {
            arr = [{
                uid: this.props.data.name,
                name: this.props.data.name,
                url: this.props.url
            }]
        }
        this.state = {
            fileList: arr,
            disabled: arr.length ? true : false,
            isloading: false
        }
    }
    beforeUpload(file) {
        const isJPG = (file.type === 'image/jpg' || file.type === 'image/jpeg');
        const isPNG = file.type === 'image/png';
        if (!isJPG && !isPNG) {
            message.error('只能上传JPG、PNG格式的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('文件大小不能超过2MB!');
        }
        console.log('before')
        return (isJPG || isPNG) && isLt2M;
    }
    doUpload(forms, file) {
        let self = this
        var image_arr = []
        var imageInfo_arr = []
        var upload2Upyun = new up2upyun(null, forms)
        upload2Upyun.upload(function (err, images) {
            if (err) {
                console.error(err);
                self.setState({
                    disabled: false,
                })
                message.error('文件上传失败')
            }
            var item = images[0]
            console.log('图片信息：');
            console.log(item);
            console.log(item.absUrl);
            console.log({ width: item['image-width'], height: item['image-height'] });
            let fileList = [
                {
                    uid: item.time,
                    name: file.name,
                    url: item.absUrl
                }
            ]
            self.setState({
                fileList: fileList,
                disabled: item ? true : false,
                isloading: false
            })
            message.success('文件上传成功')
            self.props.onChange && self.props.onChange(item.absUrl)
        }, function (currProgress, totalProgress) {
            console.log(currProgress, totalProgress);
        })
    }
    do_request = (ref) => {
        let self = this
        window.lrz(ref.file, {
            width: 640,
            height: 1136
        }).then(function (rst) {
            self.doUpload([rst.formData], ref.file)
        }).catch(function () { }).always(function () { })

    }
    handleChange = (info) => {
        this.setState({
            disabled: info.file.status == 'uploading' ? true : false,
            isloading: info.file.status == 'uploading' ? true : false,
        })
        if (info.file.status == 'removed') {
            let fileList = info.fileList
            this.setState({
                fileList,
                disabled: info.fileList.length ? true : false,
            })
            this.props.onChange && this.props.onChange('')
        }
        if (info.file.status === 'done') {
            this.setState({
                isloading: false,
            })
        }
        // if (info.file.status === 'done') {
        //     console.log('done')
        //     let fileList = info.fileList
        //     this.setState({
        //         fileList,
        //         disabled: info.fileList.length ? true : false
        //     })
        //     message.success('文件上传成功')
        //     this.props.onChange && this.props.onChange(info.file.response.path)
        // } else if (info.file.status === 'error') {
        //     console.log(info.file)
        //     console.log('error')
        //     message.error('文件上传失败')
        //     this.setState({
        //         disabled: true
        //     })
        // }
    }
    render() {

        let data = this.props.limitW ? { options: JSON.stringify({ w: 60, h: 60 }) } : ''
        let { disabled, fileList, isloading } = this.state
        return (
            <div className='resources-thumbnail-upload'>
                <div className='resources-thumbnail-upload-btn'>
                    {/*<div>图片格式为jpg或png，不支持其他格式上传 {this.props.extra ? this.props.extra : ''}</div>*/}
                    <Upload className="avatar-uploader upload-list-inline"
                        name="file"
                        customRequest={this.do_request}
                        listType='picture'
                        data={data}
                        fileList={fileList}
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange} >
                        <Button disabled={disabled} loading={isloading}>上传文件</Button>
                    </Upload>
                </div>
            </div>
        );
    }
}

export default ResourcesThumbnailUpload;
