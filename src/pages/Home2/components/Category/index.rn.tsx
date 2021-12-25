import {View, Image, ScrollView,} from 'react-native';

import useCategoryList from './useCategoryList';

import "./index.scss";


export default function Category(){
  const  {categoryList} = useCategoryList()
  return  categoryList.length > 0 && (
    <View className="category category-rn ">
    <ScrollView
      pagingEnabled //是否分页，默认不分页，水平滑动时候会一下跳动很多页过去，加上true则一页一页滚动
      horizontal //水平滚动开启
      showsHorizontalScrollIndicator={false}
      style={{ width: "100%", height: 60 }}
    >
      {categoryList.map((item: any) => (
        <View
          className="category__scroll--center"
          key={item.id}
        >
          <Image className="category__scroll--center--image"   source={item.imageUrl} />
        </View>
      ))
      }
    </ScrollView>
    </View>
  )
}
