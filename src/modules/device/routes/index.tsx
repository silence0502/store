import * as React from 'react'
import * as PropTypes from 'prop-types';
import List from '../container/list'
import Info from '../container/info'
import Edit from '../container/edit'
import { injectAsyncReducer } from '../../../common/store';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

let { deviceReducer } = require('../reducers/index');

export interface RoutesProps {
    match
}

export default class Routes extends React.Component<RoutesProps, any> {
    static contextTypes = {
        store: PropTypes.object
    }
    componentWillMount() {
        let { store } = this.context
        injectAsyncReducer(store, 'deviceReducer', deviceReducer);
    }

    render() {
        let { match } = this.props
        return (
            <div>
                <Switch>
                    <Redirect from={`${match.url}`} to={`${match.url}/list`} exact />
                    <Route path={`${match.url}/list`} component={List} />
                    <Route path={`${match.url}/info/:id`} component={Info} />
                    <Route path={`${match.url}/create`} component={Edit} />
                    <Route path={`${match.url}/edit/:id`} component={Edit} />
                </Switch>
            </div>
        );
    }
}
