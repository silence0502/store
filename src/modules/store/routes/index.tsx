import * as React from 'react'
import * as PropTypes from 'prop-types';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import Home from '../views/home'

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
                    <Route path={`${match.url}`} exact component={Home} />\
                </Switch>
            </div>
        );
    }
}
