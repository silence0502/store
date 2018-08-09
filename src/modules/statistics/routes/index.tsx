import * as React from 'react'
import * as PropTypes from 'prop-types';
import Home from '../views/home'

import {
    Switch,
    Route,
} from 'react-router-dom'



export interface RoutesProps {
    match
}

export default class Routes extends React.Component<RoutesProps, any> {
    static contextTypes = {
        store: PropTypes.object
    }
    componentWillMount() {

    }

    render() {
        let { match } = this.props
        return (
            <div>
                <Switch>
                    <Route path={`${match.url}`} exact component={Home} />
                </Switch>
            </div>
        );
    }
}
