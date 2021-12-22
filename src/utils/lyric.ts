export default function lyricParser(lrc) {
    if(lrc){
        const lrcData = []
        var medises = lrc.split("\n");    // 用换行符拆分获取到的歌词
        medises.map((item,index) => {
        const newlrc = item.split(']')
        lrcData[index] = {
            time: newlrc[0].split('[')[1],
            content: newlrc[1]
        }
        })
        return lrcData
    }
}

