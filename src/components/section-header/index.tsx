import * as React from 'react';
import styles from './style/index.less';

export interface SectionHeaderProps {
    title?;
    style?;
}

class SectionHeader extends React.Component<SectionHeaderProps, any> {
    render() {
        let { title, children, style } = this.props
        return (
            <div className={styles.section_header} style={style}>
                <header className={styles.title}>{title}</header>
                <div className={styles.btn_box}>
                    {children}
                </div>
            </div>
        );
    }
}

export default SectionHeader;
