import {ScrollView, View } from "@tarojs/components";

import useSearchList  from "../../useSearchList";
import Interested from "../Interested";
import Single from "../Single";
import "./index.scss";

export default  function SearchListTabBar (){
  const { searchListData,searchListIndex,chandleTabBar} = useSearchList()
  if(searchListData && searchListData.length > 0){
    return(
      <View className="searchList">
        {/* tabBar */}
        <ScrollView scrollX className="searchList__tabBar">
        {searchListData.map((item:any) => {
          if(item && item.name){
            return (
            <View key={item.id} className="searchList__tabBar__content"  onClick={()=>chandleTabBar(item)}>
              <View className={`searchList__tabBar__content__message ${(item.id ===  searchListIndex) ?  "searchList__tabBar__content__action": '' }`}>{item.name}</View>
              {(item.id ===  searchListIndex) ? (<View className="searchList__tabBar__content__bottom"></View>): ''}
            </View>
            )
          }
        })}
      </ScrollView >
      <View className="searchList__content">
      <Single />
      <Interested />
      {/* <ScrollView scrollY className="searchList__content__scroll">
          {searchListIndex === 0 && (<Single />)}
        </ScrollView>*/}
      </View>
      </View>
    )
  }else{
    return(
      <View>暂无数据</View>
    )
  }
}