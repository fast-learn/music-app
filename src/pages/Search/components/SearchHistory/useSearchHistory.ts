import { useEffect, useState } from 'react';

export default function useSearchHistory() {
  const [data, setData] = useState<Array<string>>([]);

  useEffect(() => {
    setData(['特别的人', '给你给我', '位置']);
  }, []);

  function clear() {
    setData([]);
  }

  function put(v) {
    const _data = [...data];
    _data.push(v);
    console.log(_data);
    setData(_data);
  }

  return {
    data,
    clear,
    put,
  }
}
