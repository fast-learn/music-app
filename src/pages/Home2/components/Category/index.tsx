import { View, Image} from '@tarojs/components';

import './index.scss';
import useCategoryList from './useCategoryList';


export default function Category(){
  const  {categoryList} = useCategoryList()
  return  categoryList.length > 0 && (
    <View className="category">
      <View className="category__scroll">
        {
          categoryList.map((item: any) =>
          <View key={item.id} className="category__scroll--center">
            <Image className="category__scroll--center--image"  src={item.imageUrl} />
          </View>
          )
        }
      </View>
    </View>
  )
}
