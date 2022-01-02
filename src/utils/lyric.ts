import { formatNumber } from './common';

export default function lyricParser(lrc) {
  if (lrc) {
    const lrcData: any = [];
    const lrcDataArr = lrc.split('\n');    // 用换行符拆分获取到的歌词
    lrcDataArr.map((item, index) => {
      const newlrc = item.split(']');
      const time = newlrc[0].split('[')[1];
      const content = newlrc[1];
      if (time && content) {
        const match = time.match(/([\d]+):([\d]+).([\d]+)/);
        let minute = 0;
        let second = 0;
        let milliseconds = 0;
        let startTime: any = 0;
        if (match && match.length > 3) {
          minute = +match[1];
          second = +match[2];
          milliseconds = +match[3];
          startTime = Number(minute * 60 + second + '.' + milliseconds);
        }
        lrcData[index] = {
          time,
          startTime,
          content,
        };
      }
    });
    for (let i = 0; i < lrcData.length - 1; i++) {
      const currentItem = lrcData[i];
      currentItem.startTime = formatNumber(currentItem.startTime);
      if (i === lrcData.length - 1) {
        currentItem.endTime = 0;
        currentItem.duration = 0;
      } else {
        const nextItem = lrcData[i + 1];
        currentItem.endTime = formatNumber(nextItem.startTime);
        currentItem.duration = formatNumber(currentItem.endTime - currentItem.startTime);
      }
    }
    return lrcData;
  }
}

