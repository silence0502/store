import * as React from 'react';
require('./BasicLayout.less')

export interface BasicLayoutProps {

}
export default class BasicLayout extends React.PureComponent<BasicLayoutProps, any> {
    render() {
        return (
            <div className='container'>
                {this.props.children}
            </div>
        );
    }
}
