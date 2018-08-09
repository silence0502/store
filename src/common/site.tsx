import * as React from 'react';
import { message } from 'antd';
import { matchPath } from 'react-router';
import BasicLayout from '../layouts/BasicLayout';
import SiteLayout from '../layouts/SiteLayout';
import { withRouter } from 'react-router';
import HomeActionCreatorsMap, { CommonActions } from '../modules/common/actions/index';
import emitter from '../common/emitter';
const { connect } = require('react-redux');
import { bindActionCreators } from 'redux';

function mapProps(state: any) {
    return {};
}
function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch)
    };
}
export interface SiteProps {
    children?: any;
    location?: any;
}
message.config({
    top: 100,
    duration: 2
});
class Site extends React.Component<SiteProps, any> {
    constructor(props: any) {
        super(props);
        let { pathname } = this.props.location;
    }
    componentWillMount() {
        emitter.addListener('message', (type, content, duration, onClose) => {
            message.destroy();
            switch (type) {
                case 'error':
                    message.error(content, duration, onClose);
                    break;
                case 'warning':
                    message.warning(content, duration, onClose);
                    break;
                case 'success':
                    message.success(content, duration, onClose);
                    break;
                default:
                    message.success(content, duration, onClose);
            }
        });
    }

    render() {
        let { pathname } = this.props.location;
        if (matchPath(pathname, { path: `/login` }) != null) {
            return <BasicLayout>{this.props.children}</BasicLayout>;
        } else {
            return <SiteLayout>{this.props.children}</SiteLayout>;
        }
    }
}
export default withRouter(connect(mapProps, mapDispatchToProps)(Site));
