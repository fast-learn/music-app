import { View, Image, Text, ScrollView } from '@tarojs/components';
import useCategoryList from './useCategoryList';

import './index.scss';

export default function Category() {
  const { categoryList } = useCategoryList();
  return categoryList.length > 0 && (
    <View className="category">
      <ScrollView
        className="category__scroll"
        scrollX
        enableFlex={IS_WEAPP} // 兼容微信小程序
        // @ts-ignore
        showsHorizontalScrollIndicator={false}
      >
        {
          categoryList.map((item: any, index: number) =>
            <View
              key={item.id}
              className={`category__scroll__item category__scroll__item--${index === 0 ? 'first' : (index === categoryList.length - 1 ? 'last' : index)}`}
            >
              <View
                className="category__scroll__item__bg"
                style={{
                  paddingTop: IS_WEAPP ? '20rpx' : 0,
                }}
              >
                <Image className="category__scroll__item__bg__img" src={item.imageUrl} />
              </View>
              <Text className="category__scroll__item__text">{item.name}</Text>
            </View>,
          )
        }
      </ScrollView>
    </View>
  );
}
