import * as React from 'react';

export interface StoreProps {
    modalTitle?
    history?
    match?
    location?
}
class Store extends React.PureComponent<StoreProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }
    componentWillMount() {


    }
    componentWillUnmount() {

    }
    render() {
        return (
            <div>right</div>
        )

    }
}

export default Store;