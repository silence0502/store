import * as React from 'react';
import './style/index'

import * as classNames from 'classnames'

export interface SectionHeaderProps {
    title?;
    style?;
}

class SectionHeader extends React.Component<SectionHeaderProps, any> {
    render() {
        let { title, children, style } = this.props
        return (
            <div className="section-header" style={style}>
                <header className="title">{title}</header>
                <div className="btn-box">
                    {children}
                </div>
            </div>
        );
    }
}

export default SectionHeader;
