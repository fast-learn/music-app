export function calcPlayCount(playCount) {
  if (playCount < 10000) {
    return playCount;
  }
  return Math.round(playCount / 10000) + '万';
}
