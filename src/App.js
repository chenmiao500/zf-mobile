import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Home from './pages/Home'
import City from './pages/City'
import Map from './pages/Map'
import NotFount from './pages/404'

class App extends React.Component {
  render() {
    return (
      <Router>
        {/* 配置路由规则 */}
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/city" component={City} />
          <Route path="/map" component={Map} />
          <Route component={NotFount} />
        </Switch>
      </Router>
    )
  }
}

export default App
