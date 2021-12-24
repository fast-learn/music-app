import { SONG_LIST_INDEX } from '../constants';
import { SONG_LIST } from '../constants/index';

const demoSongList=[
  // {id: 1904192389, name:'倒流时间',url:'http://m801.music.126.net/20211221134234/9bae96bec7a130e6a4e6417054860e37/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12141553696/675c/5c81/8e0a/221bf9376dbbd5d9f564b3f1fcead437.mp3'},
  // {id: 1905012469, name:'每一秒钟',url:'http://m701.music.126.net/20211221134614/110741dc8597a71a8408648ebd660a50/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12194991126/4db4/8ece/5187/13ad81a8268dcbc2629105e748f9e4a2.mp3'},
  // {id: 1905096024, name:'好逑',url:'http://m701.music.126.net/20211221134626/e630cf302e1900656fe7e12d148fb9c2/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12200857481/06ab/4ef3/7c93/79670dc217da64ab85d818e5f4077890.mp3'},
  // {id: 1904183420, name:'请你一定要记得我好吗',url:'http://m701.music.126.net/20211221134640/c731000b50c4a9976b8da9d6f03ae98b/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12140918564/0bc0/475a/cf27/4b3538f5999c1628659832c72462d1d4.mp3'},
  // {id: 1818831999, name:'道理的道理',url:'http://m701.music.126.net/20211221134653/67552f19e278286e68df7156a90781e7/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12127818574/d7f4/0b2f/f38a/e1eb6ecfce778430613c27dd2434fdb9.mp3'},
  // {id: 1904055088, name:'At Christmas',url:'http://m801.music.126.net/20211221134705/eafc903d48d5cf63a5d9a79af4e5dfc5/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/12140383312/21b2/3445/4cbc/9fee02dd38c468981b04ba10eeea2cd3.mp3'},
  // {id:11111,name:'测试',url:'http://m8.music.126.net/20211221181029/d9097c7368ee61aa1f7f27952c0c4095/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/11955850260/5ce8/5cce/80ab/8cef3dc106566d2f938731ffea8110c3.mp3'},
  {id:1903299149,name:'11',url:'http://localhost:8091/mp3/1903299149.mp3'},
  {id: 1897658456, name:'测试',url:'http://localhost:8091/mp3/1897658456.mp3'}
]
const INITIAL_STATE = {
  songListIndex: 0,
  songList: demoSongList
};

export default function palyer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case SONG_LIST_INDEX:
      return {
        ...state,
        songListIndex: action.payload
      };
    case SONG_LIST:
    return{
      ...state,
      songList:action.payload
    }

    default:
      return state;
  }
}