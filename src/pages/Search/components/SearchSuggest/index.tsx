import { Image, View } from '@tarojs/components';
import { wrapperClassName } from '@/utils';

import './index.scss';

export default function SearchSuggest(props) {
  const { suggestKeywords, searchKeyword } = props;
  if (suggestKeywords && suggestKeywords.length > 0) {
    return (
      <View className="search-suggest">
        {suggestKeywords.map((item, index) => (
          <View className={wrapperClassName('search-suggest__item', index, suggestKeywords.length)} key={index}>
            <Image
              src="https://fast-learn-oss.youbaobao.xyz/music/icon_search_gray.png"
              className="search-suggest__item__icon"
            />
            <View className="search-suggest__item__keyword">{item.keyword}</View>
          </View>
        ))}
      </View>
    );
  } else if (searchKeyword && searchKeyword.length > 0) {
    return (
      <View className="search-suggest__item">
        <View className="search-suggest__item__keyword search-suggest__item__keyword--active">
          搜索 “{searchKeyword}”
        </View>
      </View>
    )
  }
}
