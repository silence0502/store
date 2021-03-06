import * as React from 'react'
import * as Loadable from 'react-loadable';
import Loading from './loading'
import {
  HashRouter as Router,
  Switch,
  Route, Link,
  Redirect
} from 'react-router-dom'
import Site from './site'

const LoginComponent = Loadable({
  loader: () => import(/* webpackChunkName: "login" */'../modules/login/routes/index'),
  loading: () => { return <div style={{ marginTop: (window.innerHeight) / 2 + 'px' }}><Loading /></div> }
})
const DeviceComponent = Loadable({
  loader: () => import(/* webpackChunkName: "login" */'../modules/device/routes/index'),
  loading: () => { return <div style={{ marginTop: (window.innerHeight) / 2 + 'px' }}><Loading /></div> }
})
const sceneComponent = Loadable({
  loader: () => import(/* webpackChunkName: "login" */'../modules/scene/routes/index'),
  loading: () => { return <div style={{ marginTop: (window.innerHeight) / 2 + 'px' }}><Loading /></div> }
})
const statisticsComponent = Loadable({
  loader: () => import(/* webpackChunkName: "login" */'../modules/statistics/routes/index'),
  loading: () => { return <div style={{ marginTop: (window.innerHeight) / 2 + 'px' }}><Loading /></div> }
})

export interface MainRouresProps {
  store?: any
}

export default class MainRoures extends React.PureComponent<MainRouresProps, any> {

  render() {
    return (
      <Router>
        <Site>
          <Switch>
            <Redirect from="/" to="/login" exact />
            <Route path="/login" component={LoginComponent} />
            <Route path="/device" component={DeviceComponent} />
            <Route path="/scene" component={sceneComponent} />
            <Route path="/statistics" component={statisticsComponent} />
          </Switch>
        </Site>
      </Router>
    );
  }
}
