import React from 'react'
import { Route } from 'react-router-dom'
import Index from './Index/index.js'
import House from './House'
import News from './News'
import My from './My'
import './index.scss'
// 导入TabBar组件
import { TabBar } from 'antd-mobile'

const itemlist = [
  { title: '首页', icon: 'icon-ind', path: '/home' },
  { title: '找房', icon: 'icon-findHouse', path: '/home/house' },
  { title: '资讯', icon: 'icon-infom', path: '/home/news' },
  { title: '我的', icon: 'icon-my', path: '/home/my' }
]

class Home extends React.Component {
  constructor(props) {
    super(props)
    // console.log(this.props)
    this.state = {
      // 默认选中的tab栏 页面一刷新就高亮
      selectedTab: this.props.location.pathname
    }
  }

  renderItemList() {
    return itemlist.map(item => (
      <TabBar.Item
        title={item.title}
        key={item.title}
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.props.history.push(item.path)
        }}
      />
    ))
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps, prevstates)
    // console.log(this.props)
    // 更新阶段不能直接调用setState的，需要有条件
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }

  render() {
    return (
      <div className="home">
        {/* 配置路由导航 */}
        {/* Route只要对应的path配应上了, 对应的组件就会渲染, 如果path没有配上,对应的组件不会渲染 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/news" component={News} />
        <Route path="/home/my" component={My} />
        {/* 配置路由规则 */}
        <div className="tabBar">
          {/* 
            unselectedTintColor: 未选中的颜色
            tintColor: 选中的颜色
            barTintColor: 背景色
            noRenderContent={true} 不渲染内容
          */}
          <TabBar
            noRenderContent={true}
            unselectedTintColor="#888"
            tintColor="#21b97a"
            barTintColor="white"
          >
            {/* 
              title： 显示的文字
              icon: 未选中的图标
              selectedIcon： 选中的图标
              selected： 是否被选中
              badge： 徽章
              onPress：点击事件
             */}
            {this.renderItemList()}
          </TabBar>
        </div>
      </div>
    )
  }
}

export default Home
