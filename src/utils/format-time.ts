export function formatTime(time) {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
}
