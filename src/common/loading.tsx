import * as React from 'react';
import { Spin } from 'antd';

class Loading extends React.Component<any, any> {
    render() {
        return (
            <div
                style={{
                    // minHeight: `${window.innerHeight - 164}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Spin />
            </div>
        );
    }
}

export default Loading;
