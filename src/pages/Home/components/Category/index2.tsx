import { Component } from 'react';
import { View, Image } from 'react-native';

import Mimg from '@/img/m.png';
import Simg from '@/img/s.png';
import Gimg from '@/img/g.png';
import Pimg from '@/img/p.png';

import './index.scss';


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
      <View className="category">
        <View className="category__scroll">
          {
            categoryList.map((item) =>
            <View key={item.id} className="category__scroll--center">
              <Image className="category__scroll--center--image"  source={item.imageUrl} />
            </View>
            )
          }
        </View>
      </View>
    )
  }
}
