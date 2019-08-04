import React from 'react'
import { Carousel, Flex, Grid } from 'antd-mobile'
import axios from 'axios'
import Nav1 from 'assets/images/nav-1.png'
import Nav2 from 'assets/images/nav-2.png'
import Nav3 from 'assets/images/nav-3.png'
import Nav4 from 'assets/images/nav-4.png'
import './index.scss'
import { Link } from 'react-router-dom'

const navList = [
  { title: '整租', img: Nav1, path: '/home/house' },
  { title: '合租', img: Nav2, path: '/home/house' },
  { title: '地图找房', img: Nav3, path: '/map' },
  { title: '去出租', img: Nav4, path: '/rent' }
]

// 轮播图在渲染时如果没有数据，会导致轮播图不会自动播放
class Index extends React.Component {
  state = {
    // 指的是轮播图的初始数据
    swipers: [],
    // 租房小组数据
    groups: [],
    // 最新资讯
    messages: [],
    // 图片的初始的高度
    imgHeight: 212,
    // 轮播图数据还没有加载完成
    isLoader: false,
    cityName: '上海'
  }

  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        swipers: body,
        isLoader: true
      })
    }
  }

  async getGroups() {
    const res = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: 'area=AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    // console.log(res)
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        groups: body
      })
    }
  }

  async getMessages() {
    const res = await axios.get('http://localhost:8080/home/news', {
      params: {
        area: 'area=AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    // console.log(res)
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        messages: body
      })
    }
  }

  componentDidMount() {
    this.getSwipers()
    this.getGroups()
    this.getMessages()
    // 获取地理位置信息
    // navigator.geolocation.getCurrentPosition(position => {
    //   // position.coords表示当前的地理位置信息
    //   // 常用：
    //   // latitude 纬度
    //   // longitude 精度
    //   console.log(position)
    // })

    // 调用百度地图的api，获取当前的城市
    var myCity = new window.BMap.LocalCity()
    myCity.get(async result => {
      // 城市名字
      console.log(result)
      const name = result.name
      // 发送ajax请求, 获取城市详细信息
      const res = await axios.get('http://localhost:8080/area/info', {
        params: { name: name }
      })
      // 第一步：把整个结果存储到本地缓存中
      // 第二步：显示城市的名字
      const { status, body } = res.data
      if (status === 200) {
        localStorage.setItem('current_city', JSON.stringify(body))
        this.setState({
          cityName: body.label
        })
      }
    })
  }

  renderSwiper() {
    // 如果数据还没有加载完成，不渲染
    if (!this.state.isLoader) {
      return null
    }
    return (
      <Carousel autoplay infinite>
        {this.state.swipers.map(item => (
          <a
            key={item.id}
            href="http://itcast.cn"
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              src={`http://localhost:8080${item.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              //表示图片加载完成了, 会自动调整图片的高度，而不是写死
              onLoad={() => {
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }

  renderNavList() {
    return navList.map(item => (
      <Flex.Item key={item.title}>
        <Link to={item.path}>
          <img src={item.img} alt="" />
          <p>{item.title}</p>
        </Link>
      </Flex.Item>
    ))
  }

  renderMessages() {
    return (
      <>
        <h3 className="title">最新资讯</h3>
        {this.state.messages.map(item => (
          <div className="news-item" key={item.id}>
            <div className="imgwrap">
              <img
                className="img"
                src={`http://localhost:8080${item.imgSrc}`}
                alt=""
              />
            </div>
            <Flex className="content" direction="column" justify="between">
              <h3 className="title">{item.title}</h3>
              <Flex className="info" justify="between">
                <span>{item.from}</span>
                <span>{item.date}</span>
              </Flex>
            </Flex>
          </div>
        ))}
      </>
    )
  }

  renderSearch() {
    return (
      <Flex className="search-box">
        <Flex className="search-form">
          <div
            className="location"
            onClick={() => this.props.history.push('/city')}
          >
            <span className="name">{this.state.cityName}</span>
            <i className="iconfont icon-arrow"> </i>
          </div>
          <div
            className="search-input"
            onClick={() => this.props.history.push('/search')}
          >
            <i className="iconfont icon-seach" />
            <span className="text">请输入小区地址</span>
          </div>
        </Flex>
        {/* 地图小图标 */}
        <i
          className="iconfont icon-map"
          onClick={() => this.props.history.push('/map')}
        />
      </Flex>
    )
  }

  render() {
    return (
      <div className="index">
        <div className="swiper" style={{ height: this.state.imgHeight }}>
          {/* 搜索框 */}
          {this.renderSearch()}
          {/* 轮播图 */}
          {this.renderSwiper()}
        </div>
        <div className="nav">
          {/* nav导航 */}
          <Flex>{this.renderNavList()}</Flex>
        </div>
        <div className="group">
          {/* 租房小组 */}
          {/* 标题 */}
          <h3 className="group-title">
            租房小组
            <span className="more">更多</span>
          </h3>
          {/* 内容 */}
          <div className="group-content">
            {/* 宫格
              - columnNum: 列数
              - hasLine: 是否有边框
              - renderItem: 渲染的内容
              - square: 是否是正方形
              - activeStyle:点击反馈的自定义样式
            */}
            <Grid
              data={this.state.groups}
              activeStyle
              columnNum={2}
              square={false}
              hasLine={false}
              renderItem={item => (
                <Flex className="group-item" justify="around">
                  <div className="desc">
                    <p className="title">{item.title}</p>
                    <span className="info">{item.desc}</span>
                  </div>
                  <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                </Flex>
              )}
            />
          </div>
        </div>
        <div className="message">
          {/* 最新资讯 */}
          {this.renderMessages()}
        </div>
      </div>
    )
  }
}

export default Index
