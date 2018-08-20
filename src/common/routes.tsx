import * as React from 'react'
import * as Loadable from 'react-loadable';
import * as PropTypes from 'prop-types';
import Site from './site'
import Loading from './loading'
import {
  HashRouter as Router,
  Switch,
  Route, Link,
  Redirect
} from 'react-router-dom'

const LoginComponent = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */'../modules/login/routes/index'),
  loading: () => { return <Loading /> }
})
const StoreComponent = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */'../modules/store/routes/index'),
  loading: () => { return <Loading /> }
})

export interface MainRouresProps {
  store?
}

export default class MainRoures extends React.PureComponent<MainRouresProps, any> {

  static contextTypes = {
    store: PropTypes.object,
  }
  static childContextTypes = {
    store: PropTypes.object,
  }
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return (
      <Router>
        <Site>
          <Switch>
            <Redirect from="/" to="/login" exact />
            <Route path="/login" component={LoginComponent} />
            <Route path="/store" component={StoreComponent} />
          </Switch>
        </Site>
      </Router>
    );
  }
}
