import { Component } from 'react'
import { View, Image} from '@tarojs/components'
import './index.scss'
import Mimg from '../../../assert/img/m.png'
import Simg from '../../../assert/img/s.png'
import Gimg from '../../../assert/img/g.png'
import Pimg from '../../../assert/img/p.png'

const categoryList = [
  {id: 1,name:'每日推荐',imageUrl:Mimg},
  {id: 2,name:'私人 FM',imageUrl:Simg},
  {id: 3,name:'歌单',imageUrl:Gimg},
  {id: 4,name:'排行榜',imageUrl:Pimg},
  {id: 5,name:'歌单',imageUrl:Gimg},
  {id: 6,name:'排行榜',imageUrl:Pimg},
  {id: 7,name:'歌单',imageUrl:Gimg},
  {id: 8,name:'歌单',imageUrl:Gimg},
  {id: 9,name:'歌单',imageUrl:Gimg},
]

export default class Category extends Component {


  render () {
    return (
      <View className='category'>
        {
          categoryList.map((item) =>
          <View key={item.id} className='category-center'>
            <Image className='image'  src={item.imageUrl} />
          </View>
          )
        }
      </View>
    )
  }
}
