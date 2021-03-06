import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import House from './House'
import Index from './Index/index.js'
import My from './My'
import News from './News'
import './index.scss'

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        {/* 配置路由规则 */}
        <Route path="/home/house" component={House} />
        <Route path="/home/index" component={Index} />
        <Route path="/home/my" component={My} />
        <Route path="/home/news" component={News} />

        {/*  配置导航链 */}
        <div className="nav">
          <ul>
            <li>
              <NavLink to="/home/index">
                <i className="iconfont icon-ind" />
                <p>首页</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/house">
                <i className="iconfont icon-findHouse" />
                <p>找房</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/news">
                <i className="iconfont icon-infom" />
                <p>资讯</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/my">
                <i className="iconfont icon-my" />
                <p>我的</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
