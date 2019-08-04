import React from 'react'
import './index.scss'

// 在react中，如果想要直接访问全局变量，需要通过window
const BMap = window.BMap

class Map extends React.Component {
  componentDidMount() {
    // {lng: 121.61887341233741, lat: 31.040603951746952}
    const map = new BMap.Map('container')
    const point = new BMap.Point(121.61887341233741, 31.040603951746952)
    // 显示地图
    map.centerAndZoom(point, 18)
    const marker = new BMap.Marker(point) // 创建标注
    map.addOverlay(marker) // 将标注添加到地图中
  }
  render() {
    return (
      <div className="map">
        <div id="container" />
      </div>
    )
  }
}

export default Map
