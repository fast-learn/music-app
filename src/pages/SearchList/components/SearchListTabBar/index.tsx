import {ScrollView, View } from "@tarojs/components";
import {RanderContent} from '../searchList'
import "./index.scss";

export default  function SearchListTabBar (props){
  const {searchListData,searchListIndex,chandleTabBar} = props
  // const { searchListData,searchListIndex,chandleTabBar} = useSearchList()
  if(searchListData && searchListData.length > 0){
    return(
      <View className="search-list">
        {/* tabBar */}
        <View className="search-list__tab">
        <ScrollView scrollX className="search-list__tab__tabBar">
        {searchListData.map((item:any) => {
          if(item && item.name){
            return (
            <View key={item.id} className="search-list__tab__tabBar__content"  onClick={()=>chandleTabBar(item)}>
              <View className={`search-list__tab__tabBar__content__message ${(item.id ===  searchListIndex) ?  "searchList__tabBar__content__action": '' }`}>{item.name}</View>
              {(item.id ===  searchListIndex) ? (<View className="search-list__tab__tabBar__content__bottom"></View>): ''}
            </View>
            )
          }
        })}
      </ScrollView >
        </View>
      <View className={`search-list__content ${searchListIndex === 0 && "search-list__new-content"} `} >
      <ScrollView scrollY className="search-list__content__scroll">
          <RanderContent {...props} />
        </ScrollView>
      </View>
      </View>
    )
  }else{
    return(
      <View>暂无数据</View>
    )
  }
}