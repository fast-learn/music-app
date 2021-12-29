import { useState, useEffect } from 'react';
import {getSearchList,getSearchListRecommend} from '@/services/api.ts';

const SearchList = [
  {id:0,nickname:'comprehensive', name: '综合'},
  {id:1,nickname:'album', name: '专辑'},
  {id:2,nickname:'artist', name: '歌手'},
  {id:3,nickname:'circle', name: '云圈'},
  {id:4,nickname:'new_mlog', name: '视频'},
  {id:5,nickname:'playList', name: '歌单'},
  {id:6,nickname:'song', name: '歌曲'},
  {id:7,nickname:'user', name: '用户'},
  {id:8,nickname:'voice', name: ''},
  {id:9,nickname:'voicelist', name: ''},
  {id:10,nickname:'rec_query', name: ''},
  {id:11,nickname:'rec_type', name: ''},
  {id:12,nickname:'sim_query', name: ''},

]
export default function useSearchList() {
  console.log('useSearchList')
  const [searchWord] = useState('try');
  const [searchListData, setSeatchListData] = useState([])  // 全部搜索内容
  const [searchListIndex,setSearchListIndex] = useState(0) // 记录当前tab
  const [searchNowList, setSearchNowList] = useState([]) // 显示的内容
  const [searchListRecommend,setSearchListRecommend] = useState([]) // 综合选项中感兴趣的内容
  // 内容排序
  const OrderLIst  = (data) =>{
    const orderList = []
    const order = data.order
    order.map((item:any) => {
      const newItem = item + 's'
      const  object:any = SearchList.find(items =>  items.nickname === item)
      object.data = data[item][newItem] ?  data[item][newItem] : data[item]['resources']
      object.moreText = data[item]['moreText']
      orderList.push(object)
    })
    orderList.unshift({id:0,nickname:'comprehensive', name: '综合'})
    return orderList
  }
  const setSearchList = (data) =>{
    setSearchNowList(data)
  }
  // tabBar点击时间
  const chandleTabBar = (data) =>{
     // 记录点击事件
    setSearchListIndex(data.id)
    if(data.id === 0 ){
      setSearchNowList(searchListData)
    }
    else{
      setSearchNowList(searchListData.find((item) => item.id == data.id))
    }
  }
  useEffect(() => {
    getSearchList('张三',1018).then((params) => {
      getSearchList('薛之谦',1014).then((items) => {
        params.new_mlog.new_mlogs = items.videos.splice(0,5)
        setSeatchListData(OrderLIst(params))
      })
    }).catch(()=>setSeatchListData([]))
    getSearchListRecommend('张三').then((params) => {
      // setSearchListRecommend(params)
      const newList = []
      params.order.map((item) => {
        const obj:any ={}
        obj.name = item
        obj.data = params[item][0]
        newList.push(obj)
      })
      setSearchListRecommend(newList)
    }).catch(() => setSearchListRecommend([]))
  },[])
  // useEffect(() => {
  //   setSearchNowList([])
  //   if(searchListIndex === 0 ){
  //     setSearchNowList(searchListData)
  //   }
  //   else{
  //     setSearchNowList(searchListData.find((item) => item.id == searchListIndex))
  //   }
  // },[searchListData])
  return {
    searchWord,
    searchListData,
    searchListIndex,
    searchNowList,
    chandleTabBar,
    setSearchList,
    setSearchNowList,
    searchListRecommend
  };
}
